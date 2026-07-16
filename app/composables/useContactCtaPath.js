import { ROUTES } from '~/config/routes'

/** Mobile → dane kontaktowe; desktop → /kontakt (bez kotwicy). */
export const useContactCtaPath = () => {
  const isDesktop = ref(false)

  onMounted(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const update = () => {
      isDesktop.value = mediaQuery.matches
    }

    update()
    mediaQuery.addEventListener('change', update)
    onBeforeUnmount(() => mediaQuery.removeEventListener('change', update))
  })

  return computed(() =>
    isDesktop.value ? ROUTES.contact : ROUTES.contactDetails,
  )
}
