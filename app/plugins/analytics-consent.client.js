export default defineNuxtPlugin(() => {
  const { initializeConsent } = useAnalyticsConsent()

  initializeConsent()
})
