export const SITE_URL = 'https://talkateria.pl'

export const ROUTES = Object.freeze({
  home: '/',
  offer: '/oferta',
  contact: '/kontakt',
  eighthGradeExam: '/egzamin-osmoklasisty-rumia',
  maturaExam: '/matura-z-angielskiego-rumia',
  adultClasses: '/zajecia-dla-doroslych',
  onlineClasses: '/zajecia-zdalne',
  prices: '/oferta#cennik',
  privacyPolicy: '/polityka-prywatnosci',
})

export const PRERENDER_ROUTES = Object.freeze(
  Object.values(ROUTES).filter((route) => !route.includes('#')),
)
