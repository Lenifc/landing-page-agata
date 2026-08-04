const SESSION_STORAGE_KEY = 'talkateria-tracking-session-id'
const TRACKING_ENDPOINT = '/api/webhook'

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

const getSessionId = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (stored) {
      return stored
    }

    const created = createSessionId()
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, created)
    return created
  } catch {
    return null
  }
}

const buildBasePayload = () => ({
  sessionId: getSessionId(),
  url: window.location.href,
  path: window.location.pathname + window.location.search + window.location.hash,
  referrer: document.referrer || '',
})

export const useTracking = () => {
  const config = useRuntimeConfig()
  const enabled = computed(() => Boolean(config.public.trackingEnabled))

  const sendEvent = async (payload) => {
    if (!enabled.value || typeof window === 'undefined') {
      return false
    }

    const body = JSON.stringify({
      ...buildBasePayload(),
      ...payload,
    })

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      if (navigator.sendBeacon(TRACKING_ENDPOINT, blob)) {
        return true
      }
    }

    try {
      await $fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        body: JSON.parse(body),
      })
      return true
    } catch {
      return false
    }
  }

  const trackEvent = ({
    eventType,
    label = null,
    href = null,
    details = {},
  }) =>
    sendEvent({
      eventType,
      label,
      details: {
        ...(href ? { href } : {}),
        ...details,
      },
    })

  const trackPageview = (details = {}) =>
    sendEvent({
      eventType: 'pageview',
      label: window.location.pathname,
      details,
    })

  return {
    enabled,
    trackEvent,
    trackPageview,
  }
}
