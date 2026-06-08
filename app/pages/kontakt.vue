<script setup>
useSeoMeta({
  title: 'Kontakt angielski Rumia, Reda, Gdynia',
  description:
    'Skontaktuj się z Talkateria w Rumi i umów lekcję próbną z języka angielskiego. Lekcje dla osób z Rumi, Redy, Gdyni i okolic.',
  keywords:
    'kontakt angielski Rumia, lekcja język angielski Rumia, Talkateria Rumia, angielski Reda, angielski Gdynia',
  ogTitle: 'Talkateria | Kontakt',
  ogDescription:
    'Napisz i umów lekcję próbną lub zapytaj o najlepszą formę zajęć z angielskiego w Rumi, Redzie i Gdyni.',
})

const email = ref('hello [at] talkateria.pl')

onMounted(() => {
  email.value = 'hello@talkateria.pl'
})

const details = computed(() => [
  {
    label: 'Email',
    value: email.value,
    href: 'mailto:hello@talkateria.com',
    icon: 'mail',
  },
  {
    label: 'Telefon',
    value: 'Numer telefonu wkrótce',
    // href: 'tel:hello@talkateria.com',
    icon: 'phone',
  },
  {
    label: 'Lokalizacja',
    value: 'Rumia, ul. Wrocławska 2 lub online',
    icon: 'mapPin',
  },
  {
    label: 'Facebook',
    value: 'Fanpage',
    href: 'https://facebook.com',
    icon: 'message',
  },
])

const icons = {
  mail: ['M4 6h16v12H4V6Z', 'm4 7 8 6 8-6'],
  phone: [
    'M6.6 4.5 9 4l1.2 4-2.1 1.4a13 13 0 0 0 6.5 6.5L16 13.8l4 1.2-.5 2.4c-.2 1-1 1.6-2 1.6A14.5 14.5 0 0 1 5 6.5c0-1 .6-1.8 1.6-2Z',
  ],
  mapPin: [
    'M12 21s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12Z',
    'M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  ],
  clock: ['M12 6v6l4 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  message: ['M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-5.2A8 8 0 1 1 21 12Z'],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Kontakt Talkateria',
        description:
          'Kontakt w sprawie lekcji języka angielskiego w Rumi, Redzie, Gdyni i okolicach.',
        about: {
          '@type': 'EducationalOrganization',
          name: 'Talkateria',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Wrocławska 2',
            addressLocality: 'Rumia',
            addressCountry: 'PL',
          },
          areaServed: [
            { '@type': 'City', name: 'Rumia' },
            { '@type': 'City', name: 'Reda' },
            { '@type': 'City', name: 'Gdynia' },
          ],
        },
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div class="mb-12 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary"
          >Kontakt</span
        >
        <h1
          class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground"
        >
          Kontakt i lokalizacja studia.
        </h1>
        <p
          class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Zajęcia odbywają się w nowoczesnym, kameralnym studiu przy ul.
          Wrocławskiej 2 w Rumi (dzielnica Janowo). Lokalizacja zapewnia wygodny
          dojazd zarówno komunikacją miejską, jak i koleją - w pobliżu znajdują
          się przystanki autobusowe oraz stacja SKM Rumia Janowo. Dla osób
          dojeżdżających samochodem dostępny jest duży, ogólnodostępny parking
          przy ul. Gdańskiej.
        </p>
        <p
          class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Istnieje również możliwość uczestnictwa w zajęciach online
          prowadzonych na platformie Zoom. Taka forma nauki zapewnia pełną
          elastyczność i komfort pracy bez konieczności dojazdu.
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <div class="space-y-5">
          <div
            v-for="item in details"
            :key="item.label"
            class="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <span
              class="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path v-for="path in icons[item.icon]" :key="path" :d="path" />
              </svg>
            </span>

            <div class="min-w-0">
              <p class="text-sm font-medium text-muted-foreground">
                {{ item.label }}
              </p>
              <component
                :is="item.href ? 'a' : 'p'"
                :href="item.href"
                :target="item.href?.startsWith('http') ? '_blank' : undefined"
                :rel="
                  item.href?.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                "
                class="break-words text-foreground"
                :class="
                  item.href
                    ? 'font-medium transition-colors hover:text-primary'
                    : ''
                "
              >
                {{ item.value }}
              </component>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div
            class="overflow-hidden rounded-3xl border border-border shadow-sm"
          >
            <img
              src="/studio-space.webp"
              alt="Studio Talkateria w Rumi z tablicą i monitorem."
              class="h-64 w-full object-cover"
              width="1024"
              height="2048"
              loading="lazy"
            />
          </div>
          <!-- <div class="rounded-3xl border border-border bg-secondary p-6">
            <h2 class="font-serif text-lg font-semibold text-foreground">
              Wolisz najpierw krótko porozmawiać?
            </h2>
            <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Opisz swój cel: egzamin, rozmowy, praca albo przełamanie bariery. Podpowiem, która
              forma zajęć będzie dla Ciebie najwygodniejsza.
            </p>
            <a
              href="mailto:hello@talkateria.com"
              class="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Napisz bezpośrednio →
            </a>
          </div> -->
        </div>
      </div>
    </section>
  </main>
</template>
