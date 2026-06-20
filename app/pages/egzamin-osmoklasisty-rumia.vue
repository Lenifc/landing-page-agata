<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.eighthGradeExam
const pageUrl = `${SITE_URL}${pageRoute}`

const focusAreas = [
  {
    title: 'Arkusze i typy zadań bez stresu',
    body: `Od pierwszych zajęć pracujemy na autentycznych zadaniach w formacie egzaminacyjnym.
Ćwiczymy czytanie, słuchanie, środki i funkcje językowe oraz wypowiedź pisemną, dzięki czemu
uczeń dokładnie wie, czego się spodziewać na egzaminie.`,
  },
  {
    title: 'Skuteczne strategie egzaminacyjne',
    body: `Uczę, jak krok po kroku rozwiązywać zadania, dobrze analizować polecenia i świadomie
zarządzać czasem. Pokazuję sprawdzone metody eliminowania błędnych odpowiedzi oraz
skutecznego sprawdzania arkusza przed oddaniem.`,
  },
  {
    title: 'Uporządkowana gramatyka i słownictwo',
    body: `Porządkujemy i utrwalamy najważniejsze struktury oraz słownictwo wymagane na egzaminie.
Uczniowie uczą się, jak wykorzystać swoją wiedzę w praktyce i zdobywać maksymalną liczbę
punktów.`,
  },
]

const steps = [
  {
    title: 'Diagnoza poziomu',
    body: 'Na początku sprawdzam poziom ucznia oraz obszary wymagające pracy, aby dopasować materiały i tempo nauki.',
  },
  {
    title: 'Praca na zadaniach egzaminacyjnych',
    body: 'Regularnie ćwiczymy zadania w formacie egzaminu ósmoklasisty, oswajając się z jego strukturą i wymaganiami.',
  },
  {
    title: 'Powtórki w praktyce',
    body: 'Gramatyka i słownictwo są utrwalane w trakcie pracy z zadaniami, dzięki czemu wiedza jest od razu stosowana w praktyce.',
  },
  {
    title: 'Ćwiczenie wypowiedzi pisemnych',
    body: 'Tworzymy krótkie formy pisemne i omawiamy je z jasną informacją zwrotną, co pozwala szybko poprawiać błędy i robić postępy.',
  },
]

const priceOptions = getPricingPlans('eighthGradeExam')

const faqs = [
  {
    q: 'Kiedy najlepiej zacząć przygotowania do egzaminu ósmoklasisty?',
    a: `Im wcześniej, tym spokojniej i skuteczniej. Najlepszy moment to 7. klasa lub początek 8. klasy –
daje to czas na spokojne poznanie poziomu ucznia, systematyczne powtórki oraz regularną
pracę z arkuszami egzaminacyjnymi.\n
Jeśli do egzaminu pozostało niewiele czasu, spokojnie – układam intensywny plan pracy i
skupiam się z uczniem na najważniejszych typach zadań oraz kluczowych zagadnieniach
egzaminacyjnych, tak aby maksymalnie wykorzystać każdy pozostały tydzień.`,
  },
  {
    q: 'Czy zajęcia pomagają też przy zaległościach szkolnych?',
    a: `Tak, jak najbardziej. Egzamin ósmoklasisty sprawdza materiał z całej szkoły podstawowej,
dlatego przygotowanie do niego naturalnie łączymy z nadrabianiem zaległości. Wracamy do
podstaw gramatyki, uzupełniamy słownictwo i wspólnie przerabiamy te tematy, które sprawiają
uczniowi najwięcej trudności na bieżących lekcjach w szkole. Dzięki temu oceny również idą w
górę!`,
  },
  {
    q: 'Czy uczeń dostaje informację zwrotną po wykonaniu zadań?',
    a: `Oczywiście! Informacja zwrotna to istotny element moich zajęć. Dokładnie omawiamy wykonane
zadania i analizujemy popełnione błędy. Dzięki temu uczeń zawsze wie, które zagadnienia już
opanował, a nad czym powinien jeszcze popracować.`,
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

useSeoMeta({
  title: 'Egzamin ósmoklasisty z angielskiego w Rumi',
  description:
    'Zajęcia przygotowujące do egzaminu ósmoklasisty z angielskiego w Rumi: arkusze, strategie, gramatyka, słownictwo i spokojne powtórki.',
  ogTitle: 'Egzamin ósmoklasisty z języka angielskiego | Talkateria',
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
        pageName: 'Egzamin ósmoklasisty z angielskiego w Rumi',
        pageDescription:
          'Zajęcia przygotowujące do egzaminu ósmoklasisty z angielskiego w Rumi: arkusze, strategie, gramatyka, słownictwo i spokojne powtórki.',
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
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:pb-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Egzamin ósmoklasisty
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Egzamin ósmoklasisty bez stresu? To możliwe!
        </h1>
        <p class="text-pretty text-lg leading-relaxed text-muted-foreground">
          Kursy przygotowawcze dopasowane do Twoich potrzeb prowadzone w studiu w Rumi lub online - ucz się
          indywidualnie,
          w duecie z przyjacielem lub przyjaciółką albo w małej, kameralnej grupie (do 4 osób). Stawiamy
          na systematyczność i regularne powtórki, dzięki czemu uczniowie płynnie przyswajają wiedzę i
          oswajają formułę tego testu. Razem pracujemy na wysoki wynik, dbając jednocześnie o to, by
          ten ważny dzień był dla nastolatka spokojnym podsumowaniem jego sukcesów, a nie źródłem
          lęku.
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
            Program zajęć oraz metody pracy dobieram indywidualnie do potrzeb każdego ucznia lub grupy,
            biorąc pod uwagę poziom startowy, termin egzaminu i zagadnienia, które wymagają najwięcej
            powtórek. Dzięki temu nauka nie jest chaotyczna, lecz prowadzi - od wstępnej diagnozy - do
            coraz pewniejszego i samodzielnego rozwiązywania zadań.
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
        <div class="max-w-3xl">
          <p class="pt-8 text-pretty leading-relaxed text-muted-foreground">
            Efekt? Uczeń podchodzi do egzaminu spokojnie, świadomy swoich umiejętności i dobrze
            przygotowany - bez stresu, za to z realną szansą na wysoki wyni
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div class="max-w-3xl">
        <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Dla kogo przeznaczone są zajęcia?
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Dla uczniów klas 7 i 8, którzy chcą dobrze przygotować się do egzaminu ósmoklasisty z języka
          angielskiego i podejść do niego bez stresu. To idealne rozwiązanie zarówno dla osób, które
          chcą nadrobić zaległości, jak i dla tych, które celują w wysoki wynik i większą pewność w pracy
          z arkuszem egzaminacyjnym.
        </p>
      </div>

      <div class="mt-14 max-w-3xl">
        <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Jak wyglądają zajęcia?
        </h2>
      </div>

      <ol class="mt-10 grid gap-5 md:grid-cols-2">
        <li v-for="(step, index) in steps" :key="step.title"
          class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              {{ index + 1 }}
            </span>
            <h3 class="font-serif text-xl font-semibold text-foreground">
              {{ step.title }}
            </h3>
          </div>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {{ step.body }}
          </p>
        </li>
      </ol>
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
              Cena kursu zależy od liczby uczestników oraz wybranej liczby lekcji w pakiecie. Oferuję
              warianty, które pozwalają dopasować formę oraz intensywność zajęć do indywidualnych potrzeb
              ucznia. Harmonogram układam tak, aby bez pośpiechu zrealizować cały materiał przed
              egzaminem.
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
            class="whitespace-pre-line pb-6 text-pretty leading-relaxed text-muted-foreground">
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
