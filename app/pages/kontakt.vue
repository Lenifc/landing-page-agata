<script setup>
import { CONTACT } from '~/config/contact'
import { GOOGLE_FORM } from '~/config/forms'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildContactPageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.contact
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Kontakt - zajęcia z angielskiego w Rumi oraz online',
  description:
    'Skontaktuj się z Talkaterią w Rumi i zapytaj o lekcje angielskiego stacjonarnie lub online. Telefon, e-mail i formularz zgłoszeniowy.',
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
}

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    jsonLdScript(
      buildContactPageJsonLd({
        pageUrl,
        breadcrumbItems: [
          {
            name: 'Strona główna',
            item: `${SITE_URL}/`,
          },
          {
            name: 'Kontakt',
            item: pageUrl,
          },
        ],
      }),
    ),
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-6xl px-6 py-16 md:pb-24">
      <div class="mb-12 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Kontakt</span>
        <h1 class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
          Kontakt - Angielski w Rumi oraz online.
        </h1>
        <p class="mt-5 text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Nie prowadzę stacjonarnego sekretariatu - kontakt odbywa się
          telefonicznie, mailowo lub online.
        </p>
        <p class="mt-5 text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          W przypadku chęci zapisu na zajęcia (lub zwykłego zapytania) warto od razu krótko
          określić wiek ucznia, poziom języka, rodzaj kursu (np. konwersacje, pomoc z
          materiałem szkolnym, przygotowanie do egzaminów) oraz to, czy interesują Cię lekcje
          indywidualne, czy w grupie. Ułatwi to sprawne dopasowanie odpowiedniej formy nauki.
        </p>
        <p class="mt-5 text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
          Zachęcam również do skorzystania z krótkiego formularza zgłoszeniowego - to
          najwygodniejsza forma zapisu, która oszczędza czas, ponieważ od razu zbiera
          wszystkie potrzebne informacje i pozwala sprawnie dobrać kurs oraz dostępne terminy.
          Wszystkie informacje kontaktowe oraz formularz zgłoszeniowy znajdziesz poniżej. Do
          usłyszenia!
        </p>
        <a href="#formularz"
          class="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
          Przejdź do formularza
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <div class="space-y-5">
          <div v-for="item in details" :key="item.label"
            class="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
            <span
              class="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" class="h-5 w-5">
                <path v-for="path in icons[item.icon]" :key="path" :d="path" />
              </svg>
            </span>

            <div class="min-w-0">
              <p class="text-sm font-medium text-muted-foreground">
                {{ item.label }}
              </p>
              <div v-if="item.icon === 'phone'" class="relative inline-flex max-w-full items-center gap-1.5">
                <a :href="item.href"
                  class="break-words font-medium text-foreground transition-colors hover:text-primary">
                  {{ item.value }}
                </a>
                <button type="button"
                  class="peer inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Informacja o kontakcie telefonicznym" aria-describedby="contact-phone-tooltip">
                  <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </button>
                <span id="contact-phone-tooltip" role="tooltip"
                  class="pointer-events-none fixed bottom-6 left-6 right-6 z-50 rounded-lg border border-border bg-card px-4 py-3 text-left text-xs leading-relaxed text-foreground opacity-0 shadow-lg transition-opacity peer-hover:opacity-100 peer-focus:opacity-100 md:absolute md:bottom-full md:left-0 md:right-auto md:mb-3 md:w-[22rem]">
                  Ze względu na charakter mojej pracy nie zawsze mogę odebrać
                  telefon. Jeśli nie uda się Państwu ze mną skontaktować, proszę
                  o wysłanie wiadomości SMS lub e-maila z krótką informacją
                  dotyczącą celu kontaktu. Odpowiem lub oddzwonię najszybciej,
                  jak to będzie możliwe.
                </span>
              </div>
              <component :is="item.href ? 'a' : 'p'" v-else :href="item.href"
                :target="item.href?.startsWith('http') ? '_blank' : undefined" :rel="item.href?.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
                  " class="break-words text-foreground" :class="item.href
                    ? 'font-medium transition-colors hover:text-primary'
                    : ''
                    ">
                {{ item.value }}
              </component>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
            <img src="/contact.webp" alt="Studio Talkateria w Rumi z widoczną salą zajęć."
              class="block h-auto w-full object-contain" width="1195" height="896" loading="lazy" />
          </div>
        </div>
      </div>

      <div class="mt-12 md:mt-16">
        <div class="mb-6 max-w-2xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">Dojazd</span>
          <h2 class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Zobacz lokalizację studia na mapie.
          </h2>
        </div>

        <div class="mx-auto overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:w-3/4">
          <ClientOnly>
            <iframe src="https://www.google.com/maps?cid=9730163744970894561&amp;output=embed&amp;hl=pl"
              title="Mapa dojazdu do studia Talkateria przy ul. Wrocławskiej 2 w Rumi"
              class="h-[420px] w-full border-0 md:h-[390px]" loading="lazy" allowfullscreen>
            </iframe>

            <template #fallback>
              <div
                class="flex h-[420px] items-center justify-center bg-muted/40 text-sm text-muted-foreground md:h-[390px]"
                role="status">
                Ładowanie mapy…
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>

    <section id="formularz" class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div class="mb-8 max-w-2xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">Formularz zgłoszeniowy</span>
          <h2 class="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Opisz krótko, jakich zajęć szukasz.
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Napisz, dla kogo mają być zajęcia, jaki jest cel nauki i czy
            interesują Cię spotkania w studiu, czy online. Dzięki temu łatwiej
            dobrać termin oraz sposób pracy.
          </p>
        </div>

        <div class="overflow-hidden rounded-3xl bg-card">
          <iframe v-if="GOOGLE_FORM.isConfigured" :src="GOOGLE_FORM.embedUrl" title="Formularz zgłoszeniowy Talkateria"
            class="h-[760px] w-full bg-background md:h-[820px]" loading="lazy">
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
                <a :href="`mailto:${CONTACT.email}`"
                  class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  Napisz maila
                </a>
                <a :href="CONTACT.phoneHref"
                  class="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                  Zadzwoń lub wyślij SMS
                </a>
              </div>
            </div>
          </div>
        </div>

        <p v-if="GOOGLE_FORM.isConfigured" class="mt-4 text-sm text-muted-foreground">
          Jeśli formularz nie wyświetla się poprawnie,
          <a :href="GOOGLE_FORM.openUrl" target="_blank" rel="noopener noreferrer"
            class="font-medium text-primary underline-offset-4 hover:underline">
            otwórz go w nowej karcie
          </a>
          .
        </p>
      </div>
    </section>
  </main>
</template>
