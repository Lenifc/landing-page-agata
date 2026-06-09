export const SITE_URL = 'https://talkateria.pl'

export const ROUTES = Object.freeze({
  home: '/',
  offer: '/oferta',
  contact: '/kontakt',
  eighthGradeExam: '/egzamin-osmoklasisty-rumia',
  maturaExam: '/matura-z-angielskiego-rumia',
  adultClasses: '/zajecia-dla-doroslych',
  prices: '/oferta#cennik',
})

export const PRERENDER_ROUTES = Object.freeze(
  Object.values(ROUTES).filter((route) => !route.includes('#')),
)
