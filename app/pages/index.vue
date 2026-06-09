<script setup>
import { CONTACT } from '~/config/contact'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.home
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Angielski Rumia - lekcje dla dorosłych i młodzieży',
  description:
    'Kameralne lekcje angielskiego w Rumi dla młodzieży i dorosłych z Redy, Gdyni i okolic. Indywidualnie, w duecie lub małej grupie, z naciskiem na mówienie.',
  keywords:
    'angielski Rumia, lekcje angielskiego Rumia, angielski Reda, angielski Gdynia, konwersacje po angielsku, korepetycje angielski Rumia, matura angielski Rumia, egzamin angielski Rumia',
  ogTitle: 'Talkateria | Angielski Rumia - lekcje dla dorosłych i młodzieży',
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
        serviceType: 'Lekcje języka angielskiego',
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
        areaServed: [
          { '@type': 'City', name: 'Rumia' },
          { '@type': 'City', name: 'Reda' },
          { '@type': 'City', name: 'Gdynia' },
        ],
        audience: {
          '@type': 'Audience',
          audienceType: 'młodzież i dorośli',
        },
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
          Kameralne studio języka angielskiego w Rumi. Zajęcia dla młodzieży i
          dorosłych.
        </h1>
        <p
          class="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Talkateria to kameralne lekcje angielskiego dla młodzieży i dorosłych
          z Rumi, Redy i Gdyni. Przyjazna atmosfera, rozmowa i plan dopasowany
          do Ciebie.
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
            Jak wygląda nauka
          </h2>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            Jasna, spokojna przestrzeń i zajęcia zaprojektowane tak, by nauka
            była bliżej rozmowy niż szkolnej ławki.
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

    <section class="mx-auto max-w-6xl px-6 py-20">
      <div
        class="rounded-[2rem] bg-primary px-8 py-14 text-center shadow-[0_24px_60px_rgba(45,94,181,0.2)] md:px-16"
      >
        <h2
          class="mx-auto max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-primary-foreground"
        >
          Umów się na lekcję próbną.
        </h2>
        <p
          class="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80"
        >
          Umów pierwszą lekcję próbną i sprawdźmy, jaka forma nauki będzie dla
          Ciebie najlepsza. Bez presji, w spokojnej atmosferze.
        </p>
        <NuxtLink
          :to="ROUTES.contact"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Kontakt →
        </NuxtLink>
      </div>
    </section>

    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <h2
          class="text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          Angielski w Rumi - nauka dopasowana do Ciebie
        </h2>
        <p class="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Jeśli szukasz zajęć z języka angielskiego w Rumi, które stawiają na
          swobodną komunikację i indywidualne podejście, Talkateria jest
          miejscem dla Ciebie. Prowadzę lekcje angielskiego dla młodzieży i
          dorosłych z Rumi, Redy, Gdyni oraz okolic. Oferujemy zajęcia
          indywidualne, konwersacje oraz naukę przygotowującą do egzaminów i
          codziennej komunikacji.
        </p>
      </div>
    </section>
  </main>
</template>
