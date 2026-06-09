<script setup>
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.maturaExam
const pageUrl = `${SITE_URL}${pageRoute}`

const focusAreas = [
  {
    title: 'Poziom podstawowy i rozszerzony',
    body: 'Dobieramy zakres pracy do celu ucznia: zdania egzaminacyjnego, progu punktowego, kierunku studiów albo potrzeby uporządkowania podstaw.',
  },
  {
    title: 'Pisanie i mówienie',
    body: 'Ćwiczymy wypowiedzi pisemne, argumentację, spójność tekstu oraz swobodne reagowanie w zadaniach ustnych.',
  },
  {
    title: 'Praca na arkuszach',
    body: 'Uczeń oswaja format matury, uczy się strategii i regularnie dostaje informację zwrotną po zadaniach.',
  },
]

const skills = [
  'rozumienie ze słuchu i tekstów pisanych',
  'środki językowe i typowe pułapki gramatyczne',
  'wypowiedź pisemna z korektą i omówieniem',
  'strategie rozwiązywania zadań pod presją czasu',
]

const priceOptions = [
  {
    name: 'Grupa egzaminacyjna',
    price: '120 zł za osobę',
    details: '100 min (2 × 50 min), grupa 4 osoby dobrana poziomem.',
  },
  {
    name: 'Indywidualnie',
    price: '100 zł',
    details:
      '50 min, 1× tygodniowo, plan pod poziom podstawowy lub rozszerzony.',
  },
  {
    name: 'Indywidualnie regularnie',
    price: '90 zł',
    details: '50 min przy 2 zajęciach tygodniowo.',
  },
]

const areaServed = [
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'City', name: 'Reda' },
  { '@type': 'City', name: 'Gdynia' },
]

useSeoMeta({
  title: 'Matura z angielskiego Rumia',
  description:
    'Przygotowanie do matury z języka angielskiego w Rumi. Zajęcia do matury podstawowej i rozszerzonej dla uczniów z Rumi, Redy, Gdyni i okolic.',
  keywords:
    'matura angielski Rumia, przygotowanie do matury z angielskiego Rumia, angielski matura rozszerzona Rumia, korepetycje angielski matura Reda Gdynia',
  ogTitle: 'Matura z angielskiego | Talkateria Rumia',
  ogDescription:
    'Kameralne przygotowanie do matury z angielskiego: arkusze, pisanie, mówienie, gramatyka i strategie egzaminacyjne.',
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
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Przygotowanie do matury z angielskiego',
        serviceType: 'Lekcje języka angielskiego',
        description:
          'Zajęcia przygotowujące do matury z języka angielskiego na poziomie podstawowym i rozszerzonym w Rumi.',
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
          '@type': 'EducationalAudience',
          educationalRole: 'uczeń szkoły średniej',
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
      children: JSON.stringify({
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
            name: 'Egzamin maturalny',
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
          Egzamin maturalny
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl"
        >
          Przygotowanie do matury z angielskiego w Rumi.
        </h1>
        <p class="text-pretty text-lg leading-relaxed text-muted-foreground">
          Zajęcia pomagają przełożyć wiedzę na wynik: porządkujemy gramatykę,
          rozwijamy słownictwo, ćwiczymy arkusze i pracujemy nad pisaniem oraz
          mówieniem. Program dopasowuję do poziomu podstawowego lub
          rozszerzonego.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Umów konsultację
          </NuxtLink>
          <NuxtLink
            :to="ROUTES.prices"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Sprawdź ceny
          </NuxtLink>
        </div>
      </div>

      <div
        class="overflow-hidden rounded-[2rem] border border-border shadow-sm"
      >
        <img
          src="/lesson-1.webp"
          alt="Uczniowie ćwiczący komunikację po angielsku przed maturą"
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
            Matura z angielskiego bez przypadkowych powtórek.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Najpierw sprawdzamy, co działa, a co zabiera punkty. Potem układamy
            plan: arkusze, słownictwo, struktury, pisanie i strategie. Dzięki
            temu uczeń wie, po co robi każde zadanie i jak mierzyć postęp.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article
            v-for="area in focusAreas"
            :key="area.title"
            class="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 class="font-serif text-xl font-semibold text-foreground">
              {{ area.title }}
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {{ area.body }}
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
          Co ćwiczymy na zajęciach?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Zakres zależy od poziomu i celu maturzysty. Jeśli trzeba, wracamy do
          fundamentów. Jeśli poziom jest wysoki, pracujemy nad precyzją,
          bogatszym językiem i unikaniem typowych strat punktów.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul class="space-y-4">
          <li v-for="skill in skills" :key="skill" class="flex gap-3">
            <span
              class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              {{ skill }}
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
              Ile kosztuje przygotowanie do matury z angielskiego?
            </h2>
            <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Przygotowanie do matury może odbywać się w grupie egzaminacyjnej
              za 120 zł za osobę lub indywidualnie od 100 zł za 50 minut. Przy
              dwóch lekcjach tygodniowo cena zajęć indywidualnych wynosi 90 zł
              za spotkanie.
            </p>
            <NuxtLink
              :to="ROUTES.prices"
              class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Zobacz pełny cennik
            </NuxtLink>
          </div>

          <div class="grid gap-4">
            <article
              v-for="option in priceOptions"
              :key="option.name"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-3">
                <h3 class="font-serif text-xl font-semibold text-foreground">
                  {{ option.name }}
                </h3>
                <p class="text-lg font-semibold text-primary">
                  {{ option.price }}
                </p>
              </div>
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
          Potrzebujesz planu do matury?
        </h2>
        <p
          class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85"
        >
          Napisz, czy chodzi o poziom podstawowy czy rozszerzony oraz ile czasu
          zostało do egzaminu. Dobierzemy sensowny rytm pracy.
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
