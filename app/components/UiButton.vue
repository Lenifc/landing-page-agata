<template>
  <component
    :is="componentTag"
    v-bind="{ ...linkProps, ...$attrs }"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'outline', 'inverse', 'outline-light'].includes(value),
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: 'button',
  },
})

const componentTag = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLink')
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const linkProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }

  if (props.href) {
    return {
      href: props.href,
      target: props.href.startsWith('http') ? '_blank' : undefined,
      rel: props.href.startsWith('http') ? 'noopener noreferrer' : undefined,
    }
  }

  return { type: props.type }
})

const buttonClasses = computed(() => {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all'

  if (props.variant === 'primary') {
    return `${base} bg-primary text-primary-foreground shadow-primary-sm hover:-translate-y-0.5 hover:opacity-90`
  }

  if (props.variant === 'inverse') {
    return `${base} bg-background text-foreground transition-opacity hover:opacity-90`
  }

  if (props.variant === 'outline-light') {
    return `${base} border border-primary-foreground/45 bg-primary-foreground/10 text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/18`
  }

  return `${base} border border-border text-foreground transition-colors hover:bg-muted`
})
</script>
