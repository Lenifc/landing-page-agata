<template>
  <main id="main-content">
    <PageHero
      eyebrow="Zajęcia dla dorosłych"
      title="Angielski dla dorosłych w Rumi oraz online. Bez presji i szkolnego stresu."
      image-src="/photos/dorosli-hero-800.webp"
      image-srcset="
        /photos/dorosli-hero-400.webp   400w,
        /photos/dorosli-hero-800.webp   800w,
        /photos/dorosli-hero-1200.webp 1200w
      "
      image-sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
      image-alt="Dorosły kursant podczas lekcji języka angielskiego"
      image-width="800"
      image-height="800"
    >
      <template #description>
        Nigdy nie jest za późno, aby zacząć mówić swobodnie. Ten kurs jest
        stworzony dla osób, które chcą przełamać barierę językową, odświeżyć
        wiedzę po latach lub potrzebują angielskiego do celów zawodowych i
        codziennej komunikacji. Program dopasowuję do Twojego tempa życia,
        celów oraz aktualnego poziomu – bez stresu, szkolnego oceniania i w
        przyjaznej atmosferze.
      </template>
      <template #actions>
        <UiButton :to="contactCtaPath">Zapytaj o zajęcia →</UiButton>
        <UiButton :to="ROUTES.pricesPackages" variant="outline">
          Zobacz cennik
        </UiButton>
      </template>
    </PageHero>

    <UiSection variant="secondary" border="y" padding="lg">
      <UiSectionHeader
        title="Zajęcia dopasowane do dorosłego rytmu."
        max-width="3xl"
      >
        <template #description>
          Dorośli często wiedzą, czego potrzebują: więcej rozmowy, mniej
          chaosu, jasny plan i język, którego naprawdę użyją. Dlatego już od
          początku patrzymy na efekt: co chcesz powiedzieć po angielsku za
          kilka tygodni i w jakich sytuacjach ma Ci to pomóc.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="features" />
      </div>
    </UiSection>

    <UiSection padding="lg">
      <div class="grid gap-10 md:grid-cols-2">
        <div>
          <UiSectionHeader
            title="Jak wyglądają zajęcia?"
            title-tag="h2"
            size="sm"
          />
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
        <BulletList :items="benefits" />
      </div>
    </UiSection>

    <UiSection id="cennik" variant="secondary" border="y" padding="lg" scroll-margin>
      <UiSectionHeader
        eyebrow="Ceny"
        title="Ile kosztuje angielski dla dorosłych?"
        max-width="3xl"
      >
        <template #description>
          Koszt zajęć zależy od liczby lekcji w pakiecie oraz wybranej formy
          nauki - indywidualnie lub w parze. Dzięki elastycznej ofercie możesz
          dopasować kurs do swojego tempa nauki, celów oraz możliwości
          finansowych.
          <br /><br />
          Jeśli wygodniejsza jest dla Ciebie nauka z domu,
          <NuxtLink
            :to="ROUTES.onlineClasses"
            class="font-medium text-primary underline-offset-4 hover:underline"
          >
            zobacz zajęcia online
          </NuxtLink>
          - dostępny jest też poranny wariant cenowy do godziny
          {{ morningOnlinePromotion.deadlineHour }}.
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
          details-id-prefix="adult"
          :details-open="isPriceDetailsOpen(option.id)"
          @toggle-details="togglePriceDetails(option.id)"
        />
      </div>
    </UiSection>

    <FaqAccordion
      id="faq"
      id-prefix="adult-faq"
      title="Mini FAQ o angielskim dla dorosłych"
      :faqs="faqs"
    />

    <CtaBanner
      title="Porozmawiajmy o Twoim angielskim!"
      description="Napisz, do czego potrzebujesz języka, a wspólnie ułożymy spokojny plan dopasowany do Twojego celu i czasu, którym dysponujesz."
      button-label="Zapytaj o zajęcia →"
      :button-to="contactCtaPath"
    />
  </main>
</template>

<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
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
      'Pakiet MINI, Standard lub Intense dla dorosłych, którzy chcą uczyć się regularnie, z programem dopasowanym do celu.',
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
      'Pakiet MINI, Standard lub Intense dla dwóch osób uczących się razem w podobnym rytmie.',
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

const individualAnnualPrice = `${personPrice(individualAnnualIntense.fromPrice)} ${individualAnnualIntense.fromPriceContext}`
const duoAnnualPrice = `${personPrice(duoAnnualIntense.fromPrice)} ${duoAnnualIntense.fromPriceContext}`
const adultPriceFaqAnswer = `Przy wyborze pakietu rocznego 1:1 dla dorosłych cena w przeliczeniu zaczyna się od ${individualAnnualPrice}, a pod ceną podana jest miesięczna płatność, np. ${individualAnnualStandard.price} w pakiecie Standard. Przy wyborze pakietu rocznego DUO cena w przeliczeniu zaczyna się od ${duoAnnualPrice}.`

const features = [
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
  'Swobodniej zaczynasz i podtrzymujesz rozmowę',
  'Używasz słownictwa potrzebnego w pracy, podróży i codzienności',
  'Rozumiesz gramatykę bez szkolnego chaosu',
  'Uczysz się w tempie dopasowanym do dorosłego życia',
  'Masz przestrzeń na błędy bez presji i oceniania',
  'Możesz uczyć się stacjonarnie w Rumi albo online',
]

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
gramatykę czy nowe słownictwo wprowadzamy "w locie", w trakcie praktycznej rozmowy.`,
  },
  {
    q: 'Czy można uczyć się online?',
    a: `Tak. Dorośli często wybierają formę online, kiedy trudno pogodzić naukę z pracą, dojazdami
albo napiętym domowym grafikiem. Co ważne, nie musisz sztywno trzymać się jednego
rozwiązania - jeśli Twój plan w danym tygodniu tego wymaga, możemy elastycznie łączyć
zajęcia stacjonarne ze zdalnymi.`,
  },
]

const { isPriceDetailsOpen, togglePriceDetails } = usePriceDetailsAccordion()

useSeoMeta({
  title: 'Zajęcia z angielskiego dla dorosłych Rumia',
  description:
    'Angielski dla dorosłych w Rumi: konwersacje, powrót do nauki, angielski do pracy i podróży. Kameralne lekcje stacjonarnie lub online.',
  ogTitle: 'Angielski dla dorosłych | Talkateria Rumia',
  ogDescription:
    'Kameralne zajęcia dla dorosłych: rozmowa, praktyczne słownictwo, powrót do podstaw i nauka bez presji.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
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
