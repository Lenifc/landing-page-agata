/** Ad landing auditors (e.g. PageBurst) — carry campaign UTMs but are not paid clicks. */
export const AD_AUDITOR_CRAWLER_UA_PATTERN = /pageburst/i

export const isAdAuditorCrawlerUserAgent = (userAgent) =>
  AD_AUDITOR_CRAWLER_UA_PATTERN.test(String(userAgent || ''))

export const CLARITY_PROJECT_ID = 'xjwn999ocv'

/** Set to true to re-enable Clarity + cookie consent banner. */
export const CLARITY_ENABLED = false

export const isClarityEnabled = () => CLARITY_ENABLED && !import.meta.dev

export const ANALYTICS_CONSENT_KEY = 'talkateria-analytics-consent'

export const ANALYTICS_CONSENT = Object.freeze({
  accepted: 'accepted',
  rejected: 'rejected',
})
