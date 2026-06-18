<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.eighthGradeExam
const pageUrl = `${SITE_URL}${pageRoute}`

const focusAreas = [
  {
    title: 'Arkusze i typy zadań',
    body: 'Ćwiczymy czytanie, słuchanie, funkcje językowe, środki językowe oraz wypowiedź pisemną na zadaniach podobnych do egzaminacyjnych.',
  },
  {
    title: 'Strategie egzaminacyjne',
    body: 'Uczeń uczy się, jak czytać polecenia, zarządzać czasem, eliminować błędne odpowiedzi i sprawdzać pracę przed oddaniem.',
  },
  {
    title: 'Gramatyka i słownictwo',
    body: 'Porządkujemy najważniejsze struktury oraz słownictwo wymagane na egzaminie ósmoklasisty z języka angielskiego.',
  },
]

const steps = [
  'Diagnoza poziomu i obszarów wymagających pracy.',
  'Regularna praca na zadaniach egzaminacyjnych.',
  'Powtórki gramatyczno-leksykalne wplecione w praktykę.',
  'Ćwiczenie krótkich form pisemnych z jasną informacją zwrotną.',
]

const priceOptions = getPricingPlans('eighthGradeExam')

const faqs = [
  {
    q: 'Kiedy najlepiej zacząć przygotowania do egzaminu?',
    a: 'Najwygodniej zacząć w 7 klasie albo na początku 8 klasy, bo wtedy jest czas na spokojną diagnozę, powtórki i regularne arkusze. Jeśli do egzaminu zostało mniej czasu, można ułożyć bardziej intensywny plan pracy.',
  },
  {
    q: 'Czy zajęcia pomagają też przy zaległościach szkolnych?',
    a: 'Tak. Przygotowanie egzaminacyjne często łączymy z porządkowaniem podstaw: gramatyki, słownictwa i typowych zadań, które sprawiają uczniowi najwięcej trudności w szkole.',
  },
  {
    q: 'Czy uczeń dostaje informację zwrotną po zadaniach?',
    a: 'Tak. Omawiamy błędy, zapisujemy najważniejsze rzeczy do poprawy i wracamy do nich na kolejnych lekcjach, żeby uczeń widział, co już działa, a co wymaga powtórki.',
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

useSeoMeta({
  title: 'Egzamin ósmoklasisty z angielskiego Rumia',
  description:
    'Przygotowanie do egzaminu ósmoklasisty z języka angielskiego w Rumi. Kameralne zajęcia, arkusze, strategie i powtórki dla uczniów z Rumi i okolic.',
  keywords:
    'egzamin ósmoklasisty angielski Rumia, przygotowanie do egzaminu ósmoklasisty Rumia, przygotowanie egzamin ósmoklasisty angielski Janowo, angielski ósmoklasista Reda',
  ogTitle: 'Egzamin ósmoklasisty z angielskiego | Talkateria Rumia',
  ogDescription:
    'Kameralne przygotowanie do egzaminu ósmoklasisty z angielskiego: arkusze, strategie, gramatyka, słownictwo i spokojna praca krok po kroku.',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    jsonLdScript(
      buildServicePageJsonLd({
        pageUrl,
        pageName: 'Egzamin ósmoklasisty z angielskiego Rumia',
        pageDescription:
          'Przygotowanie do egzaminu ósmoklasisty z języka angielskiego w Rumi. Kameralne zajęcia, arkusze, strategie i powtórki dla uczniów z Rumi i okolic.',
        serviceName: 'Przygotowanie do egzaminu ósmoklasisty z angielskiego',
        serviceType:
          'Przygotowanie do egzaminu ósmoklasisty z języka angielskiego',
        serviceDescription:
          'Zajęcia przygotowujące do egzaminu ósmoklasisty z języka angielskiego w Rumi dla uczniów z Rumi i okolic.',
        priceOptions,
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'uczeń szkoły podstawowej',
        },
        faqs,
      }),
    ),
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Egzamin ósmoklasisty
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Przygotowanie do egzaminu ósmoklasisty z angielskiego w Rumi.
        </h1>
        <p class="text-pretty text-lg leading-relaxed text-muted-foreground">
          Zajęcia w Rumi pomagają uporządkować materiał, oswoić arkusze i
          zbudować pewność przed egzaminem. Pracujemy spokojnie, regularnie i
          konkretnie: na zadaniach, strategiach oraz tych obszarach, które
          najbardziej wpływają na wynik.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Skontaktuj się
          </NuxtLink>
          <NuxtLink :to="ROUTES.prices"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/lesson-2.webp" alt="Materiały i notatki do nauki angielskiego przed egzaminem ósmoklasisty"
          class="h-full w-full object-cover" width="1024" height="1024" loading="eager" />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Co obejmuje przygotowanie?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Program zajęć dopasowuję do poziomu ucznia, terminu egzaminu i tego,
            co wymaga najwięcej powtórek. Dzięki temu nauka nie jest chaotyczna,
            tylko prowadzi od diagnozy do coraz pewniejszego rozwiązywania
            zadań.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article v-for="area in focusAreas" :key="area.title"
            class="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
        <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Dla kogo są te zajęcia?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Dla uczniów klas 7 i 8, którzy chcą spokojnie przygotować się do
          egzaminu ósmoklasisty z angielskiego. Zajęcia sprawdzą się zarówno
          wtedy, gdy trzeba nadrobić zaległości, jak i wtedy, gdy celem jest
          wyższy wynik oraz większa swoboda w pracy z arkuszem.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 class="font-serif text-2xl font-semibold text-foreground">
          Jak pracujemy krok po kroku
        </h2>
        <ul class="mt-5 space-y-4">
          <li v-for="(step, index) in steps" :key="step" class="flex gap-4 text-muted-foreground">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {{ index + 1 }}
            </span>
            <span class="pt-1 leading-relaxed">{{ step }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span class="text-sm font-medium uppercase tracking-widest text-primary">
              Ceny
            </span>
            <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
              Ile kosztuje przygotowanie do egzaminu ósmoklasisty?
            </h2>
            <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Najczęściej wybieraną formą przygotowań jest pakiet egzaminacyjny
              w kameralnej grupie maksymalnie 4-osobowej, obejmujący 25 spotkań
              po 100 minut za {{ priceOptions[0].price }}. Dostępne są też
              roczne pakiety 1:1: 30 spotkań raz w tygodniu od
              {{ priceOptions[1].price }} albo 60 spotkań dwa razy w tygodniu za
              {{ priceOptions[2].price }}. Krótszy pakiet MINI obejmuje 20
              spotkań po 50 minut i kosztuje {{ priceOptions[3].price }}.
            </p>
            <NuxtLink :to="ROUTES.prices"
              class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Zobacz pełny cennik
            </NuxtLink>
          </div>

          <div class="grid gap-4">
            <article v-for="option in priceOptions" :key="option.name"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div class="flex flex-wrap items-baseline justify-between gap-3">
                <h3 class="font-serif text-xl font-semibold text-foreground">
                  {{ option.name }}
                </h3>
                <p class="text-lg font-semibold text-primary">
                  {{ option.price }}
                </p>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {{ option.frequency }}
                </span>
                <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {{ option.duration }}
                </span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ option.details }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="mx-auto max-w-3xl scroll-mt-24 px-6 py-16">
      <h2 class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground">
        Mini FAQ o przygotowaniu do egzaminu
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index" :aria-controls="`exam-faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
                ' odpowiedź: ' +
                faq.q
                " @click="toggleFaq(index)">
              <span>{{ faq.q }}</span>
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === index }" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </h3>
          <p :id="`exam-faq-answer-${index}`" v-show="openFaqIndex === index"
            class="pb-6 text-pretty leading-relaxed text-muted-foreground">
            {{ faq.a }}
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-5 py-16">
        <div
          class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 py-12 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)]">
          <h2 class="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-primary-foreground">
            Chcesz sprawdzić, od czego zacząć przygotowania?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Napisz, w której klasie jest uczeń i jaki jest obecny poziom.
            Dobierzemy formę pracy i tempo przygotowań do egzaminu.
          </p>
          <NuxtLink :to="ROUTES.contact"
            class="mt-7 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
            Skontaktuj się
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
