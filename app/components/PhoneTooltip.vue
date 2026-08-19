<template>
  <span
    ref="rootElement"
    class="relative inline-flex items-center"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
  >
    <button
      type="button"
      class="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-expanded="open"
      :aria-controls="tooltipId"
      aria-label="Informacja o kontakcie telefonicznym"
      @click.stop="toggle"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </button>
    <span
      :id="tooltipId"
      role="tooltip"
      :aria-hidden="!open"
      :class="tooltipClasses"
    >
      <slot>
        Ze względu na charakter mojej pracy nie zawsze mogę odebrać telefon. Jeśli
        nie uda się Państwu ze mną skontaktować, proszę o wysłanie wiadomości SMS
        lub e-maila z krótką informacją dotyczącą celu kontaktu. Odpowiem lub
        oddzwonię najszybciej, jak to będzie możliwe.
      </slot>
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  tooltipId: {
    type: String,
    required: true,
  },
  placement: {
    type: String,
    default: 'footer',
    validator: (value) => ['footer', 'contact'].includes(value),
  },
})

const open = ref(false)
const rootElement = ref(null)

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

const toggle = () => {
  open.value = !open.value
}

const onPointerEnter = () => {
  if (canHover()) {
    open.value = true
  }
}

const onPointerLeave = () => {
  if (canHover()) {
    open.value = false
  }
}

const onDocumentPointer = (event) => {
  if (!open.value || !(event.target instanceof Node)) {
    return
  }

  if (rootElement.value?.contains(event.target)) {
    return
  }

  open.value = false
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointer)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointer)
  document.removeEventListener('keydown', onKeydown)
})

const tooltipClasses = computed(() => {
  const base =
    'rounded-lg border border-border bg-card px-4 py-3 text-left text-xs leading-relaxed text-foreground shadow-lg transition-opacity'

  const visibility = open.value
    ? 'opacity-100'
    : 'hidden pointer-events-none'

  if (props.placement === 'contact') {
    return `${base} ${visibility} fixed bottom-6 left-4 right-4 z-50 md:absolute md:bottom-full md:left-0 md:right-auto md:mb-3 md:w-[22rem]`
  }

  return `${base} ${visibility} fixed bottom-[calc(var(--sticky-cta-clearance)+0.5rem)] left-4 right-4 z-50 md:absolute md:bottom-full md:left-auto md:right-0 md:mb-3 md:w-[22rem]`
})
</script>
