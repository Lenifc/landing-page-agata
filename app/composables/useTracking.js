const SESSION_STORAGE_KEY = 'talkateria-tracking-session-id'
const SESSION_STARTED_AT_KEY = 'talkateria-tracking-session-started-at'
const LANDING_CONTEXT_KEY = 'talkateria-tracking-landing-context'
const ATTRIBUTION_STORAGE_KEY = 'talkateria-tracking-attribution'
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000
const INTERACTION_STORAGE_KEY = 'talkateria-tracking-engaged'
const INTERACTION_COUNT_KEY = 'talkateria-tracking-interaction-count'
const FIRST_INTERACTION_AT_KEY = 'talkateria-tracking-first-interaction-at'
const FIRST_PAGEVIEW_SENT_KEY = 'talkateria-tracking-first-pageview-sent'
const PAGEVIEW_QUEUE_KEY = 'talkateria-tracking-pageviews'
const EVENT_BATCH_KEY = 'talkateria-tracking-event-batch'
const TRACKING_ENDPOINT = '/api/webhook'
const BATCH_INTERVAL_MS = 3000

let flushTimer = null
let flushListenersRegistered = false

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

const inferPageGroup = (path) => {
  if (path === '/') {
    return 'home'
  }
  if (path.startsWith('/kontakt')) {
    return 'contact'
  }
  if (path.startsWith('/oferta')) {
    return 'offer'
  }
  if (path.startsWith('/polityka-prywatnosci')) {
    return 'legal'
  }
  if (path.includes('matura') || path.includes('egzamin')) {
    return 'exam'
  }
  if (path.includes('korepetycje')) {
    return 'school-support'
  }
  if (path.includes('zajecia-dla-doroslych')) {
    return 'adult-classes'
  }
  if (path.includes('zajecia-zdalne')) {
    return 'online-classes'
  }

  return 'content'
}

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

const getStoredString = (key) => getStorage()?.getItem(key) || ''

const setStoredString = (key, value) => {
  const storage = getStorage()

  if (!storage) {
    return
  }

  try {
    storage.setItem(key, value)
  } catch {
    // ignore
  }
}

const getStoredBoolean = (key) => getStoredString(key) === '1'

const setStoredBoolean = (key, value) => {
  setStoredString(key, value ? '1' : '0')
}

const getStoredNumber = (key) => {
  const raw = Number(getStoredString(key))
  return Number.isFinite(raw) && raw > 0 ? raw : 0
}

const setStoredNumber = (key, value) => {
  setStoredString(key, String(value))
}

const readStoredJson = (key, fallback) => {
  const storage = getStorage()

  if (!storage) {
    return fallback
  }

  try {
    const stored = storage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const writeStoredJson = (key, value) => {
  const storage = getStorage()

  if (!storage) {
    return
  }

  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

const readLocalJson = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const writeLocalJson = (key, value) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

const emptyAttribution = () => ({
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
  utmTerm: null,
  gclid: null,
  gadSource: null,
  gadCampaignId: null,
  gbraid: null,
  wbraid: null,
})

const attributionFieldsFrom = (source = {}) => ({
  utmSource: source.utmSource || null,
  utmMedium: source.utmMedium || null,
  utmCampaign: source.utmCampaign || null,
  utmContent: source.utmContent || null,
  utmTerm: source.utmTerm || null,
  gclid: source.gclid || null,
  gadSource: source.gadSource || null,
  gadCampaignId: source.gadCampaignId || null,
  gbraid: source.gbraid || null,
  wbraid: source.wbraid || null,
})

const parseAttributionParams = (url) => {
  try {
    const { searchParams } = new URL(url)

    return {
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
      utmTerm: searchParams.get('utm_term'),
      gclid: searchParams.get('gclid'),
      gadSource: searchParams.get('gad_source'),
      gadCampaignId: searchParams.get('gad_campaignid'),
      gbraid: searchParams.get('gbraid'),
      wbraid: searchParams.get('wbraid'),
    }
  } catch {
    return emptyAttribution()
  }
}

const hasPaidAttribution = (attribution) =>
  Boolean(
    attribution?.gclid ||
      attribution?.gbraid ||
      attribution?.wbraid ||
      attribution?.gadSource ||
      attribution?.gadCampaignId ||
      (attribution?.utmSource &&
        attribution?.utmMedium &&
        /cpc|ppc|paid|ads/i.test(String(attribution.utmMedium))),
  )

const hasAnyAttribution = (attribution) =>
  Boolean(
    hasPaidAttribution(attribution) ||
      attribution?.utmSource ||
      attribution?.utmMedium ||
      attribution?.utmCampaign ||
      attribution?.utmContent ||
      attribution?.utmTerm,
  )

const readPersistedAttribution = () => {
  const stored = readLocalJson(ATTRIBUTION_STORAGE_KEY, null)

  if (!stored || typeof stored !== 'object') {
    return null
  }

  const savedAt = Number(stored.savedAt) || 0
  if (!savedAt || Date.now() - savedAt > ATTRIBUTION_TTL_MS) {
    return null
  }

  return {
    ...emptyAttribution(),
    ...attributionFieldsFrom(stored),
    landingUrl: stored.landingUrl || null,
    landingPath: stored.landingPath || null,
    landingPageGroup: stored.landingPageGroup || null,
    firstTouchAt: stored.firstTouchAt || savedAt,
    savedAt,
  }
}

const persistAttribution = (context) => {
  if (!hasAnyAttribution(context) && !context?.landingPath) {
    return
  }

  const previous = readPersistedAttribution()
  writeLocalJson(ATTRIBUTION_STORAGE_KEY, {
    ...attributionFieldsFrom(context),
    landingUrl: context.landingUrl || previous?.landingUrl || null,
    landingPath: context.landingPath || previous?.landingPath || null,
    landingPageGroup:
      context.landingPageGroup || previous?.landingPageGroup || null,
    firstTouchAt: previous?.firstTouchAt || Date.now(),
    lastTouchAt: Date.now(),
    savedAt: Date.now(),
  })
}

const buildLandingContext = (href = window.location.href) => {
  const url = new URL(href)
  const fromUrl = parseAttributionParams(href)
  const persisted = readPersistedAttribution()
  const mergedAttribution = hasAnyAttribution(fromUrl)
    ? fromUrl
    : attributionFieldsFrom(persisted || {})

  return {
    landingUrl: href,
    landingPath: url.pathname + url.search + url.hash,
    landingPageGroup: inferPageGroup(url.pathname),
    ...mergedAttribution,
  }
}

const getClientBotHints = () => {
  if (typeof navigator === 'undefined') {
    return {}
  }

  return {
    webdriver: navigator.webdriver === true,
    languagesCount: Array.isArray(navigator.languages)
      ? navigator.languages.length
      : 0,
    hardwareConcurrency: Number(navigator.hardwareConcurrency) || null,
    deviceMemory: Number(navigator.deviceMemory) || null,
    maxTouchPoints: Number(navigator.maxTouchPoints) || 0,
  }
}

const ensureSessionContext = () => {
  const storage = getStorage()

  if (!storage) {
    return
  }

  const currentAttribution = parseAttributionParams(window.location.href)
  const existing = readStoredJson(LANDING_CONTEXT_KEY, null)
  const isNewPaidLanding =
    existing &&
    hasPaidAttribution(currentAttribution) &&
    (!hasPaidAttribution(existing) ||
      (currentAttribution.gclid &&
        currentAttribution.gclid !== existing.gclid) ||
      (currentAttribution.gbraid &&
        currentAttribution.gbraid !== existing.gbraid) ||
      (currentAttribution.wbraid &&
        currentAttribution.wbraid !== existing.wbraid))

  // New ad click in the same tab → start a fresh tracking session.
  if (isNewPaidLanding) {
    setStoredString(SESSION_STORAGE_KEY, createSessionId())
    setStoredNumber(SESSION_STARTED_AT_KEY, Date.now())
    setStoredBoolean(INTERACTION_STORAGE_KEY, false)
    setStoredNumber(INTERACTION_COUNT_KEY, 0)
    setStoredString(FIRST_INTERACTION_AT_KEY, '')
    setStoredBoolean(FIRST_PAGEVIEW_SENT_KEY, false)
    writeStoredJson(PAGEVIEW_QUEUE_KEY, [])
    writeStoredJson(EVENT_BATCH_KEY, [])
    const nextLanding = buildLandingContext()
    writeStoredJson(LANDING_CONTEXT_KEY, nextLanding)
    persistAttribution(nextLanding)
  } else if (!existing) {
    const nextLanding = buildLandingContext()
    writeStoredJson(LANDING_CONTEXT_KEY, nextLanding)
    persistAttribution(nextLanding)
  } else if (
    hasAnyAttribution(currentAttribution) &&
    !hasAnyAttribution(existing)
  ) {
    // Backfill UTMs when landing was saved before query params appeared.
    const nextLanding = {
      ...existing,
      ...currentAttribution,
      landingUrl: window.location.href,
      landingPath:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      landingPageGroup: inferPageGroup(window.location.pathname),
    }
    writeStoredJson(LANDING_CONTEXT_KEY, nextLanding)
    persistAttribution(nextLanding)
  } else if (hasAnyAttribution(existing) || existing?.landingPath) {
    persistAttribution(existing)
  }

  if (!getStoredString(SESSION_STORAGE_KEY)) {
    setStoredString(SESSION_STORAGE_KEY, createSessionId())
  }

  if (!getStoredNumber(SESSION_STARTED_AT_KEY)) {
    setStoredNumber(SESSION_STARTED_AT_KEY, Date.now())
  }
}

const getLeadAttribution = () => {
  ensureSessionContext()

  const landingContext = readStoredJson(LANDING_CONTEXT_KEY, {}) || {}
  const persisted = readPersistedAttribution() || {}
  const fromUrl =
    typeof window !== 'undefined'
      ? parseAttributionParams(window.location.href)
      : emptyAttribution()
  const attribution = {
    ...emptyAttribution(),
    ...attributionFieldsFrom(persisted),
    ...attributionFieldsFrom(landingContext),
    ...attributionFieldsFrom(fromUrl),
  }

  return {
    sessionId: getStoredString(SESSION_STORAGE_KEY) || null,
    landingUrl:
      landingContext.landingUrl ||
      persisted.landingUrl ||
      (typeof window !== 'undefined' ? window.location.href : null),
    landingPath:
      landingContext.landingPath ||
      persisted.landingPath ||
      (typeof window !== 'undefined'
        ? window.location.pathname +
          window.location.search +
          window.location.hash
        : null),
    landingPageGroup:
      landingContext.landingPageGroup ||
      persisted.landingPageGroup ||
      (typeof window !== 'undefined'
        ? inferPageGroup(window.location.pathname)
        : null),
    ...attribution,
  }
}

const readQueuedPageviews = () => {
  const queued = readStoredJson(PAGEVIEW_QUEUE_KEY, [])
  return Array.isArray(queued) ? queued : []
}

const writeQueuedPageviews = (items) => {
  writeStoredJson(PAGEVIEW_QUEUE_KEY, items)
}

const readPendingEvents = () => {
  const events = readStoredJson(EVENT_BATCH_KEY, [])
  return Array.isArray(events) ? events : []
}

const writePendingEvents = (items) => {
  writeStoredJson(EVENT_BATCH_KEY, items)
}

const getInteractionCount = () => getStoredNumber(INTERACTION_COUNT_KEY)

const incrementInteractionCount = () => {
  const next = getInteractionCount() + 1
  setStoredNumber(INTERACTION_COUNT_KEY, next)
  return next
}

const ensureFirstInteractionAt = () => {
  const existing = getStoredNumber(FIRST_INTERACTION_AT_KEY)

  if (existing) {
    return existing
  }

  const now = Date.now()
  setStoredNumber(FIRST_INTERACTION_AT_KEY, now)
  return now
}

const buildSharedDetails = () => {
  ensureSessionContext()

  const sessionStartedAt = getStoredNumber(SESSION_STARTED_AT_KEY)
  const firstInteractionAt = getStoredNumber(FIRST_INTERACTION_AT_KEY)
  const landingContext = readStoredJson(LANDING_CONTEXT_KEY, {})
  const now = Date.now()
  const attribution = {
    ...emptyAttribution(),
    ...landingContext,
    ...parseAttributionParams(window.location.href),
  }

  return {
    currentPageGroup: inferPageGroup(window.location.pathname),
    sessionStartedAt,
    sessionAgeMs: sessionStartedAt ? now - sessionStartedAt : null,
    interactionCount: getInteractionCount(),
    firstInteractionAt,
    timeToFirstInteractionMs:
      sessionStartedAt && firstInteractionAt
        ? firstInteractionAt - sessionStartedAt
        : null,
    ...landingContext,
    // Prefer current URL attribution so Ads params are never lost.
    utmSource: attribution.utmSource || landingContext.utmSource || null,
    utmMedium: attribution.utmMedium || landingContext.utmMedium || null,
    utmCampaign: attribution.utmCampaign || landingContext.utmCampaign || null,
    utmContent: attribution.utmContent || landingContext.utmContent || null,
    utmTerm: attribution.utmTerm || landingContext.utmTerm || null,
    gclid: attribution.gclid || landingContext.gclid || null,
    gadSource: attribution.gadSource || landingContext.gadSource || null,
    gadCampaignId:
      attribution.gadCampaignId || landingContext.gadCampaignId || null,
    gbraid: attribution.gbraid || landingContext.gbraid || null,
    wbraid: attribution.wbraid || landingContext.wbraid || null,
    clientBotHints: getClientBotHints(),
  }
}

const buildBasePayload = () => {
  ensureSessionContext()

  return {
    sessionId: getStoredString(SESSION_STORAGE_KEY) || null,
    url: window.location.href,
    path: window.location.pathname + window.location.search + window.location.hash,
    referrer: document.referrer || '',
  }
}

export const useTracking = () => {
  const config = useRuntimeConfig()
  const enabled = computed(() => Boolean(config.public.trackingEnabled))

  const sendBatch = async (events, preferBeacon = false) => {
    if (!enabled.value || typeof window === 'undefined') {
      return false
    }
    if (!events.length) {
      return true
    }

    if (preferBeacon && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify({ events })], {
        type: 'application/json',
      })
      if (navigator.sendBeacon(TRACKING_ENDPOINT, blob)) {
        return true
      }
    }

    try {
      await $fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        body: { events },
      })
      return true
    } catch {
      return false
    }
  }

  const flushPendingEvents = async (preferBeacon = false) => {
    const pending = readPendingEvents()

    if (!pending.length) {
      return
    }

    writePendingEvents([])

    const delivered = await sendBatch(pending, preferBeacon)

    if (!delivered) {
      writePendingEvents([...pending, ...readPendingEvents()].slice(-50))
    }
  }

  const scheduleFlush = () => {
    if (typeof window === 'undefined' || flushTimer) {
      return
    }

    flushTimer = window.setTimeout(async () => {
      flushTimer = null
      await flushPendingEvents(false)
    }, BATCH_INTERVAL_MS)
  }

  const queueEvent = (payload) => {
    const pending = readPendingEvents()
    pending.push(payload)
    writePendingEvents(pending.slice(-50))
    scheduleFlush()
  }

  const buildEventPayload = ({ eventType, label = null, details = {} }) => ({
    ...buildBasePayload(),
    eventType,
    label,
    details: {
      ...buildSharedDetails(),
      ...(details || {}),
    },
  })

  const flushQueuedPageviews = () => {
    const queued = readQueuedPageviews()

    if (!queued.length) {
      return
    }

    writeQueuedPageviews([])

    for (const payload of queued) {
      queueEvent(buildEventPayload(payload))
    }
  }

  const ensureFlushListeners = () => {
    if (flushListenersRegistered || typeof window === 'undefined') {
      return
    }

    const flushWithBeacon = () => {
      if (flushTimer) {
        window.clearTimeout(flushTimer)
        flushTimer = null
      }

      void flushPendingEvents(true)
    }

    window.addEventListener('pagehide', flushWithBeacon)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushWithBeacon()
      }
    })

    flushListenersRegistered = true
  }

  const trackEvent = ({
    eventType,
    label = null,
    href = null,
    details = {},
    countAsInteraction = true,
  }) => {
    ensureFlushListeners()
    ensureSessionContext()

    let interactionCount = getInteractionCount()

    if (countAsInteraction) {
      setStoredBoolean(INTERACTION_STORAGE_KEY, true)
      ensureFirstInteractionAt()
      interactionCount = incrementInteractionCount()
      flushQueuedPageviews()
    }

    queueEvent(
      buildEventPayload({
        eventType,
        label,
        details: {
          ...(href ? { href } : {}),
          interactionCount,
          ...details,
        },
      }),
    )

    return Promise.resolve(true)
  }

  const trackPageview = (details = {}) => {
    ensureFlushListeners()
    ensureSessionContext()

    const payload = {
      eventType: 'pageview',
      label: window.location.pathname,
      details,
    }

    if (!getStoredBoolean(FIRST_PAGEVIEW_SENT_KEY)) {
      setStoredBoolean(FIRST_PAGEVIEW_SENT_KEY, true)
      return sendBatch([buildEventPayload(payload)], false)
    }

    if (getStoredBoolean(INTERACTION_STORAGE_KEY)) {
      queueEvent(buildEventPayload(payload))
      return Promise.resolve(true)
    }

    const queued = readQueuedPageviews()
    queued.push(payload)
    writeQueuedPageviews(queued.slice(-10))
    return Promise.resolve(false)
  }

  return {
    enabled,
    inferPageGroup,
    getLeadAttribution,
    trackEvent,
    trackPageview,
  }
}
