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
        class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur md:hidden"
      >
        <UiButton
          :to="to"
          class="w-full touch-manipulation justify-center"
          tracking-label="Sticky CTA"
        >
          {{ label }}
        </UiButton>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ROUTES } from '~/config/routes'
import { normalizePath } from '~/utils/scrollToHash'

defineProps({
  label: {
    type: String,
    default: 'Umów bezpłatną konsultację →',
  },
  to: {
    type: [String, Object],
    default: () => ROUTES.contactForm,
  },
})

/** Appear after scrolling past ~first viewport / into 2nd section. */
const SHOW_AFTER_PX = 480

/** Pages where sticky CTA is redundant or would cover local actions. */
const HIDDEN_PATHS = new Set([
  normalizePath(ROUTES.contact),
  normalizePath(ROUTES.privacyPolicy),
])

const route = useRoute()
const { trackEvent } = useTracking()
const pastScrollThreshold = ref(false)
const stickyCtaVisible = useState('sticky-cta-visible', () => false)
const hasTrackedStickyVisibility = ref(false)

const isEnabledOnRoute = computed(
  () => !HIDDEN_PATHS.has(normalizePath(route.path)),
)

const isVisible = computed(
  () => isEnabledOnRoute.value && pastScrollThreshold.value,
)

const updateVisibility = () => {
  pastScrollThreshold.value = window.scrollY >= SHOW_AFTER_PX
}

watch(
  isVisible,
  (visible, wasVisible) => {
    stickyCtaVisible.value = visible

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
      },
    })
  },
  { immediate: true },
)

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
  stickyCtaVisible.value = false
})

watch(
  () => route.path,
  () => {
    nextTick(updateVisibility)
  },
)
</script>
