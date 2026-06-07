<script setup>
useSeoMeta({
  title: 'Kontakt',
  description:
    'Skontaktuj się z Talkateria w Rumi i umów lekcję próbną z języka angielskiego. Odpowiedź zwykle w ciągu jednego dnia roboczego.',
  ogTitle: 'Talkateria | Kontakt',
  ogDescription:
    'Napisz i umów lekcję próbną lub zapytaj o najlepszą formę zajęć z angielskiego w Rumi.',
})

const details = [
  { label: 'Email', value: 'hello@talkateria.com', href: 'mailto:hello@talkateria.com' },
  { label: 'Lokalizacja', value: 'Rumia, ul. Wrocławska 2' },
  { label: 'Dostępność', value: 'Odpowiedź zwykle w 1 dzień roboczy' },
]
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div class="mb-12 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Kontakt</span>
        <h1 class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
          Porozmawiajmy o Twoim angielskim.
        </h1>
        <p class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          Masz pytanie, chcesz zapisać się na lekcję próbną albo dobrać najlepszą
          formę zajęć? Napisz, a wrócę z odpowiedzią osobiście, zwykle w ciągu
          jednego dnia roboczego.
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <div class="space-y-5">
          <div
            v-for="item in details"
            :key="item.label"
            class="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4"
          >
            <div>
              <p class="text-sm font-medium text-muted-foreground">{{ item.label }}</p>
              <component
                :is="item.href ? 'a' : 'p'"
                :href="item.href"
                class="text-foreground"
                :class="item.href ? 'transition-colors hover:text-primary' : ''"
              >
                {{ item.value }}
              </component>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
            <img
              src="/studio-space.webp"
              alt="Studio Talkateria z okrągłym stołem i tablicą"
              class="h-64 w-full object-cover"
              width="1024"
              height="2048"
              loading="lazy"
            >
          </div>
          <div class="rounded-3xl border border-border bg-secondary p-6">
            <h2 class="font-serif text-lg font-semibold text-foreground">Wolisz najpierw krótko porozmawiać?</h2>
            <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Opisz swój cel: egzamin, rozmowy, praca albo przełamanie bariery.
              Podpowiem, która forma zajęć będzie dla Ciebie najwygodniejsza.
            </p>
            <a
              href="mailto:hello@talkateria.com"
              class="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Napisz bezpośrednio →
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
