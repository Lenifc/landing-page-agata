<template>
  <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:pb-24">
    <div class="space-y-6">
      <slot name="badge" />
      <UiSectionHeader
        :eyebrow="eyebrow"
        :title="title"
        title-tag="h1"
        size="lg"
      />
      <div class="text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
        <slot name="description" />
      </div>
      <div v-if="$slots.actions" class="flex flex-wrap gap-4">
        <slot name="actions" />
      </div>
    </div>

    <div :class="imageWrapperClass">
      <img
        :src="imageSrc"
        :srcset="imageSrcset"
        :sizes="imageSizes"
        :alt="imageAlt"
        :width="imageWidth"
        :height="imageHeight"
        :loading="imageLoading"
        :fetchpriority="imageFetchPriority"
        class="h-full w-full object-cover"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  imageSrcset: {
    type: String,
    default: undefined,
  },
  imageSizes: {
    type: String,
    default: undefined,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  imageWidth: {
    type: [String, Number],
    default: 800,
  },
  imageHeight: {
    type: [String, Number],
    default: 800,
  },
  imageLoading: {
    type: String,
    default: 'eager',
  },
  imageFetchPriority: {
    type: String,
    default: undefined,
  },
  imageWrapperClass: {
    type: String,
    default:
      'overflow-hidden rounded-[2rem] border border-border shadow-sm',
  },
})
</script>
