export const CLARITY_PROJECT_ID = 'xjwn999ocv'

/** Set to true to re-enable Clarity + cookie consent banner. */
export const CLARITY_ENABLED = false

export const isClarityEnabled = () => CLARITY_ENABLED && !import.meta.dev

export const ANALYTICS_CONSENT_KEY = 'talkateria-analytics-consent'

export const ANALYTICS_CONSENT = Object.freeze({
  accepted: 'accepted',
  rejected: 'rejected',
})
