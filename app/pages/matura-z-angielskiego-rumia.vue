<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.maturaExam
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('maturaExam')
const getPriceOption = (id) => priceOptions.find((option) => option.id === id)
const examGroup = getPriceOption('examGroup')
const individualAnnualStandard = priceOptions.find(
  (option) => option.id === 'individualAnnualWeekly',
)
const individualAnnualIntense = priceOptions.find(
  (option) => option.id === 'individualAnnualTwiceWeekly',
)
const miniIndividual = getPriceOption('miniIndividual')
const occasionalIndividual = getPriceOption('occasionalIndividual')
const examEarlyBirdPromotion = getPricingPromotion('examEarlyBird')
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const paymentWithoutPrefix = (value) => value.replace(/^miesięcznie:\s*/, '')
const formatPriceValue = (value) => {
  const formatted = value.toFixed(2).replace('.', ',')
  return `${formatted.endsWith(',00') ? formatted.slice(0, -3) : formatted} zł`
}

const lessonPriceFromInstallments = (plan) => {
  const installments = Number.parseInt(plan.price, 10)
  const lessons = Number.parseInt(plan.frequency, 10)

  return formatPriceValue((installments * Number(plan.schemaPrice)) / lessons)
}

const landingPriceOptions = [
  {
    ...examGroup,
    displayPrice: examGroup.fromPrice,
    displayPriceContext: examGroup.fromPriceContext,
    paymentLines: [
      `standardowo: ${personPrice(paymentWithoutPrefix(examGroup.paymentNote))}`,
      `promocja do ${examEarlyBirdPromotion.deadline}: ${personPrice(
        examEarlyBirdPromotion.paymentNote,
      )}`,
    ],
  },
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
      'Pakiet roczny Standard lub Intense dla maturzystów, którzy potrzebują indywidualnego przygotowania do egzaminu.',
  },
  {
    ...miniIndividual,
    displayPrice: lessonPriceFromInstallments(miniIndividual),
    displayPriceContext: `za lekcję ${miniIndividual.duration}`,
    paymentLines: [miniIndividual.price],
  },
  {
    ...occasionalIndividual,
    displayPrice: occasionalIndividual.price,
    displayPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: ['płatność za pojedynczą lekcję'],
  },
]
const examGroupPrice = `${personPrice(examGroup.fromPrice)} ${examGroup.fromPriceContext}`
const examGroupPayment = personPrice(
  paymentWithoutPrefix(examGroup.paymentNote),
)
const individualAnnualPrice = `${individualAnnualIntense.fromPrice} ${individualAnnualIntense.fromPriceContext}`

const faqs = [
  {
    q: 'Ile kosztuje przygotowanie do matury z angielskiego?',
    a: `Grupowy kurs maturalny ma stałą cenę ${examGroupPrice}. Miesięczna płatność w standardowej cenie to ${examGroupPayment}, a promocja do ${examEarlyBirdPromotion.deadline} obniża ratę do ${examEarlyBirdPromotion.installmentPrice} za osobę. Przy wyborze pakietu rocznego 1:1 cena w przeliczeniu zaczyna się od ${individualAnnualPrice}.`,
  },
  {
    q: 'Czy przygotowanie obejmuje poziom podstawowy i rozszerzony?',
    a: `Tak, jak najbardziej. Przygotowuję do matury pisemnej zarówno na poziomie podstawowym,
jak i rozszerzonym, a także do obowiązkowego egzaminu ustnego. Na zajęciach przerabiamy
niezbędne pewniaki egzaminacyjne, oswajamy strukturę arkuszy oraz ćwiczymy tworzenie
wypowiedzi pisemnych i swobodne mówienie, dzięki czemu na egzamin idziesz z pełnym
spokojem.`,
  },
  {
    q: 'Czy na zajęciach są sprawdzane prace pisemne i ćwiczone konwersacje?',
    a: 'Tak. Sprawdzamy wypowiedzi pisemne z informacją zwrotną: treść, spójność, słownictwo, gramatykę i typowe miejsca utraty punktów. Na zajęciach ćwiczymy też konwersacje, reagowanie językowe i swobodniejsze mówienie po angielsku.',
  },
  {
    q: 'Czy można zacząć przygotowanie w trakcie roku szkolnego?',
    a: `Tak, oba te elementy są kluczowe w przygotowaniu do matury. Regularnie ćwiczymy
konwersacje pod kątem egzaminu ustnego (np. opisywanie ilustracji czy rozmowa z
odgrywaniem roli), aby zyskać płynność i pewność siebie. Równie dużą wagę przykładamy do
form pisemnych – wspólnie analizujemy błędy i sprawdzamy Twoje teksty (takie jak e-maile,
wpisy na bloga czy rozprawki) pod kątem oficjalnych kryteriów oceniania arkusza
maturalnego.`,
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

useSeoMeta({
  title: 'Matura z angielskiego Rumia – przygotowanie',
  description:
    'Zajęcia przygotowujące do matury z angielskiego w Rumi: poziom podstawowy i rozszerzony dla uczniów z całej Polski.',
  ogTitle: 'Matura z angielskiego Rumia | Talkateria',
  ogDescription:
    'Kameralne lekcje przygotowujące do matury z angielskiego: arkusze, pisanie, mówienie, gramatyka i strategie egzaminacyjne.',
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
        pageName: 'Przygotowanie do matury z angielskiego w Rumi',
        pageDescription:
          'Zajęcia przygotowujące do matury z angielskiego w Rumi: poziom podstawowy i rozszerzony, arkusze, pisanie, mówienie oraz strategie egzaminacyjne.',
        serviceName: 'Przygotowanie do matury z angielskiego',
        serviceType: 'Przygotowanie do matury z języka angielskiego',
        serviceDescription:
          'Zajęcia przygotowujące do matury z języka angielskiego na poziomie podstawowym i rozszerzonym w Rumi.',
        priceOptions,
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'uczeń szkoły średniej',
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
          Egzamin maturalny
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Egzamin maturalny bez stresu? To możliwe!
        </h1>
        <p class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Kursy przygotowawcze dopasowane do Twoich potrzeb. Przygotowuję
          kompleksowo do matury na poziomie podstawowym oraz rozszerzonym, a
          także do egzaminu ustnego w studiu w Rumi lub online. Ucz się
          indywidualnie, w duecie z przyjacielem lub przyjaciółką albo w małej,
          kameralnej grupie (do 4 osób).<br /><br />
          Stawiam na systematyczność, zrozumienie wymagań egzaminacyjnych i
          regularną praktykę, dzięki czemu płynnie opanujesz wymagany materiał,
          przełamiesz barierę językową i w pełni oswoisz formułę arkuszy CKE.
          <br /><br />
          Razem pracujemy na wysoki wynik, który otworzy Ci drzwi na wymarzone
          studia. Dbam o to, by egzamin dojrzałości był dla Ciebie spokojnym
          podsumowaniem Twojej wiedzy i pewnym krokiem w przyszłość, a nie
          źródłem paraliżującego lęku.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Skontaktuj się
          </NuxtLink>
          <NuxtLink :to="ROUTES.pricesExam"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Sprawdź cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/photos/matura-hero-800.webp" srcset="
            /photos/matura-hero-400.webp   400w,
            /photos/matura-hero-800.webp   800w,
            /photos/matura-hero-1200.webp 1200w
          " sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
          alt="Uczniowie rozwiązujący zadania podczas przygotowań do matury z angielskiego"
          class="h-full w-full object-cover" width="800" height="800" loading="eager" />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Kompleksowe przygotowanie do matury z angielskiego
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Zapraszam zarówno tegorocznych maturzystów, jak i uczniów, którzy
            maturę zdają dopiero za rok i chcą już teraz spokojnie rozpocząć
            przygotowania. Dobieram metody nauki i typy zadań indywidualnie do
            ucznia lub grupy, aby maksymalnie wykorzystać potencjał i pozwolić
            uczniom osiągnąć jak najlepszy wynik.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Praca na arkuszach
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Uczniowie dokładnie poznają strukturę egzaminu i rozwiązują
              zadania z poprzednich lat. Wspólnie analizujemy błędy i na bieżąco
              wyjaśniam, z czego one wynikają. Dzięki temu uczniowie doskonale
              wiedzą, czego się spodziewać i nic ich nie zaskoczy.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Strategie egzaminacyjne
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Pokażę, jak radzić sobie z pułapkami CKE, skutecznie zarządzać
              czasem i unikać błędów, które najczęściej zabierają punkty.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Mówienie
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Przełamujemy barierę językową i ćwiczymy płynną argumentację, aby
              egzamin ustny minął bez stresu i z pełną swobodą.
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
          Zajęcia odbywają się indywidualnie, w duecie lub w małych, kameralnych
          grupach do 4 osób, co pozwala na pełne dopasowanie tempa i sposobu
          pracy do potrzeb każdego ucznia. Podczas lekcji stawiamy na aktywne
          działanie i zero teorii do szuflady - duży nacisk kładę na praktyczną
          naukę, systematyczne powtórki oraz bieżące omawianie pracy. Nie tylko
          wspólnie rozwiązujemy zadania, ale od razu wyjaśniamy każdą
          wątpliwość. Dzięki stałej informacji zwrotnej cały proces jest
          maksymalnie uporządkowany, uczeń dokładnie wie, na czym stoi, a jego
          postępy są jasno widoczne z lekcji na lekcję.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ul class="space-y-4">
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Lepiej rozumiesz nagrania i teksty pod wymagania CKE
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Wiesz, które pułapki gramatyczne najczęściej zabierają punkty
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Piszesz prace zgodne z kryteriami, z konkretną informacją zwrotną
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Mówisz pełniejszymi zdaniami i swobodniej argumentujesz
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              Masz plan działania na arkusz, zamiast działać przypadkowo
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
            Ile kosztuje przygotowanie do matury z angielskiego?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Koszt kursu zależy od wybranej formy zajęć (lekcje 1:1, w duecie lub
            w mini grupie) oraz od całkowitej liczby godzin w danym pakiecie.
            Harmonogram zawsze układamy tak, aby bez pośpiechu zrealizować
            wszystkie zaplanowane lekcje i cały niezbędny materiał jeszcze przed
            samym egzaminem.
          </p>
          <NuxtLink :to="ROUTES.pricesExam"
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
        Mini FAQ o maturze z angielskiego
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index" :aria-controls="`matura-faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
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
          <p :id="`matura-faq-answer-${index}`" v-show="openFaqIndex === index"
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
            Potrzebujesz pomocy w przygotowaniu do matury?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Napisz do mnie, czy przygotowujesz się do poziomu podstawowego czy
            rozszerzonego oraz ile czasu zostało Ci do egzaminu. Wspólnie
            dobierzemy sensowny rytm pracy, który pozwoli Ci powtórzyć cały
            materiał, oswoić arkusze i podejść do matury z pełnym spokojem.
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
