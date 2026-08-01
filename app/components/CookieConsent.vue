<template>
  <Teleport to="body">
    <aside
      v-if="showBanner"
      class="cookie-consent fixed inset-x-3 z-[60] rounded-2xl border border-border/50 bg-card/80 px-3 py-2.5 shadow-lg backdrop-blur-md transition-[bottom] duration-200 ease-out sm:inset-x-0 sm:bottom-0 sm:rounded-none sm:border-x-0 sm:border-t sm:border-border sm:bg-card/95 sm:px-6 sm:pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pt-3 sm:shadow-panel-top"
      :class="
        stickyCtaVisible
          ? 'bottom-[calc(var(--sticky-cta-clearance)+0.125rem)]'
          : 'bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))]'
      "
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        class="cookie-consent__content mx-auto flex max-w-6xl flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <div class="cookie-consent__text space-y-1 sm:space-y-2">
          <h2
            id="cookie-consent-title"
            class="text-xs font-semibold text-foreground sm:text-sm"
          >
            Pliki cookies analityczne
          </h2>
          <p
            id="cookie-consent-description"
            class="text-[11px] leading-snug text-muted-foreground sm:text-xs sm:leading-relaxed"
          >
            Używamy cookies analitycznych, by lepiej rozumieć korzystanie ze
            strony. Szczegóły w
            <NuxtLink
              :to="ROUTES.privacyPolicy"
              class="cookie-consent__link font-medium text-primary underline-offset-2 hover:underline"
            >
              polityce prywatności
            </NuxtLink>.
          </p>
        </div>

        <div
          class="cookie-consent__actions flex shrink-0 gap-2 sm:justify-end"
        >
          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--secondary cursor-pointer rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-secondary sm:bg-background sm:text-xs"
            @click="rejectAnalytics"
          >
            Zamknij
          </button>
          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--primary cursor-pointer rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
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
const stickyCtaVisible = useState('sticky-cta-visible', () => false)
</script>
