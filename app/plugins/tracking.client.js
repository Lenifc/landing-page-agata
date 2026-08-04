export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { enabled, trackEvent, trackPageview } = useTracking()

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
    })
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

  onNuxtReady(() => {
    if (!enabled.value) {
      return
    }

    sendPageview()
    document.addEventListener('click', handleDocumentClick, true)
  })

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      if (!enabled.value || !oldPath || newPath === oldPath) {
        return
      }

      sendPageview()
    },
  )
})
