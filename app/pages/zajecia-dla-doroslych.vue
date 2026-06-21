<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

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
  'Naturalna komunikacja',
  'Praktyczne użycie języka',
  'Jasne wyjaśnienie zagadnień',
  'Indywidualne tempo',
  'Bezstresowa atmosfera',
  'Możliwość nauki stacjonarnie w Rumi albo online',
]

const priceOptions = getPricingPlans('adultClasses')

const faqs = [
  {
    q: 'Czy mogę zacząć od podstaw?',
    a: `Tak! Zajęcia mogą być prowadzone całkowicie od zera albo jako spokojny, bezstresowy powrót
do nauki po dłuższej przerwie. Nie musisz się niczym martwić – tempo pracy, materiały oraz
zakres materiału zawsze dobieram indywidualnie do Twojego aktualnego poziomu i
możliwości.`,
  },
  {
    q: 'Czy zajęcia mogą być głównie konwersacyjne?',
    a: `Tak, jak najbardziej! Jeśli Twoim głównym celem jest przełamanie bariery i swobodne
dogadywanie się w podróży lub w pracy, możemy skupić się przede wszystkim na mówieniu.
Lekcje opieramy wtedy na naturalnych dyskusjach i symulacjach życiowych sytuacji, a
gramatykę czy nowe słownictwo wprowadzamy "w locie", w trakcie praktycznej rozmowy.
`,
  },
  {
    q: 'Czy można uczyć się online?',
    a: `Tak. Dorośli często wybierają formę online, kiedy trudno pogodzić naukę z pracą, dojazdami
albo napiętym domowym grafikiem. Co ważne, nie musisz sztywno trzymać się jednego
rozwiązania - jeśli Twój plan w danym tygodniu tego wymaga, możemy elastycznie łączyć
zajęcia stacjonarne ze zdalnymi.`,
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

useSeoMeta({
  title: 'Zajęcia z angielskiego dla dorosłych Rumia',
  description:
    'Angielski dla dorosłych w Rumi: konwersacje, powrót do nauki, angielski do pracy i podróży. Kameralne lekcje stacjonarnie lub online.',
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
    jsonLdScript(
      buildServicePageJsonLd({
        pageUrl,
        pageName: 'Angielski dla dorosłych Rumia',
        pageDescription:
          'Angielski dla dorosłych w Rumi: konwersacje, powrót do nauki, angielski do pracy i podróży. Kameralne lekcje stacjonarnie lub online.',
        serviceName: 'Angielski dla dorosłych',
        serviceType: 'Angielski dla dorosłych w Rumi',
        serviceDescription:
          'Indywidualne i kameralne zajęcia z języka angielskiego dla dorosłych w Rumi oraz online.',
        priceOptions,
        audience: {
          '@type': 'Audience',
          audienceType: 'dorośli',
        },
        availableChannel: [
          {
            '@type': 'ServiceChannel',
            name: 'Zajęcia stacjonarne',
            serviceLocation: {
              '@id': 'https://talkateria.pl/#talkateria',
            },
          },
          {
            '@type': 'ServiceChannel',
            name: 'Zajęcia online',
            serviceUrl: pageUrl,
          },
        ],
        faqs,
      }),
    ),
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:pb-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Zajęcia dla dorosłych
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Angielski dla dorosłych w Rumi, bez presji i szkolnego stresu.
        </h1>
        <p class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Nigdy nie jest za późno, aby zacząć mówić swobodnie. Ten kurs jest stworzony dla osób, które
          chcą przełamać barierę językową, odświeżyć wiedzę po latach lub potrzebują angielskiego do
          celów zawodowych i codziennej komunikacji. Program dopasowuję do Twojego tempa życia,
          celów oraz aktualnego poziomu – bez stresu, szkolnego oceniania i w przyjaznej atmosferze.
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
        <img src="/photos/dorosli-hero-800.webp"
          srcset="/photos/dorosli-hero-400.webp 400w, /photos/dorosli-hero-800.webp 800w, /photos/dorosli-hero-1200.webp 1200w"
          sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
          alt="Dorosły kursant podczas lekcji języka angielskiego"
          class="h-full w-full object-cover" width="800" height="800" loading="eager" />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
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
          <article v-for="need in needs" :key="need.title"
            class="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
        <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Jak wyglądają zajęcia?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Zajęcia prowadzę indywidualnie lub w duetach (w parze), co pozwala w pełni dopasować formę
          pracy do potrzeb i celów ucznia. Lekcje mogą odbywać się stacjonarnie w moim studio w Rumi
          lub w wygodnej formie online. Każda lekcja jest starannie zaplanowana pod kątem tematyki
          oraz tempa nauki, tak aby wspierać rozwój kompetencji językowych w obszarach
          najważniejszych dla ucznia - w życiu codziennym lub zawodowym.
          <br><br>
          Podczas zajęć koncentrujemy się na praktycznym użyciu języka, naturalnej komunikacji oraz
          jasnym wyjaśnianiu zagadnień. Dzięki spokojnej, wspierającej atmosferze uczniowie stopniowo
          przełamują barierę językową i budują pewność w swobodnym posługiwaniu się angielskim.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul class="space-y-4">
          <li v-for="benefit in benefits" :key="benefit" class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
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
            <span class="text-sm font-medium uppercase tracking-widest text-primary">
              Ceny
            </span>
            <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
              Ile kosztuje angielski dla dorosłych?
            </h2>
            <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Koszt zajęć zależy od liczby lekcji w pakiecie oraz wybranej formy nauki – indywidualnie lub w
              parze. Dzięki elastycznej ofercie możesz dopasować kurs do swojego tempa nauki, celów oraz
              możliwości finansowych.
            </p>
            <NuxtLink :to="ROUTES.prices"
              class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Zobacz pełny cennik
            </NuxtLink>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="option in priceOptions" :key="option.name"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 class="font-serif text-xl font-semibold text-foreground">
                {{ option.name }}
              </h3>
              <p class="mt-2 text-lg font-semibold text-primary">
                {{ option.price }}
              </p>
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
        Mini FAQ o angielskim dla dorosłych
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index" :aria-controls="`adult-faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
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
          <p :id="`adult-faq-answer-${index}`" v-show="openFaqIndex === index"
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
            Porozmawiajmy o Twoim angielskim! </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Napisz, do czego potrzebujesz języka, a wspólnie ułożymy spokojny plan dopasowany do
            Twojego celu i czasu, którym dysponujesz.
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
