<template>
  <Transition
    :css="false"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div v-show="open">
      <slot />
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const DURATION_MS = 300

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clearInlineStyles = (el) => {
  el.style.height = ''
  el.style.overflow = ''
  el.style.transition = ''
}

const animateHeight = (el, from, to, done) => {
  el.style.overflow = 'hidden'
  el.style.height = from
  el.style.transition = `height ${DURATION_MS}ms ease-out`
  el.getBoundingClientRect()
  el.style.height = to

  const onEnd = (event) => {
    if (event.target !== el || event.propertyName !== 'height') {
      return
    }

    el.removeEventListener('transitionend', onEnd)
    clearInlineStyles(el)
    done()
  }

  el.addEventListener('transitionend', onEnd)
}

const onEnter = (el, done) => {
  if (prefersReducedMotion()) {
    done()
    return
  }

  animateHeight(el, '0px', `${el.scrollHeight}px`, done)
}

const onLeave = (el, done) => {
  if (prefersReducedMotion()) {
    done()
    return
  }

  animateHeight(el, `${el.scrollHeight}px`, '0px', done)
}
</script>
