<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in motion-reduce:transition-none"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        ref="dialogRef"
        class="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="currentPhoto?.alt"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <button
          type="button"
          class="absolute inset-0 cursor-default bg-foreground/80 backdrop-blur-sm"
          aria-label="Zamknij podgląd"
          @click="close"
        />

        <div class="relative z-10 flex w-full max-w-6xl flex-col items-center gap-4">
          <button
            type="button"
            class="absolute -top-2 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card sm:-top-3 sm:right-0"
            aria-label="Zamknij"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <img
            :key="currentPhoto?.src"
            :src="currentPhoto?.src"
            :alt="currentPhoto?.alt"
            class="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-card"
            :width="currentPhoto?.width"
            :height="currentPhoto?.height"
          />

          <div
            v-if="photos.length > 1"
            class="flex items-center gap-3 rounded-full border border-border/40 bg-card/95 px-3 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm"
          >
            <button
              type="button"
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label="Poprzednie zdjęcie"
              @click="showPrevious"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <span class="min-w-[3.5rem] text-center tabular-nums text-muted-foreground">
              {{ activeIndex + 1 }} / {{ photos.length }}
            </span>
            <button
              type="button"
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label="Następne zdjęcie"
              @click="showNext"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  photos: {
    type: Array,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:open', 'update:index'])

const dialogRef = ref(null)

const activeIndex = computed({
  get: () => props.index,
  set: (value) => emit('update:index', value),
})

const currentPhoto = computed(() => props.photos[activeIndex.value])

function close() {
  emit('update:open', false)
}

function showPrevious() {
  activeIndex.value =
    (activeIndex.value - 1 + props.photos.length) % props.photos.length
}

function showNext() {
  activeIndex.value = (activeIndex.value + 1) % props.photos.length
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    close()
    return
  }

  if (props.photos.length <= 1) {
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPrevious()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNext()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (!import.meta.client) {
      return
    }

    document.body.style.overflow = isOpen ? 'hidden' : ''

    if (isOpen) {
      nextTick(() => dialogRef.value?.focus())
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>
