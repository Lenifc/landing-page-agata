import {
  ANALYTICS_CONSENT,
  ANALYTICS_CONSENT_KEY,
  CLARITY_PROJECT_ID,
  isClarityEnabled,
} from '~/config/analytics'
import {
  grantAnalyticsConsent,
  loadClarity,
  revokeAnalyticsConsent,
} from '~/utils/clarity'

export const useAnalyticsConsent = () => {
  const runtimeConfig = useRuntimeConfig()
  const clarityId = computed(
    () => runtimeConfig.public.clarityId || CLARITY_PROJECT_ID,
  )

  const consent = useState('analytics-consent', () => null)
  const isReady = useState('analytics-consent-ready', () => false)

  const readStoredConsent = () => {
    if (typeof window === 'undefined') {
      return null
    }

    const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)

    if (
      storedValue === ANALYTICS_CONSENT.accepted ||
      storedValue === ANALYTICS_CONSENT.rejected
    ) {
      return storedValue
    }

    return null
  }

  const persistConsent = (value) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value)
  }

  const activateClarity = async () => {
    if (!isClarityEnabled() || !clarityId.value) {
      return false
    }

    const loaded = await loadClarity(clarityId.value)

    if (loaded) {
      grantAnalyticsConsent()
    }

    return loaded
  }

  const scheduleClarityActivation = () => {
    if (typeof window === 'undefined') {
      return
    }

    const activateWhenIdle = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          activateClarity()
        })
        return
      }

      window.setTimeout(() => {
        activateClarity()
      }, 1500)
    }

    if (document.readyState === 'complete') {
      activateWhenIdle()
      return
    }

    window.addEventListener('load', activateWhenIdle, { once: true })
  }

  const initializeConsent = async () => {
    const storedConsent = readStoredConsent()
    consent.value = storedConsent
    isReady.value = true

    if (storedConsent !== ANALYTICS_CONSENT.rejected) {
      await activateClarity()
    }
  }

  const acceptAnalytics = async () => {
    consent.value = ANALYTICS_CONSENT.accepted
    persistConsent(ANALYTICS_CONSENT.accepted)
    // await activateClarity()
  }

  const rejectAnalytics = () => {
    consent.value = ANALYTICS_CONSENT.rejected
    persistConsent(ANALYTICS_CONSENT.rejected)
    revokeAnalyticsConsent()
  }

  const showBanner = computed(
    () =>
      isClarityEnabled() && isReady.value && consent.value === null,
  )

  return {
    acceptAnalytics,
    consent,
    initializeConsent,
    rejectAnalytics,
    showBanner,
  }
}
