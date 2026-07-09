<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.onlineClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('onlineClasses')
const morningOnlinePromotion = getPricingPromotion('morningOnline')
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
const morningOnlineOptions = getPricingPlans('morningOnline')
const morningOnlineIndividualStandard = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningIndividualAnnualWeekly',
)
const morningOnlineIndividualIntense = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningIndividualAnnualTwiceWeekly',
)
const morningOnlineDuoStandard = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningDuoAnnualWeekly',
)
const morningOnlineDuoIntense = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningDuoAnnualTwiceWeekly',
)
const morningOnlineOccasionalIndividual = morningOnlineOptions.find(
  (option) => option.id === 'occasionalMorningOnlineIndividual',
)
const morningOnlineOccasionalDuo = morningOnlineOptions.find(
  (option) => option.id === 'occasionalMorningOnlineDuo',
)
const paymentWithoutPrefix = (value) => value.replace(/^miesięcznie:\s*/, '')
const formatPriceValue = (value) => {
  const formatted = value.toFixed(2).replace('.', ',')
  return `${formatted.endsWith(',00') ? formatted.slice(0, -3) : formatted} zł`
}

const totalPriceFromInstallments = (
  plan,
  installmentPrice = Number(plan.schemaPrice),
) => {
  const installments = Number.parseInt(plan.price, 10)
  const suffix = plan.price.includes('/ osoba') ? ' / osoba' : ''

  return `${formatPriceValue(installments * installmentPrice)}${suffix}`
}

const installmentPaymentLine = (
  plan,
  installmentPrice = Number(plan.schemaPrice),
) => {
  const suffix = plan.price.includes('/ osoba') ? ' / osoba' : ''

  return `${Number.parseInt(plan.price, 10)} rat × ${formatPriceValue(
    installmentPrice,
  )}${suffix}`
}

const priceDetailLine = (
  plan,
  payment = plan.price,
  totalPrice = plan.priceDetails?.totalPrice ?? plan.price,
) => ({
  payment,
  totalPrice,
})

const buildPaymentLine = (label, plan, morningPlan = plan) => ({
  standard: priceDetailLine(
    plan,
    `${label}: ${paymentWithoutPrefix(plan.paymentNote)}`,
  ),
  morning: priceDetailLine(
    morningPlan,
    `${label}: ${paymentWithoutPrefix(morningPlan.paymentNote)}`,
  ),
})
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const priceWithContext = (plan) =>
  `${personPrice(plan.fromPrice)} ${plan.fromPriceContext}`
const individualAnnualPrice = priceWithContext(individualAnnualIntense)
const morningOnlinePriceRatio =
  Number(morningOnlineIndividualStandard.schemaPrice) /
  Number(individualAnnualStandard.schemaPrice)
const miniIndividualMorningInstallment =
  Number(miniIndividual.schemaPrice) * morningOnlinePriceRatio
const miniDuoMorningInstallment =
  Number(miniDuo.schemaPrice) * morningOnlinePriceRatio
const miniIndividualPaymentLine = {
  standard: priceDetailLine(
    miniIndividual,
    `24 lekcje: ${miniIndividual.price}`,
  ),
  morning: priceDetailLine(
    miniIndividual,
    `24 lekcje: ${installmentPaymentLine(
      miniIndividual,
      miniIndividualMorningInstallment,
    )}`,
    totalPriceFromInstallments(
      miniIndividual,
      miniIndividualMorningInstallment,
    ),
  ),
}
const miniDuoPaymentLine = {
  standard: priceDetailLine(miniDuo, `24 lekcje: ${miniDuo.price}`),
  morning: priceDetailLine(
    miniDuo,
    `24 lekcje: ${installmentPaymentLine(
      miniDuo,
      miniDuoMorningInstallment,
    )}`,
    totalPriceFromInstallments(miniDuo, miniDuoMorningInstallment),
  ),
}
const individualAnnualPaymentLines = [
  miniIndividualPaymentLine,
  buildPaymentLine(
    '32 lekcje',
    individualAnnualStandard,
    morningOnlineIndividualStandard,
  ),
  buildPaymentLine(
    '64 lekcje',
    individualAnnualIntense,
    morningOnlineIndividualIntense,
  ),
]
const duoAnnualPaymentLines = [
  miniDuoPaymentLine,
  buildPaymentLine('32 lekcje', duoAnnualStandard, morningOnlineDuoStandard),
  buildPaymentLine('64 lekcje', duoAnnualIntense, morningOnlineDuoIntense),
]
const morningOnlinePrices = {
  individual: morningOnlineIndividualIntense.fromPrice,
  duo: morningOnlineDuoIntense.fromPrice,
  occasionalIndividual: morningOnlineOccasionalIndividual.price,
  occasionalDuo: morningOnlineOccasionalDuo.price,
}

const highlightedPrices = [
  {
    ...individualAnnualIntense,
    name: 'Pakiety 1:1 online',
    frequency: '24/32/64 lekcje',
    pricePrefix: 'od',
    standardLessonPrice: individualAnnualIntense.fromPrice,
    morningLessonPrice: morningOnlineIndividualIntense.fromPrice,
    lessonPriceContext: individualAnnualIntense.fromPriceContext,
    paymentLines: individualAnnualPaymentLines,
    details:
      'Pakiet MINI, Standard lub Intense dla osób, które chcą uczyć się online regularnie, z programem dopasowanym do celu.',
  },
  {
    ...duoAnnualIntense,
    name: 'Pakiety DUO online',
    frequency: '24/32/64 lekcje',
    pricePrefix: 'od',
    standardLessonPrice: duoAnnualIntense.fromPrice,
    morningLessonPrice: morningOnlineDuoIntense.fromPrice,
    lessonPriceContext: duoAnnualIntense.fromPriceContext,
    paymentLines: duoAnnualPaymentLines,
    details:
      'Pakiet MINI, Standard lub Intense dla dwóch osób uczących się razem online w podobnym rytmie.',
  },
  {
    ...occasionalIndividual,
    standardLessonPrice: occasionalIndividual.price,
    morningLessonPrice: morningOnlineOccasionalIndividual.price,
    lessonPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: [
      {
        standard: priceDetailLine(
          occasionalIndividual,
          'płatność za pojedynczą lekcję',
        ),
        morning: priceDetailLine(
          morningOnlineOccasionalIndividual,
          'płatność za pojedynczą lekcję',
        ),
      },
    ],
  },
]

const faqs = [
  {
    q: 'Ile kosztują lekcje angielskiego online?',
    a: `Popołudniowo-wieczorne pakiety 1:1 online zaczynają się od ${individualAnnualPrice}. Poranny wariant online do godziny ${morningOnlinePromotion.deadlineHour} zaczyna się od ${morningOnlinePrices.individual} za lekcję 50 min w pakiecie 1:1 oraz od ${morningOnlinePrices.duo} za lekcję 50 min w pakiecie DUO. Lekcja okazjonalna w porannym wariancie online kosztuje ${morningOnlinePrices.occasionalIndividual} w formule 1:1 albo ${personPrice(morningOnlinePrices.occasionalDuo)} w DUO. Pod ceną podana jest miesięczna płatność i liczba rat, np. w pakiecie 1:1 Standard: 32 lekcje - ${paymentWithoutPrefix(individualAnnualStandard.paymentNote)}, a w pakiecie 1:1 Intense: 64 lekcje - ${paymentWithoutPrefix(individualAnnualIntense.paymentNote)}.`,
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

const openFaqIndex = ref(null)
const selectedOnlineTime = ref('morning')
const openPriceDetailsId = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
const toggleOnlineTime = () => {
  openPriceDetailsId.value = null

  if (selectedOnlineTime.value === 'morning') {
    selectedOnlineTime.value = 'afternoon'
    return
  }
  selectedOnlineTime.value = 'morning'
}

const getOnlinePriceDetailsId = (option) =>
  `online-price-details-${option.id}-${selectedOnlineTime.value}`

const isOccasionalPriceOption = (option) => option.id.startsWith('occasional')

const isPriceDetailsOpen = (detailsId) => openPriceDetailsId.value === detailsId

const togglePriceDetails = (detailsId) => {
  openPriceDetailsId.value = isPriceDetailsOpen(detailsId) ? null : detailsId
}

useSeoMeta({
  title: 'Angielski online – zajęcia zdalne',
  description:
    'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
  ogTitle: 'Angielski online – zajęcia zdalne | Talkateria',
  ogDescription:
    'Angielski online bez dojazdów, z całej Polski: wygodnie, regularnie i z takim samym indywidualnym podejściem jak w studiu.',
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
          'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
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

<template>
  <main id="main-content">
    <section
      class="relative isolate overflow-hidden border-b border-border bg-foreground text-primary-foreground lg:h-[650px]">
      <img src="/photos/online-hero-960.webp" alt="Osoba uczestnicząca w lekcji angielskiego online przy laptopie"
        class="online-hero-image absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[25%_center] md:w-[70%] md:object-contain md:object-right lg:w-auto lg:max-w-none"
        width="974" height="650" fetchpriority="high" />
      <div
        class="absolute inset-0 -z-10 bg-foreground/75 md:bg-transparent md:bg-[linear-gradient(90deg,#111f37_0%,#111f37_34%,rgba(17,31,55,0.92)_40%,rgba(17,31,55,0.74)_48%,rgba(17,31,55,0.5)_57%,rgba(17,31,55,0.28)_66%,rgba(17,31,55,0.12)_76%,transparent_86%)] lg:hidden" />

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
            <NuxtLink :to="ROUTES.contact"
              class="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
              Zapytaj o zajęcia online
            </NuxtLink>
            <NuxtLink :to="ROUTES.pricesMenu"
              class="inline-flex items-center justify-center rounded-full border border-primary-foreground/45 bg-primary-foreground/10 px-6 py-3 text-sm font-medium text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/18">
              Zobacz cennik
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-secondary">
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

    <section class="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div class="max-w-3xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Zalety zajęć zdalnych
        </span>
        <h2 class="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Dlaczego warto wybrać zajęcia online?
        </h2>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Zero dojazdów
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Nie tracisz czasu na korki, szukanie parkingu, przesiadki ani
            pogodowe niespodzianki. Wystarczy komputer lub tablet, spokojne
            miejsce i kilka minut na przygotowanie przed lekcją.
          </p>
        </article>
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Nie wypadasz z rytmu tak łatwo
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Jeśli w dniu zajęć czujesz się gorzej, ale nadal masz siłę na
            spokojną pracę, nie musisz od razu przenosić lekcji. Możesz zostać w
            domu, mieć koc i herbatę obok, a mimo to utrzymać kontakt z
            językiem.
          </p>
        </article>
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Odległość przestaje mieć znaczenie
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Mieszkasz dalej niż Rumia? Żaden problem. Zajęcia zdalne są dostępne
            z całej Polski, więc możesz uczyć się w Talkaterii bez organizowania
            dojazdów.
          </p>
        </article>
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Łatwiej dopasować naukę do dnia
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Online sprawdza się przy pracy zmianowej, napiętym planie lekcji,
            opiece nad dzieckiem albo wtedy, gdy po prostu trudno wcisnąć dojazd
            między kolejne obowiązki.
          </p>
        </article>
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Materiały są zawsze pod ręką
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Notatki, linki, ćwiczenia i powtórki mogą trafiać w jedno cyfrowe
            miejsce, więc łatwiej wracać do nich między lekcjami i nadrabiać
            drobne zaległości.
          </p>
        </article>
        <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 class="font-serif text-xl font-semibold text-foreground">
            Komfort sprzyja mówieniu
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Własne biurko i spokojne otoczenie często pomagają przełamać barierę
            językową. Nadal pracujemy aktywnie: rozmawiamy, poprawiamy błędy i
            ćwiczymy reakcje.
          </p>
        </article>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Kiedy najbardziej docenisz naukę online?
          </span>
          <h2 class="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Zdalne zajęcia pomagają utrzymać kurs, gdy życie robi swoje.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Największą zaletą online jest ciągłość. Nie chodzi tylko o wygodę,
            ale o to, że mniej rzeczy wybija Cię z nauki: odległość, słabszy
            dzień, korki, deszcz, wyjazd albo zwyczajnie napięty grafik.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2">
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Kiedy dojazd zabiera więcej energii niż sama nauka
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Po szkole, pracy albo dodatkowych zajęciach czasem najtrudniejsza
              jest logistyka. Online skraca drogę do lekcji do jednego
              kliknięcia.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Kiedy pogoda, korki albo choroba mieszają w planie
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Nie każda gorsza dyspozycja oznacza, że trzeba odwoływać zajęcia.
              Jeśli możesz pracować, spotykamy się zdalnie i robimy lekcję w
              spokojniejszym tempie.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Kiedy mieszkasz poza Trójmiastem
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Zdalnie możesz uczyć się z małej miejscowości, innego województwa
              albo z miejsca, do którego trudno byłoby regularnie dojeżdżać do
              studia.
            </p>
          </article>
          <article class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-foreground">
              Kiedy jesteś w podróży lub zmieniasz miejsce pobytu
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Wyjazd rodzinny, delegacja czy czasowy pobyt poza domem nie muszą
              przerywać kursu, jeśli masz internet i spokojną przestrzeń do
              rozmowy.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-border">
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

    <section class="border-b border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Ceny
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ile kosztują zajęcia zdalne?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cena zależy od formy nauki - indywidualnie lub w parze - oraz od liczby lekcji w
            pakiecie.
          </p>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Standardowy cennik dotyczy zajęć w godzinach popołudniowo-wieczornych
            oraz lekcji w weekendy.
          </p>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Jeśli masz możliwość nauki rano, wybierz tańszy wariant zajęć online, który obowiązuje
            od poniedziałku do piątku (do godziny
            {{ morningOnlinePromotion.deadlineHour }}) To świetna opcja dla osób z elastycznym
            grafikiem, które chcą uczyć się w spokojniejszych godzinach dnia i jednocześnie
            oszczędzić.
          </p>
          <NuxtLink :to="ROUTES.pricesMenu"
            class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz pełny cennik
          </NuxtLink>
        </div>

        <div class="mt-10 inline-flex rounded-full border border-border bg-card p-1 shadow-sm"
          aria-label="Wybierz porę zajęć online">
          <button type="button" class="rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            :class="selectedOnlineTime === 'morning'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
              " :aria-pressed="selectedOnlineTime === 'morning'" @click="toggleOnlineTime">
            Zajęcia rano
          </button>
          <button type="button" class="rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            :class="selectedOnlineTime === 'afternoon'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
              " :aria-pressed="selectedOnlineTime === 'afternoon'" @click="toggleOnlineTime">
            Po południu
          </button>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <article v-for="option in highlightedPrices" :key="option.name"
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
              <div v-show="selectedOnlineTime === 'afternoon'">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Cena standardowa
                </p>
                <p class="mt-1 font-serif text-2xl font-semibold text-primary">
                  <span v-if="option.pricePrefix">{{ option.pricePrefix }}
                  </span>
                  {{ option.standardLessonPrice }}
                </p>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ option.lessonPriceContext }}
                </p>
              </div>
              <div v-show="selectedOnlineTime === 'morning'">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Poranny wariant online
                </p>
                <p class="mt-1 font-serif text-2xl font-semibold text-primary">
                  <span v-if="option.pricePrefix">{{ option.pricePrefix }}
                  </span>
                  {{ option.morningLessonPrice }}
                </p>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ option.lessonPriceContext }} do godziny
                  {{ morningOnlinePromotion.deadlineHour }}
                </p>
              </div>
            </div>
            <div class="mt-4 rounded-xl bg-muted px-4 py-3">
              <p v-if="isOccasionalPriceOption(option)"
                class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Szczegóły ceny
              </p>
              <button v-else type="button"
                class="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold leading-none text-primary transition-colors hover:text-foreground"
                :aria-expanded="isPriceDetailsOpen(getOnlinePriceDetailsId(option))"
                :aria-controls="getOnlinePriceDetailsId(option)"
                @click="togglePriceDetails(getOnlinePriceDetailsId(option))">
                <span>Szczegóły ceny</span>
                <svg class="h-3.5 w-3.5 shrink-0 translate-y-px transition-transform"
                  :class="{ 'rotate-180': isPriceDetailsOpen(getOnlinePriceDetailsId(option)) }" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div :id="getOnlinePriceDetailsId(option)"
                v-show="isOccasionalPriceOption(option) || isPriceDetailsOpen(getOnlinePriceDetailsId(option))"
                class="mt-1 text-xs leading-snug text-muted-foreground">
                <div v-show="selectedOnlineTime === 'afternoon'" class="space-y-1.5">
                  <div v-for="line in option.paymentLines" :key="line.standard.payment" class="space-y-0.5">
                    <p>
                      <span class="font-medium text-foreground/75">
                        Płatność:
                      </span>
                      {{ line.standard.payment }}
                    </p>
                    <p v-if="line.standard.totalPrice">
                      <span class="font-medium text-foreground/75">
                        Cena całkowita:
                      </span>
                      {{ line.standard.totalPrice }}
                    </p>
                  </div>
                </div>
                <div v-show="selectedOnlineTime === 'morning'" class="space-y-1.5">
                  <div v-for="line in option.paymentLines" :key="line.morning.payment" class="space-y-0.5">
                    <p>
                      <span class="font-medium text-foreground/75">
                        Płatność:
                      </span>
                      {{ line.morning.payment }}
                    </p>
                    <p v-if="line.morning.totalPrice">
                      <span class="font-medium text-foreground/75">
                        Cena całkowita:
                      </span>
                      {{ line.morning.totalPrice }}
                    </p>
                  </div>
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

    <section id="faq" class="scroll-mt-24 border-y border-border">
      <div class="mx-auto max-w-3xl px-6 py-16">
        <h2 class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground">
          Najczęstsze pytania o zajęcia zdalne
        </h2>
        <div class="mt-10 divide-y divide-border border-y border-border">
          <div v-for="(faq, index) in faqs" :key="faq.q">
            <h3>
              <button type="button"
                class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
                :aria-expanded="openFaqIndex === index" :aria-controls="`faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
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
            <p :id="`faq-answer-${index}`" v-show="openFaqIndex === index"
              class="whitespace-pre-line pb-6 text-pretty leading-relaxed text-muted-foreground">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto px-5 py-16 bg-secondary">
      <div
        class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 py-12 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)]">
        <h2 class="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-primary-foreground">
          Chcesz uczyć się angielskiego online?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
          Napisz, jaki jest Twój cel. Wspólnie dobierzemy idealną formę i
          dogodny termin.
        </p>
        <NuxtLink :to="ROUTES.contact"
          class="mt-7 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
          Skontaktuj się
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

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
