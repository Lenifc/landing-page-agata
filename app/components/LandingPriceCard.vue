<template>
  <article
    class="flex min-h-[20rem] flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
  >
    <div class="flex flex-wrap gap-2">
      <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {{ option.frequency }}
      </span>
      <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        {{ option.duration }}
      </span>
    </div>
    <h3 class="mt-4 font-serif text-xl font-semibold text-foreground">
      {{ option.name }}
    </h3>
    <div class="mt-4 border-t border-border pt-4">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Cena za lekcję
      </p>
      <p class="mt-1 font-serif text-2xl font-semibold text-primary">
        <span v-if="option.displayPrefix">{{ option.displayPrefix }} </span>
        {{ option.displayPrice }}
      </p>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ option.displayPriceContext }}
      </p>
    </div>
    <div class="mt-4 rounded-xl bg-muted px-4 py-3">
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
          class="mt-1 space-y-1.5 text-xs leading-snug text-muted-foreground"
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
    <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
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
