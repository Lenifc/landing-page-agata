import tailwindcss from '@tailwindcss/vite'

import { CLARITY_PROJECT_ID } from './app/config/analytics.js'
import { PRERENDER_ROUTES } from './app/config/routes.js'

const SITE_URL = 'https://talkateria.pl'
const OG_IMAGE_PATH = '/talkateria-logo-color.svg'
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      clarityId: process.env.NUXT_PUBLIC_CLARITY_ID || CLARITY_PROJECT_ID,
    },
  },
  ssr: true,
  css: ['~/assets/css/main.css'],
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    prerender: {
      crawlLinks: true,
      routes: PRERENDER_ROUTES,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    pageTransition: {
      name: 'slide-left',
    },
    head: {
      titleTemplate: '%s | Talkateria',
      title: 'Angielski w Rumi i online',
      htmlAttrs: { lang: 'pl', class: 'bg-background' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'google-site-verification',
          content: 'hwrUsKc2ui7UcCaU6tQfzlzXcrx3C9zY8hwdUadeSog',
        },
        {
          name: 'description',
          content:
            'Kameralne lekcje angielskiego w Rumi i online dla młodzieży oraz dorosłych. Nauka bez stresu, z naciskiem na swobodne mówienie. | Talkateria',
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Talkateria' },
        { name: 'application-name', content: 'Talkateria' },
        { name: 'apple-mobile-web-app-title', content: 'Talkateria' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'msapplication-TileColor', content: '#315db7' },
        { name: 'geo.region', content: 'PL-PM' },
        { name: 'geo.placename', content: 'Rumia, Reda' },
        { name: 'color-scheme', content: 'light' },
        { name: 'format-detection', content: 'telephone=yes, email=yes' },
        { name: 'theme-color', content: '#315db7' },
        { property: 'og:locale', content: 'pl_PL' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Talkateria' },
        { property: 'og:image', content: OG_IMAGE_URL },
        { property: 'og:image:url', content: OG_IMAGE_URL },
        { property: 'og:image:secure_url', content: OG_IMAGE_URL },
        { property: 'og:image:type', content: 'image/svg+xml' },
        { property: 'og:image:alt', content: 'Logo Talkateria' },
        {
          property: 'og:title',
          content: 'Angielski w Rumi | Talkateria',
        },
        {
          property: 'og:description',
          content:
            'Kameralne zajęcia z angielskiego w Rumi dla młodzieży oraz dorosłych. Bez stresu, z naciskiem na mówienie.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Angielski w Rumi | Talkateria' },
        {
          name: 'twitter:description',
          content:
            'Kameralne zajęcia z angielskiego w Rumi dla młodzieży oraz dorosłych. Bez stresu, z naciskiem na mówienie.',
        },
        { name: 'twitter:image', content: OG_IMAGE_URL },
        { name: 'twitter:image:alt', content: 'Logo Talkateria' },
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/fraunces-latin-600.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/fraunces-latin-ext-600.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/google-favicon.png',
          sizes: '48x48',
        },
        {
          rel: 'shortcut icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: '16x16 32x32 48x48',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-48x48.png',
          sizes: '48x48',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
})
