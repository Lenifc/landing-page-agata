<template>
  <header
    class="z-50 border-b bg-background/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200"
    :class="[
      showBottomBorder ? 'border-border/80 shadow-sm' : 'border-transparent',
      open
        ? 'fixed inset-0 flex h-dvh flex-col md:sticky md:inset-auto md:h-auto md:max-h-none'
        : 'sticky top-0',
    ]"
  >
    <nav class="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between px-5 py-2 xs:px-6">
      <NuxtLink
        :to="ROUTES.home"
        class="flex shrink-0 items-center"
        aria-label="Talkateria - strona główna"
        @click="closeMenus"
      >
        <img
          src="/talkateria-logo-color.webp?v2"
          alt="Talkateria - angielski w Rumi"
          class="h-11 w-auto shrink-0 sm:h-12"
          width="130"
          height="48"
          decoding="async"
        />
      </NuxtLink>

      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in primaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-primary"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li
          class="relative"
          @mouseenter="examMenuOpen = true"
          @mouseleave="closeExamMenu"
          @focusout="handleExamFocusout"
          @keydown.esc="closeExamMenu"
        >
          <button
            id="exam-menu-button"
            type="button"
            class="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            :class="{ '!text-primary': examMenuActive }"
            aria-haspopup="true"
            :aria-expanded="examMenuOpen"
            aria-controls="exam-menu"
            :aria-label="examMenuLabel"
            @click="toggleExamMenu"
          >
            <span>Egzaminy</span>
            <svg
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': examMenuOpen }"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            v-show="examMenuOpen"
            class="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3"
          >
            <div
              id="exam-menu"
              role="menu"
              aria-labelledby="exam-menu-button"
              class="rounded-xl border border-border bg-card p-2 shadow-xl"
            >
              <NuxtLink
                v-for="link in examLinks"
                :key="link.to"
                :to="link.to"
                role="menuitem"
                class="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                active-class="!text-primary"
                @click="closeExamMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>
        </li>
        <li v-for="link in secondaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-primary"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <UiButton
        :to="contactCtaPath"
        class="header-contact-button"
        tracking-label="Header CTA"
      >
        <span class="header-contact-label">
          <span>Umów bezpłatną</span>
          <span>konsultację</span>
        </span>
      </UiButton>

      <button
        class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        :aria-expanded="open"
        aria-label="Przełącz menu"
        @click="open = !open"
      >
        <svg
          v-if="!open"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </nav>

    <div
      v-if="open"
      class="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-border bg-background md:hidden"
    >
      <ul
        class="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] xs:px-6"
      >
        <li v-for="link in primaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block py-3.5 text-base font-medium text-foreground"
            @click="closeMenus"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="py-2">
          <p
            class="pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Egzaminy
          </p>
          <ul class="border-l border-border pl-4">
            <li v-for="link in examLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="block py-3 text-base font-medium text-foreground"
                @click="closeMenus"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li v-for="link in secondaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block py-3.5 text-base font-medium text-foreground"
            @click="closeMenus"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="mt-auto pt-6">
          <UiButton
            :to="contactCtaPath"
            class="w-full justify-center"
            tracking-label="Mobile menu CTA"
          >
            Umów bezpłatną konsultację
          </UiButton>
        </li>
      </ul>
    </div>
  </header>
  <!-- Reserve sticky header space when mobile menu is fixed fullscreen -->
  <div
    v-if="open"
    class="h-[calc(3.25rem+env(safe-area-inset-top,0px))] md:hidden"
    aria-hidden="true"
  />
</template>

<script setup>
import { ROUTES } from '~/config/routes'

const contactCtaPath = useContactCtaPath()
const { trackEvent } = useTracking()
const open = ref(false)
const examMenuOpen = ref(false)
const scrollPosition = ref(0)
const route = useRoute()

watch(open, (isOpen) => {
  if (!import.meta.client) {
    return
  }

  document.body.style.overflow = isOpen ? 'hidden' : ''

  trackEvent({
    eventType: 'nav_toggle',
    label: isOpen ? 'open' : 'close',
    details: {
      menu: 'mobile',
      open: isOpen,
    },
  })
})

watch(examMenuOpen, (isOpen, wasOpen) => {
  if (!import.meta.client || isOpen === wasOpen) {
    return
  }

  trackEvent({
    eventType: 'nav_toggle',
    label: isOpen ? 'open' : 'close',
    countAsInteraction: false,
    details: {
      menu: 'exam',
      open: isOpen,
    },
  })
})

watch(
  () => route.fullPath,
  () => {
    closeMenus()
  },
)

const primaryLinks = [
  { to: ROUTES.offer, label: 'Oferta' },
  { to: ROUTES.onlineClasses, label: 'Online' },
  { to: ROUTES.schoolSupport, label: 'Korepetycje' },
]

const examLinks = [
  { to: ROUTES.maturaExam, label: 'Matura' },
  { to: ROUTES.eighthGradeExam, label: 'Ósma klasa' },
]

const secondaryLinks = [
  { to: ROUTES.adultClasses, label: 'Dorośli' },
  { to: ROUTES.contact, label: 'Kontakt' },
]

const examMenuActive = computed(() =>
  examLinks.some((link) => route.path === link.to),
)
const examMenuLabel = computed(() =>
  examMenuOpen.value ? 'Zwiń menu egzaminów' : 'Rozwiń menu egzaminów',
)

const showBottomBorder = computed(() => scrollPosition.value > 0 || open.value)

const updateScrollPosition = () => {
  scrollPosition.value =
    window.scrollY || document.documentElement.scrollTop || 0
}

const closeExamMenu = () => {
  examMenuOpen.value = false
}

const closeMenus = () => {
  open.value = false
  closeExamMenu()
}

const toggleExamMenu = () => {
  examMenuOpen.value = !examMenuOpen.value
}

const handleExamFocusout = (event) => {
  const nextElement = event.relatedTarget

  if (
    !(nextElement instanceof Node) ||
    !event.currentTarget.contains(nextElement)
  ) {
    closeExamMenu()
  }
}

onMounted(() => {
  updateScrollPosition()
  window.addEventListener('scroll', updateScrollPosition, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollPosition)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.header-contact-button {
  display: none;
  flex-shrink: 0;
  padding-block: 0.55rem;
  padding-inline: 0.9rem;
}

.header-contact-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.2;
}

@media (min-width: 700px) {
  .header-contact-button {
    display: inline-flex;
  }
}

@media (min-width: 1100px) {
  .header-contact-button {
    padding-block: 0.75rem;
    padding-inline: 1.5rem;
  }

  .header-contact-label {
    display: inline;
    line-height: inherit;
    white-space: nowrap;
  }

  .header-contact-label > span:first-child::after {
    content: ' ';
  }
}
</style>
