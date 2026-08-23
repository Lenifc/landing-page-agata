<template>
  <div class="flex min-h-screen flex-col bg-background">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground">
      Przejdź do treści
    </a>
    <AppNav />
    <div class="relative flex flex-1 flex-col overflow-x-clip">
      <NuxtErrorBoundary @error="onBoundaryError">
        <NuxtPage :transition="pageTransition" />
        <template #error="{ clearError: clearBoundaryError }">
          <main
            id="main-content"
            class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-5 py-16 xs:px-6"
          >
            <p class="text-sm font-medium text-muted-foreground">
              Coś poszło nie tak
            </p>
            <h1
              class="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground"
            >
              Nie udało się wczytać tej sekcji
            </h1>
            <p
              class="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              Menu i stopka działają dalej. Odśwież widok albo wróć na stronę
              główną.
            </p>
            <div
              class="flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap [&>*]:w-full xs:[&>*]:w-auto"
            >
              <UiButton to="/" @click="clearBoundaryError">
                Wróć na stronę główną
              </UiButton>
              <UiButton
                variant="outline"
                type="button"
                @click="clearBoundaryError"
              >
                Spróbuj ponownie
              </UiButton>
            </div>
          </main>
        </template>
      </NuxtErrorBoundary>
    </div>
    <AppFooter />
    <ClientOnly>
      <NuxtErrorBoundary>
        <StickyContactCta :to="contactCtaPath" />
        <CookieConsent />
      </NuxtErrorBoundary>
    </ClientOnly>
  </div>
</template>

<script setup>
import { SITE_URL } from '~/config/routes'

const route = useRoute()
const contactCtaPath = useContactCtaPath()
const pageUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/+$/, '')

  return `${SITE_URL}${path}`
})
const allowPageTransition = useState('allow-page-transition', () => false)

const pageTransition = computed(() => {
  if (!allowPageTransition.value || route.meta.pageTransition === false) {
    return false
  }

  return (
    route.meta.pageTransition ?? {
      name: 'slide-left',
    }
  )
})

const onBoundaryError = (error) => {
  if (import.meta.dev) {
    console.error('[NuxtErrorBoundary]', error)
  }
}

useSeoMeta({
  ogUrl: () => pageUrl.value,
})
</script>
