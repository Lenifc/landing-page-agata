<script setup>
import { AREA_SERVED, BUSINESS_ENTITY } from '~/config/business'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.home
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Angielski Rumia - lekcje dla dorosłych i młodzieży',
  description:
    'Kameralne lekcje angielskiego w Rumi dla młodzieży i dorosłych z Rumi, Redy, Gdyni i okolic. Indywidualnie, w duecie lub małej grupie, z naciskiem na mówienie.',
  keywords:
    'angielski Rumia, angielski Rumia, Rumia angielski, lekcje angielskiego Rumia, lekcje angielskiego Janowo, angielski Reda, angielski Gdynia, konwersacje angielski Rumia, korepetycje angielski Rumia, matura angielski Rumia, egzamin ósmoklasisty angielski Rumia',
  ogTitle:
    'Talkateria | Angielski Rumia - lekcje dla dorosłych i młodzieży',
  ogDescription:
    'Kameralne zajęcia z angielskiego w Rumi dla osób z Rumi, Redy, Gdyni i okolic. Mniej stresu, więcej mówienia i praktyki.',
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
    title: 'Kameralność',
    body: 'Pracuję wyłącznie indywidualnie i w małych grupach. Dzięki temu każdy aktywnie uczestniczy w zajęciach, a nauka jest bardziej skuteczna i przynosi lepsze efekty.',
  },
]

const photos = [
  {
    src: '/studio-space.webp',
    alt: 'Przestrzeń do nauki z okrągłym stołem i tablicą',
    class: 'col-span-2 row-span-2',
  },
  {
    src: '/lesson-1.webp',
    alt: 'Kursanci podczas swobodnej rozmowy po angielsku',
  },
  {
    src: '/lesson-2.webp',
    alt: 'Notatki i słownictwo przygotowywane na zajęciach',
  },
]

const landingLinks = [
  {
    to: ROUTES.eighthGradeExam,
    eyebrow: 'Dla klas 7-8',
    title: 'Egzamin ósmoklasisty',
    body: 'Arkusze, strategie i powtórki z angielskiego w Rumi przed egzaminem.',
  },
  {
    to: ROUTES.maturaExam,
    eyebrow: 'Dla liceum i technikum',
    title: 'Matura z angielskiego',
    body: 'Przygotowanie do poziomu podstawowego i rozszerzonego, z pisaniem i arkuszami.',
  },
  {
    to: ROUTES.adultClasses,
    eyebrow: 'Dla dorosłych',
    title: 'Angielski po przerwie',
    body: 'Konwersacje, angielski do pracy i spokojny powrót do nauki bez presji.',
  },
  {
    to: ROUTES.onlineClasses,
    eyebrow: 'Online',
    title: 'Zajęcia zdalne',
    body: 'Lekcje angielskiego online.',
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
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Lekcje języka angielskiego w Rumi',
        provider: BUSINESS_ENTITY,
        areaServed: AREA_SERVED,
        audience: {
          '@type': 'Audience',
          audienceType: 'młodzież i dorośli',
        },
        url: pageUrl,
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <section
      class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24"
    >
      <div class="space-y-6">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm"
        >
          Kameralne zajęcia • duża swoboda
        </span>
        <h1
          class="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl"
        >
          Kameralne studio języka angielskiego w Rumi. Zajęcia dla
          młodzieży i dorosłych.
        </h1>
        <p
          class="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Talkateria to kameralne lekcje angielskiego w Rumi dla
          młodzieży i dorosłych z Rumi, Redy i Gdyni. Przyjazna atmosfera,
          rozmowa i plan dopasowany do Ciebie.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="ROUTES.contact"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.22)] transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Zapisz się teraz →
          </NuxtLink>
          <NuxtLink
            :to="ROUTES.offer"
            class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Zobacz ofertę
          </NuxtLink>
        </div>
      </div>

      <div class="relative">
        <div
          class="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_70px_rgba(17,17,17,0.08)]"
        >
          <img
            src="/studio-hero.webp"
            alt="Jasne i przytulne wnętrze studia Talkateria"
            class="h-full w-full object-cover"
            width="1024"
            height="1024"
            fetchpriority="high"
          />
        </div>
        <div
          class="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-md sm:block"
        >
          <p class="font-serif text-3xl font-semibold text-primary">8+</p>
          <p class="text-sm text-muted-foreground">lat doświadczenia</p>
        </div>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <div class="mb-8 max-w-2xl">
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
          >
            Wybierz cel nauki
          </span>
          <h2
            class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Najważniejsze ścieżki angielskiego w Talkaterii.
          </h2>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <NuxtLink
            v-for="link in landingLinks"
            :key="link.to"
            :to="link.to"
            class="group flex min-h-[210px] flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_38px_rgba(24,55,110,0.09)]"
          >
            <span class="text-xs font-semibold uppercase text-primary">
              {{ link.eyebrow }}
            </span>
            <span>
              <span
                class="block font-serif text-2xl font-semibold leading-tight text-foreground"
              >
                {{ link.title }}
              </span>
              <span
                class="mt-3 block text-sm leading-relaxed text-muted-foreground"
              >
                {{ link.body }}
              </span>
            </span>
            <span
              class="text-sm font-medium text-primary transition-transform group-hover:translate-x-1"
            >
              Zobacz szczegóły →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="border-b border-border">
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

    <section
      class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]"
    >
      <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
        <img
          src="/teacher-portrait.webp"
          alt="Portret Agaty, lektorki i założycielki studia"
          class="h-full w-full object-cover"
          width="1024"
          height="1024"
          loading="lazy"
        />
      </div>
      <div class="space-y-5">
        <span class="text-sm font-medium uppercase tracking-widest text-primary"
          >Cześć, tu Agata</span
        >
        <div
          class="space-y-4 text-pretty leading-relaxed text-muted-foreground"
        >
          <p>
            Jestem magistrem filologii angielskiej i lektorką z 8-letnim
            doświadczeniem w nauczaniu dzieci, młodzieży i dorosłych. Pomagam
            przełamywać barierę mówienia, przygotowywać się do egzaminów,
            poprawiać wyniki w szkole oraz rozwijać praktyczne umiejętności
            językowe.
          </p>
          <p>
            Ukończyłam również studia podyplomowe z coachingu z elementami
            psychologii, co pozwala mi skuteczniej wspierać uczniów w procesie
            nauki, motywacji i radzeniu sobie ze stresem. Każde zajęcia
            dostosowuję do indywidualnych potrzeb kursanta, dbając o przyjazną
            atmosferę, efektywną naukę i budowanie pewności siebie w komunikacji
            po angielsku.
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="mb-10 max-w-xl space-y-3">
          <h2
            class="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground"
          >
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
        </div>
        <div
          class="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4"
        >
          <div
            v-for="photo in photos"
            :key="photo.src"
            class="group relative overflow-hidden rounded-2xl border border-border"
            :class="photo.class"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width="1024"
              height="1024"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-16">
      <div
        class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 py-14 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)] md:px-16"
      >
        <h2
          class="mx-auto max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-primary-foreground"
        >
          Masz pytania?
        </h2>
        <p
          class="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80"
        >
          Skontaktuj się ze mną - pomogę dobrać odpowiednią formę nauki.
        </p>
        <NuxtLink
          :to="ROUTES.contact"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Skontaktuj się →
        </NuxtLink>
      </div>
    </section>

    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <h2
          class="text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          Talkateria - English Studio - nauka dopasowana do Twoich potrzeb
        </h2>
        <p class="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Jeśli szukasz zajęć z języka angielskiego w Rumi, które stawiają na
          swobodną komunikację oraz indywidualne podejście, Talkateria jest
          miejscem dla Ciebie. Prowadzę lekcje angielskiego dla młodzieży i
          dorosłych z Rumi, Redy, Gdyni oraz okolic. Oferuję zajęcia
          indywidualne, konwersacje oraz kursy przygotowujące do egzaminów i
          codziennej komunikacji w języku angielskim.
        </p>
      </div>
    </section>
  </main>
</template>
