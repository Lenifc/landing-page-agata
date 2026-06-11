<script setup>
import { BUSINESS_ENTITY } from '~/config/business'
import { CONTACT } from '~/config/contact'
import { GOOGLE_FORM } from '~/config/forms'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.contact
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Kontakt – angielski Rumia',
  description:
    'Skontaktuj się z Talkaterią w Rumi. Kameralne studio języka angielskiego przy ul. Wrocławskiej 2.',
  keywords:
    'kontakt angielski Rumia, kontakt angielski Rumia, lekcja język angielski Rumia, Talkateria Rumia, Talkateria Janowo, angielski Reda, angielski Gdynia',
  ogTitle: 'Talkateria | Kontakt',
  ogDescription:
    'Napisz i umów lekcję próbną lub zapytaj o najlepszą formę zajęć z angielskiego w Rumi.',
})

const email = ref(CONTACT.obfuscatedEmail)

onMounted(() => {
  email.value = CONTACT.email
})

const details = computed(() => [
  {
    label: 'Email',
    value: email.value,
    href: `mailto:${CONTACT.email}`,
    icon: 'mail',
  },
  {
    label: 'Telefon i SMS',
    value: CONTACT.phoneNumber,
    href: CONTACT.phoneHref,
    icon: 'phone',
  },
  {
    label: 'Lokalizacja',
    value: CONTACT.addressWithOnline,
    icon: 'mapPin',
  },
  {
    label: 'Godziny zajęć',
    value: CONTACT.lessonHours,
    icon: 'clock',
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
        '@type': 'ContactPage',
        name: 'Kontakt Talkateria',
        description:
          'Kontakt w sprawie lekcji języka angielskiego w Rumi, Redzie, Gdyni i okolicach.',
        about: BUSINESS_ENTITY,
        mainEntity: BUSINESS_ENTITY,
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
        <p
          class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {{ CONTACT.lessonHoursText }} {{ CONTACT.contactHoursText }}
          {{ CONTACT.smsText }} {{ CONTACT.emailResponseText }}
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
        </div>
      </div>
    </section>

    <section id="formularz" class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="mb-8 max-w-2xl">
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
            >Formularz zgłoszeniowy</span
          >
          <h2
            class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Opisz krótko, jakich zajęć szukasz.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Napisz, dla kogo mają być zajęcia, jaki jest cel nauki i czy
            interesują Cię spotkania w studiu, czy online. Dzięki temu łatwiej
            dobrać termin oraz sposób pracy.
          </p>
        </div>

        <div
          class="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
        >
          <iframe
            v-if="GOOGLE_FORM.isConfigured"
            :src="GOOGLE_FORM.embedUrl"
            title="Formularz zgłoszeniowy Talkateria"
            class="h-[760px] w-full bg-background md:h-[820px]"
            loading="lazy"
          >
            Ładowanie formularza...
          </iframe>

          <div v-else class="px-6 py-10 md:px-10">
            <div class="max-w-2xl space-y-4">
              <h3 class="font-serif text-2xl font-semibold text-foreground">
                Wyślij zapytanie mailowo lub SMS-em.
              </h3>
              <p class="leading-relaxed text-muted-foreground">
                W wiadomości wystarczy krótko opisać wiek lub poziom ucznia, cel
                nauki, preferowaną formę zajęć oraz dostępność w tygodniu.
              </p>
              <div class="flex flex-wrap gap-3 pt-2">
                <a
                  :href="`mailto:${CONTACT.email}`"
                  class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Napisz maila
                </a>
                <a
                  :href="CONTACT.phoneHref"
                  class="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Zadzwoń lub wyślij SMS
                </a>
              </div>
            </div>
          </div>
        </div>

        <p
          v-if="GOOGLE_FORM.isConfigured"
          class="mt-4 text-sm text-muted-foreground"
        >
          Jeśli formularz nie wyświetla się poprawnie,
          <a
            :href="GOOGLE_FORM.openUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-primary underline-offset-4 hover:underline"
          >
            otwórz go w nowej karcie
          </a>
          .
        </p>
      </div>
    </section>
  </main>
</template>
