<template>
  <ol :class="gridClasses">
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      class="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div class="flex items-center gap-4">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm"
          :class="badgeClasses"
        >
          {{ index + 1 }}
        </span>
        <h3 class="font-serif text-xl font-semibold text-foreground">
          {{ step.title }}
        </h3>
      </div>
      <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
        {{ step.body }}
      </p>
    </li>
  </ol>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  columns: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2, 3].includes(value),
  },
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'soft'].includes(value),
  },
})

const gridClasses = computed(() => {
  const columnMap = {
    1: 'grid gap-5',
    2: 'grid gap-5 md:grid-cols-2',
    3: 'grid gap-5 md:grid-cols-3',
  }

  return columnMap[props.columns]
})

const badgeClasses = computed(() =>
  props.variant === 'soft'
    ? 'bg-primary/10 text-primary'
    : 'bg-primary text-primary-foreground',
)
</script>
