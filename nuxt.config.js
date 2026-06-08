import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      titleTemplate: '%s | Talkateria',
      title: 'Nauka języka angielskiego Rumia',
      htmlAttrs: { lang: 'pl', class: 'bg-background' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Talkateria to kameralne lekcje angielskiego w Rumi dla osób z Rumi, Redy, Gdyni i okolic. Przyjazna atmosfera, rozmowa i realne efekty.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'author', content: 'Talkateria' },
        { name: 'geo.region', content: 'PL-PM' },
        { name: 'geo.placename', content: 'Rumia, Reda, Gdynia' },
        { name: 'color-scheme', content: 'light' },
        { name: 'format-detection', content: 'telephone=yes, email=yes' },
        { name: 'theme-color', content: '#315db7' },
        { property: 'og:locale', content: 'pl_PL' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Talkateria' },
        {
          property: 'og:title',
          content: 'Talkateria | Angielski Rumia, Reda, Gdynia',
        },
        {
          property: 'og:description',
          content:
            'Kameralne lekcje angielskiego w Rumi dla młodzieży i dorosłych z Rumi, Redy, Gdyni i okolic. Bez stresu, z naciskiem na mówienie.',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon-light-32x32.png',
          sizes: '32x32',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon-dark-32x32.png',
          sizes: '32x32',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon.png',
          sizes: '1254x1254',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-icon.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
})
