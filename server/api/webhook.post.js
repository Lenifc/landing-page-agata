import { createHash } from 'node:crypto'

const ALLOWED_EVENT_TYPES = new Set([
  'pageview',
  'cta_click',
  'link_click',
  'button_click',
  'tel_click',
  'mailto_click',
  'outbound_click',
  'scroll_depth',
  'form_view',
  'form_interaction',
  'form_field_focus',
  'form_abandon',
  'form_submit_error',
  'form_submit_blocked',
  'client_error',
  'form_submit_success',
  'page_leave',
  'section_view',
  'nav_toggle',
  'sticky_cta_toggle',
  'faq_toggle',
  'pricing_select',
])

const MAX_LABEL_LENGTH = 120
const MAX_URL_LENGTH = 2048
const HARD_BOT_USER_AGENT_PATTERN =
  /bot|crawl|crawler|spider|slurp|preview|facebookexternalhit|whatsapp|discordbot|linkedinbot|skypeuripreview|telegrambot|google-inspectiontool|googleother|headlesschrome|pingdom|uptimerobot|statuscake|phantomjs|selenium|puppeteer|playwright/i

const SOFT_BOT_USER_AGENT_PATTERN =
  /curl|wget|python-requests|python-urllib|go-http-client|scrapy|httpclient|libwww|okhttp|axios\/|node-fetch|java\/|powershell|sqlmap|nmap|zgrab|censys|shodan|masscan|aiohttp|http\.rb|libcurl|postman|insomnia|scrapy|httrack/i

const DATACENTER_CITY_PATTERN =
  /ashburn|boardman|frankfurt|amsterdam|singapore|mumbai|tokyo|seoul|dublin|london|paris|sydney|montreal|shanghai|dubai|dallas|chicago|san jose|council bluffs|the dalles/i

const getRequestUrl = (event) => {
  const host = getHeader(event, 'x-forwarded-host') || getHeader(event, 'host')
  const proto = getHeader(event, 'x-forwarded-proto') || 'https'
  return host ? `${proto}://${host}` : null
}

const toAbsoluteUrl = (value, fallbackBase) => {
  if (!value || typeof value !== 'string') {
    return null
  }

  try {
    const url = fallbackBase ? new URL(value, fallbackBase) : new URL(value)
    return url.toString().slice(0, MAX_URL_LENGTH)
  } catch {
    return null
  }
}

const normalizeString = (value, maxLength) => {
  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.trim()
  return normalized ? normalized.slice(0, maxLength) : null
}

const decodeHeaderValue = (value, maxLength) => {
  const normalized = normalizeString(value, maxLength)
  if (!normalized) {
    return null
  }

  try {
    return decodeURIComponent(normalized.replace(/\+/g, ' '))
  } catch {
    return normalized
  }
}

const detectDeviceType = (userAgent) => {
  const ua = String(userAgent || '').toLowerCase()

  if (!ua) {
    return 'unknown'
  }
  if (/tablet|ipad/.test(ua)) {
    return 'tablet'
  }
  if (/mobi|android|iphone/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

const isHardBotRequest = (event) => {
  const userAgent = getHeader(event, 'user-agent') || ''
  const purpose =
    getHeader(event, 'purpose') ||
    getHeader(event, 'sec-purpose') ||
    getHeader(event, 'x-purpose') ||
    ''

  return (
    !userAgent ||
    HARD_BOT_USER_AGENT_PATTERN.test(userAgent) ||
    /prefetch|preview/i.test(purpose)
  )
}

const pickFirst = (...values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return null
}

const parseAttributionFromUrl = (urlString) => {
  if (!urlString) {
    return {}
  }

  try {
    const url = new URL(urlString)
    return {
      utmSource: url.searchParams.get('utm_source'),
      utmMedium: url.searchParams.get('utm_medium'),
      utmCampaign: url.searchParams.get('utm_campaign'),
      utmContent: url.searchParams.get('utm_content'),
      utmTerm: url.searchParams.get('utm_term'),
      gclid: url.searchParams.get('gclid'),
      gadSource: url.searchParams.get('gad_source'),
      gadCampaignId: url.searchParams.get('gad_campaignid'),
      gbraid: url.searchParams.get('gbraid'),
      wbraid: url.searchParams.get('wbraid'),
      fbclid: url.searchParams.get('fbclid'),
    }
  } catch {
    return {}
  }
}

const enrichPayloadDetails = (details, urlString, requestMeta = {}) => {
  const base =
    details && typeof details === 'object' && !Array.isArray(details)
      ? { ...details }
      : {}
  const fromUrl = parseAttributionFromUrl(urlString)

  base.utmSource = pickFirst(base.utmSource, base.utm_source, fromUrl.utmSource)
  base.utmMedium = pickFirst(base.utmMedium, base.utm_medium, fromUrl.utmMedium)
  base.utmCampaign = pickFirst(
    base.utmCampaign,
    base.utm_campaign,
    fromUrl.utmCampaign,
  )
  base.utmContent = pickFirst(
    base.utmContent,
    base.utm_content,
    fromUrl.utmContent,
  )
  base.utmTerm = pickFirst(base.utmTerm, base.utm_term, fromUrl.utmTerm)
  base.gclid = pickFirst(base.gclid, fromUrl.gclid)
  base.gadSource = pickFirst(base.gadSource, base.gad_source, fromUrl.gadSource)
  base.gadCampaignId = pickFirst(
    base.gadCampaignId,
    base.gad_campaignid,
    fromUrl.gadCampaignId,
  )
  base.gbraid = pickFirst(base.gbraid, fromUrl.gbraid)
  base.wbraid = pickFirst(base.wbraid, fromUrl.wbraid)
  base.fbclid = pickFirst(base.fbclid, fromUrl.fbclid)

  if (requestMeta && typeof requestMeta === 'object') {
    base.requestMeta = {
      ...(base.requestMeta && typeof base.requestMeta === 'object'
        ? base.requestMeta
        : {}),
      ...requestMeta,
    }
  }

  return base
}

const splitLocation = (pathValue, urlValue) => {
  const source = urlValue || pathValue || '/'

  try {
    const url = new URL(source, 'https://talkateria.pl')
    return {
      pathname: url.pathname || '/',
      query: url.search || '',
      hash: url.hash || '',
    }
  } catch {
    const raw = String(pathValue || '/')
    const [beforeHash, ...hashParts] = raw.split('#')
    const pathname = (beforeHash.split('?')[0] || '/') || '/'
    const queryIndex = beforeHash.indexOf('?')

    return {
      pathname,
      query: queryIndex >= 0 ? beforeHash.slice(queryIndex) : '',
      hash: hashParts.length ? `#${hashParts.join('#')}` : '',
    }
  }
}

const scoreLikelyBot = ({
  event,
  userAgent,
  city,
  details,
  eventType,
}) => {
  const signals = []
  let score = 0
  const ua = String(userAgent || '')
  const acceptLanguage = getHeader(event, 'accept-language') || ''
  const accept = getHeader(event, 'accept') || ''
  const secFetchSite = getHeader(event, 'sec-fetch-site') || ''
  const secChUa = getHeader(event, 'sec-ch-ua') || ''
  const hints =
    details?.clientBotHints && typeof details.clientBotHints === 'object'
      ? details.clientBotHints
      : {}

  if (SOFT_BOT_USER_AGENT_PATTERN.test(ua)) {
    score += 70
    signals.push('soft_bot_ua')
  }

  if (hints.webdriver === true) {
    score += 80
    signals.push('navigator_webdriver')
  }

  if (!acceptLanguage) {
    score += 25
    signals.push('missing_accept_language')
  }

  if (!accept) {
    score += 15
    signals.push('missing_accept')
  }

  if (/mozilla\/5\.0/i.test(ua) && !secChUa && /chrome|chromium|edg\//i.test(ua)) {
    score += 20
    signals.push('missing_sec_ch_ua')
  }

  if (secFetchSite === 'none' && eventType === 'pageview' && !details?.gclid) {
    score += 10
    signals.push('sec_fetch_site_none')
  }

  if (typeof hints.languagesCount === 'number' && hints.languagesCount === 0) {
    score += 25
    signals.push('empty_navigator_languages')
  }

  if (hints.hardwareConcurrency === 0) {
    score += 15
    signals.push('zero_hardware_concurrency')
  }

  if (city && DATACENTER_CITY_PATTERN.test(city) && !details?.gclid) {
    score += 15
    signals.push('datacenter_city')
  }

  if (/Headless|Electron|Nightmare|SlimerJS/i.test(ua)) {
    score += 60
    signals.push('automation_ua')
  }

  const capped = Math.min(score, 100)
  return {
    bot_score: capped,
    is_likely_bot: capped >= 40,
    bot_signals: signals,
  }
}

const hashIp = (ip) => {
  if (!ip) {
    return null
  }

  return createHash('sha256').update(ip).digest('hex')
}

const parsePayload = async (event) => {
  try {
    const body = await readBody(event)
    return typeof body === 'object' && body !== null ? body : {}
  } catch {
    return {}
  }
}

const buildSupabaseHeaders = (apiKey) => ({
  apikey: apiKey,
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.trackingEnabled) {
    setResponseStatus(event, 204)
    return ''
  }

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    console.error('Tracking webhook missing Supabase configuration')
    setResponseStatus(event, 204)
    return ''
  }
  if (isHardBotRequest(event)) {
    setResponseStatus(event, 204)
    return ''
  }

  const payload = await parsePayload(event)
  const events = Array.isArray(payload?.events)
    ? payload.events
    : Array.isArray(payload)
      ? payload
      : [payload]

  const requestBaseUrl = getRequestUrl(event)
  const userAgent = normalizeString(getHeader(event, 'user-agent'), 1024)
  const city = decodeHeaderValue(getHeader(event, 'x-vercel-ip-city'), 128)
  const requestMeta = {
    acceptLanguage: normalizeString(getHeader(event, 'accept-language'), 160),
    secChUa: normalizeString(getHeader(event, 'sec-ch-ua'), 160),
    secChUaMobile: normalizeString(getHeader(event, 'sec-ch-ua-mobile'), 16),
    secChUaPlatform: normalizeString(
      getHeader(event, 'sec-ch-ua-platform'),
      64,
    ),
    vercelMarketingId: normalizeString(
      getHeader(event, 'x-vercel-marketing-id'),
      80,
    ),
  }
  const sharedRowFields = {
    user_agent: userAgent,
    device_type: detectDeviceType(getHeader(event, 'user-agent')),
    country: normalizeString(getHeader(event, 'x-vercel-ip-country'), 8),
    region: decodeHeaderValue(
      getHeader(event, 'x-vercel-ip-country-region'),
      64,
    ),
    city,
    ip_hash: hashIp(
      getRequestIP(event, {
        xForwardedFor: true,
      }),
    ),
  }

  const rows = events
    .map((entry) => {
      const eventType = normalizeString(entry?.eventType, 40)

      if (!eventType || !ALLOWED_EVENT_TYPES.has(eventType)) {
        return null
      }

      const absoluteUrl = toAbsoluteUrl(entry.url, requestBaseUrl)
      const location = splitLocation(entry.path, absoluteUrl)
      const pathWithHash = `${location.pathname}${location.hash}`
      const enrichedDetails = enrichPayloadDetails(
        {
          ...(entry.details && typeof entry.details === 'object'
            ? entry.details
            : {}),
          pathNormalized: location.pathname,
          queryString: location.query || null,
          hash: location.hash || null,
        },
        absoluteUrl,
        requestMeta,
      )
      const bot = scoreLikelyBot({
        event,
        userAgent,
        city,
        details: enrichedDetails,
        eventType,
      })

      if (
        typeof enrichedDetails.landingPath === 'string' &&
        enrichedDetails.landingPath.includes('?')
      ) {
        const landing = splitLocation(enrichedDetails.landingPath)
        enrichedDetails.landingPath = `${landing.pathname}${landing.hash}`
      }

      return {
        event_type: eventType,
        event_label: normalizeString(entry.label, MAX_LABEL_LENGTH),
        url: absoluteUrl,
        path: normalizeString(pathWithHash, 512),
        referrer: toAbsoluteUrl(
          entry.referrer,
          requestBaseUrl || 'https://talkateria.pl',
        ),
        session_id: normalizeString(entry.sessionId, 80),
        payload_json: enrichedDetails,
        is_likely_bot: bot.is_likely_bot,
        bot_score: bot.bot_score,
        bot_signals: bot.bot_signals,
        ...sharedRowFields,
      }
    })
    .filter(Boolean)

  if (!rows.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported event type',
    })
  }

  const endpoint = `${config.supabaseUrl.replace(/\/+$/, '')}/rest/v1/tracking_events`

  try {
    await $fetch(endpoint, {
      method: 'POST',
      headers: buildSupabaseHeaders(config.supabaseServiceRoleKey),
      body: rows,
    })
  } catch (error) {
    console.error('Tracking webhook insert failed', error)
  }

  setResponseStatus(event, 204)
  return ''
})
