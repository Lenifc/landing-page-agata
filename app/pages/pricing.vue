<script setup lang="ts">
useHead({ title: 'Pricing — Talkateria' })

const plans = [
  {
    name: 'Trial',
    price: 'Free',
    cadence: '30-minute session',
    description: 'A relaxed first chat so we can meet and map out your goals.',
    features: [
      '30-minute video call',
      'Level & goals assessment',
      'Personalized learning plan',
      'No commitment required',
    ],
    cta: 'Book your trial',
    featured: false,
  },
  {
    name: 'Conversation',
    price: '$45',
    cadence: 'per 60-min lesson',
    description: 'The core experience — flexible one-on-one lessons that fit your week.',
    features: [
      'Fully tailored one-on-one lessons',
      'Conversation-led approach',
      'Lesson notes after every session',
      'Flexible scheduling',
      'Cancel up to 24h before',
    ],
    cta: 'Start lessons',
    featured: true,
  },
  {
    name: 'Intensive',
    price: '$320',
    cadence: '10-lesson package',
    description: 'Save more and build momentum with a focused block of lessons.',
    features: [
      '10 × 60-minute lessons',
      'Save $130 vs. single lessons',
      'Priority booking slots',
      'Exam & interview prep available',
      'Progress review session included',
    ],
    cta: 'Get the package',
    featured: false,
  },
]

const faqs = [
  {
    q: 'How are lessons delivered?',
    a: 'Lessons happen online over video, or in person at the Brighton studio — whichever suits you best.',
  },
  {
    q: 'Do you teach all levels?',
    a: 'Yes. From nervous beginners to advanced speakers polishing fluency, every plan is shaped around your level.',
  },
  {
    q: 'What if I need to reschedule?',
    a: 'Life happens. You can reschedule or cancel any lesson up to 24 hours beforehand at no charge.',
  },
]
</script>

<template>
  <main>
    <section class="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <span class="text-sm font-medium uppercase tracking-widest text-primary">Pricing</span>
      <h1 class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
        Simple, honest pricing.
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        No hidden fees, no long contracts. Just great lessons priced fairly.
        Start with a free trial and choose what works for you.
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="flex flex-col rounded-3xl border p-8"
          :class="plan.featured ? 'border-primary bg-card shadow-lg ring-1 ring-primary' : 'border-border bg-card shadow-sm'"
        >
          <span
            v-if="plan.featured"
            class="mb-4 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground"
          >
            Most popular
          </span>
          <h2 class="font-serif text-2xl font-semibold text-foreground">{{ plan.name }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ plan.description }}</p>
          <div class="mt-6 flex items-baseline gap-2">
            <span class="font-serif text-4xl font-semibold text-foreground">{{ plan.price }}</span>
            <span class="text-sm text-muted-foreground">{{ plan.cadence }}</span>
          </div>
          <ul class="mt-6 space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-3 text-sm text-foreground"
            >
              <svg class="mt-0.5 size-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <NuxtLink
            to="/contact"
            class="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            :class="plan.featured ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'"
          >
            {{ plan.cta }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-6 py-20">
      <h2 class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground">
        Questions, answered
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="faq in faqs" :key="faq.q" class="py-6">
          <h3 class="font-medium text-foreground">{{ faq.q }}</h3>
          <p class="mt-2 text-pretty leading-relaxed text-muted-foreground">{{ faq.a }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
