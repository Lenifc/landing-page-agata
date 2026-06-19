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
  'tempo dopasowane do dorosłego kursanta',
  'materiały dobrane do celu, nie przypadkowe rozdziały z podręcznika',
  'możliwość nauki stacjonarnie w Rumi albo online',
  'duży nacisk na praktyczne użycie języka',
]

const priceOptions = getPricingPlans('adultClasses')

const faqs = [
  {
    q: 'Czy mogę zacząć od podstaw?',
    a: 'Tak. Zajęcia mogą być prowadzone od zera albo jako spokojny powrót po dłuższej przerwie. Tempo, materiały i zakres dobieram do aktualnego poziomu.',
  },
  {
    q: 'Czy zajęcia mogą być głównie konwersacyjne?',
    a: 'Tak. Jeśli celem jest swobodniejsze mówienie, lekcje opieramy na rozmowie, praktycznych reakcjach, poprawianiu błędów i słownictwie potrzebnym w realnych sytuacjach.',
  },
  {
    q: 'Czy można uczyć się online?',
    a: 'Tak. Dorośli często wybierają online, kiedy trudno pogodzić naukę z pracą, dojazdami albo domowym grafikiem. Można też łączyć zajęcia stacjonarne i zdalne, jeśli pozwala na to plan.',
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
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Zajęcia dla dorosłych
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Angielski dla dorosłych w Rumi, bez presji i szkolnego stresu.
        </h1>
        <p class="text-pretty text-lg leading-relaxed text-muted-foreground">
          Jeśli chcesz wrócić do angielskiego, przełamać barierę mówienia albo
          poczuć się pewniej w pracy i podróży, zajęcia dla dorosłych w Rumi są
          układane wokół Twojego celu. Praktycznie, spokojnie i w tempie, które
          da się połączyć z codziennym życiem.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Umów lekcję
          </NuxtLink>
          <NuxtLink :to="ROUTES.prices"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/studio-space.webp" alt="Kameralne studio języka angielskiego dla dorosłych w Rumi"
          class="h-full w-full object-cover" width="1024" height="1024" loading="eager" />
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
          Jak może wyglądać nauka?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Możemy skupić się na konwersacjach, powrocie do podstaw, angielskim do
          pracy albo bieżących sytuacjach z życia. Zajęcia mogą odbywać się
          indywidualnie, w parze lub online.
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
              Zajęcia indywidualne w pakiecie rocznym zaczynają się od
              {{ priceOptions[0].price }} za 30 spotkań po 50 minut raz w
              tygodniu. Przy dwóch lekcjach tygodniowo pakiet roczny obejmuje 60
              spotkań i kosztuje {{ priceOptions[1].price }}. Jeśli chcesz uczyć
              się z drugą osobą, dostępne są też pakiety DUO, pakiet MINI i
              lekcje okazjonalne.
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
            Chcesz wrócić do angielskiego po przerwie?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Napisz, do czego potrzebujesz języka. Dobierzemy spokojny plan,
            który będzie pasował do Twojego celu i czasu.
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
