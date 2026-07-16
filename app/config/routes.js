export const SITE_URL = 'https://talkateria.pl'

export const ROUTES = Object.freeze({
  home: '/',
  offer: '/oferta',
  contact: '/kontakt',
  contactDetails: '/kontakt#dane-kontaktowe',
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
  pricesMenu: '/oferta#cennik',
  pricesPackages: '/oferta#pakiety-roczne',
  pricesMorningOnline: '/oferta#poranne-zajecia-online',
  pricesIndividual: '/oferta#zajecia-indywidualne',
  pricesDuo: '/oferta#zajecia-duo',
  pricesExam: '/oferta#pakiet-egzaminacyjny',
  pricesOccasional: '/oferta#lekcje-okazjonalne',
  promotionRules: '/regulamin-promocji',
  privacyPolicy: '/polityka-prywatnosci',
})

export const PRERENDER_ROUTES = Object.freeze(
  Object.values(ROUTES).filter((route) => !route.includes('#')),
)
