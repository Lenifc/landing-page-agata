<template>
  <main id="main-content" class="pb-20 md:pb-0">
    <PageHero
      eyebrow="Egzamin ósmoklasisty"
      title="Egzamin ósmoklasisty bez stresu? To możliwe!"
      image-src="/photos/egzamin-osmoklasisty-hero-800.webp"
      image-srcset="
        /photos/egzamin-osmoklasisty-hero-400.webp   400w,
        /photos/egzamin-osmoklasisty-hero-800.webp   800w,
        /photos/egzamin-osmoklasisty-hero-1200.webp 1200w
      "
      image-sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
      image-alt="Materiały i notatki do nauki angielskiego przed egzaminem ósmoklasisty"
      image-width="800"
      image-height="800"
    >
      <template #description>
        Kursy przygotowawcze dopasowane do Twoich potrzeb prowadzone w studiu
        w Rumi lub online - ucz się indywidualnie, w duecie z przyjacielem lub
        przyjaciółką albo w kameralnej 3-osobowej grupie.<br /><br />
        Stawiam na systematyczność i regularne powtórki, dzięki czemu
        uczniowie płynnie przyswajają wiedzę i oswajają formułę tego testu.
        Razem pracujemy na wysoki wynik, dbając jednocześnie o to, by ten
        ważny dzień był dla nastolatka spokojnym podsumowaniem jego sukcesów,
        a nie źródłem lęku.
      </template>
      <template #actions>
        <UiButton :to="contactCtaPath">Zapytaj o zajęcia →</UiButton>
        <UiButton href="#cennik" variant="outline">
          Zobacz ceny
        </UiButton>
      </template>
    </PageHero>

    <UiSection id="cennik" variant="secondary" padding="lg" scroll-margin>
      <UiSectionHeader
        eyebrow="Ceny"
        title="Ile kosztuje przygotowanie do egzaminu ósmoklasisty?"
        max-width="3xl"
      >
        <template #description>
          Możesz wybrać kurs egzaminacyjny w 3-osobowej grupie (pakiet z
          płatnością w 8 ratach) albo lekcje indywidualne ze stawką za lekcję
          zależną od częstotliwości. Harmonogram układam tak, aby bez pośpiechu
          zrealizować materiał przed egzaminem.
        </template>
      </UiSectionHeader>
      <div class="mt-6 grid gap-2.5 sm:grid-cols-2 md:mt-8 md:gap-3">
        <LandingPriceCard
          v-for="option in landingPriceOptions"
          :key="option.name"
          :option="option"
        />
      </div>
      <UiButton :to="contactCtaPath" class="mt-8">
        Umów przygotowanie do egzaminu →
      </UiButton>
    </UiSection>

    <UiSection padding="lg">
      <UiSectionHeader title="Co obejmuje przygotowanie?" max-width="3xl">
        <template #description>
          Program zajęć oraz metody pracy dobieram indywidualnie do potrzeb
          każdego ucznia lub grupy, biorąc pod uwagę poziom startowy, termin
          egzaminu i zagadnienia, które wymagają najwięcej powtórek. Dzięki
          temu nauka nie jest chaotyczna, lecz prowadzi - od wstępnej diagnozy
          - do coraz pewniejszego i samodzielnego rozwiązywania zadań.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="features" />
      </div>
      <p class="max-w-3xl pt-8 text-pretty leading-relaxed text-muted-foreground">
        Efekt? Uczeń podchodzi do egzaminu spokojnie, świadomy swoich
        umiejętności i dobrze przygotowany - bez stresu, za to z realną
        szansą na wysoki wynik.
      </p>
    </UiSection>

    <UiSection variant="secondary" padding="lg">
      <UiSectionHeader
        title="Dla kogo przeznaczone są zajęcia?"
        title-tag="h2"
        size="sm"
        max-width="3xl"
      >
        <template #description>
          Dla uczniów klas 7 i 8, którzy chcą dobrze przygotować się do egzaminu
          ósmoklasisty z języka angielskiego i podejść do niego bez stresu. To
          idealne rozwiązanie zarówno dla osób, które chcą nadrobić zaległości,
          jak i dla tych, którzy celują w wysoki wynik i większą pewność w pracy
          z arkuszem egzaminacyjnym.
        </template>
      </UiSectionHeader>
      <div class="mt-14 max-w-3xl">
        <UiSectionHeader title="Jak wyglądają zajęcia?" title-tag="h2" size="sm" />
      </div>
      <div class="mt-10">
        <NumberedSteps :steps="lessonSteps" />
      </div>
    </UiSection>

    <FaqAccordion
      id="faq"
      id-prefix="exam-faq"
      title="Mini FAQ o przygotowaniu do egzaminu"
      :faqs="faqs"
    />

    <CtaBanner
      title="Chcesz sprawdzić, od czego zacząć przygotowania?"
      description="Napisz, w której klasie jest uczeń i jaki jest obecny poziom. Dobierzemy formę pracy i tempo przygotowań do egzaminu."
      button-label="Dobierzmy plan przygotowań →"
      :button-to="contactCtaPath"
    />

    <StickyContactCta :to="contactCtaPath" label="Umów bezpłatną konsultację →" />
  </main>
</template>

<script setup>
import {
  buildExamRateCard,
  buildIndividualRateCard,
  getPricingPlan,
  getPricingPlans,
} from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.eighthGradeExam
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('eighthGradeExam')
const examGroup = getPricingPlan('examGroup', 'eighthGradeExam')
const individualWeekly = getPricingPlan('individualWeekly')
const individualTwiceWeekly = getPricingPlan('individualTwiceWeekly')

const landingPriceOptions = [
  buildExamRateCard('eighthGradeExam'),
  buildIndividualRateCard(
    'Lekcje indywidualne 1:1 dla uczniów przygotowujących się do egzaminu — stawka zależy od częstotliwości (1× lub 2× w tygodniu).',
  ),
]

const examGroupPayment = personPrice(
  paymentWithoutPrefix(examGroup.paymentNote),
)
const examPriceFaqAnswer = `Grupowy kurs egzaminacyjny w 3-osobowej grupie: 108 zł / osoba za spotkanie 100 min. Miesięczna płatność to ${examGroupPayment}. Lekcje indywidualne 1:1: ${individualWeekly.price} (1×) / ${individualTwiceWeekly.price} (2×) za lekcję 50 min.`

const features = [
  {
    title: 'Arkusze i typy zadań bez stresu',
    body: 'Od pierwszych zajęć pracujemy na autentycznych zadaniach w formacie egzaminacyjnym. Ćwiczymy czytanie, słuchanie, środki i funkcje językowe oraz wypowiedź pisemną, dzięki czemu uczeń dokładnie wie, czego się spodziewać na egzaminie.',
  },
  {
    title: 'Skuteczne strategie egzaminacyjne',
    body: 'Uczę, jak krok po kroku rozwiązywać zadania, dobrze analizować polecenia i świadomie zarządzać czasem. Pokazuję sprawdzone metody eliminowania błędnych odpowiedzi oraz skutecznego sprawdzania arkusza przed oddaniem.',
  },
  {
    title: 'Uporządkowana gramatyka i słownictwo',
    body: 'Porządkujemy i utrwalamy najważniejsze struktury oraz słownictwo wymagane na egzaminie. Uczniowie uczą się, jak wykorzystać swoją wiedzę w praktyce i zdobywać maksymalną liczbę punktów.',
  },
]

const lessonSteps = [
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

const faqs = [
  {
    q: 'Ile kosztuje przygotowanie do egzaminu ósmoklasisty?',
    a: examPriceFaqAnswer,
  },
  {
    q: 'Kiedy najlepiej zacząć przygotowania do egzaminu ósmoklasisty?',
    a: `Im wcześniej, tym spokojniej i skuteczniej. Najlepszy moment to 7. klasa lub początek 8. klasy –
daje to czas na spokojne poznanie poziomu ucznia, systematyczne powtórki oraz regularną
pracę z arkuszami egzaminacyjnymi.

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

useSeoMeta({
  title: 'Egzamin ósmoklasisty z angielskiego w Rumi',
  description:
    'Zajęcia przygotowujące do egzaminu ósmoklasisty z angielskiego w Rumi: arkusze, strategie, gramatyka, słownictwo i spokojne powtórki.',
  ogTitle: 'Egzamin ósmoklasisty z języka angielskiego | Talkateria',
  ogDescription:
    'Kameralne przygotowanie do egzaminu ósmoklasisty z angielskiego: arkusze, strategie, gramatyka, słownictwo i spokojna praca krok po kroku.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
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
