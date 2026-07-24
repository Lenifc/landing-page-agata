import { CONTACT } from './contact'
import { SITE_URL } from './routes'

export const BUSINESS_ID = `${SITE_URL}/#talkateria`
export const BUSINESS_NAME = 'Talkateria'
export const BUSINESS_LEGAL_NAME = 'English Coaching Agata Pionke'
export const BUSINESS_NIP = '5871737427'
export const BUSINESS_LOGO = Object.freeze({
  '@type': 'ImageObject',
  url: `${SITE_URL}/talkateria-logo.png`,
  width: 2086,
  height: 754,
})

export const BUSINESS_ADDRESS = Object.freeze({
  '@type': 'PostalAddress',
  streetAddress: CONTACT.streetAddress,
  postalCode: CONTACT.postalCode,
  addressLocality: CONTACT.addressLocality,
  addressRegion: CONTACT.addressRegion,
  addressCountry: CONTACT.addressCountry,
})

export const AREA_SERVED = Object.freeze([
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'Place', name: 'Rumia Janowo' },
  { '@type': 'City', name: 'Reda' },
])

export const BUSINESS_GEO = Object.freeze({
  '@type': 'GeoCoordinates',
  latitude: 54.565312360,
  longitude: 18.408936081,
})

export const BUSINESS_ENTITY = Object.freeze({
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': BUSINESS_ID,
  name: BUSINESS_NAME,
  legalName: BUSINESS_LEGAL_NAME,
  alternateName: 'Talkateria English Studio',
  url: SITE_URL,
  logo: BUSINESS_LOGO,
  email: CONTACT.email,
  telephone: CONTACT.phoneInternational,
  description:
    'Kameralne lekcje języka angielskiego w Rumi Janowie dla młodzieży i dorosłych z Rumi i okolic. Umów bezpłatną konsultację online przed startem.',
  address: BUSINESS_ADDRESS,
  geo: BUSINESS_GEO,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS_GEO.latitude}%2C${BUSINESS_GEO.longitude}`,
  sameAs: [CONTACT.facebookUrl],
  priceRange: '54-95 PLN',
  currenciesAccepted: 'PLN',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.phoneInternational,
    email: CONTACT.email,
    contactType: 'zapisy na zajęcia',
    availableLanguage: ['pl', 'en'],
    description: CONTACT.emailResponseText,
  },
  areaServed: AREA_SERVED,
  serviceArea: AREA_SERVED,
  founder: {
    '@type': 'Person',
    name: 'Agata Pionke',
    jobTitle: 'Lektorka języka angielskiego',
  },
  knowsAbout: [
    'angielski Rumia',
    'angielski Rumia Janowo',
    'lekcje angielskiego w Rumi',
    'konwersacje po angielsku',
    'angielski dla dorosłych',
    'przygotowanie do egzaminu ósmoklasisty',
    'przygotowanie do matury z angielskiego',
  ],
})

export const BUSINESS_REFERENCE = Object.freeze({
  '@id': BUSINESS_ID,
})
