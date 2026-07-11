<template>
  <Teleport to="body">
    <aside
      v-if="showBanner"
      class="cookie-consent fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-card px-4 py-3 shadow-panel-top sm:px-6"
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        class="cookie-consent__content mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="cookie-consent__text space-y-2">
          <h2 id="cookie-consent-title" class="text-sm font-semibold text-foreground">
            Pliki cookies analityczne
          </h2>
          <p
            id="cookie-consent-description"
            class="text-xs leading-relaxed text-muted-foreground"
          >
          Używamy analitycznych plików cookies, aby lepiej
          rozumieć korzystanie użytkowników ze strony.
          Więcej informacji znajdziesz w
          <NuxtLink
            :to="ROUTES.privacyPolicy"
            class="cookie-consent__link font-medium text-primary underline-offset-2 hover:underline"
          >
            polityce prywatności
          </NuxtLink>.
          </p>
        </div>

        <div class="cookie-consent__actions flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--secondary cursor-pointer rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            @click="rejectAnalytics"
          >
            Odrzuć
          </button>
          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--primary cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            @click="acceptAnalytics"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<script setup>
import { ROUTES } from '~/config/routes'

const { acceptAnalytics, rejectAnalytics, showBanner } = useAnalyticsConsent()
</script>
