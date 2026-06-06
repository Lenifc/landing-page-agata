<script setup lang="ts">
useHead({ title: 'Contact — Talkateria' })

const details = [
  { label: 'Email', value: 'hello@talkateria.com', href: 'mailto:hello@talkateria.com' },
  { label: 'Phone', value: '+44 1273 555 018', href: 'tel:+441273555018' },
  { label: 'Studio', value: '12 Linden Street, Brighton, BN1 4QP' },
  { label: 'Hours', value: 'Mon–Fri · 9am – 7pm' },
  { label: 'Instagram', value: '@talkateria', href: 'https://instagram.com/talkateria' },
]
</script>

<template>
  <main>
    <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div class="mb-12 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Contact</span>
        <h1 class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
          Let&apos;s find your voice in English.
        </h1>
        <p class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          Have a question or ready to book your free trial? Reach out using any
          of the details below and I&apos;ll reply personally within one working
          day.
        </p>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <div class="space-y-5">
          <div
            v-for="item in details"
            :key="item.label"
            class="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4"
          >
            <div>
              <p class="text-sm font-medium text-muted-foreground">{{ item.label }}</p>
              <component
                :is="item.href ? 'a' : 'p'"
                :href="item.href"
                class="text-foreground"
                :class="item.href ? 'transition-colors hover:text-primary' : ''"
              >
                {{ item.value }}
              </component>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
            <img
              src="/studio-space.png"
              alt="The Talkateria studio with a round table and chalkboard"
              class="h-64 w-full object-cover"
            />
          </div>
          <div class="rounded-3xl border border-border bg-secondary p-6">
            <h3 class="font-serif text-lg font-semibold text-foreground">Prefer to just talk?</h3>
            <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Drop me a line on Instagram or by email and we can arrange a quick,
              no-pressure call to see how I can help you reach your goals.
            </p>
            <a
              href="mailto:hello@talkateria.com"
              class="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Email me directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
