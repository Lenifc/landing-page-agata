import { createHash } from 'node:crypto'

const ALLOWED_EVENT_TYPES = new Set([
  'pageview',
  'cta_click',
  'link_click',
  'button_click',
  'tel_click',
  'mailto_click',
  'form_submit_success',
])

const MAX_LABEL_LENGTH = 120
const MAX_URL_LENGTH = 2048
const MAX_REFERRER_LENGTH = 2048

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

  const payload = await parsePayload(event)
  const eventType = normalizeString(payload.eventType, 40)

  if (!eventType || !ALLOWED_EVENT_TYPES.has(eventType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported event type',
    })
  }

  const requestBaseUrl = getRequestUrl(event)
  const url = toAbsoluteUrl(payload.url, requestBaseUrl)
  const referrer = toAbsoluteUrl(
    payload.referrer,
    requestBaseUrl || 'https://talkateria.pl',
  )

  const row = {
    event_type: eventType,
    event_label: normalizeString(payload.label, MAX_LABEL_LENGTH),
    url,
    path: normalizeString(payload.path, 512),
    referrer,
    session_id: normalizeString(payload.sessionId, 80),
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
    payload_json:
      payload.details && typeof payload.details === 'object' ? payload.details : {},
  }

  const endpoint = `${config.supabaseUrl.replace(/\/+$/, '')}/rest/v1/tracking_events`

  try {
    await $fetch(endpoint, {
      method: 'POST',
      headers: buildSupabaseHeaders(config.supabaseServiceRoleKey),
      body: row,
    })
  } catch (error) {
    console.error('Tracking webhook insert failed', error)
  }

  setResponseStatus(event, 204)
  return ''
})
