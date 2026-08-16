<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-show="isVisible"
        class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur md:flex md:justify-center"
      >
        <UiButton
          :to="to"
          class="w-full touch-manipulation justify-center md:max-w-md"
          tracking-label="Sticky CTA"
        >
          {{ displayLabel }}
        </UiButton>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ROUTES } from '~/config/routes'
import { normalizePath } from '~/utils/scrollToHash'

const props = defineProps({
  label: {
    type: String,
    default: 'Umów bezpłatną konsultację →',
  },
  desktopLabel: {
    type: String,
    default: 'Umów lekcję →',
  },
  to: {
    type: [String, Object],
    default: () => ROUTES.contactForm,
  },
})

/** Appear after scrolling past ~first viewport / into 2nd section (mobile). */
const SHOW_AFTER_PX = 260
const DESKTOP_MQ = '(min-width: 768px)'

/** Pages where sticky CTA is redundant or would cover local actions. */
const HIDDEN_PATHS = new Set([
  normalizePath(ROUTES.contact),
  normalizePath(ROUTES.privacyPolicy),
])

const route = useRoute()
const { trackEvent } = useTracking()
const pastScrollThreshold = ref(false)
const isDesktop = ref(false)

const displayLabel = computed(() =>
  isDesktop.value ? props.desktopLabel : props.label,
)
const revealDesktop = useStickyCtaRevealDesktop()
const stickyCtaVisible = useState('sticky-cta-visible', () => false)
const hasTrackedStickyVisibility = ref(false)

let desktopMediaQuery = null

const isEnabledOnRoute = computed(
  () => !HIDDEN_PATHS.has(normalizePath(route.path)),
)

/** Mobile: scroll threshold. Desktop: only after pricing_select. */
const isVisible = computed(() => {
  if (!isEnabledOnRoute.value) {
    return false
  }

  if (isDesktop.value) {
    return revealDesktop.value
  }

  return pastScrollThreshold.value
})

const updateScrollVisibility = () => {
  pastScrollThreshold.value = window.scrollY >= SHOW_AFTER_PX
}

const syncDesktopPad = (visible) => {
  document.documentElement.style.setProperty(
    '--sticky-cta-desktop-pad',
    visible && isDesktop.value ? 'var(--sticky-cta-clearance)' : '0px',
  )
}

const updateDesktopFlag = () => {
  isDesktop.value = desktopMediaQuery?.matches ?? false
  syncDesktopPad(isVisible.value)
}

watch(
  isVisible,
  (visible, wasVisible) => {
    stickyCtaVisible.value = visible
    syncDesktopPad(visible)

    if (!hasTrackedStickyVisibility.value && !visible) {
      return
    }

    if (visible === wasVisible) {
      return
    }

    hasTrackedStickyVisibility.value = true
    trackEvent({
      eventType: 'sticky_cta_toggle',
      label: visible ? 'show' : 'hide',
      countAsInteraction: false,
      details: {
        visible,
        path: route.path,
        trigger: isDesktop.value ? 'pricing_select' : 'scroll',
      },
    })
  },
  { immediate: true },
)

onMounted(() => {
  desktopMediaQuery = window.matchMedia(DESKTOP_MQ)
  updateDesktopFlag()
  desktopMediaQuery.addEventListener('change', updateDesktopFlag)

  updateScrollVisibility()
  window.addEventListener('scroll', updateScrollVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollVisibility)
  desktopMediaQuery?.removeEventListener('change', updateDesktopFlag)
  stickyCtaVisible.value = false
  revealDesktop.value = false
  document.documentElement.style.setProperty('--sticky-cta-desktop-pad', '0px')
})

watch(
  () => route.path,
  () => {
    revealDesktop.value = false
    nextTick(updateScrollVisibility)
  },
)
</script>
