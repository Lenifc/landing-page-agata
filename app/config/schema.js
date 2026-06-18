import {
  AREA_SERVED,
  BUSINESS_ENTITY,
  BUSINESS_REFERENCE,
  BUSINESS_NAME,
} from './business'
import { CONTACT } from './contact'

export const SCHEMA_CONTEXT = 'https://schema.org'
export const SCHEMA_LANGUAGE = 'pl-PL'
export const SCHEMA_CURRENCY = 'PLN'

const WEB_PAGE_ID = (pageUrl) => `${pageUrl}#webpage`
const SERVICE_ID = (pageUrl) => `${pageUrl}#service`
const FAQ_ID = (pageUrl) => `${pageUrl}#faq`
const OFFER_CATALOG_ID = (pageUrl) => `${pageUrl}#offer-catalog`
const BREADCRUMB_ID = (pageUrl) => `${pageUrl}#breadcrumb`

const compact = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => compact(item))
      .filter((item) => item !== undefined && item !== null)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => item !== undefined && item !== null)
      .map(([key, item]) => [key, compact(item)]),
  )
}

const graph = (nodes) =>
  compact({
    '@context': SCHEMA_CONTEXT,
    '@graph': nodes,
  })

const nodeRef = (id) => ({ '@id': id })

const getOfferId = (pageUrl, plan) => `${pageUrl}#offer-${plan.id}`

const getPlanPrice = (plan) => plan.schemaPrice ?? plan.price.match(/\d+/)?.[0]

const buildPriceDescription = (plan) => `Cena: ${plan.price}.`

const buildWebPageNode = ({
  pageUrl,
  name,
  description,
  pageType = 'WebPage',
  mainEntity = [],
}) =>
  compact({
    '@type': pageType,
    '@id': WEB_PAGE_ID(pageUrl),
    url: pageUrl,
    name,
    description,
    inLanguage: SCHEMA_LANGUAGE,
    about: BUSINESS_REFERENCE,
    mainEntity: mainEntity.map((id) => nodeRef(id)),
  })

const buildFAQPageNode = ({ pageUrl, faqs }) => ({
  '@type': 'FAQPage',
  '@id': FAQ_ID(pageUrl),
  url: `${pageUrl}#faq`,
  inLanguage: SCHEMA_LANGUAGE,
  isPartOf: nodeRef(WEB_PAGE_ID(pageUrl)),
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
})

const buildOfferNode = (
  plan,
  {
    pageUrl,
    category = 'Lekcje języka angielskiego',
    itemOffered,
    itemName = plan.name,
    serviceType = 'Lekcje języka angielskiego',
  },
) => {
  const price = getPlanPrice(plan)

  return compact({
    '@type': 'Offer',
    '@id': getOfferId(pageUrl, plan),
    name: `${plan.name} - ${plan.frequency}`,
    description: `${plan.price}. ${plan.details}`,
    category,
    url: pageUrl,
    availability: 'https://schema.org/LimitedAvailability',
    price,
    priceCurrency: SCHEMA_CURRENCY,
    seller: BUSINESS_REFERENCE,
    areaServed: AREA_SERVED,
    itemOffered: itemOffered ?? {
      '@type': 'Service',
      name: itemName,
      serviceType,
      provider: BUSINESS_REFERENCE,
      areaServed: AREA_SERVED,
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      price,
      priceCurrency: SCHEMA_CURRENCY,
      valueAddedTaxIncluded: true,
      description: buildPriceDescription(plan),
    },
  })
}

const buildOfferCatalogNode = ({
  pageUrl,
  plans,
  name = 'Cennik lekcji angielskiego Talkateria',
  description = 'Pakiety i ceny lekcji języka angielskiego w Talkaterii.',
}) => ({
  '@type': 'OfferCatalog',
  '@id': OFFER_CATALOG_ID(pageUrl),
  name,
  description,
  url: `${pageUrl}#cennik`,
  provider: BUSINESS_REFERENCE,
  numberOfItems: plans.length,
  itemListElement: plans.map((plan) =>
    buildOfferNode(plan, {
      pageUrl,
      itemName: `${plan.name} - ${plan.frequency}`,
    }),
  ),
})

const buildServiceNode = ({
  pageUrl,
  name,
  description,
  serviceType = 'Lekcje języka angielskiego',
  priceOptions = [],
  audience,
  availableChannel,
}) =>
  compact({
    '@type': 'Service',
    '@id': SERVICE_ID(pageUrl),
    name,
    serviceType,
    category: 'Edukacja językowa',
    description,
    provider: BUSINESS_REFERENCE,
    areaServed: AREA_SERVED,
    audience,
    url: pageUrl,
    availableChannel,
    offers: priceOptions.map((plan) =>
      buildOfferNode(plan, {
        pageUrl,
        category: name,
        itemOffered: nodeRef(SERVICE_ID(pageUrl)),
      }),
    ),
  })

const buildBreadcrumbListNode = ({ pageUrl, items }) => ({
  '@type': 'BreadcrumbList',
  '@id': BREADCRUMB_ID(pageUrl),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
})

const buildContactPageNode = ({ pageUrl, description }) =>
  buildWebPageNode({
    pageUrl,
    pageType: 'ContactPage',
    name: `Kontakt ${BUSINESS_NAME}`,
    description:
      description ??
      'Kontakt w sprawie lekcji języka angielskiego w Rumi i okolicach.',
    mainEntity: [BUSINESS_REFERENCE['@id']],
  })

export const jsonLdScript = (schema) => ({
  type: 'application/ld+json',
  innerHTML: JSON.stringify(schema),
})

export const buildOfferPageJsonLd = ({
  pageUrl,
  name,
  description,
  plans,
  faqs = [],
}) => {
  const mainEntity = [OFFER_CATALOG_ID(pageUrl)]

  if (faqs.length) {
    mainEntity.push(FAQ_ID(pageUrl))
  }

  return graph([
    buildWebPageNode({
      pageUrl,
      name,
      description,
      mainEntity,
    }),
    buildOfferCatalogNode({ pageUrl, plans }),
    faqs.length ? buildFAQPageNode({ pageUrl, faqs }) : undefined,
  ])
}

export const buildServicePageJsonLd = ({
  pageUrl,
  pageName,
  pageDescription,
  serviceName,
  serviceDescription,
  serviceType,
  priceOptions = [],
  audience,
  availableChannel,
  faqs = [],
}) => {
  const mainEntity = [SERVICE_ID(pageUrl)]

  if (faqs.length) {
    mainEntity.push(FAQ_ID(pageUrl))
  }

  return graph([
    buildWebPageNode({
      pageUrl,
      name: pageName ?? serviceName,
      description: pageDescription ?? serviceDescription,
      mainEntity,
    }),
    buildServiceNode({
      pageUrl,
      name: serviceName,
      description: serviceDescription,
      serviceType,
      priceOptions,
      audience,
      availableChannel,
    }),
    faqs.length ? buildFAQPageNode({ pageUrl, faqs }) : undefined,
  ])
}

export const buildContactPageJsonLd = ({
  pageUrl,
  description,
  breadcrumbItems,
}) =>
  graph([
    {
      ...buildContactPageNode({ pageUrl, description }),
      mainEntity: {
        '@type': 'ContactPoint',
        telephone: CONTACT.phoneInternational,
        email: CONTACT.email,
        contactType: 'zapisy na zajęcia',
        availableLanguage: ['pl', 'en'],
      },
      potentialAction: [
        {
          '@type': 'ContactAction',
          name: 'Napisz e-mail',
          target: `mailto:${CONTACT.email}`,
        },
        {
          '@type': 'ContactAction',
          name: 'Zadzwoń lub wyślij SMS',
          target: CONTACT.phoneHref,
        },
      ],
    },
    buildBreadcrumbListNode({
      pageUrl,
      items: breadcrumbItems,
    }),
  ])

export const buildHomePageJsonLd = ({
  pageUrl,
  pageName,
  pageDescription,
  audience,
}) =>
  graph([
    BUSINESS_ENTITY,
    buildWebPageNode({
      pageUrl,
      name: pageName,
      description: pageDescription,
      mainEntity: [BUSINESS_REFERENCE['@id'], SERVICE_ID(pageUrl)],
    }),
    buildServiceNode({
      pageUrl,
      name: 'Lekcje języka angielskiego w Rumi',
      description: pageDescription,
      serviceType: 'Lekcje języka angielskiego w Rumi',
      audience,
      availableChannel: [
        {
          '@type': 'ServiceChannel',
          name: 'Zajęcia stacjonarne',
          serviceLocation: BUSINESS_REFERENCE,
        },
        {
          '@type': 'ServiceChannel',
          name: 'Zajęcia online',
          serviceUrl: pageUrl,
        },
      ],
    }),
  ])
