const SESSION_STORAGE_KEY = 'talkateria-tracking-session-id'
const SESSION_STARTED_AT_KEY = 'talkateria-tracking-session-started-at'
const LANDING_CONTEXT_KEY = 'talkateria-tracking-landing-context'
const ATTRIBUTION_STORAGE_KEY = 'talkateria-tracking-attribution'
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000
const VISITOR_STORAGE_KEY = 'talkateria-tracking-visitor'
const INTERACTION_STORAGE_KEY = 'talkateria-tracking-engaged'
const INTERACTION_COUNT_KEY = 'talkateria-tracking-interaction-count'
const FIRST_INTERACTION_AT_KEY = 'talkateria-tracking-first-interaction-at'
const FIRST_PAGEVIEW_SENT_KEY = 'talkateria-tracking-first-pageview-sent'
const PAGEVIEW_QUEUE_KEY = 'talkateria-tracking-pageviews'
const EVENT_BATCH_KEY = 'talkateria-tracking-event-batch'
const SESSION_PAGE_COUNT_KEY = 'talkateria-tracking-session-page-count'
const TRACKING_ENDPOINT = '/api/webhook'
const BATCH_INTERVAL_MS = 3000
/** Drop bounce pageviews if the tab dies sooner with zero interaction. */
const PAGEVIEW_MIN_DWELL_MS = 2000

let flushTimer = null
let pageviewDwellTimer = null
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
  fbclid: null,
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
  fbclid: source.fbclid || null,
})

/** First non-empty value wins — never let a later `null` wipe first-touch UTMs. */
const mergeFilledAttribution = (...sources) => {
  const result = emptyAttribution()

  for (const source of sources) {
    if (!source || typeof source !== 'object') {
      continue
    }

    const fields = attributionFieldsFrom(source)
    for (const key of Object.keys(result)) {
      if (!result[key] && fields[key]) {
        result[key] = fields[key]
      }
    }
  }

  return result
}

const splitLocation = (href = '', fallbackPath = '') => {
  try {
    const url = href
      ? new URL(href, 'https://talkateria.pl')
      : new URL(fallbackPath || '/', 'https://talkateria.pl')

    return {
      pathname: url.pathname || '/',
      query: url.search || '',
      hash: url.hash || '',
    }
  } catch {
    const raw = String(fallbackPath || href || '/')
    const noHash = raw.split('#')[0] || '/'
    const pathname = noHash.split('?')[0] || '/'
    const queryIndex = noHash.indexOf('?')

    return {
      pathname,
      query: queryIndex >= 0 ? noHash.slice(queryIndex) : '',
      hash: raw.includes('#') ? `#${raw.split('#').slice(1).join('#')}` : '',
    }
  }
}

const pathForReporting = (pathname, hash = '') =>
  `${pathname || '/'}${hash || ''}`

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
      fbclid: searchParams.get('fbclid'),
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
      attribution?.utmTerm ||
      attribution?.fbclid,
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
    landingPath: pathForReporting(url.pathname, url.hash),
    landingPageGroup: inferPageGroup(url.pathname),
    ...mergedAttribution,
  }
}

const getNavigationType = () => {
  if (typeof performance === 'undefined') {
    return null
  }

  try {
    const entry = performance.getEntriesByType?.('navigation')?.[0]
    return entry?.type || null
  } catch {
    return null
  }
}

const getViewportInfo = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return {
    width: window.innerWidth || null,
    height: window.innerHeight || null,
    screenWidth: window.screen?.width || null,
    screenHeight: window.screen?.height || null,
    devicePixelRatio: Number(window.devicePixelRatio) || null,
    orientation:
      screen?.orientation?.type ||
      (window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait'),
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
    language: navigator.language || null,
    languages: Array.isArray(navigator.languages)
      ? navigator.languages.slice(0, 5)
      : null,
    hardwareConcurrency: Number(navigator.hardwareConcurrency) || null,
    deviceMemory: Number(navigator.deviceMemory) || null,
    maxTouchPoints: Number(navigator.maxTouchPoints) || 0,
    cookieEnabled: navigator.cookieEnabled === true,
    online: navigator.onLine !== false,
    doNotTrack:
      navigator.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      window.doNotTrack === '1',
    pdfViewerEnabled: navigator.pdfViewerEnabled === true,
  }
}

const parseUaSummary = () => {
  if (typeof navigator === 'undefined') {
    return null
  }

  const ua = navigator.userAgent || ''
  const uaLower = ua.toLowerCase()

  let browser = 'other'
  if (/edg\//.test(uaLower)) browser = 'edge'
  else if (/chrome\//.test(uaLower) && !/chromium/.test(uaLower)) browser = 'chrome'
  else if (/safari\//.test(uaLower) && !/chrome\//.test(uaLower)) browser = 'safari'
  else if (/firefox\//.test(uaLower)) browser = 'firefox'
  else if (/opr\//.test(uaLower) || /opera/.test(uaLower)) browser = 'opera'

  let os = 'other'
  if (/windows/.test(uaLower)) os = 'windows'
  else if (/android/.test(uaLower)) os = 'android'
  else if (/iphone|ipad|ipod/.test(uaLower)) os = 'ios'
  else if (/mac os x/.test(uaLower)) os = 'macos'
  else if (/linux/.test(uaLower)) os = 'linux'

  return { browser, os }
}

const getDisplayMode = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null
  }

  if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone'
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui'
  if (window.navigator.standalone === true) return 'standalone'
  return 'browser'
}

const getPerformanceTiming = () => {
  if (typeof performance === 'undefined') {
    return null
  }

  try {
    const entry = performance.getEntriesByType?.('navigation')?.[0]
    if (!entry) {
      return null
    }

    return {
      ttfbMs: Math.round(entry.responseStart || 0) || null,
      domContentLoadedMs: Math.round(entry.domContentLoadedEventEnd || 0) || null,
      loadMs: Math.round(entry.loadEventEnd || 0) || null,
      transferSize: Number.isFinite(entry.transferSize) ? entry.transferSize : null,
    }
  } catch {
    return null
  }
}

const getReferrerHost = () => {
  if (typeof document === 'undefined' || !document.referrer) {
    return null
  }

  try {
    return new URL(document.referrer).hostname || null
  } catch {
    return null
  }
}

let cachedVisitorProfile = null

const touchVisitorProfile = () => {
  if (cachedVisitorProfile) {
    return cachedVisitorProfile
  }

  const now = Date.now()
  const existing = readLocalJson(VISITOR_STORAGE_KEY, null)
  const firstSeenAt =
    Number(existing?.firstSeenAt) > 0 ? Number(existing.firstSeenAt) : now
  const lastSeenAt = Number(existing?.lastSeenAt) || 0
  const isNewVisit =
    !lastSeenAt || now - lastSeenAt > 30 * 60 * 1000 /* 30 min gap = new visit */
  const visitCount = Number(existing?.visitCount) || 0

  const next = {
    firstSeenAt,
    lastSeenAt: now,
    visitCount: isNewVisit ? visitCount + 1 : Math.max(visitCount, 1),
  }
  writeLocalJson(VISITOR_STORAGE_KEY, next)

  cachedVisitorProfile = {
    firstSeenAt: next.firstSeenAt,
    visitCount: next.visitCount,
    daysSinceFirst: Math.max(
      0,
      Math.floor((now - next.firstSeenAt) / (24 * 60 * 60 * 1000)),
    ),
    isReturning: next.visitCount > 1,
  }

  return cachedVisitorProfile
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
    setStoredNumber(SESSION_PAGE_COUNT_KEY, 0)
    if (pageviewDwellTimer) {
      window.clearTimeout(pageviewDwellTimer)
      pageviewDwellTimer = null
    }

    const nextLanding = buildLandingContext()
    writeStoredJson(LANDING_CONTEXT_KEY, nextLanding)
    persistAttribution(nextLanding)
  } else if (!existing) {
    const nextLanding = buildLandingContext()
    writeStoredJson(LANDING_CONTEXT_KEY, nextLanding)
    persistAttribution(nextLanding)
  } else if (existing.landingPath?.includes('?')) {
    const split = splitLocation('', existing.landingPath)
    const cleaned = {
      ...existing,
      landingPath: pathForReporting(split.pathname, split.hash),
    }
    writeStoredJson(LANDING_CONTEXT_KEY, cleaned)
    persistAttribution(cleaned)
  } else if (
    hasAnyAttribution(currentAttribution) &&
    !hasAnyAttribution(existing)
  ) {
    // Backfill UTMs when landing was saved before query params appeared.
    const nextLanding = {
      ...existing,
      ...currentAttribution,
      landingUrl: window.location.href,
      landingPath: pathForReporting(
        window.location.pathname,
        window.location.hash,
      ),
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
  const attribution = mergeFilledAttribution(
    fromUrl,
    landingContext,
    persisted,
  )

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
        ? pathForReporting(window.location.pathname, window.location.hash)
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
  const here = splitLocation(window.location.href)
  const attribution = mergeFilledAttribution(
    parseAttributionParams(window.location.href),
    landingContext,
    readPersistedAttribution(),
  )

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
    engaged: getStoredBoolean(INTERACTION_STORAGE_KEY),
    ...landingContext,
    ...attribution,
    pathNormalized: here.pathname,
    queryString: here.query || null,
    hash: here.hash || null,
    clientBotHints: getClientBotHints(),
    viewport: getViewportInfo(),
    navigationType: getNavigationType(),
    uaSummary: parseUaSummary(),
    displayMode: getDisplayMode(),
    performanceTiming: getPerformanceTiming(),
    referrerHost: getReferrerHost(),
    visitor: touchVisitorProfile(),
    pagesInSession: getStoredNumber(SESSION_PAGE_COUNT_KEY) || 1,
    localHour: new Date().getHours(),
    localDayOfWeek: new Date().getDay(),
    timezone: (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || null
      } catch {
        return null
      }
    })(),
  }
}

const buildBasePayload = () => {
  ensureSessionContext()

  const here = splitLocation(window.location.href)

  return {
    sessionId: getStoredString(SESSION_STORAGE_KEY) || null,
    url: window.location.href,
    path: pathForReporting(here.pathname, here.hash),
    referrer: document.referrer || '',
  }
}

const PASSIVE_EVENT_TYPES = new Set([
  'scroll_depth',
  'section_view',
  'form_view',
  'page_leave',
  'form_abandon',
  'client_error',
  'sticky_cta_toggle',
])

const IDLE_ALLOWED_EVENT_TYPES = new Set(['form_view'])

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
      writePendingEvents([...pending, ...readPendingEvents()].slice(-100))
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
    writePendingEvents(pending.slice(-100))
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
    if (pageviewDwellTimer) {
      window.clearTimeout(pageviewDwellTimer)
      pageviewDwellTimer = null
    }

    const queued = readQueuedPageviews()

    if (!queued.length) {
      return
    }

    writeQueuedPageviews([])
    setStoredBoolean(FIRST_PAGEVIEW_SENT_KEY, true)

    for (const payload of queued) {
      queueEvent(buildEventPayload(payload))
    }
  }

  const dropIdlePageviewQueue = () => {
    if (getStoredBoolean(INTERACTION_STORAGE_KEY)) {
      return
    }

    if (pageviewDwellTimer) {
      window.clearTimeout(pageviewDwellTimer)
      pageviewDwellTimer = null
    }

    writeQueuedPageviews([])
  }

  const schedulePageviewDwellFlush = () => {
    if (typeof window === 'undefined' || pageviewDwellTimer) {
      return
    }

    pageviewDwellTimer = window.setTimeout(() => {
      pageviewDwellTimer = null

      // Still idle after threshold → keep the pageview (human-looking dwell).
      if (!getStoredBoolean(INTERACTION_STORAGE_KEY)) {
        flushQueuedPageviews()
        void flushPendingEvents(false)
      }
    }, PAGEVIEW_MIN_DWELL_MS)
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

    const flushOnPageHide = () => {
      // Bounce < threshold, zero interaction → discard queued pageviews.
      dropIdlePageviewQueue()
      flushWithBeacon()
    }

    window.addEventListener('pagehide', flushOnPageHide)
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
    countAsInteraction,
    persistWhenIdle,
  }) => {
    ensureFlushListeners()
    ensureSessionContext()

    let interactionCount = getInteractionCount()
    const alreadyEngaged = getStoredBoolean(INTERACTION_STORAGE_KEY)
    const counts =
      countAsInteraction ?? !PASSIVE_EVENT_TYPES.has(eventType)
    const keepWhenIdle =
      persistWhenIdle ?? IDLE_ALLOWED_EVENT_TYPES.has(eventType)
    const pageviewSent = getStoredBoolean(FIRST_PAGEVIEW_SENT_KEY)

    // Idle sessions: drop noise until pageview is kept or user interacts.
    if (!counts && !alreadyEngaged && !keepWhenIdle && !pageviewSent) {
      return Promise.resolve(false)
    }

    if (counts) {
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

    const nextCount = getStoredNumber(SESSION_PAGE_COUNT_KEY) + 1
    setStoredNumber(SESSION_PAGE_COUNT_KEY, nextCount)

    const payload = {
      eventType: 'pageview',
      label: window.location.pathname,
      details: {
        ...details,
        pagesInSession: nextCount,
      },
    }

    // Already engaged → send immediately.
    if (getStoredBoolean(INTERACTION_STORAGE_KEY)) {
      setStoredBoolean(FIRST_PAGEVIEW_SENT_KEY, true)
      queueEvent(buildEventPayload(payload))
      return Promise.resolve(true)
    }

    // Idle: queue and send after dwell threshold (drop earlier on bounce).
    const queued = readQueuedPageviews()
    queued.push(payload)
    writeQueuedPageviews(queued.slice(-10))
    schedulePageviewDwellFlush()
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
