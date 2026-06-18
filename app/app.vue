<template>
  <div class="flex min-h-screen flex-col bg-background">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground">
      Przejdź do treści
    </a>
    <AppNav />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
