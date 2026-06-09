<script setup>
import { CONTACT } from '~/config/contact'
import { SITE_URL } from '~/config/routes'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['EducationalOrganization', 'LocalBusiness'],
        name: 'Talkateria',
        url: SITE_URL,
        telephone: CONTACT.phoneInternational,
        description:
          'Kameralne lekcje języka angielskiego w Rumi dla młodzieży i dorosłych z Rumi, Redy, Gdyni i okolic.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rumia',
          streetAddress: 'ul. Wrocławska 2',
          addressCountry: 'PL',
        },
        priceRange: '$$',
        openingHours: `Zajęcia: ${CONTACT.lessonHours}; kontakt: ${CONTACT.contactHours}`,
        areaServed: [
          { '@type': 'City', name: 'Rumia' },
          { '@type': 'City', name: 'Reda' },
          { '@type': 'City', name: 'Gdynia' },
        ],
        knowsAbout: [
          'język angielski',
          'konwersacje po angielsku',
          'lekcje angielskiego w Rumi',
          'przygotowanie do egzaminów',
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      Przejdź do treści
    </a>
    <AppNav />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
