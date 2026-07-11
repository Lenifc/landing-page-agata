<template>
  <UiSection
    :id="id"
    :variant="variant"
    :contained="true"
    :max-width="maxWidth"
    :padding="padding"
    :scroll-margin="Boolean(id)"
  >
    <h2
      v-if="title"
      class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground"
    >
      {{ title }}
    </h2>
    <div
      class="divide-y divide-border border-y border-border"
      :class="title ? 'mt-10' : ''"
    >
      <div v-for="(faq, index) in faqs" :key="faq.q">
        <h3>
          <button
            type="button"
            class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
            :aria-expanded="isOpen(index)"
            :aria-controls="`${idPrefix}-answer-${index}`"
            :aria-label="`${isOpen(index) ? 'Zwiń' : 'Rozwiń'} odpowiedź: ${faq.q}`"
            @click="toggle(index)"
          >
            <span>{{ faq.q }}</span>
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300 ease-out motion-reduce:transition-none"
              :class="{ 'rotate-180': isOpen(index) }"
              aria-hidden="true"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
        </h3>
        <UiCollapse :open="isOpen(index)">
          <div
            :id="`${idPrefix}-answer-${index}`"
            class="pb-6 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground"
          >
            <slot name="answer" :faq="faq" :index="index">
              <template v-if="faq.link">
                {{ faq.link.before }}
                <a
                  :href="faq.link.href"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  {{ faq.link.label }}
                </a>{{ faq.link.after }}
              </template>
              <template v-else>
                {{ faq.a }}
              </template>
            </slot>
          </div>
        </UiCollapse>
      </div>
    </div>
  </UiSection>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  faqs: {
    type: Array,
    required: true,
  },
  id: {
    type: String,
    default: 'faq',
  },
  idPrefix: {
    type: String,
    default: 'faq',
  },
  maxWidth: {
    type: String,
    default: '3xl',
  },
  padding: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'secondary'].includes(value),
  },
})

const { isOpen, toggle } = useAccordion()
</script>
