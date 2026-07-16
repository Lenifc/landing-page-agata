<template>
  <main id="main-content">
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:pb-24">
      <div class="flex flex-col gap-6">
        <span
          class="order-4 inline-flex self-start items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm md:order-1"
        >
          Konwersacje • Materiał szkolny • Egzaminy
        </span>
        <h1
          class="order-1 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:order-2 md:text-5xl"
        >
          Angielski w Rumi - zajęcia dla młodzieży i dorosłych
        </h1>
        <p
          class="order-3 max-w-md text-pretty text-justify text-lg leading-relaxed text-muted-foreground md:order-4"
        >
          Talkateria English Studio to kameralne studio języka angielskiego w Rumi. Pomagam młodzieży i
          dorosłym rozwijać pewność siebie w mówieniu po angielsku, przygotować
          się do matury i egzaminu ósmoklasisty oraz skutecznie radzić sobie z
          materiałem szkolnym.
        </p>
        <div class="order-5 flex flex-wrap items-center gap-4 md:order-5">
          <UiButton :to="contactCtaPath">Zapytaj o zajęcia →</UiButton>
          <UiButton :to="ROUTES.offer" variant="outline">Zobacz ofertę</UiButton>
        </div>
      </div>

      <div class="relative">
        <div
          class="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card"
        >
          <img
            src="/studio-hero-800.webp"
            srcset="
              /studio-hero-800.webp   800w,
              /studio-hero-1200.webp 1080w
            "
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Jasne i przytulne wnętrze studia Talkateria"
            class="block h-auto w-full object-contain"
            width="1080"
            height="616"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="mb-8 max-w-2xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Wybierz cel nauki
          </span>
          <h2
            class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Wybierz zajęcia dopasowane do swoich potrzeb.
          </h2>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <article
            v-for="path in landingPaths"
            :key="path.id"
            class="group flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-card-hover"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-semibold uppercase text-primary">
                {{ path.eyebrow }}
              </span>
              <span
                v-if="path.badge"
                class="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
              >
                {{ path.badge }}
              </span>
            </div>
            <h3 class="mt-2 font-serif text-xl font-semibold leading-snug text-foreground">
              {{ path.title }}
            </h3>
            <p class="mt-1.5 text-sm leading-snug text-muted-foreground">
              {{ path.body }}
            </p>
            <p
              v-if="path.promoNote"
              class="mt-2 text-xs leading-snug text-primary"
            >
              {{ path.promoNote }}
              <NuxtLink
                :to="ROUTES.promotionRules"
                class="font-medium underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Regulamin promocji
              </NuxtLink>.
            </p>
            <p class="mt-2.5 text-sm font-medium text-foreground">
              od {{ path.priceFrom }}
            </p>
            <div v-if="path.links" class="mt-auto flex flex-wrap gap-3 pt-3">
              <NuxtLink
                v-for="link in path.links"
                :key="link.to"
                :to="link.to"
                class="text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                {{ link.label }} →
              </NuxtLink>
            </div>
            <NuxtLink
              v-else
              :to="path.to"
              class="mt-auto pt-3 text-sm font-medium text-primary transition-transform group-hover:translate-x-1"
            >
              Zobacz szczegóły →
            </NuxtLink>
          </article>
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

    <section class="bg-secondary about-me">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div class="relative mx-auto max-w-[18rem] sm:max-w-[20rem] md:mx-0 md:max-w-none">
            <div class="aspect-square overflow-hidden rounded-full border border-border shadow-sm">
              <img
                src="/teacher-portrait.webp"
                alt="Portret Agaty, lektorki i założycielki studia"
                class="h-full w-full rounded-full object-cover"
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>
            <div
              class="absolute bottom-4 right-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/95 px-4 py-2 text-center shadow-sm backdrop-blur-sm sm:bottom-5 sm:right-3 sm:px-5 sm:py-2.5 md:right-4"
            >
              <span class="font-serif text-2xl font-semibold leading-none text-primary sm:text-3xl">
                8+
              </span>
              <span class="text-xs font-medium leading-tight text-muted-foreground sm:text-sm">
                lat doświadczenia
              </span>
            </div>
          </div>
          <div class="space-y-5">
            <span class="text-sm font-medium uppercase tracking-widest text-primary">
              Jestem Agata i to właśnie ja stworzyłam Talkaterię.
            </span>

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
            <h2
              class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Dlaczego Talkateria?
            </h2>
          </div>
          <div class="mt-8 grid gap-5 md:grid-cols-4">
            <article
              v-for="reason in whyTalkateria"
              :key="reason.title"
              class="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
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
          <button
            v-for="(photo, index) in photos"
            :key="photo.src"
            type="button"
            class="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            :class="photo.class"
            :aria-label="`Powiększ zdjęcie: ${photo.alt}`"
            @click="openPhoto(index)"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              :class="photo.imageClass"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
            />
            <span
              class="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-foreground/35 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <span
                class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M11 8v6" />
                  <path d="M8 11h6" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        <PhotoLightbox
          v-model:open="lightboxOpen"
          v-model:index="lightboxIndex"
          :photos="photos"
        />
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <h2
          class="text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
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

    <CtaBanner
      size="lg"
      section-variant="default"
      title="Szukasz zajęć dopasowanych do Twojego celu?"
      description="Napisz, dla kogo mają być zajęcia, jaki jest cel nauki i czy interesują Cię spotkania w studiu czy online. Otrzymasz propozycję najlepszej formy pracy i dostępnych terminów."
      button-label="Zapytaj o zajęcia →"
      :button-to="contactCtaPath"
    />
  </main>
</template>

<script setup>
import { getPricingPlan, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildHomePageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.home
const pageUrl = `${SITE_URL}${pageRoute}`

const contactCtaPath = useContactCtaPath()
const examEarlyBirdPromotion = getPricingPromotion('examEarlyBird')
const examGroup = getPricingPlan('examGroup')
const adultFromPlan = getPricingPlan('individualAnnualTwiceWeekly')
const schoolFromPlan = getPricingPlan('individualAnnualTwiceWeekly')
const onlineFromPlan = getPricingPlan('onlineMorningIndividualAnnualTwiceWeekly')

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

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openPhoto(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

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

const landingPaths = [
  {
    id: 'exams',
    eyebrow: 'Młodzież',
    title: 'Egzamin ósmoklasisty i matura',
    body: 'Przygotowanie do egzaminu ósmoklasisty i matury z angielskiego: arkusze, strategie, gramatyka i spokojne powtórki.',
    promoNote: `–10% na cały kurs grupowy dla nowych kursantów przy zapisie do ${examEarlyBirdPromotion.deadline} (oszczędność ${examEarlyBirdPromotion.savings}).`,
    priceFrom: `${personPrice(examGroup.fromPrice)} ${examGroup.fromPriceContext} (cena standardowa)`,
    badge: '–10%',
    links: [
      { to: ROUTES.eighthGradeExamPrices, label: 'Ósmoklasista' },
      { to: ROUTES.maturaExamPrices, label: 'Matura' },
    ],
  },
  {
    id: 'school',
    to: ROUTES.schoolSupportPrices,
    eyebrow: 'Szkoła',
    title: 'Korepetycje i materiał szkolny',
    body: 'Nadrabianie zaległości, przygotowanie do sprawdzianów i spokojne uporządkowanie gramatyki oraz słownictwa.',
    priceFrom: `${schoolFromPlan.fromPrice} ${schoolFromPlan.fromPriceContext}`,
  },
  {
    id: 'adults',
    to: ROUTES.adultClassesPrices,
    eyebrow: 'Dorośli',
    title: 'Zajęcia konwersacyjne',
    body: 'Praktyczne zajęcia nastawione na rozwijanie umiejętności mówienia, płynności i pewności siebie w komunikacji.',
    priceFrom: `${adultFromPlan.fromPrice} ${adultFromPlan.fromPriceContext}`,
  },
  {
    id: 'online',
    to: ROUTES.onlineClassesPrices,
    eyebrow: 'Online',
    title: 'Lekcje języka angielskiego online',
    body: 'Ucz się angielskiego z dowolnego miejsca. Zajęcia online to wygodna i skuteczna forma nauki bez konieczności dojazdów.',
    priceFrom: `${onlineFromPlan.fromPrice} ${onlineFromPlan.fromPriceContext} (1:1)`,
  },
]

useHead({
  link: [
    { rel: 'canonical', href: pageUrl },
    {
      rel: 'preload',
      as: 'image',
      href: '/studio-hero-800.webp',
      imagesrcset: '/studio-hero-800.webp 800w, /studio-hero-1200.webp 1080w',
      imagesizes: '(min-width: 768px) 50vw, 100vw',
      fetchpriority: 'high',
    },
  ],
  script: [
    jsonLdScript(
      buildHomePageJsonLd({
        pageUrl,
        pageName: 'Angielski w Rumi — egzaminy, szkoła i konwersacje',
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
