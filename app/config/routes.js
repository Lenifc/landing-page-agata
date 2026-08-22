export const SITE_URL = 'https://talkateria.pl'

export const ROUTES = Object.freeze({
  home: '/',
  offer: '/oferta',
  contact: '/kontakt',
  contactDetails: '/kontakt#dane-kontaktowe',
  contactForm: '/kontakt#formularz',
  eighthGradeExam: '/egzamin-osmoklasisty-rumia',
  eighthGradeExamPrices: '/egzamin-osmoklasisty-rumia#cennik',
  maturaExam: '/matura-z-angielskiego-rumia',
  maturaExamPrices: '/matura-z-angielskiego-rumia#cennik',
  schoolSupport: '/korepetycje',
  schoolSupportPrices: '/korepetycje#cennik',
  adultClasses: '/zajecia-dla-doroslych',
  adultClassesPrices: '/zajecia-dla-doroslych#cennik',
  onlineClasses: '/zajecia-zdalne',
  onlineClassesPrices: '/zajecia-zdalne#cennik',
  prices: '/oferta#cennik',
  privacyPolicy: '/polityka-prywatnosci',
  demoLessons: '/lekcje-pokazowe',
})

/** Not listed in sitemap; served with noindex. */
export const NOINDEX_ROUTES = Object.freeze([ROUTES.privacyPolicy, ROUTES.demoLessons])

export const PRERENDER_ROUTES = Object.freeze(
  Object.values(ROUTES).filter(
    (route) => !route.includes('#') && !NOINDEX_ROUTES.includes(route),
  ),
)
