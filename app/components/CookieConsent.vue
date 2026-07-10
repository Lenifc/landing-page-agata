<script setup>
import { ROUTES } from '~/config/routes'

const { acceptAnalytics, rejectAnalytics, showBanner } = useAnalyticsConsent()
</script>

<template>
  <Teleport to="body">
    <aside
      v-if="showBanner"
      class="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-card px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] sm:px-6"
      role="dialog"
      aria-live="polite"
      aria-label="Zgoda na pliki cookies analityczne"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs leading-relaxed text-muted-foreground">
          Używamy analitycznych plików cookies, aby lepiej
          rozumieć korzystanie użytkowników ze strony.
          Więcej informacji znajdziesz w
          <NuxtLink
            :to="ROUTES.privacyPolicy"
            class="font-medium text-primary underline-offset-2 hover:underline"
          >
            polityce prywatności
          </NuxtLink>.
        </p>

        <div class="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            class="cursor-pointer rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            @click="rejectAnalytics"
          >
            Odrzuć
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            @click="acceptAnalytics"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </aside>
  </Teleport>
</template>
