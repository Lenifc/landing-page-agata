<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.schoolSupport
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('schoolSupport')
const getPriceOption = (id) => priceOptions.find((option) => option.id === id)
const individualAnnualStandard = priceOptions.find(
  (option) => option.id === 'individualAnnualWeekly',
)
const individualAnnualIntense = priceOptions.find(
  (option) => option.id === 'individualAnnualTwiceWeekly',
)
const duoAnnualStandard = priceOptions.find(
  (option) => option.id === 'duoAnnualWeekly',
)
const duoAnnualIntense = priceOptions.find(
  (option) => option.id === 'duoAnnualTwiceWeekly',
)
const miniIndividual = getPriceOption('miniIndividual')
const miniDuo = getPriceOption('miniDuo')
const occasionalIndividual = getPriceOption('occasionalIndividual')
const occasionalDuo = getPriceOption('occasionalDuo')
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const priceWithContext = (plan) =>
  `${personPrice(plan.fromPrice)} ${plan.fromPriceContext}`
const paymentWithoutPrefix = (value) => value.replace(/^miesięcznie:\s*/, '')

const priceDetailLine = (plan, payment = plan.price) => ({
  payment,
  totalPrice: plan.priceDetails?.totalPrice ?? plan.price,
})

const landingPriceOptions = [
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
      'Pakiet MINI, Standard lub Intense dla uczniów i studentów, którzy potrzebują regularnego, spokojnego wsparcia w bieżącym materiale.',
  },
  {
    ...duoAnnualIntense,
    name: 'Pakiety DUO',
    frequency: '24/32/64 lekcje',
    displayPrefix: 'od',
    displayPrice: duoAnnualIntense.fromPrice,
    displayPriceContext: duoAnnualIntense.fromPriceContext,
    paymentLines: [
      priceDetailLine(miniDuo, `24 lekcje: ${miniDuo.price}`),
      priceDetailLine(
        duoAnnualStandard,
        `32 lekcje: ${paymentWithoutPrefix(duoAnnualStandard.paymentNote)}`,
      ),
      priceDetailLine(
        duoAnnualIntense,
        `64 lekcje: ${paymentWithoutPrefix(duoAnnualIntense.paymentNote)}`,
      ),
    ],
    details:
      'Pakiet MINI, Standard lub Intense dla dwóch osób o podobnym poziomie, które chcą wspólnie nadrabiać materiał i ćwiczyć komunikację.',
  },
  {
    ...occasionalIndividual,
    displayPrice: occasionalIndividual.price,
    displayPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: [
      priceDetailLine(occasionalIndividual, 'płatność za pojedynczą lekcję'),
    ],
  },
  {
    ...occasionalDuo,
    displayPrice: occasionalDuo.price,
    displayPriceContext: `za lekcję ${occasionalDuo.duration}`,
    paymentLines: [
      priceDetailLine(occasionalDuo, 'płatność za pojedynczą lekcję'),
    ],
  },
]
const individualAnnualPrice = priceWithContext(individualAnnualIntense)
const duoAnnualPrice = priceWithContext(duoAnnualIntense)

const faqs = [
  {
    q: 'Dla kogo są korepetycje z angielskiego?',
    a: 'Korepetycje kieruję do uczniów od klasy 6 szkoły podstawowej, uczniów szkół ponadpodstawowych oraz studentów. Pomagam zarówno przy bieżącym materiale, jak i przy nadrabianiu zaległości, przygotowaniu do sprawdzianów, kartkówek oraz zaliczeń.',
  },
  {
    q: 'Czy korepetycje pomagają przy gramatyce i słownictwie?',
    a: 'Tak. Podczas lekcji spokojnie wyjaśniam trudniejsze zagadnienia, porządkuję gramatykę, utrwalam słownictwo i pokazuję, jak używać materiału w praktyce. Pracujemy tak, aby uczeń rozumiał, z czego wynikają odpowiedzi, a nie tylko uczył się ich na pamięć.',
  },
  {
    q: 'Czy można przygotować się do sprawdzianu lub kartkówki?',
    a: 'Tak. Możemy skupić się na konkretnym dziale, powtórzyć wymagane struktury, przećwiczyć typowe zadania i omówić błędy, które najczęściej pojawiają się w pracach szkolnych. Przy większych zaległościach układam też spokojny plan nadrabiania materiału.',
  },
  {
    q: 'Czy zajęcia mogą odbywać się w parze?',
    a: 'Tak, jeśli dwie osoby mają podobny poziom i zbliżone potrzeby. DUO dobrze sprawdza się u kolegów lub koleżanek z klasy, którzy chcą wspólnie nadrabiać materiał, ćwiczyć rozmowę i motywować się do systematycznej pracy.',
  },
  {
    q: 'Czy oferta jest skierowana także dla uczniów szkół wyższych?',
    a: 'Tak. Studenci mogą pracować nad materiałem z zajęć, gramatyką, słownictwem specjalistycznym na poziomie dopasowanym do potrzeb albo przygotowaniem do zaliczenia. Zakres ustalam indywidualnie po krótkiej rozmowie o celu i wymaganiach.',
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
  title: 'Korepetycje z angielskiego Rumia',
  description:
    'Wsparcie w materiale szkolnym z angielskiego w Rumi i online dla uczniów od 6 klasy, szkół ponadpodstawowych oraz studentów. Materiał szkolny, sprawdziany i zaległości.',
  ogTitle: 'Korepetycje z angielskiego w Rumi | Talkateria',
  ogDescription:
    'Wsparcie w materiale szkolnym z angielskiego: gramatyka, słownictwo, sprawdziany, zaległości i większa pewność siebie.',
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
        pageName: 'Korepetycje z angielskiego w Rumi',
        pageDescription:
          'Wsparcie w materiale szkolnym z angielskiego w Rumi i online dla uczniów od 6 klasy szkoły podstawowej, uczniów szkół ponadpodstawowych oraz studentów.',
        serviceName: 'Korepetycje z angielskiego',
        serviceType: 'Korepetycje z języka angielskiego',
        serviceDescription:
          'Indywidualne i kameralne zajęcia z języka angielskiego pomagające uczniom i studentom lepiej rozumieć bieżący materiał, nadrabiać zaległości oraz przygotowywać się do sprawdzianów i zaliczeń.',
        priceOptions,
        audience: [
          {
            '@type': 'EducationalAudience',
            educationalRole: 'uczeń od klasy 6 szkoły podstawowej',
          },
          {
            '@type': 'EducationalAudience',
            educationalRole: 'uczeń szkoły ponadpodstawowej',
          },
          {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
          },
        ],
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
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:pb-24">
      <div class="space-y-6">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Pomoc w opanowaniu materiału szkolnego
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Korepetycje z angielskiego dla uczniów i studentów.
        </h1>
        <p class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Pomagam uporządkować materiał, nadrobić zaległości i spokojnie
          przygotować się do sprawdzianów, kartkówek, zaliczeń oraz egzaminów.
          To wsparcie dla uczniów od klasy 6 szkoły podstawowej, młodzieży i
          studentów, którzy potrzebują spokojnego uporządkowania gramatyki, słownictwa i bieżących tematów.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Zapytaj o pomoc w nauce
          </NuxtLink>
          <NuxtLink :to="ROUTES.pricesIndividual"
            class="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz cennik
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-hidden rounded-[2rem] border border-border shadow-sm">
        <img src="/photos/material-szkolny-800.webp" srcset="
            /photos/material-szkolny-400.webp   400w,
            /photos/material-szkolny-800.webp   800w,
            /photos/material-szkolny-1200.webp 1200w
          " sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
          alt="Uczeń odpoczywający nad książkami podczas nauki materiału szkolnego" class="h-full w-full object-cover"
          width="800" height="800" loading="eager" />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Kiedy takie zajęcia sprawdzają się najlepiej?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Gdy materiał zaczyna uciekać, oceny spadają albo przed sprawdzianem
            pojawia się chaos. Zajęcia pomagają odzyskać kontrolę nad nauką i
            pracować regularnie zamiast działać w ostatniej chwili.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Nadrabianie zaległości
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Bez pośpiechu wracamy do trudniejszych tematów, uzupełniamy braki i budujemy
              solidne podstawy do dalszej nauki.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Przygotowanie do sprawdzianów
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Wspólnie powtarzamy materiał, utrwalamy najważniejsze zagadnienia i rozwiewamy
              ostatnie wątpliwości, aby uczeń podszedł do sprawdzianu przygotowany i osiągnął jak najlepszy wynik.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Większa pewność siebie
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Systematyczna praca i zrozumienie materiału pomagają uczniowi odzyskać wiarę we
              własne możliwości i z większą motywacją podchodzić do nauki.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
      <div>
        <h2 class="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Każdy uczy się w swoim tempie
        </h2>
        <div class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            Nie zawsze łatwo nadążyć za materiałem z języka angielskiego. Czasem wystarczy dłuższa nieobecność w szkole,
            bardziej wymagający dział w podręczniku albo zbyt szybkie tempo pracy na lekcjach, by pojawiły się
            zaległości. Jeśli widzą Państwo, że dziecko zaczyna mieć trudności z gramatyką, słownictwem lub coraz
            bardziej stresuje się kartkówkami i sprawdzianami, chętnie pomogę. Wspieram również studentów, którzy chcą
            uporządkować wiedzę i spokojnie przygotować się do zaliczeń czy egzaminów.
          </p>
          <p>Na zajęciach tłumaczę zagadnienia w sposób prosty i zrozumiały, wracamy do tematów, które sprawiają
            trudność, uzupełniamy zaległości i utrwalamy bieżący materiał. Każdy uczy się inaczej, dlatego dopasowuję
            tempo i sposób pracy do indywidualnych potrzeb oraz poziomu ucznia lub studenta.</p>
          <p>
            Zależy mi na stworzeniu spokojnej i wspierającej atmosfery, w której można swobodnie zadawać pytania i
            popełniać błędy - bo to naturalna część nauki. Moim celem jest nie tylko poprawa ocen czy wyników na
            egzaminach, ale przede wszystkim sprawienie, aby angielski stał się bardziej zrozumiały i dawał większą
            pewność w codziennym korzystaniu z języka.
          </p>
        </div>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 class="font-serif text-xl font-semibold text-foreground">
          Dlaczego warto mi zaufać?
        </h3>
        <ul class="mt-5 space-y-4">
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              zajęcia dopasowuję do programu szkolnego i konkretnych trudności
              ucznia lub studenta,
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              tłumaczę materiał w prosty i zrozumiały sposób,
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              pomagam uporządkować wiedzę i systematycznie ją utrwalać,
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              wspieram w przygotowaniu do sprawdzianów, kartkówek i egzaminów,
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              tworzę przyjazną atmosferę, w której dziecko czuje się swobodnie i
              nie boi się zadawać pytań,
            </span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-pretty leading-relaxed text-muted-foreground">
              pomagam odzyskać pewność siebie i większy spokój w nauce.
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Zajęcia w duecie
          </span>
          <h2 class="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Nauka z kolegą lub koleżanką z klasy.
          </h2>
        </div>
        <div class="space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            Jeśli Państwa dziecko lepiej czuje się w towarzystwie kolegi lub
            koleżanki, istnieje możliwość nauki w duecie. To świetne rozwiązanie
            dla uczniów o podobnym poziomie zaawansowania i zbliżonych celach.
          </p>
          <p>
            Praca w parze sprzyja rozwijaniu umiejętności komunikacyjnych, daje
            więcej okazji do rozmowy i wzajemnej motywacji, a jednocześnie
            pozwala zachować indywidualny charakter zajęć. To dobra opcja dla
            osób z tej samej klasy, które chcą wspólnie nadrabiać materiał i
            rozwijać swoje umiejętności językowe.
          </p>
        </div>
      </div>
    </section>

    <section class="border-b border-border">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Ceny
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ile kosztują korepetycje z angielskiego?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cena zależy od formy nauki, liczby lekcji i tego, czy wybierasz
            zajęcia indywidualne czy w parze. Przy większych zaległościach albo
            regularnej pomocy szkolnej najlepiej sprawdzają się stałe spotkania,
            bo dają spokojny rytm pracy i widoczniejsze postępy.
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
              <p v-if="isOccasionalPriceOption(option)"
                class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Szczegóły ceny
              </p>
              <button v-else type="button"
                class="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold leading-none text-primary transition-colors hover:text-foreground"
                :aria-expanded="isPriceDetailsOpen(option.id)" :aria-controls="`school-price-details-${option.id}`"
                @click="togglePriceDetails(option.id)">
                <span>Szczegóły ceny</span>
                <svg class="h-3.5 w-3.5 shrink-0 translate-y-px transition-transform"
                  :class="{ 'rotate-180': isPriceDetailsOpen(option.id) }" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div :id="`school-price-details-${option.id}`" v-show="isOccasionalPriceOption(option) ||
                isPriceDetailsOpen(option.id)
                " class="mt-1 space-y-1.5 text-xs leading-snug text-muted-foreground">
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
        Mini FAQ o korepetycjach z angielskiego
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index" :aria-controls="`school-faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
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
          <p :id="`school-faq-answer-${index}`" v-show="openFaqIndex === index"
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
            Wspólnie zadbajmy o rozwój Państwa dziecka.
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
            Regularne zajęcia pomagają uzupełnić zaległości, lepiej zrozumieć
            materiał i odzyskać pewność siebie podczas lekcji w szkole. Chętnie
            doradzę, jaka forma wsparcia będzie najlepsza, i odpowiem na
            wszystkie pytania.
          </p>
          <NuxtLink :to="ROUTES.contact"
            class="mt-7 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
            Przejdź do kontaktu
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
