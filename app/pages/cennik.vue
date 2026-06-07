<script setup>
useSeoMeta({
  title: 'Cennik lekcji angielskiego',
  description:
    'Cennik Talkateria w Rumi: lekcje indywidualne, duet, trio i grupa egzaminacyjna. Jasne zasady, nowoczesna forma i bez ukrytych kosztów.',
  ogTitle: 'Talkateria | Cennik lekcji angielskiego',
  ogDescription:
    'Sprawdź ceny lekcji angielskiego w Rumi. Indywidualnie, w duecie i w małych grupach.',
})

const plans = [
  {
    name: 'Indywidualne',
    frequency: '1× tygodniowo',
    duration: '50 min',
    price: '100 zł',
    details: 'Najlepszy wybór, jeśli chcesz pracować we własnym tempie i z pełnym skupieniem na swoim celu.',
    featured: true,
  },
  {
    name: 'Indywidualne',
    frequency: '2× tygodniowo',
    duration: '50 min',
    price: '90 zł',
    details: 'Większa regularność i szybsze efekty. Opcja dla osób, które chcą mocno przyspieszyć postępy.',
    featured: false,
  },
  {
    name: 'DUO',
    frequency: '2 osoby',
    duration: '50 min',
    price: '150 zł za parę',
    details: 'Dla znajomych, rodzeństwa lub par, które chcą uczyć się razem i wzajemnie motywować.',
    featured: false,
  },
  {
    name: 'TRIO',
    frequency: '3 osoby',
    duration: '50 min',
    price: '180 zł za grupę',
    details: 'Mała grupa, dużo mówienia i dynamiczne ćwiczenia komunikacyjne bez tłoku.',
    featured: false,
  },
  {
    name: 'Grupa egzaminacyjna',
    frequency: '4 osoby',
    duration: '100 min (2 × 50 min)',
    price: '120 zł za osobę',
    details: 'Skupienie na egzaminie, strategii i systematycznej pracy w kameralnej grupie.',
    featured: false,
  },
]

const faqs = [
  {
    q: 'Jak odbywają się zajęcia?',
    a: 'Zajęcia mogą odbywać się stacjonarnie w Rumi lub w formule uzgodnionej indywidualnie, zależnie od potrzeb.',
  },
  {
    q: 'Czy można dopasować poziom?',
    a: 'Tak. Materiały i tempo pracy są dopasowywane do poziomu, celu oraz stylu nauki kursanta.',
  },
  {
    q: 'Czy dostanę lekcję próbną?',
    a: 'Tak, przed rozpoczęciem regularnych zajęć można umówić krótkie spotkanie organizacyjne lub lekcję próbną.',
  },
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
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
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <span class="text-sm font-medium uppercase tracking-widest text-primary">Cennik</span>
      <h1 class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
        Jasne zasady i kameralne grupy.
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Cennik inspirowany prostą tabelą, ale podany w nowocześniejszej formie.
        Bez ukrytych kosztów, z naciskiem na komfort nauki i regularność.
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-8">
      <div class="overflow-hidden rounded-[2rem] border border-[#e7bfd9] bg-card shadow-[0_28px_80px_rgba(17,17,17,0.08)]">
        <div class="hidden grid-cols-[1.3fr_1fr_1fr] border-b border-border/80 bg-[linear-gradient(90deg,rgba(246,211,236,0.85),rgba(255,248,242,0.96),rgba(255,248,242,0.96))] md:grid">
          <div class="px-8 py-6 text-xl font-semibold text-foreground">Rodzaj zajęć</div>
          <div class="border-l border-border/80 px-8 py-6 text-center text-xl font-semibold text-foreground">Czas trwania</div>
          <div class="border-l border-border/80 px-8 py-6 text-center text-xl font-semibold text-foreground">Cena</div>
        </div>

        <div
          v-for="plan in plans"
          :key="`${plan.name}-${plan.frequency}`"
          class="grid border-b border-border/70 last:border-b-0 md:grid-cols-[1.3fr_1fr_1fr]"
          :class="plan.featured ? 'bg-[linear-gradient(90deg,rgba(248,211,238,0.32),rgba(255,255,255,0.98),rgba(255,248,242,0.98))]' : 'bg-card'"
        >
          <div class="px-6 py-6 md:px-8">
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-2xl font-semibold text-foreground">
                {{ plan.name }}
              </h2>
              <span
                v-if="plan.featured"
                class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
              >
                Najczęściej wybierane
              </span>
            </div>
            <p class="mt-2 text-lg text-foreground/80">{{ plan.frequency }}</p>
            <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{{ plan.details }}</p>
          </div>

          <div class="border-t border-border/70 px-6 py-6 md:border-l md:border-t-0 md:px-8 md:text-center">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground md:hidden">Czas trwania</p>
            <p class="mt-2 font-serif text-3xl font-semibold text-foreground md:mt-0">{{ plan.duration }}</p>
          </div>

          <div class="border-t border-border/70 px-6 py-6 md:border-l md:border-t-0 md:px-8 md:text-center">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground md:hidden">Cena</p>
            <p class="mt-2 font-serif text-3xl font-semibold text-foreground md:mt-0">{{ plan.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-10">
      <div class="rounded-[2rem] border border-border bg-secondary px-8 py-10 md:flex md:items-center md:justify-between md:gap-8">
        <div class="max-w-2xl">
          <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">Nie wiesz, która forma będzie najlepsza?</h2>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Napisz kilka słów o swoim celu, a pomogę dobrać najlepszy wariant:
            indywidualnie, duet albo mała grupa.
          </p>
        </div>
        <NuxtLink
          to="/kontakt"
          class="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(156,90,60,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90 md:mt-0"
        >
          Zapytaj o termin →
        </NuxtLink>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-6 py-20">
      <h2 class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground">
        Najczęstsze pytania
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="faq in faqs" :key="faq.q" class="py-6">
          <h3 class="font-medium text-foreground">{{ faq.q }}</h3>
          <p class="mt-2 text-pretty leading-relaxed text-muted-foreground">{{ faq.a }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
