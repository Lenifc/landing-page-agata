/** Shared flag: desktop sticky CTA after pricing interaction. Mobile ignores this. */
export const useStickyCtaRevealDesktop = () =>
  useState('sticky-cta-reveal-desktop', () => false)

/** Call after pricing_select — only arms sticky on md+ viewports. */
export const revealDesktopStickyCta = () => {
  if (!import.meta.client) {
    return
  }

  if (!window.matchMedia('(min-width: 768px)').matches) {
    return
  }

  useStickyCtaRevealDesktop().value = true
}
