<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-border bg-secondary">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
      <div class="space-y-3">
        <p class="font-serif text-xl font-semibold text-foreground">Talkateria</p>
        <p class="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Kameralne lekcje angielskiego dla młodzieży i dorosłych, prowadzone w
          spokojnej atmosferze i nastawione na realną swobodę mówienia.
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Na skróty</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li><NuxtLink to="/" class="transition-colors hover:text-foreground">Start</NuxtLink></li>
          <li><NuxtLink to="/cennik" class="transition-colors hover:text-foreground">Cennik</NuxtLink></li>
          <li><NuxtLink to="/kontakt" class="transition-colors hover:text-foreground">Kontakt</NuxtLink></li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Kontakt</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>hello@talkateria.com</li>
          <li>Rumia, ul. Wrocławska 2</li>
          <li>Lekcje indywidualne i grupowe</li>
          <li>Odpowiedź zwykle w 1 dzień roboczy</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-5">
        <p class="text-xs text-muted-foreground">
          © {{ year }} Talkateria. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  </footer>
</template>
