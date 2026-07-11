<template>
  <footer class="mt-auto border-t border-border bg-secondary">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-3">
      <div class="space-y-3">
        <p class="font-serif text-xl font-semibold text-foreground">
          <img
            src="/talkateria-logo-mono.svg"
            alt="Talkateria - angielski w Rumi"
            class="h-11 w-auto sm:h-12"
            width="188"
            height="56"
            decoding="async"
          />
        </p>
        <p class="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Kameralne studio języka angielskiego w Rumi. Zajęcia dla młodzieży i
          dorosłych.
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Nawigacja</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="transition-colors hover:text-foreground"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Kontakt</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>{{ email }}</li>
          <li class="relative inline-flex items-center gap-1.5">
            <a
              :href="CONTACT.phoneHref"
              class="transition-colors hover:text-foreground"
            >
              Tel. {{ CONTACT.phoneNumber }}
            </a>
            <button
              type="button"
              class="peer inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Informacja o kontakcie telefonicznym"
              aria-describedby="footer-phone-tooltip"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
            <PhoneTooltip
              tooltip-id="footer-phone-tooltip"
              placement="footer"
            />
          </li>
          <li>
            <a
              :href="CONTACT.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Facebook Talkaterii"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="currentColor"
                stroke="none"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3h-3V9c0-.6.4-1 1-1Z"
                />
              </svg>
            </a>
          </li>
          <li>{{ CONTACT.addressShort }}</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-2">
        <p class="text-xs text-muted-foreground">
          © {{ year }} Talkateria. Wszelkie prawa zastrzeżone.
          <NuxtLink
            :to="ROUTES.privacyPolicy"
            class="ml-2 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Polityka prywatności
          </NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { CONTACT } from '~/config/contact'
import { ROUTES } from '~/config/routes'

const year = new Date().getFullYear()
const email = ref(CONTACT.obfuscatedEmail)
const links = [
  { to: ROUTES.home, label: 'Strona główna' },
  { to: ROUTES.offer, label: 'Oferta' },
  { to: ROUTES.schoolSupport, label: 'Korepetycje' },
  { to: ROUTES.eighthGradeExam, label: 'Egzamin ósmoklasisty' },
  { to: ROUTES.maturaExam, label: 'Matura z angielskiego' },
  { to: ROUTES.adultClasses, label: 'Zajęcia dla dorosłych' },
  { to: ROUTES.onlineClasses, label: 'Zajęcia online' },
  { to: ROUTES.contact, label: 'Kontakt' },
]

onMounted(() => {
  email.value = CONTACT.email
})
</script>
