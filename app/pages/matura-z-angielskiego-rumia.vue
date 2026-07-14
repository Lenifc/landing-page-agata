<template>
  <main id="main-content">
    <PageHero
      eyebrow="Egzamin maturalny"
      title="Egzamin maturalny bez stresu? To możliwe!"
      image-src="/photos/matura-hero-800.webp"
      image-srcset="
        /photos/matura-hero-400.webp   400w,
        /photos/matura-hero-800.webp   800w,
        /photos/matura-hero-1200.webp 1200w
      "
      image-sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
      image-alt="Uczniowie rozwiązujący zadania podczas przygotowań do matury z angielskiego"
      image-width="800"
      image-height="800"
    >
      <template #description>
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
      </template>
      <template #actions>
        <UiButton :to="ROUTES.contact">Skontaktuj się</UiButton>
        <UiButton :to="ROUTES.pricesExam" variant="outline">
          Sprawdź cennik
        </UiButton>
      </template>
    </PageHero>

    <UiSection variant="secondary" border="y" padding="lg">
      <UiSectionHeader
        title="Kompleksowe przygotowanie do matury z angielskiego"
        max-width="3xl"
      >
        <template #description>
          Zapraszam zarówno tegorocznych maturzystów, jak i uczniów, którzy
          maturę zdają dopiero za rok i chcą już teraz spokojnie rozpocząć
          przygotowania. Dobieram metody nauki i typy zadań indywidualnie do
          ucznia lub grupy, aby maksymalnie wykorzystać potencjał i pozwolić
          uczniom osiągnąć jak najlepszy wynik.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="features" />
      </div>
    </UiSection>

    <UiSection padding="lg">
      <div class="grid gap-10 md:grid-cols-2">
        <UiSectionHeader title="Jak wyglądają zajęcia?" title-tag="h2" size="sm">
          <template #description>
            Zajęcia odbywają się indywidualnie, w duecie lub w małych, kameralnych
            grupach do 4 osób, co pozwala na pełne dopasowanie tempa i sposobu
            pracy do potrzeb każdego ucznia. Podczas lekcji stawiamy na aktywne
            działanie i zero teorii do szuflady - duży nacisk kładę na praktyczną
            naukę, systematyczne powtórki oraz bieżące omawianie pracy. Nie tylko
            wspólnie rozwiązujemy zadania, ale od razu wyjaśniam każdą
            wątpliwość. Dzięki stałej informacji zwrotnej cały proces jest
            maksymalnie uporządkowany, uczeń dokładnie wie, na czym stoi, a jego
            postępy są jasno widoczne z lekcji na lekcję.
          </template>
        </UiSectionHeader>
        <BulletList :items="lessonBenefits" />
      </div>
    </UiSection>

    <UiSection variant="secondary" border="y" padding="lg">
      <UiSectionHeader
        eyebrow="Ceny"
        title="Ile kosztuje przygotowanie do matury z angielskiego?"
        max-width="3xl"
      >
        <template #description>
          Koszt kursu zależy od wybranej formy zajęć (lekcje 1:1, w duecie lub
          w mini grupie) oraz od całkowitej liczby godzin w danym pakiecie.
          Harmonogram zawsze układamy tak, aby bez pośpiechu zrealizować
          wszystkie zaplanowane lekcje i cały niezbędny materiał jeszcze przed
          samym egzaminem.
        </template>
      </UiSectionHeader>
      <UiButton :to="ROUTES.prices" variant="outline" class="mt-6">
        Zobacz pełny cennik
      </UiButton>
      <div class="mt-6 grid gap-2.5 sm:grid-cols-2 md:mt-8 md:gap-3">
        <LandingPriceCard
          v-for="option in landingPriceOptions"
          :key="option.name"
          :option="option"
          details-id-prefix="matura"
          :details-open="isPriceDetailsOpen(option.id)"
          @toggle-details="togglePriceDetails(option.id)"
        />
      </div>
    </UiSection>

    <FaqAccordion
      id="faq"
      id-prefix="matura-faq"
      title="Mini FAQ o maturze z angielskiego"
      :faqs="faqs"
    />

    <CtaBanner
      title="Potrzebujesz pomocy w przygotowaniu do matury?"
      description="Napisz do mnie, czy przygotowujesz się do poziomu podstawowego czy rozszerzonego oraz ile czasu zostało Ci do egzaminu. Wspólnie dobierzemy sensowny rytm pracy, który pozwoli Ci powtórzyć cały materiał, oswoić arkusze i podejść do matury z pełnym spokojem."
      button-label="Skontaktuj się"
      :button-to="ROUTES.contact"
    />
  </main>
</template>

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
      'Pakiet MINI, Standard lub Intense dla maturzystów, którzy potrzebują indywidualnego przygotowania do egzaminu.',
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
const examPriceFaqAnswer = `Grupowy kurs maturalny ma stałą cenę ${examGroupPrice}. Miesięczna płatność w standardowej cenie to ${examGroupPayment}, a przy zapisie do ${examEarlyBirdPromotion.deadline} rata jest obniżona do ${examEarlyBirdPromotion.installmentPrice} za osobę. Przy wyborze pakietu rocznego 1:1 cena w przeliczeniu zaczyna się od ${individualAnnualPrice}.`

const features = [
  {
    title: 'Praca na arkuszach',
    body: 'Uczniowie dokładnie poznają strukturę egzaminu i rozwiązują zadania z poprzednich lat. Wspólnie analizujemy błędy i na bieżąco wyjaśniam, z czego one wynikają. Dzięki temu uczniowie doskonale wiedzą, czego się spodziewać i nic ich nie zaskoczy.',
  },
  {
    title: 'Strategie egzaminacyjne',
    body: 'Pokażę, jak radzić sobie z pułapkami CKE, skutecznie zarządzać czasem i unikać błędów, które najczęściej zabierają punkty.',
  },
  {
    title: 'Mówienie',
    body: 'Przełamujemy barierę językową i ćwiczymy płynną argumentację, aby egzamin ustny minął bez stresu i z pełną swobodą.',
  },
]

const lessonBenefits = [
  'Lepiej rozumiesz nagrania i teksty pod wymagania CKE',
  'Wiesz, które pułapki gramatyczne najczęściej zabierają punkty',
  'Piszesz prace zgodne z kryteriami, z konkretną informacją zwrotną',
  'Mówisz pełniejszymi zdaniami i swobodniej argumentujesz',
  'Masz plan działania na arkusz, zamiast działać przypadkowo',
]

const faqs = [
  {
    q: 'Ile kosztuje przygotowanie do matury z angielskiego?',
    a: examPriceFaqAnswer,
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
    a: `Tak. Do przygotowań można dołączyć również w trakcie roku szkolnego. Im wcześniej
zaczniesz, tym spokojniej rozłożymy materiał, ale nawet przy późniejszym starcie da się
ułożyć sensowny plan pracy. Na początku sprawdzamy poziom, ustalamy priorytety i
skupiamy się na tych obszarach, które najbardziej wpływają na wynik matury.`,
  },
]

const { isPriceDetailsOpen, togglePriceDetails } = usePriceDetailsAccordion()

useSeoMeta({
  title: 'Matura z angielskiego Rumia – przygotowanie',
  description:
    'Zajęcia przygotowujące do matury z angielskiego w Rumi: poziom podstawowy i rozszerzony dla uczniów z całej Polski.',
  ogTitle: 'Matura z angielskiego Rumia | Talkateria',
  ogDescription:
    'Kameralne lekcje przygotowujące do matury z angielskiego: arkusze, pisanie, mówienie, gramatyka i strategie egzaminacyjne.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
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
