<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.adultClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const needs = [
  {
    title: 'Powrót do angielskiego',
    body: 'Spokojnie odświeżamy podstawy, uzupełniamy braki i budujemy regularność bez szkolnej presji.',
  },
  {
    title: 'Swobodna rozmowa',
    body: 'Pracujemy nad mówieniem, reakcjami w codziennych sytuacjach i przełamywaniem bariery językowej.',
  },
  {
    title: 'Angielski do pracy i podróży',
    body: 'Dobieramy tematy, słownictwo i zadania do realnych sytuacji: spotkań, wyjazdów, maili i rozmów.',
  },
]

const benefits = [
  'tempo dopasowane do dorosłego kursanta',
  'materiały dobrane do celu, nie przypadkowe rozdziały z podręcznika',
  'możliwość nauki stacjonarnie w Rumi albo online',
  'duży nacisk na praktyczne użycie języka',
]

const priceOptions = getPricingPlans('adultClasses')

const areaServed = [
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'City', name: 'Reda' },
  { '@type': 'City', name: 'Gdynia' },
]

useSeoMeta({
  title: 'Angielski dla dorosłych Rumia',
  description:
    'Zajęcia z angielskiego dla dorosłych w Rumi. Konwersacje, powrót do nauki, angielski do pracy i podróży dla osób z Rumi, Redy, Gdyni i okolic.',
  keywords:
    'angielski dla dorosłych Rumia, zajęcia angielski dorośli Rumia, konwersacje angielski Rumia, angielski online dla dorosłych Reda Gdynia',
  ogTitle: 'Angielski dla dorosłych | Talkateria Rumia',
  ogDescription:
    'Kameralne zajęcia dla dorosłych: rozmowa, praktyczne słownictwo, powrót do podstaw i nauka bez presji.',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Angielski dla dorosłych',
        serviceType: 'Lekcje języka angielskiego',
        description:
          'Indywidualne i kameralne zajęcia z języka angielskiego dla dorosłych w Rumi oraz online.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Talkateria',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Wrocławska 2',
            addressLocality: 'Rumia',
            addressCountry: 'PL',
          },
        },
        areaServed,
        audience: {
          '@type': 'Audience',
          audienceType: 'dorośli',
        },
        offers: priceOptions.map((option) => ({
          '@type': 'Offer',
          name: option.name,
          price: option.price.match(/\d+/)?.[0],
          priceCurrency: 'PLN',
          description: `${option.price}. ${option.details}`,
        })),
        url: pageUrl,
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Oferta',
            item: `${SITE_URL}${ROUTES.offer}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Zajęcia dla dorosłych',
            item: pageUrl,
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <section
      class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24"
    >
      <div class="space-y-6">
        <span
          class="text-sm font-medium uppercase tracking-widest text-primary"
        >
          Zajęcia dla dorosłych
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl"
        >
          Angielski dla dorosłych w Rumi, bez presji i szkolnego stresu.
        </h1>
        <p class="text-pretty text-lg leading-relaxed text-muted-foreground">
          Jeśli chcesz wrócić do angielskiego, przełamać barierę mówienia albo
          poczuć się pewniej w pracy i podróży, zajęcia dla dorosłych są
          układane wokół Twojego celu. Praktycznie, spokojnie i w tempie, które
          da się połączyć z codziennym życiem.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Umów lekcję
          </NuxtLink>
          <NuxtLink
            :to="ROUTES.prices"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div
        class="overflow-hidden rounded-[2rem] border border-border shadow-sm"
      >
        <img
          src="/studio-space.webp"
          alt="Kameralne studio języka angielskiego dla dorosłych w Rumi"
          class="h-full w-full object-cover"
          width="1024"
          height="1024"
          loading="eager"
        />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2
            class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Zajęcia dopasowane do dorosłego rytmu.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Dorośli często wiedzą, czego potrzebują: więcej rozmowy, mniej
            chaosu, jasny plan i język, którego naprawdę użyją. Dlatego zajęcia
            opierają się na praktyce, powtórkach i regularnym budowaniu
            pewności.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article
            v-for="need in needs"
            :key="need.title"
            class="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 class="font-serif text-xl font-semibold text-foreground">
              {{ need.title }}
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {{ need.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <h2
          class="font-serif text-3xl font-semibold tracking-tight text-foreground"
        >
          Jak może wyglądać nauka?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Możemy skupić się na konwersacjach, powrocie do podstaw, angielskim do
          pracy albo bieżących sytuacjach z życia. Zajęcia mogą odbywać się
          indywidualnie, w parze, w małej grupie lub online.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul class="space-y-4">
          <li v-for="benefit in benefits" :key="benefit" class="flex gap-3">
            <span
              class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              {{ benefit }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span
              class="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Ceny
            </span>
            <h2
              class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground"
            >
              Ile kosztuje angielski dla dorosłych?
            </h2>
            <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Zajęcia indywidualne kosztują {{ priceOptions[0].price }} za 50
              minut, a przy dwóch spotkaniach tygodniowo
              {{ priceOptions[1].price }} za zajęcia. Jeśli chcesz uczyć się z
              drugą osobą albo w małej grupie, dostępne są też zajęcia DUO i
              TRIO.
            </p>
            <NuxtLink
              :to="ROUTES.prices"
              class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Zobacz pełny cennik
            </NuxtLink>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="option in priceOptions"
              :key="option.name"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 class="font-serif text-xl font-semibold text-foreground">
                {{ option.name }}
              </h3>
              <p class="mt-2 text-lg font-semibold text-primary">
                {{ option.price }}
              </p>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ option.details }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-20">
      <div
        class="rounded-[2rem] bg-primary px-8 py-12 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)]"
      >
        <h2
          class="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-primary-foreground"
        >
          Chcesz wrócić do angielskiego po przerwie?
        </h2>
        <p
          class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85"
        >
          Napisz, do czego potrzebujesz języka. Dobierzemy spokojny plan, który
          będzie pasował do Twojego celu i czasu.
        </p>
        <NuxtLink
          :to="ROUTES.contact"
          class="mt-7 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Skontaktuj się
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
