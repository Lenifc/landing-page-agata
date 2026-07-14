<template>
  <article
    class="flex flex-col rounded-xl border border-border bg-card p-3.5 shadow-sm md:p-4"
  >
    <div
      class="flex flex-col items-start gap-1.5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-2.5 md:gap-y-1.5"
    >
      <h3
        class="order-2 min-w-0 max-w-full font-serif text-lg font-semibold text-foreground md:order-1 md:max-w-[calc(100%-10rem)] md:text-xl"
      >
        {{ option.name }}
      </h3>
      <div class="order-1 flex shrink-0 flex-wrap gap-1.5 md:order-2">
        <span class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {{ option.frequency }}
        </span>
        <span class="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {{ option.duration }}
        </span>
      </div>
    </div>
    <div class="mt-2.5 border-t border-border pt-2.5">
      <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Cena za lekcję
      </p>
      <p class="mt-0.5 font-serif text-xl font-semibold text-primary md:text-2xl">
        <span v-if="option.displayPrefix">{{ option.displayPrefix }} </span>
        {{ option.displayPrice }}
      </p>
      <p class="mt-0.5 text-xs text-muted-foreground md:text-sm">
        {{ option.displayPriceContext }}
      </p>
    </div>
    <div class="mt-2.5 rounded-lg bg-muted px-3 py-2.5">
      <p
        v-if="isOccasional"
        class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        Szczegóły ceny
      </p>
      <button
        v-else
        type="button"
        class="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold leading-none text-primary transition-colors hover:text-foreground"
        :aria-expanded="detailsOpen"
        :aria-controls="detailsId"
        @click="$emit('toggle-details')"
      >
        <span>Szczegóły ceny</span>
        <svg
          class="h-3.5 w-3.5 shrink-0 translate-y-px transition-transform duration-300 ease-out motion-reduce:transition-none"
          :class="{ 'rotate-180': detailsOpen }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <UiCollapse :open="isOccasional || detailsOpen">
        <div
          :id="detailsId"
          class="mt-1 space-y-1 text-xs leading-snug text-muted-foreground"
        >
          <div
            v-for="line in option.paymentLines"
            :key="line.payment"
            class="space-y-0.5"
          >
            <p>
              <span class="font-medium text-foreground/75">Płatność:</span>
              {{ line.payment }}
            </p>
            <p v-if="line.totalPrice">
              <span class="font-medium text-foreground/75">Cena całkowita:</span>
              {{ line.totalPrice }}
            </p>
          </div>
        </div>
      </UiCollapse>
    </div>
    <p class="mt-2.5 text-xs leading-snug text-muted-foreground md:text-sm md:leading-relaxed">
      {{ option.details }}
    </p>
  </article>
</template>

<script setup>
const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  detailsIdPrefix: {
    type: String,
    required: true,
  },
  detailsOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-details'])

const isOccasional = computed(() => isOccasionalPriceOption(props.option))

const detailsId = computed(
  () => `${props.detailsIdPrefix}-price-details-${props.option.id}`,
)
</script>
