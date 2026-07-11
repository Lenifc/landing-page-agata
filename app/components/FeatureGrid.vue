<template>
  <div :class="gridClasses">
    <article
      v-for="item in items"
      :key="item.title"
      class="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h3 class="font-serif text-xl font-semibold text-foreground">
        {{ item.title }}
      </h3>
      <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
        {{ item.body }}
      </p>
    </article>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Number,
    default: 3,
    validator: (value) => [2, 3, 4].includes(value),
  },
})

const gridClasses = computed(() => {
  const columnMap = {
    2: 'grid gap-5 md:grid-cols-2',
    3: 'grid gap-5 md:grid-cols-3',
    4: 'grid gap-5 md:grid-cols-4',
  }

  return columnMap[props.columns]
})
</script>
