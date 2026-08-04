import { createHash } from 'node:crypto'

const ALLOWED_EVENT_TYPES = new Set([
  'pageview',
  'cta_click',
  'link_click',
  'button_click',
  'tel_click',
  'mailto_click',
  'scroll_depth',
  'form_submit_success',
])

const MAX_LABEL_LENGTH = 120
const MAX_URL_LENGTH = 2048
const MAX_REFERRER_LENGTH = 2048
const BOT_USER_AGENT_PATTERN =
  /bot|crawl|crawler|spider|slurp|preview|facebookexternalhit|whatsapp|discordbot|linkedinbot|skypeuripreview|telegrambot|google-inspectiontool|googleother|headlesschrome/i

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

const isLikelyBotRequest = (event) => {
  const userAgent = getHeader(event, 'user-agent') || ''
  const purpose =
    getHeader(event, 'purpose') ||
    getHeader(event, 'sec-purpose') ||
    getHeader(event, 'x-purpose') ||
    ''

  return (
    !userAgent ||
    BOT_USER_AGENT_PATTERN.test(userAgent) ||
    /prefetch|preview/i.test(purpose)
  )
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
  if (isLikelyBotRequest(event)) {
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
  const sharedRowFields = {
    user_agent: normalizeString(getHeader(event, 'user-agent'), 1024),
    device_type: detectDeviceType(getHeader(event, 'user-agent')),
    country: normalizeString(getHeader(event, 'x-vercel-ip-country'), 8),
    region: normalizeString(
      getHeader(event, 'x-vercel-ip-country-region'),
      64,
    ),
    city: normalizeString(getHeader(event, 'x-vercel-ip-city'), 128),
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

      return {
        event_type: eventType,
        event_label: normalizeString(entry.label, MAX_LABEL_LENGTH),
        url: toAbsoluteUrl(entry.url, requestBaseUrl),
        path: normalizeString(entry.path, 512),
        referrer: toAbsoluteUrl(
          entry.referrer,
          requestBaseUrl || 'https://talkateria.pl',
        ),
        session_id: normalizeString(entry.sessionId, 80),
        payload_json:
          entry.details && typeof entry.details === 'object' ? entry.details : {},
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
