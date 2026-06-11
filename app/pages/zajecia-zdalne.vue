<script setup>
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.onlineClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const benefits = [
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
    body: 'Mieszkasz dalej niż Rumia, Reda czy Gdynia? Żaden problem. Zajęcia zdalne są dostępne z całej Polski, więc możesz uczyć się w Talkaterii bez organizowania dojazdów.',
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

const usefulWhen = [
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

const lessonFlow = [
  'spotykamy się na Zoomie o ustalonej godzinie',
  'pracujemy na rozmowie, wspólnych materiałach i zadaniach dopasowanych do celu',
  'po lekcji możesz dostać krótką powtórkę, zadanie lub materiały do utrwalenia',
  'kolejne spotkanie zaczynamy od sprawdzenia, co zostało w głowie i co wymaga powrotu',
]

const forWhom = [
  {
    title: 'Dorośli',
    body: 'Dla osób, które chcą wrócić do angielskiego, mówić swobodniej albo uczyć się języka do pracy i podróży bez dokładania dojazdów do planu dnia.',
  },
  {
    title: 'Uczniowie i maturzyści',
    body: 'Dla uczniów, którzy potrzebują regularnego wsparcia, powtórek, przygotowania do sprawdzianów, egzaminu ósmoklasisty albo matury.',
  },
  {
    title: 'Osoby spoza Rumi',
    body: 'Dla kursantów z Redy, Gdyni, innych miast i całej Polski, którzy chcą uczyć się w Talkaterii, ale nie mogą lub nie chcą regularnie dojeżdżać do studia.',
  },
]

const priceOptions = getPricingPlans('onlineClasses')
const highlightedPrices = priceOptions.filter((option) =>
  [
    'individualAnnualWeekly',
    'duoAnnualWeekly',
    'miniIndividual',
    'occasionalIndividual',
  ].includes(option.id),
)

const faqs = [
  {
    q: 'Czy zajęcia zdalne są tak samo skuteczne jak stacjonarne?',
    a: 'Tak, jeśli są dobrze prowadzone i regularne. Program, tempo pracy i informacja zwrotna pozostają takie same jak w studiu, a forma online daje dodatkowo wygodę, oszczędność czasu i większą odporność na codzienne zmiany planu.',
  },
  {
    q: 'Czego potrzebuję do lekcji online?',
    a: 'Wystarczy stabilne połączenie internetowe, komputer lub tablet, kamerka, mikrofon i spokojne miejsce do rozmowy. Link do spotkania dostajesz przed zajęciami.',
  },
  {
    q: 'Czy online można przygotować się do egzaminu?',
    a: 'Tak. Zdalnie można pracować na arkuszach, strategiach, słuchaniu, czytaniu, gramatyce i pisaniu. To dobra forma zarówno do egzaminu ósmoklasisty, jak i matury z angielskiego.',
  },
  {
    q: 'Czy mogę łączyć zajęcia zdalne ze stacjonarnymi?',
    a: 'Tak, jeśli pozwala na to grafik. Część kursantów uczy się głównie w studiu, a pojedyncze lekcje robi online, gdy dojazd danego dnia jest niewygodny.',
  },
  {
    q: 'Czy zajęcia online są dostępne tylko dla osób z okolic Rumi?',
    a: 'Nie. W zajęciach zdalnych możesz uczestniczyć z dowolnego miejsca w Polsce. To dobre rozwiązanie, jeśli mieszkasz dalej, często wyjeżdżasz albo po prostu chcesz uczyć się bez dojazdów.',
  },
  {
    q: 'Co jeśli gorzej się czuję w dniu lekcji?',
    a: 'Jeśli choroba wymaga odpoczynku, lepiej przełożyć zajęcia. Jeśli jednak czujesz się wystarczająco dobrze na spokojną pracę, lekcja online pozwala zostać w domu i nie wypaść z rytmu nauki.',
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const areaServed = [
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'City', name: 'Reda' },
  { '@type': 'City', name: 'Gdynia' },
]

useSeoMeta({
  title: 'Zajęcia zdalne z angielskiego',
  description:
    'Zajęcia zdalne z angielskiego w Talkaterii: lekcje online na Zoomie z całej Polski, bez dojazdów, z indywidualnym planem i materiałami dopasowanymi do celu.',
  keywords:
    'zajęcia zdalne angielski, angielski online Rumia, lekcje angielskiego online Reda, angielski online Gdynia, korepetycje angielski online, angielski online cała Polska',
  ogTitle: 'Zajęcia zdalne z angielskiego | Talkateria',
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
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Zajęcia zdalne z angielskiego',
        serviceType: 'Lekcje języka angielskiego online',
        description:
          'Indywidualne i kameralne zajęcia z języka angielskiego online na platformie Zoom.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Talkateria',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Wrocławska 2',
            addressLocality: 'Rumia',
            addressCountry: 'PL',
          },
        },
        areaServed,
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
        offers: priceOptions.map((option) => ({
          '@type': 'Offer',
          name: option.name,
          price: option.schemaPrice ?? option.price.match(/\d+/)?.[0],
          priceCurrency: 'PLN',
          description: `${option.price}. ${option.details}`,
        })),
        url: pageUrl,
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: `${pageUrl}#faq`,
        inLanguage: 'pl-PL',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Oferta',
            item: `${SITE_URL}${ROUTES.offer}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Zajęcia zdalne',
            item: pageUrl,
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <section
      class="relative isolate overflow-hidden border-b border-border bg-foreground text-primary-foreground"
    >
      <img
        src="/lesson-1.webp"
        alt="Kursanci ćwiczący rozmowę po angielsku podczas zajęć"
        class="absolute inset-0 -z-20 h-full w-full object-cover"
        width="1024"
        height="1024"
        fetchpriority="high"
      />
      <div
        class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,31,55,0.88),rgba(17,31,55,0.64),rgba(17,31,55,0.2))]"
      />

      <div
        class="mx-auto flex min-h-[68svh] max-w-6xl items-center px-6 py-14 md:min-h-[70svh] md:py-20"
      >
        <div class="max-w-2xl">
          <span
            class="inline-flex rounded-full bg-background/92 px-4 py-1.5 text-sm font-medium text-primary shadow-sm"
          >
            Angielski online na Zoomie
          </span>
          <h1
            class="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Zajęcia zdalne z angielskiego bez dojazdów i bez tracenia jakości.
          </h1>
          <p
            class="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/88"
          >
            Uczysz się tam, gdzie jest Ci wygodnie, a lekcja nadal ma jasny
            plan, aktywną rozmowę, indywidualną informację zwrotną i materiały
            dopasowane do Twojego celu. Bez dojazdów, także wtedy, gdy mieszkasz
            daleko od Rumi.
          </p>
          <div class="mt-7 flex flex-wrap gap-4">
            <NuxtLink
              :to="ROUTES.contact"
              class="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Zapytaj o zajęcia online
            </NuxtLink>
            <NuxtLink
              :to="ROUTES.prices"
              class="inline-flex items-center justify-center rounded-full border border-primary-foreground/45 bg-primary-foreground/10 px-6 py-3 text-sm font-medium text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/18"
            >
              Zobacz cennik
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid gap-5 md:grid-cols-4">
          <div>
            <p class="font-serif text-3xl font-semibold text-primary">Zoom</p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
              lekcje online w stałym, prostym formacie
            </p>
          </div>
          <div>
            <p class="font-serif text-3xl font-semibold text-primary">
              1:1 / DUO
            </p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
              indywidualnie albo w parze
            </p>
          </div>
          <div>
            <p class="font-serif text-3xl font-semibold text-primary">Rumia+</p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
              wygodnie dla osób z całej Polski
            </p>
          </div>
          <div>
            <p class="font-serif text-3xl font-semibold text-primary">Plan</p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
              materiały i tempo dopasowane do celu nauki
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div class="max-w-3xl">
        <span
          class="text-sm font-medium uppercase tracking-widest text-primary"
        >
          Zalety zajęć zdalnych
        </span>
        <h2
          class="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          Online ma sens, kiedy lekcja jest dobrze zaplanowana.
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Zajęcia zdalne w Talkaterii nie są „gorszą wersją” spotkania w studiu.
          To wygodna forma pracy dla osób, które chcą uczyć się regularnie,
          mówić więcej i nie dokładać do nauki kolejnej logistyki: dojazdów,
          odwoływania zajęć przy drobnym spadku formy czy rezygnacji z kursu
          tylko dlatego, że mieszkają dalej.
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 class="font-serif text-xl font-semibold text-foreground">
            {{ benefit.title }}
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {{ benefit.body }}
          </p>
        </article>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
          >
            Kiedy online się przydaje?
          </span>
          <h2
            class="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Zdalne zajęcia pomagają utrzymać kurs, gdy życie robi swoje.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Największą zaletą online jest ciągłość. Nie chodzi tylko o wygodę,
            ale o to, że mniej rzeczy wybija Cię z nauki: odległość, słabszy
            dzień, korki, deszcz, wyjazd albo zwyczajnie napięty grafik.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2">
          <article
            v-for="situation in usefulWhen"
            :key="situation.title"
            class="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 class="font-serif text-xl font-semibold text-foreground">
              {{ situation.title }}
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {{ situation.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-secondary">
      <div
        class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20"
      >
        <div>
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
          >
            Przebieg lekcji
          </span>
          <h2
            class="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground"
          >
            Jak wyglądają zajęcia online?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Pracujemy podobnie jak w studiu: dużo rozmowy, jasne zadania,
            korekta błędów i regularne wracanie do materiału. Różnica polega na
            tym, że spotykamy się przez ekran, a wszystkie potrzebne materiały
            są dostępne cyfrowo. Jeśli danego dnia potrzebujesz spokojniejszego
            tempa, też da się to uwzględnić.
          </p>
        </div>

        <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ol class="space-y-5">
            <li
              v-for="(step, index) in lessonFlow"
              :key="step"
              class="flex gap-4 text-muted-foreground"
            >
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
              >
                {{ index + 1 }}
              </span>
              <span class="pt-1 leading-relaxed">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div class="max-w-3xl">
        <span
          class="text-sm font-medium uppercase tracking-widest text-primary"
        >
          Dla kogo?
        </span>
        <h2
          class="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          Dobra opcja, gdy liczy się elastyczność i regularność.
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Zajęcia online są dla osób, które chcą mieć stały kontakt z językiem,
          ale nie zawsze mogą lub chcą pojawiać się w studiu. Sprawdzają się
          zarówno jako podstawowa forma kursu, jak i elastyczne uzupełnienie
          lekcji stacjonarnych.
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article
          v-for="group in forWhom"
          :key="group.title"
          class="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 class="font-serif text-xl font-semibold text-foreground">
            {{ group.title }}
          </h3>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {{ group.body }}
          </p>
        </article>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div
        class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-20"
      >
        <div>
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
          >
            Ceny
          </span>
          <h2
            class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground"
          >
            Ile kosztują zajęcia zdalne?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Zajęcia online korzystają z tych samych pakietów co pozostałe formy
            nauki. Możesz wybrać pakiet roczny, krótszy pakiet MINI, lekcję
            okazjonalną albo naukę w parze.
          </p>
          <NuxtLink
            :to="ROUTES.prices"
            class="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Zobacz pełny cennik
          </NuxtLink>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="option in highlightedPrices"
            :key="option.name"
            class="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <h3 class="font-serif text-xl font-semibold text-foreground">
              {{ option.name }}
            </h3>
            <p class="mt-2 text-lg font-semibold text-primary">
              {{ option.price }}
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {{ option.frequency }}
              </span>
              <span
                class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {{ option.duration }}
              </span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ option.details }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" class="mx-auto max-w-3xl scroll-mt-24 px-6 py-16">
      <h2
        class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground"
      >
        Najczęstsze pytania o zajęcia zdalne
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.q }}</span>
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === index }"
                aria-hidden="true"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </h3>
          <p
            :id="`faq-answer-${index}`"
            v-show="openFaqIndex === index"
            class="pb-6 text-pretty leading-relaxed text-muted-foreground"
          >
            {{ faq.a }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-16">
      <div
        class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 py-12 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)]"
      >
        <h2
          class="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-primary-foreground"
        >
          Chcesz uczyć się angielskiego bez dojazdów?
        </h2>
        <p
          class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85"
        >
          Napisz, jaki jest Twój cel i czy wolisz zajęcia 1:1, DUO czy
          przygotowanie egzaminacyjne. Dobierzemy formę i termin online.
        </p>
        <NuxtLink
          :to="ROUTES.contact"
          class="mt-7 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Skontaktuj się
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
