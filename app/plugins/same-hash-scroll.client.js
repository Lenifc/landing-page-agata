import { normalizePath, scrollToHash } from '~/utils/scrollToHash'

/**
 * Vue Router / browser ignore clicks when the URL hash is already active.
 * Force-scroll so CTAs like #formularz still work on repeated clicks.
 */
export default defineNuxtPlugin(() => {
  const route = useRoute()

  const onDocumentClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const anchor = event.target.closest?.('a[href]')

    if (!anchor) {
      return
    }

    const href = anchor.getAttribute('href')

    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return
    }

    let hash = ''
    let targetPath = route.path

    if (href.startsWith('#')) {
      hash = href
    } else {
      let url

      try {
        url = new URL(href, window.location.origin)
      } catch {
        return
      }

      if (url.origin !== window.location.origin || !url.hash) {
        return
      }

      hash = url.hash
      targetPath = url.pathname
    }

    if (!hash || hash === '#') {
      return
    }

    if (
      normalizePath(targetPath) !== normalizePath(route.path) ||
      route.hash !== hash
    ) {
      return
    }

    event.preventDefault()
    scrollToHash(hash)
  }

  document.addEventListener('click', onDocumentClick, true)
})
