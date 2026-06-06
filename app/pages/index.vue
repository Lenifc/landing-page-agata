<script setup lang="ts">
const features = [
  {
    title: 'Conversation first',
    body: 'Every lesson is built around real talking, so you gain fluency you can actually use.',
  },
  {
    title: 'Truly one-on-one',
    body: 'No crowded classes. Just you, me, and a plan shaped around your goals.',
  },
  {
    title: 'Warm & patient',
    body: 'A relaxed studio where mistakes are welcome and progress feels natural.',
  },
]

const photos = [
  {
    src: '/studio-space.png',
    alt: 'The studio classroom with a round table and chalkboard',
    class: 'col-span-2 row-span-2',
  },
  { src: '/lesson-1.png', alt: 'Two adults in a relaxed English conversation lesson' },
  { src: '/lesson-2.png', alt: 'Hands writing English vocabulary in a notebook' },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div class="space-y-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          Small studio · big confidence
        </span>
        <h1 class="text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Speak English with real confidence.
        </h1>
        <p class="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          Talkateria is a small, personal studio offering conversation-led
          lessons for adults and teens. Friendly, patient, and built entirely
          around you.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a free trial →
          </NuxtLink>
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            See pricing
          </NuxtLink>
        </div>
      </div>

      <div class="relative">
        <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
          <img
            src="/studio-hero.png"
            alt="The bright, cozy interior of the Talkateria studio"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-md sm:block">
          <p class="font-serif text-3xl font-semibold text-primary">12+</p>
          <p class="text-sm text-muted-foreground">years teaching</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="border-y border-border bg-secondary">
      <div class="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
        <div v-for="f in features" :key="f.title" class="space-y-3">
          <h3 class="font-serif text-xl font-semibold text-foreground">{{ f.title }}</h3>
          <p class="text-pretty leading-relaxed text-muted-foreground">{{ f.body }}</p>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]">
      <div class="overflow-hidden rounded-3xl border border-border shadow-sm">
        <img
          src="/teacher-portrait.png"
          alt="Portrait of Elena, founder and teacher"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="space-y-5">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Hello, I&apos;m Elena</span>
        <h2 class="text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground">
          I started Talkateria to teach the way I always wished I&apos;d been taught.
        </h2>
        <div class="space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            For over a decade I taught in large language schools, and I kept
            noticing the same thing: students learned grammar but froze the
            moment they had to speak. So I built a studio that does it
            differently.
          </p>
          <p>
            My lessons are calm, conversational, and completely tailored. We
            talk about things you actually care about — your work, your travels,
            your favorite shows — and the language follows naturally. Whether
            you&apos;re preparing for an exam, a job interview, or simply want to
            feel at home in English, we&apos;ll find your voice together.
          </p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="mb-10 max-w-xl space-y-3">
          <h2 class="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
            Inside the studio
          </h2>
          <p class="text-pretty leading-relaxed text-muted-foreground">
            A bright, welcoming space designed to make learning feel less like a
            classroom and more like a conversation with a friend.
          </p>
        </div>
        <div class="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
          <div
            v-for="photo in photos"
            :key="photo.src"
            class="group relative overflow-hidden rounded-2xl border border-border"
            :class="photo.class"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-6xl px-6 py-20">
      <div class="rounded-3xl bg-primary px-8 py-14 text-center md:px-16">
        <h2 class="mx-auto max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-primary-foreground">
          Your first lesson is on me.
        </h2>
        <p class="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
          Book a free 30-minute trial and let&apos;s see if we&apos;re a good
          fit. No pressure, just a friendly conversation.
        </p>
        <NuxtLink
          to="/contact"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Book your free trial →
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
