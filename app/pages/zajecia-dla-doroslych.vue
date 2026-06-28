<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.adultClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('adultClasses')
const morningOnlinePromotion = getPricingPromotion('morningOnline')
const getPriceOption = (id) => priceOptions.find((option) => option.id === id)
const individualAnnualStandard = priceOptions.find(
  (option) => option.id === 'individualAnnualWeekly',
)
const individualAnnualIntense = priceOptions.find(
  (option) => option.id === 'individualAnnualTwiceWeekly',
)
const duoAnnualIntense = priceOptions.find(
  (option) => option.id === 'duoAnnualTwiceWeekly',
)
const duoAnnualStandard = priceOptions.find(
  (option) => option.id === 'duoAnnualWeekly',
)
const miniIndividual = getPriceOption('miniIndividual')
const miniDuo = getPriceOption('miniDuo')
const occasionalIndividual = getPriceOption('occasionalIndividual')
const occasionalDuo = getPriceOption('occasionalDuo')
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const priceWithContext = (plan) =>
  `${personPrice(plan.fromPrice)} ${plan.fromPriceContext}`
const paymentWithoutPrefix = (value) => value.replace(/^miesięcznie:\s*/, '')
const formatPriceValue = (value) => {
  const formatted = value.toFixed(2).replace('.', ',')
  return `${formatted.endsWith(',00') ? formatted.slice(0, -3) : formatted} zł`
}

const lessonPriceFromInstallments = (plan) => {
  const installments = Number.parseInt(plan.price, 10)
  const lessons = Number.parseInt(plan.frequency, 10)
  const suffix = plan.price.includes('/ osoba') ? ' / osoba' : ''

  return `${formatPriceValue(
    (installments * Number(plan.schemaPrice)) / lessons,
  )}${suffix}`
}

const landingPriceOptions = [
  {
    ...individualAnnualIntense,
    name: 'Pakiety 1:1',
    frequency: '32 lub 64 lekcje',
    displayPrefix: 'od',
    displayPrice: individualAnnualIntense.fromPrice,
    displayPriceContext: individualAnnualIntense.fromPriceContext,
    paymentLines: [
      `32 lekcje: ${paymentWithoutPrefix(individualAnnualStandard.paymentNote)}`,
      `64 lekcje: ${paymentWithoutPrefix(individualAnnualIntense.paymentNote)}`,
    ],
    details:
      'Pakiet roczny Standard lub Intense dla dorosłych, którzy chcą uczyć się regularnie, z programem dopasowanym do celu.',
  },
  {
    ...duoAnnualIntense,
    name: 'Pakiety DUO',
    frequency: '32 lub 64 lekcje',
    displayPrefix: 'od',
    displayPrice: duoAnnualIntense.fromPrice,
    displayPriceContext: duoAnnualIntense.fromPriceContext,
    paymentLines: [
      `32 lekcje: ${paymentWithoutPrefix(duoAnnualStandard.paymentNote)}`,
      `64 lekcje: ${paymentWithoutPrefix(duoAnnualIntense.paymentNote)}`,
    ],
    details:
      'Pakiet roczny Standard lub Intense dla dwóch osób uczących się razem w podobnym rytmie.',
  },
  {
    ...miniIndividual,
    displayPrice: lessonPriceFromInstallments(miniIndividual),
    displayPriceContext: `za lekcję ${miniIndividual.duration}`,
    paymentLines: [miniIndividual.price],
  },
  {
    ...miniDuo,
    displayPrice: lessonPriceFromInstallments(miniDuo),
    displayPriceContext: `za lekcję ${miniDuo.duration}`,
    paymentLines: [miniDuo.price],
  },
  {
    ...occasionalIndividual,
    displayPrice: occasionalIndividual.price,
    displayPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: ['płatność za pojedynczą lekcję'],
  },
  {
    ...occasionalDuo,
    displayPrice: occasionalDuo.price,
    displayPriceContext: `za lekcję ${occasionalDuo.duration}`,
    paymentLines: ['płatność za pojedynczą lekcję'],
  },
]
const individualAnnualPrice = priceWithContext(individualAnnualIntense)
const duoAnnualPrice = priceWithContext(duoAnnualIntense)
const adultPriceFaqAnswer = `Przy wyborze pakietu rocznego 1:1 dla dorosłych cena w przeliczeniu zaczyna się od ${individualAnnualPrice}, a pod ceną podana jest miesięczna płatność, np. ${individualAnnualStandard.price} w pakiecie Standard. Przy wyborze pakietu rocznego DUO cena w przeliczeniu zaczyna się od ${duoAnnualPrice}.`

const faqs = [
  {
    q: 'Ile kosztują zajęcia z angielskiego dla dorosłych?',
    a: adultPriceFaqAnswer,
  },
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
          Angielski dla dorosłych w Rumi oraz online.<br />Bez presji i
          szkolnego stresu.
        </h1>
        <p class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Nigdy nie jest za późno, aby zacząć mówić swobodnie. Ten kurs jest
          stworzony dla osób, które chcą przełamać barierę językową, odświeżyć
          wiedzę po latach lub potrzebują angielskiego do celów zawodowych i
          codziennej komunikacji. Program dopasowuję do Twojego tempa życia,
          celów oraz aktualnego poziomu – bez stresu, szkolnego oceniania i w
          przyjaznej atmosferze.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Skontaktuj się
          </NuxtLink>
          <NuxtLink :to="ROUTES.pricesIndividual"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/photos/dorosli-hero-800.webp" srcset="
            /photos/dorosli-hero-400.webp   400w,
            /photos/dorosli-hero-800.webp   800w,
            /photos/dorosli-hero-1200.webp 1200w
          " sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
          alt="Dorosły kursant podczas lekcji języka angielskiego" class="h-full w-full object-cover" width="800"
          height="800" loading="eager" />
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
            chaosu, jasny plan i język, którego naprawdę użyją. Dlatego już od
            początku patrzymy na efekt: co chcesz powiedzieć po angielsku za
            kilka tygodni i w jakich sytuacjach ma Ci to pomóc.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Powrót do angielskiego
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Spokojnie odświeżamy podstawy, uzupełniamy braki i budujemy
              regularność bez szkolnej presji.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Swobodna rozmowa
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Pracujemy nad mówieniem, reakcjami w codziennych sytuacjach i
              przełamywaniem bariery językowej.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Angielski do pracy i podróży
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Dobieramy tematy, słownictwo i zadania do realnych sytuacji:
              spotkań, wyjazdów, maili i rozmów.
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
          Zajęcia prowadzę indywidualnie lub w duetach (w parze), co pozwala w
          pełni dopasować formę pracy do potrzeb i celów ucznia. Lekcje mogą
          odbywać się stacjonarnie w moim studio w Rumi lub w wygodnej formie
          online. Każda lekcja jest starannie zaplanowana pod kątem tematyki
          oraz tempa nauki, tak aby wspierać rozwój kompetencji językowych w
          obszarach najważniejszych dla ucznia - w życiu codziennym lub
          zawodowym.
          <br /><br />
          Podczas zajęć koncentrujemy się na praktycznym użyciu języka,
          naturalnej komunikacji oraz jasnym wyjaśnianiu zagadnień. Dzięki
          spokojnej, wspierającej atmosferze uczniowie stopniowo przełamują
          barierę językową i budują pewność w swobodnym posługiwaniu się
          angielskim.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul class="space-y-4">
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Swobodniej zaczynasz i podtrzymujesz rozmowę
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Używasz słownictwa potrzebnego w pracy, podróży i codzienności
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Rozumiesz gramatykę bez szkolnego chaosu
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Uczysz się w tempie dopasowanym do dorosłego życia
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Masz przestrzeń na błędy bez presji i oceniania
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Możesz uczyć się stacjonarnie w Rumi albo online
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Ceny
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ile kosztuje angielski dla dorosłych?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Koszt zajęć zależy od liczby lekcji w pakiecie oraz wybranej formy
            nauki - indywidualnie lub w parze. Dzięki elastycznej ofercie możesz
            dopasować kurs do swojego tempa nauki, celów oraz możliwości
            finansowych.
          </p>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Jeśli wygodniejsza jest dla Ciebie nauka z domu,
            <NuxtLink :to="ROUTES.onlineClasses" class="font-medium text-primary underline-offset-4 hover:underline">
              zobacz zajęcia online
            </NuxtLink>
            - dostępny jest też poranny wariant cenowy do godziny
            {{ morningOnlinePromotion.deadlineHour }}.
          </p>
          <NuxtLink :to="ROUTES.pricesIndividual"
            class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz pełny cennik
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <article v-for="option in landingPriceOptions" :key="option.name"
            class="flex min-h-[20rem] flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div class="flex flex-wrap gap-2">
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {{ option.frequency }}
              </span>
              <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {{ option.duration }}
              </span>
            </div>
            <h3 class="mt-4 font-serif text-xl font-semibold text-foreground">
              {{ option.name }}
            </h3>
            <div class="mt-4 border-t border-border pt-4">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Cena za lekcję
              </p>
              <p class="mt-1 font-serif text-2xl font-semibold text-primary">
                <span v-if="option.displayPrefix">{{ option.displayPrefix }}
                </span>
                {{ option.displayPrice }}
              </p>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ option.displayPriceContext }}
              </p>
            </div>
            <div class="mt-4 rounded-xl bg-muted px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Płatność
              </p>
              <p v-for="line in option.paymentLines" :key="line"
                class="mt-1 text-sm font-semibold leading-relaxed text-foreground">
                {{ line }}
              </p>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              {{ option.details }}
            </p>
          </article>
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
            Porozmawiajmy o Twoim angielskim!
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Napisz, do czego potrzebujesz języka, a wspólnie ułożymy spokojny
            plan dopasowany do Twojego celu i czasu, którym dysponujesz.
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
