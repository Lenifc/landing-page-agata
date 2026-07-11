<template>
  <header
    class="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-200"
    :class="showBottomBorder ? 'border-border/80 shadow-sm' : 'border-transparent'"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
      <NuxtLink
        :to="ROUTES.home"
        class="flex items-center"
        aria-label="Talkateria - strona główna"
        @click="closeMenus"
      >
        <img
          src="/talkateria-logo-color.svg"
          alt="Talkateria - angielski w Rumi"
          class="h-11 w-auto sm:h-12"
          width="188"
          height="56"
          decoding="async"
        />
      </NuxtLink>

      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in primaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-foreground"
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
            :class="{ '!text-foreground': examMenuActive }"
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
                active-class="!text-foreground"
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
            active-class="!text-foreground"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <UiButton :to="ROUTES.contact" class="header-contact-button">
        Skontaktuj się
      </UiButton>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
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

    <div v-if="open" class="border-t border-border bg-background md:hidden">
      <ul class="mx-auto flex max-w-6xl flex-col px-6 py-4">
        <li v-for="link in primaryLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block py-3 text-sm font-medium text-foreground"
            @click="closeMenus"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="py-2">
          <p class="pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Egzaminy
          </p>
          <ul class="border-l border-border pl-4">
            <li v-for="link in examLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="block py-2.5 text-sm font-medium text-foreground"
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
            class="block py-3 text-sm font-medium text-foreground"
            @click="closeMenus"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="pt-2 md:hidden">
          <UiButton :to="ROUTES.contact" class="w-full justify-center">
            Skontaktuj się
          </UiButton>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ROUTES } from '~/config/routes'

const open = ref(false)
const examMenuOpen = ref(false)
const scrollPosition = ref(0)
const route = useRoute()

const primaryLinks = [
  { to: ROUTES.offer, label: 'Oferta' },
  { to: ROUTES.schoolSupport, label: 'Korepetycje' },
  { to: ROUTES.onlineClasses, label: 'Online' },
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

const showBottomBorder = computed(() => scrollPosition.value > 0)

const updateScrollPosition = () => {
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop || 0
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
})
</script>

<style scoped>
.header-contact-button {
  display: none;
}

@media (min-width: 700px) {
  .header-contact-button {
    display: inline-flex;
  }
}
</style>
