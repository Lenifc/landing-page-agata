const ROUTE_ORDER = [
  '/',
  '/oferta',
  '/korepetycje',
  '/zajecia-zdalne',
  '/egzamin-osmoklasisty-rumia',
  '/matura-z-angielskiego-rumia',
  '/zajecia-dla-doroslych',
  '/kontakt',
  '/regulamin-promocji',
  '/polityka-prywatnosci',
]

const normalizePath = (path) =>
  path === '/' ? '/' : path.replace(/\/+$/, '') || '/'

const getRouteIndex = (path) => {
  const index = ROUTE_ORDER.indexOf(normalizePath(path))

  return index === -1 ? ROUTE_ORDER.length : index
}

export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.beforeEach((to, from) => {
    if (!from.name || normalizePath(to.path) === normalizePath(from.path)) {
      to.meta.pageTransition = false
      return
    }

    const toIndex = getRouteIndex(to.path)
    const fromIndex = getRouteIndex(from.path)

    to.meta.pageTransition = {
      name: toIndex >= fromIndex ? 'slide-left' : 'slide-right',
    }
  })
})
