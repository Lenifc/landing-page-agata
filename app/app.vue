<template>
  <div class="flex min-h-screen flex-col bg-background">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground">
      Przejdź do treści
    </a>
    <AppNav />
    <div class="relative flex flex-1 flex-col overflow-x-clip">
      <NuxtPage :transition="pageTransition" />
    </div>
    <AppFooter />
    <CookieConsent />
  </div>
</template>

<script setup>
import { SITE_URL } from '~/config/routes'

const route = useRoute()
const pageUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/+$/, '')

  return `${SITE_URL}${path}`
})

const pageTransition = computed(() => {
  if (route.meta.pageTransition === false) {
    return false
  }

  return (
    route.meta.pageTransition ?? {
      name: 'slide-left',
    }
  )
})

useSeoMeta({
  ogUrl: () => pageUrl.value,
})
</script>
