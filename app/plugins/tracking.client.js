export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { enabled, inferPageGroup, trackEvent, trackPageview } = useTracking()
  const scrollMilestones = [25, 50, 75, 100]
  const seenScrollDepth = new Map()

  const normalizeLabel = (value) => value.replace(/\s+/g, ' ').trim()

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
      trackable instanceof HTMLAnchorElement ? trackable.getAttribute('href') : null
    const label =
      trackable.getAttribute('aria-label') ||
      trackable.getAttribute('title') ||
      trackable.dataset.trackingLabel ||
      normalizeLabel(trackable.textContent || '') ||
      null

    let eventType = 'button_click'

    if (href) {
      if (href.startsWith('tel:')) {
        eventType = 'tel_click'
      } else if (href.startsWith('mailto:')) {
        eventType = 'mailto_click'
      } else {
        eventType = 'link_click'
      }
    }

    return {
      eventType,
      label,
      href,
      details: {
        tagName: trackable.tagName.toLowerCase(),
        id: trackable.id || null,
        buttonType:
          trackable instanceof HTMLButtonElement ? trackable.type || 'button' : null,
      },
    }
  }

  const sendPageview = () => {
    trackPageview({
      routeName: route.name || null,
      pageGroup: inferPageGroup(route.path),
    })
  }

  const maybeTrackScrollDepth = () => {
    if (!enabled.value) {
      return
    }

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) {
      return
    }

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)
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
        details: {
          depthPercent: milestone,
          pageGroup: inferPageGroup(route.path),
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

  const trackClientError = (label, details) => {
    if (!enabled.value) {
      return
    }

    trackEvent({
      eventType: 'client_error',
      label,
      details,
    })
  }

  onNuxtReady(() => {
    if (!enabled.value) {
      return
    }

    sendPageview()
    document.addEventListener('click', handleDocumentClick, true)
    window.addEventListener('scroll', maybeTrackScrollDepth, { passive: true })
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

      seenScrollDepth.delete(oldPath)
      sendPageview()
      maybeTrackScrollDepth()
    },
  )
})
