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
const FALLBACK_MS = DURATION_MS + 50

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clearInlineStyles = (el) => {
  el.style.height = ''
  el.style.overflow = ''
  el.style.transition = ''
}

const animateHeight = (el, from, to, done) => {
  if (from === to) {
    clearInlineStyles(el)
    done()
    return
  }

  el.style.overflow = 'hidden'
  el.style.height = from
  el.style.transition = `height ${DURATION_MS}ms ease-out`
  el.getBoundingClientRect()
  el.style.height = to

  let finished = false

  const finish = () => {
    if (finished) {
      return
    }

    finished = true
    window.clearTimeout(timeoutId)
    el.removeEventListener('transitionend', onEnd)
    clearInlineStyles(el)
    done()
  }

  const onEnd = (event) => {
    if (event.target !== el || event.propertyName !== 'height') {
      return
    }

    finish()
  }

  el.addEventListener('transitionend', onEnd)
  const timeoutId = window.setTimeout(finish, FALLBACK_MS)
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
