export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { enabled, inferPageGroup, trackEvent, trackPageview } = useTracking()
  const scrollMilestones = [10, 25, 50, 75, 90, 100]
  const seenScrollDepth = new Map()
  const seenSections = new Set()

  let pageEnteredAt = 0
  let activeMs = 0
  let activeSegmentStartedAt = 0
  let maxScrollPercent = 0
  let sectionObserver = null
  let pageMetricsBound = false

  const FORM_STARTED_KEY = 'talkateria-tracking-form-started'

  const normalizeLabel = (value) => value.replace(/\s+/g, ' ').trim()

  const getScrollPercent = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) {
      return 100
    }

    return Math.min(
      100,
      Math.max(0, Math.round((window.scrollY / scrollHeight) * 100)),
    )
  }

  const updateMaxScroll = () => {
    maxScrollPercent = Math.max(maxScrollPercent, getScrollPercent())
  }

  const pauseActiveTime = () => {
    if (!activeSegmentStartedAt) {
      return
    }

    activeMs += Date.now() - activeSegmentStartedAt
    activeSegmentStartedAt = 0
  }

  const resumeActiveTime = () => {
    if (
      document.visibilityState !== 'visible' ||
      activeSegmentStartedAt ||
      !pageEnteredAt
    ) {
      return
    }

    activeSegmentStartedAt = Date.now()
  }

  const getActiveMs = () => {
    if (activeSegmentStartedAt) {
      return activeMs + (Date.now() - activeSegmentStartedAt)
    }

    return activeMs
  }

  const wasFormStarted = () => {
    try {
      return sessionStorage.getItem(FORM_STARTED_KEY) === '1'
    } catch {
      return false
    }
  }

  const clearFormStarted = () => {
    try {
      sessionStorage.removeItem(FORM_STARTED_KEY)
    } catch {
      // ignore
    }
  }

  const resetPageMetrics = () => {
    pageEnteredAt = Date.now()
    activeMs = 0
    activeSegmentStartedAt =
      document.visibilityState === 'visible' ? Date.now() : 0
    maxScrollPercent = getScrollPercent()
  }

  const emitPageLeave = (reason, pathOverride = null) => {
    if (!enabled.value || !pageEnteredAt) {
      return
    }

    pauseActiveTime()
    updateMaxScroll()

    const dwellMs = Date.now() - pageEnteredAt
    const activeTimeMs = getActiveMs()
    const scrollPercent = maxScrollPercent
    const leavePath = pathOverride || route.path
    const formStarted = wasFormStarted()

    // Prevent duplicate page_leave (pagehide + later route_change / bfcache).
    pageEnteredAt = 0
    activeMs = 0
    activeSegmentStartedAt = 0

    if (formStarted && reason !== 'form_submit_success') {
      trackEvent({
        eventType: 'form_abandon',
        label: 'Formularz kontaktowy',
        countAsInteraction: false,
        details: {
          reason,
          path: leavePath,
          activeMs: activeTimeMs,
          dwellMs,
          maxScrollPercent: scrollPercent,
        },
      })
      clearFormStarted()
    }

    // Passive sessions only (passive events are dropped while idle in useTracking).
    trackEvent({
      eventType: 'page_leave',
      label: leavePath,
      countAsInteraction: false,
      details: {
        reason,
        activeMs: activeTimeMs,
        dwellMs,
        maxScrollPercent: scrollPercent,
        pageGroup: inferPageGroup(leavePath),
        sectionsSeen: seenSections.size,
        formStarted,
      },
    })
  }

  const disconnectSectionObserver = () => {
    sectionObserver?.disconnect()
    sectionObserver = null
  }

  const observeSections = () => {
    disconnectSectionObserver()
    seenSections.clear()

    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const root =
      document.querySelector('#main-content') || document.querySelector('main')
    const sections = root
      ? root.querySelectorAll('[data-track-section]')
      : document.querySelectorAll('[data-track-section]')
    if (!sections.length) {
      return
    }

    const routeKey = route.fullPath

    sectionObserver = new IntersectionObserver(
      (entries) => {
        if (!enabled.value || route.fullPath !== routeKey) {
          return
        }

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          const el = entry.target
          if (!(el instanceof HTMLElement)) {
            continue
          }

          const sectionId = el.dataset.trackSection
          if (!sectionId) {
            continue
          }

          const key = `${routeKey}::${sectionId}`
          if (seenSections.has(key)) {
            continue
          }

          seenSections.add(key)
          trackEvent({
            eventType: 'section_view',
            label: sectionId,
            countAsInteraction: false,
            details: {
              sectionId,
              pageGroup: inferPageGroup(route.path),
              intersectionRatio: Number(entry.intersectionRatio.toFixed(2)),
            },
          })
          sectionObserver?.unobserve(el)
        }
      },
      {
        threshold: [0.25, 0.35, 0.5],
      },
    )

    for (const section of sections) {
      sectionObserver.observe(section)
    }
  }

  const nearestSectionId = (el) => {
    const section = el?.closest?.('[data-track-section]')
    return section instanceof HTMLElement
      ? section.dataset.trackSection || null
      : null
  }

  const isExternalHref = (href) => {
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return false
    }

    try {
      const url = new URL(href, window.location.origin)
      return url.origin !== window.location.origin
    } catch {
      return false
    }
  }

  const inferClickPayload = (target) => {
    if (!(target instanceof Element)) {
      return null
    }

    const trackable = target.closest('a, button')
    if (!(trackable instanceof HTMLElement)) {
      return null
    }
    if (
      trackable.closest('[data-tracking-skip-delegated="true"]') ||
      trackable.hasAttribute('disabled') ||
      trackable.getAttribute('aria-disabled') === 'true'
    ) {
      return null
    }

    const href =
      trackable instanceof HTMLAnchorElement
        ? trackable.getAttribute('href')
        : null
    const label =
      trackable.getAttribute('aria-label') ||
      trackable.getAttribute('title') ||
      trackable.dataset.trackingLabel ||
      normalizeLabel(trackable.textContent || '') ||
      null

    let eventType = 'button_click'
    const external = isExternalHref(href)

    if (href) {
      if (href.startsWith('tel:')) {
        eventType = 'tel_click'
      } else if (href.startsWith('mailto:')) {
        eventType = 'mailto_click'
      } else if (external) {
        eventType = 'outbound_click'
      } else {
        eventType = 'link_click'
      }
    }

    return {
      eventType,
      label: label ? label.slice(0, 120) : null,
      href,
      details: {
        tagName: trackable.tagName.toLowerCase(),
        id: trackable.id || null,
        buttonType:
          trackable instanceof HTMLButtonElement
            ? trackable.type || 'button'
            : null,
        isExternal: external,
        sectionId: nearestSectionId(trackable),
        ariaExpanded: trackable.getAttribute('aria-expanded'),
      },
    }
  }

  const sendPageview = () => {
    trackPageview({
      routeName: route.name || null,
      pageGroup: inferPageGroup(route.path),
      hash: route.hash || null,
    })
  }

  const maybeTrackScrollDepth = () => {
    if (!enabled.value) {
      return
    }

    updateMaxScroll()
    const scrollPercent = getScrollPercent()
    const routeKey = route.fullPath
    const seenForRoute = seenScrollDepth.get(routeKey) || new Set()

    for (const milestone of scrollMilestones) {
      if (scrollPercent < milestone || seenForRoute.has(milestone)) {
        continue
      }

      seenForRoute.add(milestone)
      seenScrollDepth.set(routeKey, seenForRoute)
      trackEvent({
        eventType: 'scroll_depth',
        label: `${milestone}%`,
        countAsInteraction: false,
        details: {
          depthPercent: milestone,
          pageGroup: inferPageGroup(route.path),
          scrollY: Math.round(window.scrollY),
          documentHeight: document.documentElement.scrollHeight,
        },
      })
    }
  }

  const handleDocumentClick = (event) => {
    if (!enabled.value) {
      return
    }

    const payload = inferClickPayload(event.target)
    if (!payload) {
      return
    }

    trackEvent(payload)
  }

  const isIgnorableClientError = (details = {}) => {
    const source = String(details.source || '')
    const message = String(details.message || '')

    return (
      source.startsWith('iabjs://') ||
      /Java object is gone/i.test(message) ||
      /script error/i.test(message)
    )
  }

  const trackClientError = (label, details) => {
    if (!enabled.value || isIgnorableClientError(details)) {
      return
    }

    trackEvent({
      eventType: 'client_error',
      label,
      countAsInteraction: false,
      details,
    })
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      pauseActiveTime()
    } else {
      resumeActiveTime()
    }
  }

  const handlePageHide = () => {
    emitPageLeave('pagehide')
  }

  const bindPageMetrics = () => {
    if (pageMetricsBound) {
      return
    }

    window.addEventListener('scroll', maybeTrackScrollDepth, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)
    pageMetricsBound = true
  }

  const enterPage = () => {
    resetPageMetrics()
    nextTick(() => {
      nextTick(() => {
        observeSections()
        maybeTrackScrollDepth()
      })
    })
  }

  onNuxtReady(() => {
    if (!enabled.value) {
      return
    }

    bindPageMetrics()
    enterPage()
    sendPageview()
    document.addEventListener('click', handleDocumentClick, true)
    window.addEventListener('error', (event) => {
      trackClientError('window.error', {
        message: event.message || 'Unknown client error',
        source: event.filename || null,
        line: event.lineno || null,
        column: event.colno || null,
      })
    })
    window.addEventListener('unhandledrejection', (event) => {
      const reason =
        event.reason instanceof Error
          ? event.reason.message
          : typeof event.reason === 'string'
            ? event.reason
            : 'Unhandled promise rejection'

      trackClientError('unhandledrejection', {
        message: reason,
      })
    })
  })

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      if (!enabled.value || !oldPath || newPath === oldPath) {
        return
      }

      const oldPathname = oldPath.split('?')[0]?.split('#')[0] || oldPath
      const newPathname = newPath.split('?')[0]?.split('#')[0] || newPath

      // Hash-only change on same page — no extra event.
      if (oldPathname === newPathname) {
        return
      }

      emitPageLeave('route_change', oldPathname)
      seenScrollDepth.delete(oldPath)
      disconnectSectionObserver()
      enterPage()
      sendPageview()
    },
  )

  // Allow ContactForm success to clear abandon flag without coupling.
  if (import.meta.client) {
    window.addEventListener('talkateria:form-success', () => {
      clearFormStarted()
    })
  }
})
