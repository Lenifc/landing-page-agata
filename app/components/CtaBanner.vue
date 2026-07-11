<template>
  <UiSection
    :variant="sectionVariant"
    border="t"
    padding="md"
    max-width="6xl"
  >
    <div
      class="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-primary px-8 text-center shadow-primary-lg"
      :class="size === 'lg' ? 'py-14 md:px-16' : 'py-12'"
    >
      <h2
        class="mx-auto max-w-2xl font-serif font-semibold tracking-tight text-primary-foreground"
        :class="size === 'lg' ? 'text-4xl leading-tight' : 'text-3xl'"
      >
        <slot name="title">{{ title }}</slot>
      </h2>
      <p
        class="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85"
        :class="size === 'lg' ? 'max-w-md text-center' : ''"
      >
        <slot name="description">{{ description }}</slot>
      </p>
      <UiButton
        :to="buttonTo"
        variant="inverse"
        class="mt-7"
        :class="size === 'lg' ? 'md:mt-8' : ''"
      >
        <slot name="button">{{ buttonLabel }}</slot>
      </UiButton>
    </div>
  </UiSection>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  buttonTo: {
    type: [String, Object],
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg'].includes(value),
  },
  sectionVariant: {
    type: String,
    default: 'secondary',
    validator: (value) => ['default', 'secondary'].includes(value),
  },
})
</script>
