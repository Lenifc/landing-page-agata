<template>
  <div :class="wrapperClasses">
    <span
      v-if="eyebrow"
      class="text-sm font-medium uppercase tracking-widest text-primary"
    >
      {{ eyebrow }}
    </span>
    <component
      :is="titleTag"
      :class="titleClasses"
    >
      <slot name="title">{{ title }}</slot>
    </component>
    <p
      v-if="description || $slots.description"
      :class="descriptionClasses"
    >
      <slot name="description">{{ description }}</slot>
    </p>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  eyebrow: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
  description: {
    type: String,
    default: undefined,
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  maxWidth: {
    type: String,
    default: undefined,
  },
})

const maxWidthMap = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
}

const wrapperClasses = computed(() => {
  const classes = []

  if (props.align === 'center') {
    classes.push('text-center')
  }

  if (props.maxWidth) {
    classes.push(maxWidthMap[props.maxWidth] ?? 'max-w-3xl')

    if (props.align === 'center') {
      classes.push('mx-auto')
    }
  }

  if (props.eyebrow) {
    classes.push('space-y-3')
  }

  return classes
})

const titleClasses = computed(() => {
  const classes = [
    'font-serif font-semibold tracking-tight text-foreground',
  ]

  if (props.eyebrow) {
    classes.push('mt-3')
  }

  if (props.size === 'sm') {
    classes.push('text-balance text-3xl md:text-4xl')
  } else if (props.size === 'lg') {
    classes.push(
      'text-balance text-4xl font-semibold leading-[1.05] md:text-5xl',
    )
  } else {
    classes.push('text-balance text-3xl md:text-4xl')
  }

  if (props.align === 'center') {
    classes.push('text-center')
  }

  return classes
})

const descriptionClasses = computed(() => {
  const classes = [
    'text-pretty leading-relaxed text-muted-foreground',
  ]

  if (props.align === 'center') {
    classes.push('text-center')
  } else {
    classes.push('text-justify')
  }

  if (props.size === 'lg') {
    classes.push('mt-5 text-lg')
  } else {
    classes.push('mt-4')
  }

  return classes
})
</script>
