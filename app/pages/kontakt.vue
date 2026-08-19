<template>
  <main id="main-content">
    <section data-track-section="contact" class="mx-auto max-w-6xl px-5 py-8 xs:px-6">
      <div class="mb-8 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">
          Kontakt
        </span>
        <h1
          class="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl"
        >
          Napisz, jakich zajęć szukasz.
        </h1>
      </div>

      <div
        id="dane-kontaktowe"
        class="scroll-mt-24 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-8"
      >
        <p
          class="text-pretty text-start text-base leading-relaxed text-muted-foreground md:text-justify lg:col-span-2 lg:max-w-3xl"
        >
          Jeśli chcesz, umówimy też zapoznawczą
          <b>bezpłatną konsultację online</b> - potrwa ok.&nbsp;15&nbsp;min.
          Poznam Twój poziom językowy, porozmawiamy o tym, co chcesz osiągnąć,
          i na tej podstawie dobiorę skuteczną formę nauki oraz materiały
          dopasowane do Ciebie.
        </p>

        <div class="order-2 space-y-5 lg:order-1">
          <div
            v-for="item in details"
            :key="item.label"
            class="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm xs:gap-4 xs:px-5"
          >
            <span
              class="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                :fill="item.icon === 'facebook' ? 'currentColor' : 'none'"
                :stroke="item.icon === 'facebook' ? 'none' : 'currentColor'"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path
                  v-for="path in icons[item.icon]"
                  :key="path"
                  :d="path"
                />
              </svg>
            </span>

            <div class="min-w-0">
              <p class="text-sm font-medium text-muted-foreground">
                {{ item.label }}
              </p>
              <div
                v-if="item.icon === 'phone'"
                class="relative inline-flex max-w-full items-center"
              >
                <a
                  :href="item.href"
                  data-tracking-skip-delegated="true"
                  class="break-words font-medium leading-normal text-foreground transition-colors hover:text-primary"
                  aria-describedby="contact-phone-tooltip"
                  @click="trackContactInteraction(item)"
                >
                  {{ item.value }}
                </a>
                <PhoneTooltip
                  tooltip-id="contact-phone-tooltip"
                  placement="contact"
                />
              </div>
              <component
                :is="item.href ? 'a' : 'p'"
                v-else
                :href="item.href"
                :target="item.href?.startsWith('http') ? '_blank' : undefined"
                :rel="
                  item.href?.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                "
                :data-tracking-skip-delegated="item.href ? 'true' : undefined"
                class="break-words text-foreground"
                :class="
                  item.href
                    ? 'font-medium transition-colors hover:text-primary'
                    : ''
                "
                @click="item.href ? trackContactInteraction(item) : undefined"
              >
                {{ item.value }}
              </component>
            </div>
          </div>
        </div>

        <div
          id="formularz"
          data-track-section="form"
          class="order-1 scroll-mt-24 rounded-3xl border border-border bg-card px-4 py-4 shadow-sm md:px-5 md:py-5 lg:order-3 lg:col-span-2"
        >
          <h2 class="font-serif text-xl font-semibold text-foreground md:text-2xl">
            Formularz zgłoszeniowy
          </h2>
          <p class="mt-1 mb-3 text-sm leading-relaxed text-muted-foreground">
            Zostaw kontakt i krótko napisz, czego szukasz - zwykle odpisuję w
            ciągu kilku godzin.
          </p>
          <ContactForm />
        </div>

        <div
          class="order-3 overflow-hidden rounded-3xl border border-border shadow-sm lg:order-2"
        >
          <img
            src="/contact.webp"
            alt="Studio Talkateria w Rumi z widoczną salą zajęć."
            class="block min-h-[18rem] w-full object-cover object-center lg:h-full lg:min-h-[28rem]"
            width="1200"
            height="676"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section data-track-section="map" class="mx-auto max-w-6xl px-5 py-12 xs:px-6 md:py-16">
      <div class="mb-6 max-w-2xl">
        <UiSectionHeader
          eyebrow="Dojazd"
          title="Zobacz lokalizację studia na mapie."
          title-tag="h2"
          max-width="2xl"
        />
      </div>

      <div
        class="mx-auto overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:w-3/4"
      >
        <ClientOnly>
          <iframe
            src="https://www.google.com/maps?cid=9730163744970894561&amp;output=embed&amp;hl=pl"
            title="Mapa dojazdu do studia Talkateria przy ul. Wrocławskiej 2 w Rumi"
            class="h-[420px] w-full border-0 md:h-[390px]"
            loading="lazy"
            allowfullscreen
          />

          <template #fallback>
            <div
              class="flex h-[420px] items-center justify-center bg-muted/40 text-sm text-muted-foreground md:h-[390px]"
              role="status"
            >
              Ładowanie mapy…
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup>
import { CONTACT } from '~/config/contact'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildContactPageJsonLd, jsonLdScript } from '~/config/schema'

const { trackEvent } = useTracking()
const pageRoute = ROUTES.contact
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Kontakt - zajęcia z angielskiego w Rumi oraz online',
  description:
    'Skontaktuj się z Talkaterią w Rumi i umów bezpłatną konsultację online (15 min). Telefon, e-mail i formularz zgłoszeniowy.',
  ogTitle: 'Talkateria | Kontakt',
  ogDescription:
    'Umów bezpłatną konsultację online (15 min) i zapytaj o najlepszą formę zajęć z angielskiego w Rumi — studio lub online.',
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
    label: 'Facebook',
    value: 'Talkateria na Facebooku',
    href: CONTACT.facebookUrl,
    icon: 'facebook',
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
  facebook: [
    'M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3h-3V9c0-.6.4-1 1-1Z',
  ],
  mapPin: [
    'M12 21s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12Z',
    'M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  ],
}

const trackContactInteraction = (item) => {
  if (!item?.href) {
    return
  }

  let eventType = 'cta_click'

  if (item.href.startsWith('mailto:')) {
    eventType = 'mailto_click'
  } else if (item.href.startsWith('tel:')) {
    eventType = 'tel_click'
  }

  trackEvent({
    eventType,
    label: `Kontakt: ${item.label}`,
    href: item.href,
    details: {
      source: 'kontakt_details',
    },
  })
}

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
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
