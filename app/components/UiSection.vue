<template>
  <section :id="id" :class="sectionClasses">
    <div v-if="contained" :class="containerClasses">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'secondary', 'primary-tint'].includes(value),
  },
  border: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'y', 't'].includes(value),
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value),
  },
  contained: {
    type: Boolean,
    default: true,
  },
  maxWidth: {
    type: String,
    default: '6xl',
  },
  scrollMargin: {
    type: Boolean,
    default: false,
  },
})

const sectionClasses = computed(() => {
  const classes = []

  if (props.border === 'y') {
    classes.push('border-y border-border')
  } else if (props.border === 't') {
    classes.push('border-t border-border')
  }

  if (props.variant === 'secondary') {
    classes.push('bg-secondary')
  } else if (props.variant === 'primary-tint') {
    classes.push('border-primary/15 bg-primary/5')
  }

  if (props.scrollMargin) {
    classes.push('scroll-mt-24')
  }

  return classes
})

const maxWidthMap = {
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
}

const containerClasses = computed(() => {
  const classes = ['mx-auto px-6', maxWidthMap[props.maxWidth] ?? 'max-w-6xl']

  if (props.padding === 'sm') {
    classes.push('py-14')
  } else if (props.padding === 'md') {
    classes.push('py-16')
  } else if (props.padding === 'lg') {
    classes.push('py-16 md:py-20')
  }

  return classes
})
</script>
