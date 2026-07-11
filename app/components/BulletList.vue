<template>
  <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h3
      v-if="title"
      class="font-serif text-xl font-semibold text-foreground"
    >
      {{ title }}
    </h3>
    <ul
      class="space-y-4"
      :class="title ? 'mt-5' : ''"
    >
      <li
        v-for="item in items"
        :key="item"
        class="flex gap-3"
      >
        <span
          class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        <span class="text-pretty leading-relaxed text-muted-foreground">
          {{ item }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>
