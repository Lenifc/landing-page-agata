<template>
  <component
    :is="componentTag"
    v-bind="{ ...linkProps, ...forwardedAttrs }"
    data-tracking-skip-delegated="true"
    :class="buttonClasses"
    @click="handleClick"
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
  trackingLabel: {
    type: String,
    default: '',
  },
  trackingType: {
    type: String,
    default: '',
  },
  trackingDetails: {
    type: Object,
    default: () => ({}),
  },
})

const attrs = useAttrs()
const { trackEvent } = useTracking()

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

const forwardedAttrs = computed(() => {
  const { onClick: _onClick, ...rest } = attrs
  return rest
})

const inferredTrackingType = computed(() => {
  if (props.trackingType) {
    return props.trackingType
  }

  const href = props.href || ''

  if (href.startsWith('tel:')) {
    return 'tel_click'
  }
  if (href.startsWith('mailto:')) {
    return 'mailto_click'
  }
  if (props.to || props.href) {
    return 'cta_click'
  }

  return ''
})

const inferredTrackingHref = computed(() => {
  if (typeof props.to === 'string') {
    return props.to
  }
  if (props.to && typeof props.to === 'object' && 'path' in props.to) {
    return props.to.path
  }
  return props.href || null
})

const normalizeLabel = (value) => value.replace(/\s+/g, ' ').trim()

const callParentClick = (event) => {
  const parentClick = attrs.onClick

  if (typeof parentClick === 'function') {
    parentClick(event)
    return
  }

  if (Array.isArray(parentClick)) {
    for (const handler of parentClick) {
      if (typeof handler === 'function') {
        handler(event)
      }
    }
  }
}

const handleClick = (event) => {
  if (inferredTrackingType.value) {
    const textLabel =
      event?.currentTarget instanceof HTMLElement
        ? normalizeLabel(event.currentTarget.textContent || '')
        : ''

    trackEvent({
      eventType: inferredTrackingType.value,
      label: props.trackingLabel || textLabel || null,
      href: inferredTrackingHref.value,
      details: props.trackingDetails,
    })
  }

  callParentClick(event)
}

const buttonClasses = computed(() => {
  const base =
    'inline-flex max-w-full items-center justify-center rounded-full px-5 py-3 text-center text-sm font-medium whitespace-normal xs:px-6 transition-all'

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
