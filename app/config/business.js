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
    'Kameralne lekcje języka angielskiego w Rumi Janowie dla młodzieży i dorosłych z Rumi i okolic.',
  address: BUSINESS_ADDRESS,
  priceRange: '48-110 PLN',
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
