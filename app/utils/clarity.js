import { isClarityEnabled } from '~/config/analytics'

const CLARITY_SCRIPT_ID = 'microsoft-clarity'

let clarityLoadPromise = null

const getClarity = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.clarity ?? null
}

export const loadClarity = (projectId) => {
  if (!isClarityEnabled() || !projectId || typeof window === 'undefined') {
    return Promise.resolve(false)
  }

  if (getClarity()) {
    return Promise.resolve(true)
  }

  if (clarityLoadPromise) {
    return clarityLoadPromise
  }

  clarityLoadPromise = new Promise((resolve) => {
    const existingScript = document.getElementById(CLARITY_SCRIPT_ID)

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true })
      existingScript.addEventListener('error', () => resolve(false), { once: true })
      return
    }

    window.clarity =
      window.clarity ||
      function clarityStub(...args) {
        ;(window.clarity.q = window.clarity.q || []).push(args)
      }

    const script = document.createElement('script')
    script.id = CLARITY_SCRIPT_ID
    script.async = true
    script.src = `https://www.clarity.ms/tag/${projectId}`
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.head.appendChild(script)
  })

  return clarityLoadPromise
}

export const grantAnalyticsConsent = () => {
  const clarity = getClarity()

  if (!clarity) {
    return
  }

  clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: 'granted',
  })
}

export const revokeAnalyticsConsent = () => {
  const clarity = getClarity()

  if (!clarity) {
    return
  }

  clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: 'denied',
  })
  clarity('consent', false)
}
