<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.eighthGradeExam
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('eighthGradeExam')
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

const priceDetailLine = (plan, payment = plan.price) => ({
  payment,
  totalPrice: plan.priceDetails?.totalPrice ?? plan.price,
})

const landingPriceOptions = [
  {
    ...examGroup,
    displayPrice: examGroup.fromPrice,
    displayPriceContext: examGroup.fromPriceContext,
    paymentLines: [
      priceDetailLine(
        examGroup,
        `standardowo: ${personPrice(paymentWithoutPrefix(examGroup.paymentNote))}`,
      ),
      {
        payment: `przy zapisie do ${examEarlyBirdPromotion.deadline}: ${personPrice(
          examEarlyBirdPromotion.paymentNote,
        )}`,
        totalPrice: examEarlyBirdPromotion.promoTotalPrice,
      },
    ],
  },
  {
    ...individualAnnualIntense,
    name: 'Pakiety 1:1',
    frequency: '24/32/64 lekcje',
    displayPrefix: 'od',
    displayPrice: individualAnnualIntense.fromPrice,
    displayPriceContext: individualAnnualIntense.fromPriceContext,
    paymentLines: [
      priceDetailLine(miniIndividual, `24 lekcje: ${miniIndividual.price}`),
      priceDetailLine(
        individualAnnualStandard,
        `32 lekcje: ${paymentWithoutPrefix(individualAnnualStandard.paymentNote)}`,
      ),
      priceDetailLine(
        individualAnnualIntense,
        `64 lekcje: ${paymentWithoutPrefix(individualAnnualIntense.paymentNote)}`,
      ),
    ],
    details:
      'Pakiet MINI, Standard lub Intense dla uczniów, którzy potrzebują indywidualnego przygotowania do egzaminu.',
  },
  {
    ...occasionalIndividual,
    displayPrice: occasionalIndividual.price,
    displayPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: [
      priceDetailLine(occasionalIndividual, 'płatność za pojedynczą lekcję'),
    ],
  },
]
const examGroupPrice = `${personPrice(examGroup.fromPrice)} ${examGroup.fromPriceContext}`
const examGroupPayment = personPrice(
  paymentWithoutPrefix(examGroup.paymentNote),
)
const individualAnnualPrice = `${individualAnnualIntense.fromPrice} ${individualAnnualIntense.fromPriceContext}`
const examPriceFaqAnswer = `Grupowy kurs egzaminacyjny ma stałą cenę ${examGroupPrice}. Miesięczna płatność w standardowej cenie to ${examGroupPayment}, a przy zapisie do ${examEarlyBirdPromotion.deadline} rata jest obniżona do ${examEarlyBirdPromotion.installmentPrice} za osobę. Przy wyborze pakietu rocznego 1:1 cena w przeliczeniu zaczyna się od ${individualAnnualPrice}.`

const faqs = [
  {
    q: 'Ile kosztuje przygotowanie do egzaminu ósmoklasisty?',
    a: examPriceFaqAnswer,
  },
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
const openPriceDetailsId = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const isOccasionalPriceOption = (option) => option.id.startsWith('occasional')

const isPriceDetailsOpen = (optionId) => openPriceDetailsId.value === optionId

const togglePriceDetails = (optionId) => {
  openPriceDetailsId.value = isPriceDetailsOpen(optionId) ? null : optionId
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
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:pb-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Egzamin ósmoklasisty
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Egzamin ósmoklasisty bez stresu? To możliwe!
        </h1>
        <p class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Kursy przygotowawcze dopasowane do Twoich potrzeb prowadzone w studiu
          w Rumi lub online - ucz się indywidualnie, w duecie z przyjacielem lub
          przyjaciółką albo w małej, kameralnej grupie (do 4 osób).<br /><br />
          Stawiam na systematyczność i regularne powtórki, dzięki czemu
          uczniowie płynnie przyswajają wiedzę i oswajają formułę tego testu.
          Razem pracujemy na wysoki wynik, dbając jednocześnie o to, by ten
          ważny dzień był dla nastolatka spokojnym podsumowaniem jego sukcesów,
          a nie źródłem lęku.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Skontaktuj się
          </NuxtLink>
          <NuxtLink :to="ROUTES.pricesExam"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/photos/egzamin-osmoklasisty-hero-800.webp" srcset="
            /photos/egzamin-osmoklasisty-hero-400.webp   400w,
            /photos/egzamin-osmoklasisty-hero-800.webp   800w,
            /photos/egzamin-osmoklasisty-hero-1200.webp 1200w
          " sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
          alt="Materiały i notatki do nauki angielskiego przed egzaminem ósmoklasisty"
          class="h-full w-full object-cover" width="800" height="800" loading="eager" />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Co obejmuje przygotowanie?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Program zajęć oraz metody pracy dobieram indywidualnie do potrzeb
            każdego ucznia lub grupy, biorąc pod uwagę poziom startowy, termin
            egzaminu i zagadnienia, które wymagają najwięcej powtórek. Dzięki
            temu nauka nie jest chaotyczna, lecz prowadzi - od wstępnej diagnozy
            - do coraz pewniejszego i samodzielnego rozwiązywania zadań.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Arkusze i typy zadań bez stresu
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Od pierwszych zajęć pracujemy na autentycznych zadaniach w
              formacie egzaminacyjnym. Ćwiczymy czytanie, słuchanie, środki i
              funkcje językowe oraz wypowiedź pisemną, dzięki czemu uczeń
              dokładnie wie, czego się spodziewać na egzaminie.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Skuteczne strategie egzaminacyjne
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Uczę, jak krok po kroku rozwiązywać zadania, dobrze analizować
              polecenia i świadomie zarządzać czasem. Pokazuję sprawdzone metody
              eliminowania błędnych odpowiedzi oraz skutecznego sprawdzania
              arkusza przed oddaniem.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Uporządkowana gramatyka i słownictwo
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Porządkujemy i utrwalamy najważniejsze struktury oraz słownictwo
              wymagane na egzaminie. Uczniowie uczą się, jak wykorzystać swoją
              wiedzę w praktyce i zdobywać maksymalną liczbę punktów.
            </p>
          </article>
        </div>
        <div class="max-w-3xl">
          <p class="pt-8 text-pretty leading-relaxed text-muted-foreground">
            Efekt? Uczeń podchodzi do egzaminu spokojnie, świadomy swoich
            umiejętności i dobrze przygotowany - bez stresu, za to z realną
            szansą na wysoki wynik.
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
          Dla uczniów klas 7 i 8, którzy chcą dobrze przygotować się do egzaminu
          ósmoklasisty z języka angielskiego i podejść do niego bez stresu. To
          idealne rozwiązanie zarówno dla osób, które chcą nadrobić zaległości,
          jak i dla tych, które celują w wysoki wynik i większą pewność w pracy
          z arkuszem egzaminacyjnym.
        </p>
      </div>

      <div class="mt-14 max-w-3xl">
        <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Jak wyglądają zajęcia?
        </h2>
      </div>

      <ol class="mt-10 grid gap-5 md:grid-cols-2">
        <li class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              1
            </span>
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Diagnoza poziomu
            </h3>
          </div>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Na początku sprawdzam poziom ucznia oraz obszary wymagające pracy,
            aby dopasować materiały i tempo nauki.
          </p>
        </li>
        <li class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              2
            </span>
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Praca na zadaniach egzaminacyjnych
            </h3>
          </div>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Regularnie ćwiczymy zadania w formacie egzaminu ósmoklasisty,
            oswajając się z jego strukturą i wymaganiami.
          </p>
        </li>
        <li class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              3
            </span>
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Powtórki w praktyce
            </h3>
          </div>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Gramatyka i słownictwo są utrwalane w trakcie pracy z zadaniami,
            dzięki czemu wiedza jest od razu stosowana w praktyce.
          </p>
        </li>
        <li class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              4
            </span>
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Ćwiczenie wypowiedzi pisemnych
            </h3>
          </div>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Tworzymy krótkie formy pisemne i omawiamy je z jasną informacją
            zwrotną, co pozwala szybko poprawiać błędy i robić postępy.
          </p>
        </li>
      </ol>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Ceny
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ile kosztuje przygotowanie do egzaminu ósmoklasisty?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cena kursu zależy od liczby uczestników oraz wybranej liczby lekcji
            w pakiecie. Oferuję warianty, które pozwalają dopasować formę oraz
            intensywność zajęć do indywidualnych potrzeb ucznia. Harmonogram
            układam tak, aby bez pośpiechu zrealizować cały materiał przed
            egzaminem.
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
              <p v-if="isOccasionalPriceOption(option)"
                class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Szczegóły ceny
              </p>
              <button v-else type="button"
                class="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold leading-none text-primary transition-colors hover:text-foreground"
                :aria-expanded="isPriceDetailsOpen(option.id)" :aria-controls="`exam-price-details-${option.id}`"
                @click="togglePriceDetails(option.id)">
                <span>Szczegóły ceny</span>
                <svg class="h-3.5 w-3.5 shrink-0 translate-y-px transition-transform"
                  :class="{ 'rotate-180': isPriceDetailsOpen(option.id) }" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div :id="`exam-price-details-${option.id}`"
                v-show="isOccasionalPriceOption(option) || isPriceDetailsOpen(option.id)"
                class="mt-1 space-y-1.5 text-xs leading-snug text-muted-foreground">
                <div v-for="line in option.paymentLines" :key="line.payment" class="space-y-0.5">
                  <p>
                    <span class="font-medium text-foreground/75">
                      Płatność:
                    </span>
                    {{ line.payment }}
                  </p>
                  <p v-if="line.totalPrice">
                    <span class="font-medium text-foreground/75">
                      Cena całkowita:
                    </span>
                    {{ line.totalPrice }}
                  </p>
                </div>
              </div>
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
