<template>
  <main id="main-content" class="flex flex-col pb-20 md:pb-0">
    <section
      class="relative order-1 isolate overflow-hidden bg-foreground text-primary-foreground lg:h-[650px]">
      <img src="/photos/online-hero-960.webp" alt="Osoba uczestnicząca w lekcji angielskiego online przy laptopie"
        class="online-hero-image absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[25%_center] md:w-[70%] md:object-contain md:object-right lg:w-auto lg:max-w-none"
        width="974" height="650" fetchpriority="high" />
      <div
        class="online-hero-overlay absolute inset-0 -z-10 bg-foreground/75 md:bg-transparent md:bg-[linear-gradient(90deg,var(--color-hero-overlay)_0%,var(--color-hero-overlay)_34%,color-mix(in_oklch,var(--color-hero-overlay)_92%,transparent)_40%,color-mix(in_oklch,var(--color-hero-overlay)_74%,transparent)_48%,color-mix(in_oklch,var(--color-hero-overlay)_50%,transparent)_57%,color-mix(in_oklch,var(--color-hero-overlay)_28%,transparent)_66%,color-mix(in_oklch,var(--color-hero-overlay)_12%,transparent)_76%,transparent_86%)] lg:hidden" />

      <div
        class="mx-auto flex min-h-[68svh] max-w-6xl items-center px-6 py-14 md:min-h-[70svh] md:py-20 lg:h-full lg:min-h-0 lg:py-16">
        <div class="max-w-2xl">
          <span
            class="inline-flex rounded-full bg-background/92 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            Angielski online
          </span>
          <h1 class="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Angielski online: bez dojazdów i bez straty na jakości.
          </h1>
          <p class="mt-5 max-w-xl text-pretty text-justify text-lg leading-relaxed text-primary-foreground/88">
            Uczysz się tam, gdzie jest Ci najwygodniej, a lekcje nadal mają
            jasny plan, opierają się na aktywnej rozmowie, indywidualnej
            informacji zwrotnej i materiałach dopasowanych do Twojego celu.
            Oszczędzasz czas na dojazdy – to idealna opcja również wtedy, gdy
            mieszkasz daleko od Rumi.
          </p>
          <div class="mt-7 flex flex-wrap gap-4">
            <UiButton :to="contactCtaPath" variant="inverse" class="shadow-neutral-sm">
              Zapytaj o lekcje online →
            </UiButton>
            <UiButton href="#cennik" variant="outline-light">
              Zobacz ceny
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <section class="order-3 border-t border-border md:order-2">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid gap-x-10 gap-y-8 md:grid-cols-2">
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Zajęcia dla dorosłych
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Przełamywanie bariery, angielski na co dzień i do pracy (Business
              English). Koncentrujemy się na mówieniu i aktywnej komunikacji bez
              nudnej teorii.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Przygotowanie do egzaminów
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Egzamin ósmoklasisty i matura (podstawa/rozszerzenie). Omawiamy
              zadania egzaminacyjne, poznajemy pewniaki testowe i budujemy
              pewność siebie.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Materiał szkolny
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pomoc z bieżącym materiałem szkolnym i przygotowanie do
              sprawdzianów w szkole. Nadrabiamy zaległości, poprawiamy oceny i
              zdejmujemy szkolny stres.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Nauka bez wychodzenia z domu
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Zajęcia zdalne w Talkaterii nie są „gorszą wersją” spotkania w
              studiu. To wygodna forma pracy dla osób, które chcą uczyć się
              regularnie, mówić więcej i nie dokładać do nauki kolejnej
              logistyki: dojazdów, odwoływania zajęć przy drobnym spadku formy
              czy rezygnacji z kursu tylko dlatego, że mieszkają dalej.
            </p>
          </div>
        </div>
      </div>
    </section>
    <UiSection
      id="cennik"
      class="order-2 md:order-3"
      variant="secondary"
      padding="lg"
      scroll-margin
    >
      <UiSectionHeader
        eyebrow="Ceny"
        title="Ile kosztują zajęcia zdalne?"
        max-width="3xl"
      >
        <template #description>
          Cena za lekcję zależy od pory dnia, formy nauki (indywidualnie lub w
          parze) oraz częstotliwości — 1× albo 2× w tygodniu.
        </template>
      </UiSectionHeader>

      <div class="mt-6 md:mt-8">
        <p class="text-sm font-medium text-foreground">
          Wybierz porę zajęć
        </p>
        <div
          class="mt-2 grid max-w-lg grid-cols-2 gap-2"
          role="group"
          aria-label="Pora zajęć online"
        >
          <button
            type="button"
            class="cursor-pointer rounded-xl border px-3 py-3 text-left transition-colors"
            :class="
              onlineSchedule === 'morning'
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-card hover:border-primary/40'
            "
            :aria-pressed="onlineSchedule === 'morning'"
            @click="onlineSchedule = 'morning'"
          >
            <span
              class="block text-sm font-bold"
              :class="
                onlineSchedule === 'morning'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              "
            >
              Pn–Pt do 12:00
            </span>
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-xl border px-3 py-3 text-left transition-colors"
            :class="
              onlineSchedule === 'afternoon'
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-card hover:border-primary/40'
            "
            :aria-pressed="onlineSchedule === 'afternoon'"
            @click="onlineSchedule = 'afternoon'"
          >
            <span
              class="block text-sm font-bold"
              :class="
                onlineSchedule === 'afternoon'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              "
            >
            Pon-Pt 15:00–20:00 | Sob do 12:00
            </span>
          </button>
        </div>
      </div>

      <div class="mt-5 grid gap-2.5 sm:grid-cols-2 md:mt-6 md:gap-3">
        <LandingPriceCard
          v-for="option in landingPriceOptions"
          :key="`${onlineSchedule}-${option.id}`"
          :option="option"
        />
      </div>
      <div class="mt-6 max-w-3xl space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <p>{{ PRICING_NOTES.advancePayment }}</p>
      </div>
      <div class="mt-8 flex flex-wrap gap-4">
        <UiButton :to="contactCtaPath">Umów termin online →</UiButton>
        <UiButton :to="ROUTES.prices" variant="outline">
          Pełny cennik
        </UiButton>
      </div>
    </UiSection>



    <UiSection class="order-4" padding="lg">
      <UiSectionHeader
        eyebrow="Zalety zajęć zdalnych"
        title="Dlaczego warto wybrać zajęcia online?"
        max-width="3xl"
      />
      <div class="mt-10">
        <FeatureGrid :items="onlineBenefits" :columns="2" />
      </div>
    </UiSection>

    <UiSection class="order-5" variant="secondary" padding="lg">
      <UiSectionHeader
        eyebrow="Kiedy najbardziej docenisz naukę online?"
        title="Zdalne zajęcia pomagają utrzymać kurs, gdy życie robi swoje."
        max-width="3xl"
      >
        <template #description>
          Największą zaletą online jest ciągłość. Nie chodzi tylko o wygodę,
          ale o to, że mniej rzeczy wybija Cię z nauki: odległość, słabszy
          dzień, korki, deszcz, wyjazd albo zwyczajnie napięty grafik.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="onlineScenarios" :columns="2" />
      </div>
    </UiSection>

    <section class="order-6 border-t border-border">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Przebieg lekcji
          </span>
          <h2 class="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Jak wyglądają zajęcia online?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Pracujemy dokładnie tak samo jak w studiu, dlatego wybierając lekcje
            przez internet, nic nie tracisz. Przebieg spotkań zawsze zależy od
            Twojego celu - niezależnie od tego, czy szlifujemy konwersacje,
            przygotowujemy się do egzaminu, czy nadrabiamy szkolny materiał.
            Różnica polega jedynie na tym, że widzimy się przez ekran, a
            wszystkie potrzebne materiały masz pod ręką w wersji cyfrowej.
          </p>
        </div>

        <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ul class="space-y-3">
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                1
              </span>
              <span class="pt-1 leading-relaxed">
                Otrzymasz link do spotkania, w który wystarczy kliknąć o
                umówionej porze - nie musisz nic instalować ani zakładać konta.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                2
              </span>
              <span class="pt-1 leading-relaxed">
                Spotykamy się na Zoomie o ustalonej godzinie.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                3
              </span>
              <span class="pt-1 leading-relaxed">
                Pracujemy poprzez rozmowę, ćwiczenia i materiały dopasowane do
                Twojego celu.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                4
              </span>
              <span class="pt-1 leading-relaxed">
                Po lekcji możesz zapisać na czacie najważniejsze notatki z zajęć
                lub otrzymać dostęp do materiałów, zadań i linków omawianych
                podczas lekcji.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                5
              </span>
              <span class="pt-1 leading-relaxed">
                Jeśli masz pytania lub dodatkowe potrzeby, omawiamy je podczas
                lekcji.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                6
              </span>
              <span class="pt-1 leading-relaxed">
                Uczysz się w swoim tempie, a plan zajęć na bieżąco dopasowujemy
                do Twoich potrzeb.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <FaqAccordion
      id="faq"
      class="order-7"
      id-prefix="online-faq"
      title="Najczęstsze pytania o zajęcia zdalne"
      :faqs="faqs"
    />

    <CtaBanner
      class="order-8"
      title="Chcesz uczyć się angielskiego online?"
      description="Napisz, jaki jest Twój cel, albo umów bezpłatną konsultację online (15&nbsp;min). Wspólnie dobierzemy formę zajęć i dogodny termin."
      button-label="Dobierzmy formę online →"
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
  MORNING_ONLINE_RATES,
  PRICING_NOTES,
} from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.onlineClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('onlineClasses').filter(
  (plan) => plan.id !== 'examGroup',
)
const individualWeekly = getPricingPlan('individualWeekly')
const individualTwiceWeekly = getPricingPlan('individualTwiceWeekly')
const duoWeekly = getPricingPlan('duoWeekly')
const duoTwiceWeekly = getPricingPlan('duoTwiceWeekly')

const onlineSchedule = ref('morning')

const landingPriceOptions = computed(() => {
  const isMorning = onlineSchedule.value === 'morning'
  const individualRates = isMorning
    ? {
        weekly: MORNING_ONLINE_RATES.individualWeekly,
        twiceWeekly: MORNING_ONLINE_RATES.individualTwiceWeekly,
      }
    : undefined
  const duoRates = isMorning
    ? {
        weekly: MORNING_ONLINE_RATES.duoWeekly,
        twiceWeekly: MORNING_ONLINE_RATES.duoTwiceWeekly,
      }
    : undefined

  return [
    buildIndividualRateCard(
      isMorning
        ? 'Lekcje indywidualne 1:1 online w godzinach porannych (Pn–Pt do 12:00). Stawka zależy od częstotliwości.'
        : 'Lekcje indywidualne 1:1 online w godzinach 15:00–20:00. Stawka zależy od częstotliwości.',
      { rates: individualRates },
    ),
    buildDuoRateCard(
      isMorning
        ? 'Lekcje DUO online w godzinach porannych (Pn–Pt do 12:00). Stawka za osobę zależy od częstotliwości.'
        : 'Lekcje DUO online w godzinach 15:00–20:00. Stawka za osobę zależy od częstotliwości.',
      { rates: duoRates },
    ),
  ]
})

const onlineBenefits = [
  {
    title: 'Zero dojazdów',
    body: 'Nie tracisz czasu na korki, szukanie parkingu, przesiadki ani pogodowe niespodzianki. Wystarczy komputer lub tablet, spokojne miejsce i kilka minut na przygotowanie przed lekcją.',
  },
  {
    title: 'Nie wypadasz z rytmu tak łatwo',
    body: 'Jeśli w dniu zajęć czujesz się gorzej, ale nadal masz siłę na spokojną pracę, nie musisz od razu przenosić lekcji. Możesz zostać w domu, mieć koc i herbatę obok, a mimo to utrzymać kontakt z językiem.',
  },
  {
    title: 'Odległość przestaje mieć znaczenie',
    body: 'Mieszkasz dalej niż Rumia? Żaden problem. Zajęcia zdalne są dostępne z całej Polski, więc możesz uczyć się w Talkaterii bez organizowania dojazdów.',
  },
  {
    title: 'Łatwiej dopasować naukę do dnia',
    body: 'Online sprawdza się przy pracy zmianowej, napiętym planie lekcji, opiece nad dzieckiem albo wtedy, gdy po prostu trudno wcisnąć dojazd między kolejne obowiązki.',
  },
  {
    title: 'Materiały są zawsze pod ręką',
    body: 'Notatki, linki, ćwiczenia i powtórki mogą trafiać w jedno cyfrowe miejsce, więc łatwiej wracać do nich między lekcjami i nadrabiać drobne zaległości.',
  },
  {
    title: 'Komfort sprzyja mówieniu',
    body: 'Własne biurko i spokojne otoczenie często pomagają przełamać barierę językową. Nadal pracujemy aktywnie: rozmawiamy, poprawiamy błędy i ćwiczymy reakcje.',
  },
]

const onlineScenarios = [
  {
    title: 'Kiedy dojazd zabiera więcej energii niż sama nauka',
    body: 'Po szkole, pracy albo dodatkowych zajęciach czasem najtrudniejsza jest logistyka. Online skraca drogę do lekcji do jednego kliknięcia.',
  },
  {
    title: 'Kiedy pogoda, korki albo choroba mieszają w planie',
    body: 'Nie każda gorsza dyspozycja oznacza, że trzeba odwoływać zajęcia. Jeśli możesz pracować, spotykamy się zdalnie i robimy lekcję w spokojniejszym tempie.',
  },
  {
    title: 'Kiedy mieszkasz poza Trójmiastem',
    body: 'Zdalnie możesz uczyć się z małej miejscowości, innego województwa albo z miejsca, do którego trudno byłoby regularnie dojeżdżać do studia.',
  },
  {
    title: 'Kiedy jesteś w podróży lub zmieniasz miejsce pobytu',
    body: 'Wyjazd rodzinny, delegacja czy czasowy pobyt poza domem nie muszą przerywać kursu, jeśli masz internet i spokojną przestrzeń do rozmowy.',
  },
]

const faqs = [
  {
    q: 'Ile kosztują lekcje angielskiego online?',
    a: `Poranne lekcje online (Pn–Pt do 12:00): 1:1 ${MORNING_ONLINE_RATES.individualWeekly} / ${MORNING_ONLINE_RATES.individualTwiceWeekly}, DUO ${personPrice(MORNING_ONLINE_RATES.duoWeekly)} / ${personPrice(MORNING_ONLINE_RATES.duoTwiceWeekly)}. W godzinach 15:00–20:00: 1:1 ${individualWeekly.price} / ${individualTwiceWeekly.price}, DUO ${personPrice(duoWeekly.price)} / ${personPrice(duoTwiceWeekly.price)}. ${PRICING_NOTES.advancePayment}`,
  },
  {
    q: 'Czy zajęcia zdalne są tak samo skuteczne jak stacjonarne?',
    a: 'Tak, jeśli są dobrze prowadzone i regularne. Program, tempo pracy i informacja zwrotna pozostają takie same jak w studiu, a forma online daje dodatkowo wygodę, oszczędność czasu i większą odporność na codzienne zmiany planu.',
  },
  {
    q: 'Czego potrzebuję do lekcji online?',
    a: `Wystarczy stabilne połączenie internetowe, komputer lub tablet, kamerka oraz mikrofon.
Wiele osób chętnie korzysta też ze słuchawek, co pomaga lepiej się skupić i odciąć od
otoczenia. Przyda się również spokojne miejsce do rozmowy oraz – jeśli lubisz taką formę –
tradycyjny zeszyt lub kartka do robienia własnych notatek. Link do spotkania dostajesz ode
mnie przed zajęciami, więc nie musisz niczego wcześniej instalować.
`,
  },
  {
    q: 'Czy online można przygotować się do egzaminu?',
    a: `Zajęcia online świetnie sprawdzają się w przygotowaniu do egzaminów. Pracujemy na
arkuszach, rozwijamy strategie egzaminacyjne oraz ćwiczymy słuchanie, czytanie, gramatykę
i pisanie. To skuteczna forma nauki zarówno do egzaminu ósmoklasisty, jak i matury z języka
angielskiego - szczególnie przy napiętym harmonogramie maturzysty.`,
  },
  {
    q: 'Czy mogę łączyć zajęcia zdalne ze stacjonarnymi?',
    a: `Tak, jeśli pozwala na to grafik. Możesz łączyć zajęcia stacjonarne w studiu z lekcjami online.
Wielu kursantów uczy się głównie stacjonarnie, a online korzysta okazjonalnie, gdy wygodniej
zostać w domu. To wygodne rozwiązanie, które pozwala utrzymać regularność nauki bez
rezygnowania z elastyczności i dopasować formę zajęć do Twoich aktualnych potrzeb i planu
dnia.`,
  },
  {
    q: 'Czy zajęcia online są dostępne tylko dla osób z okolic Rumi?',
    a: 'Nie. W zajęciach zdalnych możesz uczestniczyć z dowolnego miejsca w Polsce. To dobre rozwiązanie, jeśli mieszkasz dalej, często wyjeżdżasz albo po prostu chcesz uczyć się bez dojazdów.',
  },
  {
    q: 'Co jeśli gorzej się czuję w dniu lekcji?',
    a:
      'Jeśli czujesz, że coś Cię „bierze”, nawet lekko, najbezpieczniej zostać w domu i odpocząć. ' +
      'W takiej sytuacji możesz też przejść na lekcję online i uczyć się bez wychodzenia z domu - ' +
      'dzięki temu nie tracisz zajęć i pozostajesz w rytmie nauki.\n\n' +
      'Jeśli nie dasz rady wziąć udziału w lekcji, możesz ją odwołać najpóźniej dzień wcześniej. ' +
      'W innym przypadku lekcja przepada.',
  },
]

useSeoMeta({
  title: 'Angielski online – zajęcia zdalne',
  description:
    'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bezpłatna konsultacja online 15 min. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
  ogTitle: 'Angielski online – zajęcia zdalne | Talkateria',
  ogDescription:
    'Angielski online bez dojazdów. Umów bezpłatną konsultację online (15 min) — wygodnie, regularnie i z indywidualnym podejściem.',
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
        pageName: 'Angielski online – zajęcia zdalne',
        pageDescription:
          'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bezpłatna konsultacja online 15 min. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
        serviceName: 'Lekcje angielskiego online',
        serviceType: 'Lekcje języka angielskiego online',
        serviceDescription:
          'Indywidualne i kameralne zajęcia z języka angielskiego online na platformie Zoom, prowadzone przez studio w Rumi.',
        priceOptions,
        audience: {
          '@type': 'Audience',
          audienceType: 'młodzież i dorośli',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: pageUrl,
          serviceLocation: {
            '@type': 'VirtualLocation',
            url: pageUrl,
          },
        },
        faqs,
      }),
    ),
  ],
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .online-hero-image {
    -webkit-mask-image: linear-gradient(to right,
        transparent 0%,
        rgba(0, 0, 0, 0.35) 10%,
        rgba(0, 0, 0, 0.7) 22%,
        rgba(0, 0, 0, 0.9) 32%,
        #000 40%);
    mask-image: linear-gradient(to right,
        transparent 0%,
        rgba(0, 0, 0, 0.35) 10%,
        rgba(0, 0, 0, 0.7) 22%,
        rgba(0, 0, 0, 0.9) 32%,
        #000 40%);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
}
</style>
