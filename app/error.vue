<template>
  <div class="flex min-h-screen flex-col bg-background">
    <main
      id="main-content"
      class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-5 py-16 xs:px-6"
    >
      <p class="text-sm font-medium text-muted-foreground">
        {{ statusLabel }}
      </p>
      <h1
        class="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground"
      >
        {{ title }}
      </h1>
      <p class="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
      <div class="flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap [&>*]:w-full xs:[&>*]:w-auto">
        <UiButton type="button" @click="goHome">Wróć na stronę główną</UiButton>
        <UiButton variant="outline" type="button" @click="handleRetry">
          Spróbuj ponownie
        </UiButton>
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const statusCode = computed(() => Number(props.error?.statusCode) || 500)
const isNotFound = computed(() => statusCode.value === 404)

const statusLabel = computed(() =>
  isNotFound.value ? 'Strona nie istnieje' : 'Coś poszło nie tak',
)

const title = computed(() =>
  isNotFound.value
    ? 'Nie znaleziono tej strony'
    : 'Wystąpił nieoczekiwany błąd',
)

const description = computed(() =>
  isNotFound.value
    ? 'Sprawdź adres lub wróć na stronę główną Talkaterii.'
    : 'Odśwież stronę albo wróć na początek — nawigacja i kontakt nadal powinny działać.',
)

const goHome = () => {
  clearError({ redirect: '/' })
}

const handleRetry = () => {
  clearError()
}

useSeoMeta({
  title: () => (isNotFound.value ? 'Nie znaleziono strony' : 'Błąd'),
  robots: 'noindex, nofollow',
})
</script>
