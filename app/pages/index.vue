<script setup>
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildHomePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.home
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title:
    'Angielski Rumia - zajęcia dla dorosłych i młodzieży, stacjonarne oraz online',
  description:
    'Kameralne lekcje angielskiego w Rumi dla młodzieży oraz dorosłych. Indywidualnie, w duecie lub małej grupie, z naciskiem na swobodne mówienie.',
  ogTitle: 'Angielski w Rumi i online | Talkateria',
  ogDescription:
    'Kameralne zajęcia z angielskiego w Rumi i online dla młodzieży oraz dorosłych. Mniej stresu, więcej mówienia i praktyki.',
})

const features = [
  {
    title: 'Indywidualne podejście',
    body: 'Dostosowuję tempo nauki, metody pracy i materiały do potrzeb, poziomu oraz celów każdego kursanta.',
  },
  {
    title: 'Nauka bez stresu',
    body: 'Dobra atmosfera to podstawa skutecznej nauki. Dlatego dbam o to, aby każdy kursant czuł się swobodnie i mógł rozwijać swoje umiejętności bez zbędnej presji.',
  },
  {
    title: 'Więcej mówienia, mniej chaosu',
    body: 'Małe grupy i zajęcia indywidualne dają realny czas na rozmowę, pytania, korektę i spokojne wyjaśnienie trudniejszych tematów.',
  },
]

const whyTalkateria = [
  {
    title: 'Uczysz się z jednym lektorem',
    body: 'Zajęcia prowadzę osobiście, znam Twój poziom, cel i sposób pracy. Nie zaczynasz od nowa co kilka tygodni.',
  },
  {
    title: 'Małe grupy i dużo mówienia',
    body: 'Na lekcji nie chowasz się w tłumie. Każdy kursant ma realny czas na rozmowę, korektę i zadanie pytań.',
  },
  {
    title: 'Spokojne tempo bez presji',
    body: `Zajęcia prowadzone są w spokojnym tempie, bez presji, tak aby uczeń czuł się
swobodnie i miał czas na zrozumienie materiału.`,
  },
  {
    title: 'Nauka języka dopasowana do Twojego celu',
    body: `Każde zajęcia dopasowuję indywidualnie do celu i potrzeb każdego ucznia.`,
  },
]

const photos = [
  {
    src: '/lesson-1.webp',
    class: 'col-span-2 row-span-2',
    alt: 'Sala Talkaterii z zieloną ścianą, stołem do zajęć i materiałami do nauki',
    width: 1200,
    height: 900,
  },
  {
    src: '/lesson-2.webp',
    alt: 'Kameralna przestrzeń zajęć w studiu Talkateria',
    width: 1200,
    height: 554,
    imageClass: 'object-left',
  },
  {
    src: '/lesson-3.webp',
    alt: 'Wejście do studia Talkateria z poczekalnią dla kursantów',
    width: 760,
    height: 570,
  },
  {
    src: '/lesson-4.webp',
    alt: 'Wnętrze studia Talkateria z materiałami do nauki języka angielskiego',
    width: 1200,
    height: 665,
  },
]

const landingLinks = [
  {
    to: ROUTES.eighthGradeExam,
    eyebrow: 'Dla klas 7-8',
    title: 'Przygotowanie do egzaminu ósmoklasisty',
    body: `Skuteczne przygotowanie do Egzaminu Ósmoklasisty z języka angielskiego. Zajęcia obejmują
      powtórkę gramatyki i słownictwa, ćwiczenie typowych zadań egzaminacyjnych oraz naukę
      strategii, które pomagają lepiej wykorzystać czas i osiągnąć jak najlepszy wynik.`,
  },
  {
    to: ROUTES.maturaExam,
    eyebrow: 'Dla liceum i technikum',
    title: 'Przygotowanie do matury',
    body: `Kompleksowe przygotowanie do matury z języka angielskiego na poziomie podstawowym i
      rozszerzonym. Obejmuje ćwiczenie wszystkich typów zadań egzaminacyjnych, rozwijanie
      umiejętności językowych oraz poznawanie skutecznych strategii egzaminacyjnych.`,
  },
  {
    to: ROUTES.adultClasses,
    eyebrow: 'Dla dorosłych',
    title: 'Zajęcia konwersacyjne',
    body: `Praktyczne zajęcia nastawione na rozwijanie umiejętności mówienia. Obejmują swobodne
      rozmowy, utrwalanie najważniejszych struktur gramatycznych oraz poszerzanie słownictwa,
      dzięki czemu uczestnicy zyskują większą płynność i pewność siebie w komunikacji po
      angielsku.`,
  },
  {
    to: ROUTES.onlineClasses,
    eyebrow: 'Online',
    title: 'Lekcje języka angielskiego online',
    body: 'Ucz się angielskiego z dowolnego miejsca. Zajęcia online to wygodna i skuteczna forma nauki bez konieczności dojazdów.',
  },
]

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    jsonLdScript(
      buildHomePageJsonLd({
        pageUrl,
        pageName: 'Angielski Rumia - lekcje dla dorosłych i młodzieży',
        pageDescription:
          'Kameralne lekcje języka angielskiego w Rumi dla młodzieży i dorosłych: zajęcia indywidualne, DUO, przygotowanie do egzaminów i konwersacje.',
        audience: {
          '@type': 'Audience',
          audienceType: 'młodzież i dorośli',
        },
      }),
    ),
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:pb-24">
      <div class="flex flex-col gap-6">
        <span
          class="order-3 inline-flex self-start items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm md:order-1">
          Konwersacje • Materiał szkolny • Egzaminy
        </span>
        <h1
          class="order-1 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:order-2 md:text-5xl">
          Talkateria - English Studio
        </h1>
        <p class="order-2 max-w-md text-pretty text-justify text-lg leading-relaxed text-muted-foreground md:order-3">
          Kameralne studio języka angielskiego w Rumi. Pomagam młodzieży i
          dorosłym rozwijać pewność siebie w mówieniu po angielsku, przygotować
          się do matury i egzaminu ósmoklasisty oraz skutecznie radzić sobie z
          materiałem szkolnym.
        </p>
        <div class="order-4 flex flex-wrap items-center gap-4">
          <NuxtLink :to="ROUTES.contact"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.22)] transition-all hover:-translate-y-0.5 hover:opacity-90">
            Sprawdź wolne terminy →
          </NuxtLink>
          <NuxtLink :to="ROUTES.offer"
            class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Zobacz ofertę
          </NuxtLink>
        </div>
      </div>

      <div class="relative">
        <div
          class="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_70px_rgba(17,17,17,0.08)]">
          <img src="/studio-hero-1200.webp" srcset="
              /studio-hero-800.webp   800w,
              /studio-hero-1200.webp 1080w
            " sizes="(min-width: 768px) 50vw, 100vw" alt="Jasne i przytulne wnętrze studia Talkateria"
            class="block h-auto w-full object-contain" width="1080" height="616" fetchpriority="high" />
        </div>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="mb-8 max-w-2xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Wybierz cel nauki
          </span>
          <h2 class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Wybierz zajęcia dopasowane do swoich potrzeb.
          </h2>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <NuxtLink v-for="link in landingLinks" :key="link.to" :to="link.to"
            class="group flex min-h-[210px] flex-col justify-start rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_38px_rgba(24,55,110,0.09)]">
            <span class="text-xs font-semibold uppercase text-primary">
              {{ link.eyebrow }}
            </span>
            <span>
              <span
                class="flex min-h-[90px] items-center font-serif text-2xl font-semibold leading-tight text-foreground">
                {{ link.title }}
              </span>
              <span class="mt-3 block text-sm leading-relaxed text-muted-foreground">
                {{ link.body }}
              </span>
            </span>
            <span class="mt-auto pt-5 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
              Zobacz szczegóły →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="space-y-3">
          <h2 class="font-serif text-xl font-semibold text-foreground">
            {{ feature.title }}
          </h2>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            {{ feature.body }}
          </p>
        </div>
      </div>
    </section>

    <section class="border-y border-border bg-secondary about-me">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div class="relative mx-auto max-w-[18rem] sm:max-w-[20rem] md:mx-0 md:max-w-none">
            <div class="aspect-square overflow-hidden rounded-full border border-border shadow-sm">
              <img src="/teacher-portrait.webp" alt="Portret Agaty, lektorki i założycielki studia"
                class="h-full w-full rounded-full object-cover" width="1024" height="1024" loading="lazy" />
            </div>
            <div
              class="absolute bottom-4 right-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/95 px-4 py-2 text-center shadow-sm backdrop-blur-sm sm:bottom-5 sm:right-3 sm:px-5 sm:py-2.5 md:right-4">
              <span class="font-serif text-2xl font-semibold leading-none text-primary sm:text-3xl">8+</span>
              <span class="text-xs font-medium leading-tight text-muted-foreground sm:text-sm">lat doświadczenia</span>
            </div>
          </div>
          <div class="space-y-5">
            <span class="text-sm font-medium uppercase tracking-widest text-primary">Jestem Agata i to właśnie ja
              stworzyłam Talkaterię.</span>

            <div class="space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Jestem magistrem filologii angielskiej oraz lektorką z ponad 8-letnim doświadczeniem w
                nauczaniu dzieci, młodzieży i dorosłych. Pomagam przełamywać barierę mówienia,
                przygotowywać się do egzaminów, poprawiać wyniki w szkole oraz rozwijać praktyczne
                umiejętności językowe.

              </p>
              <p>
                Ukończyłam również studia podyplomowe z coachingu z elementami psychologii, dzięki czemu
                skuteczniej wspieram uczniów w procesie nauki, budowaniu motywacji oraz radzeniu sobie ze
                stresem. Każde zajęcia dostosowuję do indywidualnych potrzeb kursanta, dbając o kameralną
                atmosferę, efektywną naukę i rozwijanie pewności siebie w komunikacji w języku angielskim.

              </p>
            </div>
          </div>
        </div>

        <div class="mt-14">
          <div class="max-w-3xl">
            <h2 class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Dlaczego Talkateria?
            </h2>
          </div>
          <div class="mt-8 grid gap-5 md:grid-cols-4">
            <article v-for="reason in whyTalkateria" :key="reason.title"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 class="font-serif text-xl font-semibold text-foreground">
                {{ reason.title }}
              </h3>
              <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {{ reason.body }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="localization">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="mx-auto mb-10 max-w-4xl space-y-3 text-center">
          <h2 class="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
            Lokalizacja
          </h2>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            Zajęcia odbywają się w nowoczesnym, kameralnym studiu przy ul.
            Wrocławskiej 2 w Rumi (dzielnica Janowo). Lokalizacja zapewnia
            wygodny dojazd zarówno komunikacją miejską, jak i koleją - w pobliżu
            znajdują się przystanki autobusowe oraz stacja SKM Rumia Janowo. Dla
            osób dojeżdżających samochodem dostępny jest duży, ogólnodostępny
            parking przy ul. Gdańskiej.
          </p>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            Dla komfortu kursantów w budynku dostępna jest również niewielka
            poczekalnia, z której można skorzystać przed rozpoczęciem zajęć lub
            w oczekiwaniu na autobus czy pociąg.
          </p>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            Istnieje również możliwość uczestnictwa w zajęciach online. Ten
            rodzaj zajęć pozwala uczyć się wygodnie z dowolnego miejsca bez
            konieczności dojazdów.
          </p>
        </div>
        <div class="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
          <div v-for="photo in photos" :key="photo.src"
            class="group relative overflow-hidden rounded-2xl border border-border" :class="photo.class">
            <img :src="photo.src" :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              :class="photo.imageClass"
              :width="photo.width" :height="photo.height" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <h2 class="text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Dla kogo są zajęcia w Talkaterii?
        </h2>
        <p class="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Jeśli chcesz swobodniej mówić po angielsku, potrzebujesz wsparcia w
          nauce szkolnej albo szukasz sensownego przygotowania do egzaminu,
          znajdziesz tu zajęcia dopasowane do celu i poziomu.
        </p>
        <p class="mt-5 text-pretty leading-relaxed text-muted-foreground">
          To propozycja dla uczniów od klasy 6 szkoły podstawowej, młodzieży i
          dorosłych, którzy chcą uporządkować wiedzę, mówić pewniej i uczyć się
          w tempie, które naprawdę da się utrzymać.
        </p>
        <p class="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Zajęcia prowadzę indywidualnie, w duecie albo w małych grupach, dzięki
          czemu łatwiej dopasować formę nauki do potrzeb i budżetu.
        </p>
      </div>
    </section>

    <section class="cta-contact">
      <div class="mx-auto max-w-6xl px-5 py-16">
        <div
          class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 py-14 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)] md:px-16">
          <h2
            class="mx-auto max-w-2xl text-balance text-center font-serif text-4xl font-semibold leading-tight tracking-tight text-primary-foreground">
            Szukasz zajęć dopasowanych do Twojego celu?
          </h2>
          <p class="mx-auto mt-4 max-w-md text-pretty text-center leading-relaxed text-primary-foreground/80">
            Napisz, dla kogo mają być zajęcia, jaki jest cel nauki i czy
            interesują Cię spotkania w studiu czy online. Otrzymasz propozycję
            najlepszej formy pracy i dostępnych terminów.
          </p>
          <NuxtLink :to="ROUTES.contact"
            class="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
            Przejdź do kontaktu →
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
