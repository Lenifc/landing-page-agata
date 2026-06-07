<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Talkateria',
        description:
          'Kameralne lekcje języka angielskiego w Rumi dla młodzieży i dorosłych.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rumia',
          streetAddress: 'ul. Wrocławska 2',
          addressCountry: 'PL',
        },
        email: 'hello@talkateria.com',
        areaServed: 'Rumia Reda Trójmiasto',
        knowsAbout: ['język angielski', 'konwersacje po angielsku', 'przygotowanie do egzaminów'],
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
