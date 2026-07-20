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
        <span
          v-if="!hasRateSwitch && frequencyLabel"
          class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
        >
          {{ frequencyLabel }}
        </span>
        <span class="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {{ option.duration }}
        </span>
      </div>
    </div>

    <div class="mt-2.5 border-t border-border pt-2.5">
      <div v-if="hasRateSwitch" class="mb-3">
        <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Wybierz częstotliwość
        </p>
        <div
          class="mt-2 grid grid-cols-2 gap-2"
          role="group"
          :aria-label="`Częstotliwość — ${option.name}`"
        >
          <button
            v-for="rate in option.rateOptions"
            :key="rate.id"
            type="button"
            class="cursor-pointer rounded-xl border px-3 py-2.5 text-left transition-colors"
            :class="
              selectedRateId === rate.id
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border bg-background hover:border-primary/40'
            "
            :aria-pressed="selectedRateId === rate.id"
            @click="selectedRateId = rate.id"
          >
            <span
              class="block text-xs font-medium"
              :class="
                selectedRateId === rate.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              "
            >
              {{ rate.frequency }}
            </span>
            <span class="mt-0.5 block font-serif text-lg font-semibold text-foreground">
              {{ rate.price }}
            </span>
          </button>
        </div>
      </div>

      <template v-else>
        <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Cena za lekcję
        </p>
        <p class="mt-0.5 font-serif text-xl font-semibold text-primary md:text-2xl">
          <span v-if="option.displayPrefix">{{ option.displayPrefix }} </span>
          {{ displayPrice }}
        </p>
        <p class="mt-0.5 text-xs text-muted-foreground md:text-sm">
          {{ displayPriceContext }}
        </p>
      </template>

      <p
        v-if="hasRateSwitch"
        class="mt-2 text-xs text-muted-foreground md:text-sm"
      >
        {{ displayPriceContext }}
      </p>
    </div>

    <div
      v-if="showDetailsBlock"
      class="mt-2.5 rounded-lg bg-muted px-3 py-2.5"
    >
      <div class="space-y-1 text-xs leading-snug text-muted-foreground">
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
})

const hasRateSwitch = computed(
  () => (props.option.rateOptions?.length ?? 0) > 1,
)

const selectedRateId = ref(
  props.option.defaultRateId ?? props.option.rateOptions?.[0]?.id ?? null,
)

watch(
  () => props.option.rateOptions,
  (rates) => {
    if (!rates?.some((rate) => rate.id === selectedRateId.value)) {
      selectedRateId.value =
        props.option.defaultRateId ?? rates?.[0]?.id ?? null
    }
  },
)

const selectedRate = computed(() =>
  props.option.rateOptions?.find((rate) => rate.id === selectedRateId.value),
)

const frequencyLabel = computed(
  () => selectedRate.value?.frequency ?? props.option.frequency,
)

const displayPrice = computed(
  () => selectedRate.value?.price ?? props.option.displayPrice,
)

const displayPriceContext = computed(
  () => selectedRate.value?.priceContext ?? props.option.displayPriceContext,
)

const showDetailsBlock = computed(
  () => (props.option.paymentLines?.length ?? 0) > 0,
)
</script>
