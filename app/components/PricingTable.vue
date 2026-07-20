<template>
  <div
    class="overflow-hidden rounded-lg border border-table-border bg-card shadow-table max-md:space-y-2 max-md:overflow-visible max-md:rounded-none max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:shadow-none md:rounded-xl"
  >
    <div
      class="hidden border-b border-border/80 bg-secondary md:grid md:grid-cols-[minmax(0,29fr)_6fr_minmax(0,15fr)]"
    >
      <div
        class="px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Rodzaj zajęć
      </div>
      <div
        class="border-l border-border/80 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Czas trwania
      </div>
      <div
        class="border-l border-border/80 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Cena
      </div>
    </div>

    <div
      v-for="plan in plans"
      :key="planKey(plan)"
      class="max-md:overflow-hidden max-md:rounded-lg max-md:border max-md:border-border max-md:shadow-sm md:grid md:grid-cols-[minmax(0,29fr)_6fr_minmax(0,15fr)] md:border-b md:border-border/70 md:shadow-none md:last:border-b-0"
      :class="
        plan.featured
          ? 'max-md:bg-muted bg-muted/60 md:bg-muted'
          : 'max-md:bg-card bg-card'
      "
    >
      <div class="px-3.5 py-3 md:py-2.5">
        <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-3">
          <h5 class="min-w-0 text-base font-semibold text-foreground">
            {{ plan.name }}
          </h5>
          <div class="flex flex-wrap items-center gap-1.5 md:shrink-0 md:justify-end">
            <span
              class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {{ plan.frequency }}
            </span>
            <span
              v-if="plan.featured"
              class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary md:px-3 md:py-1"
            >
              Najczęściej wybierane
            </span>
          </div>
        </div>
        <p
          v-if="plan.details"
          class="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground"
        >
          {{ plan.details }}
        </p>
      </div>

      <div
        class="grid grid-cols-[2fr_3fr] gap-px border-t border-border bg-border/50 max-md:border-border md:contents md:border-border/60 md:bg-border/50"
      >
        <div
          class="bg-inherit px-3.5 py-2.5 md:border-l md:border-border/70 md:bg-transparent"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground md:hidden"
          >
            Czas trwania
          </p>
          <p
            class="mt-0.5 font-serif text-lg font-semibold text-foreground md:mt-0"
          >
            {{ plan.duration }}
          </p>
        </div>

        <div
          class="bg-inherit px-3.5 py-2.5 md:border-l md:border-border/70 md:bg-transparent"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground md:hidden"
          >
            Cena
          </p>
          <p
            class="mt-0.5 font-serif text-lg font-semibold text-foreground md:mt-0"
          >
            {{ plan.price }}
          </p>

          <div
            v-if="hasPriceDetails(plan)"
            class="mt-1.5 w-full space-y-0.5 text-left text-sm leading-snug text-muted-foreground"
          >
            <p v-if="plan.priceDetails?.totalPrice">
              <span class="font-medium text-foreground/75">Cena całkowita:</span>
              {{ plan.priceDetails.totalPrice }}
            </p>
            <p v-if="plan.priceDetails?.lessonPrice">
              <span class="font-medium text-foreground/75">Cena za lekcję:</span>
              {{ plan.priceDetails.lessonPrice }}
            </p>
            <p v-if="plan.paymentNote">
              <span class="font-medium text-foreground/75">Płatność:</span>
              {{ paymentWithoutPrefix(plan.paymentNote) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  plans: {
    type: Array,
    required: true,
  },
})

const planKey = (plan) =>
  plan.id ?? `${plan.name}-${plan.frequency}`

const hasPriceDetails = (plan) =>
  Boolean(
    plan.priceDetails?.totalPrice
      || plan.priceDetails?.lessonPrice,
  )
</script>
