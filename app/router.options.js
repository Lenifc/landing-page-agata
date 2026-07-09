const ANCHOR_OFFSET = 96

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve({
            el: to.hash,
            top: ANCHOR_OFFSET,
            behavior: 'smooth',
          })
        })
      })
    }

    return { top: 0 }
  },
}
