export const ANCHOR_OFFSET = 96

export const scrollToHash = (hash, { behavior = 'smooth' } = {}) => {
  if (typeof window === 'undefined' || !hash || hash === '#') {
    return false
  }

  const id = decodeURIComponent(hash.startsWith('#') ? hash.slice(1) : hash)
  const el = document.getElementById(id)

  if (!el) {
    return false
  }

  const top = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET,
  )

  window.scrollTo({ top, behavior })
  return true
}

export const normalizePath = (path = '/') => {
  if (!path || path === '/') {
    return '/'
  }

  return path.replace(/\/+$/, '') || '/'
}
