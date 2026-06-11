import { CONTACT } from './contact'
import { SITE_URL } from './routes'

export const BUSINESS_ID = `${SITE_URL}/#talkateria`
export const BUSINESS_NAME = 'Talkateria'
export const BUSINESS_LEGAL_NAME = 'English Coaching Agata Pionke'

export const BUSINESS_ADDRESS = Object.freeze({
  '@type': 'PostalAddress',
  streetAddress: CONTACT.streetAddress,
  addressLocality: CONTACT.addressLocality,
  addressRegion: CONTACT.addressRegion,
  addressCountry: CONTACT.addressCountry,
})

export const AREA_SERVED = Object.freeze([
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'Place', name: 'Rumia Janowo' },
  { '@type': 'City', name: 'Reda' },
  { '@type': 'City', name: 'Gdynia' },
])

export const BUSINESS_ENTITY = Object.freeze({
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': BUSINESS_ID,
  name: BUSINESS_NAME,
  legalName: BUSINESS_LEGAL_NAME,
  alternateName: 'Talkateria English Studio',
  url: SITE_URL,
  email: CONTACT.email,
  telephone: CONTACT.phoneInternational,
  image: `${SITE_URL}/studio-hero.webp`,
  logo: `${SITE_URL}/talkateria-logo-color.svg`,
  description:
    'Kameralne lekcje języka angielskiego w Rumi Janowie dla młodzieży i dorosłych z Rumi, Redy, Gdyni i okolic.',
  address: BUSINESS_ADDRESS,
  priceRange: '$$',
  openingHours: 'Mo-Fr 14:00-20:30',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CONTACT.openingDays,
      opens: CONTACT.lessonOpens,
      closes: CONTACT.lessonCloses,
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.phoneInternational,
    email: CONTACT.email,
    contactType: 'zapisy na zajęcia',
    availableLanguage: ['pl', 'en'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CONTACT.openingDays,
      opens: CONTACT.contactOpens,
      closes: CONTACT.contactCloses,
    },
    description: `${CONTACT.contactHoursText} ${CONTACT.smsText} ${CONTACT.emailResponseText}`,
  },
  areaServed: AREA_SERVED,
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

export const LOCAL_BUSINESS_JSON_LD = Object.freeze({
  '@context': 'https://schema.org',
  ...BUSINESS_ENTITY,
})
