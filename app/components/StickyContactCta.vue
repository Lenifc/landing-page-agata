<template>
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
      class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
    >
      <UiButton :to="to" class="w-full justify-center">
        {{ label }}
      </UiButton>
    </div>
  </Transition>
</template>

<script setup>
import { ROUTES } from '~/config/routes'

defineProps({
  label: {
    type: String,
    default: 'Zapytaj o zajęcia →',
  },
  to: {
    type: [String, Object],
    default: () => ROUTES.contactDetails,
  },
})

/** Appear after scrolling past ~first viewport / into 2nd section. */
const SHOW_AFTER_PX = 480

const isVisible = ref(false)

const updateVisibility = () => {
  isVisible.value = window.scrollY >= SHOW_AFTER_PX
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>
