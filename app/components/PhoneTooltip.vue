<template>
  <span
    :id="tooltipId"
    role="tooltip"
    :class="tooltipClasses"
  >
    <slot>
      Ze względu na charakter mojej pracy nie zawsze mogę odebrać telefon. Jeśli
      nie uda się Państwu ze mną skontaktować, proszę o wysłanie wiadomości SMS
      lub e-maila z krótką informacją dotyczącą celu kontaktu. Odpowiem lub
      oddzwonię najszybciej, jak to będzie możliwe.
    </slot>
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

const tooltipClasses = computed(() => {
  const base =
    'pointer-events-none rounded-lg border border-border bg-card px-4 py-3 text-left text-xs leading-relaxed text-foreground opacity-0 shadow-lg transition-opacity peer-hover:opacity-100 peer-focus:opacity-100'

  if (props.placement === 'contact') {
    return `${base} fixed bottom-6 left-6 right-6 z-50 md:absolute md:bottom-full md:left-0 md:right-auto md:mb-3 md:w-[22rem]`
  }

  return `${base} absolute bottom-full left-0 z-20 mb-3 w-[min(22rem,calc(100vw-3rem))] md:left-auto md:right-0`
})
</script>
