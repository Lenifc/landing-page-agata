<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-border bg-secondary">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
      <div class="space-y-3">
        <p class="font-serif text-xl font-semibold text-foreground">Talkateria</p>
        <p class="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          A small, personal English studio helping adults and teens speak with
          real confidence.
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Explore</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li><NuxtLink to="/" class="transition-colors hover:text-foreground">Home</NuxtLink></li>
          <li><NuxtLink to="/pricing" class="transition-colors hover:text-foreground">Pricing</NuxtLink></li>
          <li><NuxtLink to="/contact" class="transition-colors hover:text-foreground">Contact</NuxtLink></li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-foreground">Get in touch</p>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>hello@talkateria.com</li>
          <li>+44 1273 555 018</li>
          <li>12 Linden Street, Brighton</li>
          <li>@talkateria</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-5">
        <p class="text-xs text-muted-foreground">
          © {{ year }} Talkateria English Studio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
