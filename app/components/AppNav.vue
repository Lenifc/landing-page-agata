<script setup>
const open = ref(false)
const links = [
  { to: '/', label: 'Start' },
  { to: '/cennik', label: 'Cennik' },
  { to: '/kontakt', label: 'Kontakt' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
      <NuxtLink to="/" class="flex items-center" aria-label="Talkateria - strona glowna">
        <img
          src="/talkateria-logo.png"
          alt="Talkateria"
          class="h-12 w-auto sm:h-14"
        >
      </NuxtLink>

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-foreground"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <NuxtLink
        to="/kontakt"
        class="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_12px_30px_rgba(156,90,60,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90 md:inline-flex"
      >
        Umów lekcję próbną
      </NuxtLink>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        :aria-expanded="open"
        aria-label="Przełącz menu"
        @click="open = !open"
      >
        <svg v-if="!open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </nav>

    <div v-if="open" class="border-t border-border bg-background md:hidden">
      <ul class="mx-auto flex max-w-6xl flex-col px-6 py-4">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block py-3 text-sm font-medium text-foreground"
            @click="open = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="pt-2">
          <NuxtLink
            to="/kontakt"
            class="inline-flex w-full justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            @click="open = false"
          >
            Umów lekcję próbną
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
