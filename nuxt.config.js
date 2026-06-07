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
      title: 'Angielski z pewnością siebie',
      htmlAttrs: { lang: 'pl', class: 'bg-background' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Talkateria to kameralne lekcje angielskiego w Rumi: indywidualnie, w duecie i w małych grupach. Przyjazna atmosfera, rozmowa i realne efekty.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'format-detection', content: 'telephone=yes, email=yes' },
        { name: 'theme-color', content: '#9c5a3c' },
        { property: 'og:locale', content: 'pl_PL' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Talkateria' },
        { property: 'og:title', content: 'Talkateria | Angielski z pewnością siebie' },
        {
          property: 'og:description',
          content:
            'Kameralne lekcje angielskiego w Rumi dla młodzieży i dorosłych. Bez stresu, z naciskiem na mówienie i praktykę.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
          sizes: '64x64',
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
