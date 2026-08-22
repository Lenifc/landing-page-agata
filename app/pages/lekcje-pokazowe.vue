<template>
  <main id="main-content" class="pb-[var(--sticky-cta-clearance)] md:pb-[var(--sticky-cta-desktop-pad)]">
    <PageHero
      data-track-section="hero"
      eyebrow="sobota 5 września"
      title="Bezpłatne lekcje pokazowe w Talkaterii"
      image-src="/studio-hero-800.webp"
      image-srcset="
        /studio-hero-800.webp 800w,
        /studio-hero-1200.webp 1200w
      "
      image-sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
      image-alt="Kameralna sala lekcyjna w studiu Talkateria w Rumi"
      image-width="800"
      image-height="800"
    >
      <template #description>
       W pierwszą sobotę września, tj. 5 września, zapraszam na bezpłatne zajęcia pokazowe w małych, maksymalnie 4-osobowych grupach. Będzie to próbka tego, jak wyglądają moje zajęcia i czego możesz się spodziewać podczas regularnej nauki.
       <br /><br />To świetna okazja, żeby zobaczyć, jak wyglądają zajęcia, poznać mnie i sprawdzić, czy taka forma nauki Ci odpowiada. 
          </template>
      <template #actions>
        <UiButton :to="contactCtaPath">Zapisz się →</UiButton>
      </template>
    </PageHero>

    <UiSection data-track-section="sessions" variant="secondary" padding="lg">
      <UiSectionHeader
        title="Trzy lekcje pokazowe - wybierz grupę dla siebie"
        max-width="3xl"
      >
        <template #description>
Myślisz o lekcjach indywidualnych? Nic nie szkodzi! Jeśli interesują Cię zajęcia 1:1, również jesteś mile widziany/a na lekcji pokazowej - będzie to dobra okazja, żeby się poznać i zobaczyć, jak pracuję.
        </template>
      </UiSectionHeader>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article
          v-for="session in sessions"
          :key="session.title"
          class="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm xs:p-6"
        >
          <h2 class="mt-2 font-serif text-xl font-semibold text-foreground">
            {{ session.title }}
          </h2>
          <p class="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
            {{ session.summary }}
          </p>
          <ul class="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li
              v-for="point in session.highlights"
              :key="point"
              class="flex gap-2"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </UiSection>

    <CtaBanner
      title="Zarezerwuj miejsce na lekcji pokazowej"
      description="Obowiązują zapisy. Skorzystaj z formularza zgłoszeniowego lub napisz do mnie maila i daj znać, którymi zajęciami jesteś zainteresowany/a."
      button-label="Zapisz się →"
      :button-to="contactCtaPath"
      size="lg"
      variant="primary"
    />
  </main>
</template>

<script setup>
import { ROUTES, SITE_URL } from '~/config/routes'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.demoLessons
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Bezpłatne lekcje pokazowe 5 września 2026',
  description:
    'Bezpłatne lekcje pokazowe z angielskiego w Rumi: dla dorosłych, maturzystów i uczniów kl. 7-8 (max. 4 osoby na sesję). Sobota 5 września 2026. Obowiązują zapisy.',
  robots: 'noindex, follow',
  ogTitle: 'Talkateria | Lekcje pokazowe 5 września',
  ogDescription:
    'Trzy bezpłatne lekcje pokazowe w studiu Talkateria w Rumi. Zapisy przez formularz.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

const sessions = [
  {
    title: 'Dla dorosłych (znający podstawy)',
    summary:
      'Dla osób, które znają już podstawy angielskiego lub chcą odświeżyć język po dłuższej przerwie. Zajęcia oparte głównie na swobodnych konwersacjach.',
  },
  {
    title: 'Dla maturzystów',
    summary:
      'Dla uczniów szkoł średnich. Podczas zajęć będziemy pracować z zadaniami maturalnymi, omawiać ich rozwiązania i ćwiczyć strategie egzaminacyjne.',
  },
  {
    title: 'Dla ósmoklasistów',
    summary:
      'Dla uczniów klas 7 i 8, którzy chcą dobrze przygotować się do egzaminu. Podczas zajęć będziemy rozwiązywać i omawiać zadania egzaminacyjne oraz ćwiczyć strategie potrzebne na egzaminie.',
  },
]

</script>
