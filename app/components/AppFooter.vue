<script setup>
const year = new Date().getFullYear()
const email = ref('hello [at] talkateria.pl')

onMounted(() => {
  email.value = 'hello@talkateria.pl'
})
</script>

<template>
  <footer class="mt-auto border-t border-border bg-secondary">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
      <div class="space-y-3">
        <p class="font-serif text-xl font-semibold text-foreground">
          <img
          src="/talkateria-logo-mono.svg"
          alt="Talkateria - angielski w Rumi"
          class="h-11 w-auto sm:h-12"
          width="188"
          height="56"
          decoding="async"
        />
        </p>
        <p
          class="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground"
        >
          Kameralne studio języka angielskiego w Rumi dla młodzieży i dorosłych
          z Rumi, Redy, Gdyni i okolic.
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Nawigacja</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>
            <NuxtLink to="/" class="transition-colors hover:text-foreground"
              >Strona główna</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/oferta"
              class="transition-colors hover:text-foreground"
              >Oferta</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/kontakt"
              class="transition-colors hover:text-foreground"
              >Kontakt</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Kontakt</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>{{ email }}</li>
          <li>Rumia, ul. Wrocławska 2</li>
          <li>Lekcje indywidualne i grupowe dla osób z Rumi, Redy i Gdyni</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-3">
        <p class="text-xs text-muted-foreground">
          © {{ year }} Talkateria. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  </footer>
</template>
