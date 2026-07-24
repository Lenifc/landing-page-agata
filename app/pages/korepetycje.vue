<template>
  <main id="main-content" class="pb-20 md:pb-0">
    <PageHero
      eyebrow="Pomoc w opanowaniu materiału szkolnego"
      title="Korepetycje z angielskiego dla uczniów i studentów."
      image-src="/photos/material-szkolny-800.webp"
      image-srcset="
        /photos/material-szkolny-400.webp   400w,
        /photos/material-szkolny-800.webp   800w,
        /photos/material-szkolny-1200.webp 1200w
      "
      image-sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
      image-alt="Uczeń odpoczywający nad książkami podczas nauki materiału szkolnego"
      image-width="800"
      image-height="800"
    >
      <template #description>
        Pomagam uporządkować materiał, nadrobić zaległości i spokojnie
        przygotować się do sprawdzianów, kartkówek, zaliczeń oraz egzaminów.
        To wsparcie dla uczniów od klasy 6 szkoły podstawowej, młodzieży i
        studentów, którzy potrzebują spokojnego uporządkowania gramatyki,
        słownictwa i bieżących tematów.
      </template>
      <template #actions>
        <UiButton :to="contactCtaPath">Zapytaj o korepetycje →</UiButton>
        <UiButton href="#cennik" variant="outline">
          Zobacz ceny
        </UiButton>
      </template>
    </PageHero>

    <UiSection id="cennik" variant="secondary" padding="lg" scroll-margin>
      <UiSectionHeader
        eyebrow="Ceny"
        title="Ile kosztują korepetycje z angielskiego?"
        max-width="3xl"
      >
        <template #description>
          Stawka za lekcję zależy od formy nauki (indywidualnie lub w parze)
          oraz częstotliwości — 1× albo 2× w tygodniu. Przy większych
          zaległościach albo regularnej pomocy szkolnej najlepiej sprawdzają się
          stałe spotkania, bo dają spokojny rytm pracy i widoczniejsze postępy.
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
        Umów korepetycje →
      </UiButton>
    </UiSection>

    <UiSection padding="lg">
      <UiSectionHeader
        title="Kiedy takie zajęcia sprawdzają się najlepiej?"
        max-width="3xl"
      >
        <template #description>
          Gdy materiał zaczyna uciekać, oceny spadają albo przed sprawdzianem
          pojawia się chaos. Zajęcia pomagają odzyskać kontrolę nad nauką i
          pracować regularnie zamiast działać w ostatniej chwili.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="features" />
      </div>
    </UiSection>

    <UiSection variant="secondary" padding="lg" max-width="6xl">
      <div class="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <UiSectionHeader
            title="Każdy uczy się w swoim tempie"
            title-tag="h2"
            size="sm"
          />
          <div class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Nie zawsze łatwo nadążyć za materiałem z języka angielskiego.
              Czasem wystarczy dłuższa nieobecność w szkole, bardziej wymagający
              dział w podręczniku albo zbyt szybkie tempo pracy na lekcjach, by
              pojawiły się zaległości. Jeśli widzą Państwo, że dziecko zaczyna
              mieć trudności z gramatyką, słownictwem lub coraz bardziej stresuje
              się kartkówkami i sprawdzianami, chętnie pomogę. Wspieram również
              studentów, którzy chcą uporządkować wiedzę i spokojnie
              przygotować się do zaliczeń czy egzaminów.
            </p>
            <p>
              Na zajęciach tłumaczę zagadnienia w sposób prosty i zrozumiały,
              wracamy do tematów, które sprawiają trudność, uzupełniamy
              zaległości i utrwalamy bieżący materiał. Każdy uczy się inaczej,
              dlatego dopasowuję tempo i sposób pracy do indywidualnych potrzeb
              oraz poziomu ucznia lub studenta.
            </p>
            <p>
              Zależy mi na stworzeniu spokojnej i wspierającej atmosfery, w
              której można swobodnie zadawać pytania i popełniać błędy - bo to
              naturalna część nauki. Moim celem jest nie tylko poprawa ocen czy
              wyników na egzaminach, ale przede wszystkim sprawienie, aby
              angielski stał się bardziej zrozumiały i dawał większą pewność w
              codziennym korzystaniu z języka.
            </p>
          </div>
        </div>
        <BulletList title="Dlaczego warto mi zaufać?" :items="trustItems" />
      </div>
    </UiSection>

    <UiSection padding="lg">
      <div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <UiSectionHeader
          eyebrow="Zajęcia w duecie"
          title="Nauka z kolegą lub koleżanką z klasy."
          title-tag="h2"
          size="sm"
        />
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
    </UiSection>

    <FaqAccordion
      id="faq"
      id-prefix="school-faq"
      title="Mini FAQ o korepetycjach z angielskiego"
      variant="secondary"
      :faqs="faqs"
    />

    <CtaBanner
      section-variant="default"
      title="Wspólnie zadbajmy o rozwój Państwa dziecka."
      description="Regularne zajęcia pomagają uzupełnić zaległości, lepiej zrozumieć materiał i odzyskać pewność siebie podczas lekcji w szkole. Chętnie doradzę, jaka forma wsparcia będzie najlepsza, i odpowiem na wszystkie pytania."
      button-label="Zapytaj o wsparcie szkolne →"
      :button-to="contactCtaPath"
    />

    <StickyContactCta :to="contactCtaPath" label="Umów bezpłatną konsultację →" />
  </main>
</template>

<script setup>
import {
  buildDuoRateCard,
  buildIndividualRateCard,
  getPricingPlan,
  getPricingPlans,
} from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.schoolSupport
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('schoolSupport')
const individualWeekly = getPricingPlan('individualWeekly')
const individualTwiceWeekly = getPricingPlan('individualTwiceWeekly')
const duoWeekly = getPricingPlan('duoWeekly')
const duoTwiceWeekly = getPricingPlan('duoTwiceWeekly')

const landingPriceOptions = [
  buildIndividualRateCard(
    'Lekcje indywidualne 1:1 dla uczniów i studentów — stawka zależy od częstotliwości (1× lub 2× w tygodniu).',
  ),
  buildDuoRateCard(
    'Lekcje DUO dla dwóch osób o podobnym poziomie — stawka za osobę zależy od częstotliwości.',
  ),
]

const schoolPriceFaqAnswer = `Lekcje indywidualne 1:1: ${individualWeekly.price} (1×) / ${individualTwiceWeekly.price} (2×). Lekcje DUO: ${personPrice(duoWeekly.price)} (1×) / ${personPrice(duoTwiceWeekly.price)} (2×). Pełne stawki znajdziesz w cenniku powyżej.`

const features = [
  {
    title: 'Nadrabianie zaległości',
    body: 'Bez pośpiechu wracamy do trudniejszych tematów, uzupełniamy braki i budujemy solidne podstawy do dalszej nauki.',
  },
  {
    title: 'Przygotowanie do sprawdzianów',
    body: 'Wspólnie powtarzamy materiał, utrwalamy najważniejsze zagadnienia i rozwiewamy ostatnie wątpliwości, aby uczeń podszedł do sprawdzianu przygotowany i osiągnął jak najlepszy wynik.',
  },
  {
    title: 'Większa pewność siebie',
    body: 'Systematyczna praca i zrozumienie materiału pomagają uczniowi odzyskać wiarę we własne możliwości i z większą motywacją podchodzić do nauki.',
  },
]

const trustItems = [
  'zajęcia dopasowuję do programu szkolnego i konkretnych trudności ucznia lub studenta,',
  'tłumaczę materiał w prosty i zrozumiały sposób,',
  'pomagam uporządkować wiedzę i systematycznie ją utrwalać,',
  'wspieram w przygotowaniu do sprawdzianów, kartkówek i egzaminów,',
  'tworzę przyjazną atmosferę, w której dziecko czuje się swobodnie i nie boi się zadawać pytań,',
  'pomagam odzyskać pewność siebie i większy spokój w nauce.',
]

const faqs = [
  {
    q: 'Ile kosztują korepetycje z angielskiego?',
    a: schoolPriceFaqAnswer,
    link: {
      label: 'cenniku',
      href: ROUTES.schoolSupportPrices,
      before: `Lekcje indywidualne 1:1: ${individualWeekly.price} (1×) / ${individualTwiceWeekly.price} (2×). Lekcje DUO: ${personPrice(duoWeekly.price)} (1×) / ${personPrice(duoTwiceWeekly.price)} (2×). Pełne stawki znajdziesz w `,
      after: ' powyżej.',
    },
  },
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

useSeoMeta({
  title: 'Korepetycje z angielskiego Rumia',
  description:
    'Wsparcie w materiale szkolnym z angielskiego w Rumi i online dla uczniów od 6 klasy, szkół ponadpodstawowych oraz studentów. Materiał szkolny, sprawdziany i zaległości.',
  ogTitle: 'Korepetycje z angielskiego w Rumi | Talkateria',
  ogDescription:
    'Wsparcie w materiale szkolnym z angielskiego: gramatyka, słownictwo, sprawdziany, zaległości i większa pewność siebie.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
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
