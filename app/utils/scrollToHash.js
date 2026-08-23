export const ANCHOR_OFFSET = 96

export const scrollToHash = (hash, { behavior = 'smooth' } = {}) => {
  if (typeof window === 'undefined' || !hash || hash === '#') {
    return false
  }

  const rawId = hash.startsWith('#') ? hash.slice(1) : hash
  let id

  try {
    id = decodeURIComponent(rawId)
  } catch {
    return false
  }

  if (!id) {
    return false
  }

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
