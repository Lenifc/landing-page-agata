<template>
  <main id="main-content">
    <section
      class="relative isolate overflow-hidden border-b border-border bg-foreground text-primary-foreground lg:h-[650px]">
      <img src="/photos/online-hero-960.webp" alt="Osoba uczestnicząca w lekcji angielskiego online przy laptopie"
        class="online-hero-image absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[25%_center] md:w-[70%] md:object-contain md:object-right lg:w-auto lg:max-w-none"
        width="974" height="650" fetchpriority="high" />
      <div
        class="online-hero-overlay absolute inset-0 -z-10 bg-foreground/75 md:bg-transparent md:bg-[linear-gradient(90deg,var(--color-hero-overlay)_0%,var(--color-hero-overlay)_34%,color-mix(in_oklch,var(--color-hero-overlay)_92%,transparent)_40%,color-mix(in_oklch,var(--color-hero-overlay)_74%,transparent)_48%,color-mix(in_oklch,var(--color-hero-overlay)_50%,transparent)_57%,color-mix(in_oklch,var(--color-hero-overlay)_28%,transparent)_66%,color-mix(in_oklch,var(--color-hero-overlay)_12%,transparent)_76%,transparent_86%)] lg:hidden" />

      <div
        class="mx-auto flex min-h-[68svh] max-w-6xl items-center px-6 py-14 md:min-h-[70svh] md:py-20 lg:h-full lg:min-h-0 lg:py-16">
        <div class="max-w-2xl">
          <span
            class="inline-flex rounded-full bg-background/92 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            Angielski online
          </span>
          <h1 class="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Angielski online: bez dojazdów i bez straty na jakości.
          </h1>
          <p class="mt-5 max-w-xl text-pretty text-justify text-lg leading-relaxed text-primary-foreground/88">
            Uczysz się tam, gdzie jest Ci najwygodniej, a lekcje nadal mają
            jasny plan, opierają się na aktywnej rozmowie, indywidualnej
            informacji zwrotnej i materiałach dopasowanych do Twojego celu.
            Oszczędzasz czas na dojazdy – to idealna opcja również wtedy, gdy
            mieszkasz daleko od Rumi.
          </p>
          <div class="mt-7 flex flex-wrap gap-4">
            <UiButton :to="contactCtaPath" variant="inverse" class="shadow-neutral-sm">
              Zapytaj o zajęcia →
            </UiButton>
            <UiButton :to="ROUTES.prices" variant="outline-light">
              Zobacz cennik
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid gap-x-10 gap-y-8 md:grid-cols-2">
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Zajęcia dla dorosłych
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Przełamywanie bariery, angielski na co dzień i do pracy (Business
              English). Koncentrujemy się na mówieniu i aktywnej komunikacji bez
              nudnej teorii.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Przygotowanie do egzaminów
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Egzamin ósmoklasisty i matura (podstawa/rozszerzenie). Omawiamy
              zadania egzaminacyjne, poznajemy pewniaki testowe i budujemy
              pewność siebie.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Materiał szkolny
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pomoc z bieżącym materiałem szkolnym i przygotowanie do
              sprawdzianów w szkole. Nadrabiamy zaległości, poprawiamy oceny i
              zdejmujemy szkolny stres.
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-serif text-xl font-semibold leading-snug text-primary">
              Nauka bez wychodzenia z domu
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Zajęcia zdalne w Talkaterii nie są „gorszą wersją” spotkania w
              studiu. To wygodna forma pracy dla osób, które chcą uczyć się
              regularnie, mówić więcej i nie dokładać do nauki kolejnej
              logistyki: dojazdów, odwoływania zajęć przy drobnym spadku formy
              czy rezygnacji z kursu tylko dlatego, że mieszkają dalej.
            </p>
          </div>
        </div>
      </div>
    </section>

    <UiSection padding="lg">
      <UiSectionHeader
        eyebrow="Zalety zajęć zdalnych"
        title="Dlaczego warto wybrać zajęcia online?"
        max-width="3xl"
      />
      <div class="mt-10">
        <FeatureGrid :items="onlineBenefits" :columns="2" />
      </div>
    </UiSection>

    <UiSection variant="secondary" border="y" padding="lg">
      <UiSectionHeader
        eyebrow="Kiedy najbardziej docenisz naukę online?"
        title="Zdalne zajęcia pomagają utrzymać kurs, gdy życie robi swoje."
        max-width="3xl"
      >
        <template #description>
          Największą zaletą online jest ciągłość. Nie chodzi tylko o wygodę,
          ale o to, że mniej rzeczy wybija Cię z nauki: odległość, słabszy
          dzień, korki, deszcz, wyjazd albo zwyczajnie napięty grafik.
        </template>
      </UiSectionHeader>
      <div class="mt-10">
        <FeatureGrid :items="onlineScenarios" :columns="2" />
      </div>
    </UiSection>

    <section class="border-b border-border">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Przebieg lekcji
          </span>
          <h2 class="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Jak wyglądają zajęcia online?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Pracujemy dokładnie tak samo jak w studiu, dlatego wybierając lekcje
            przez internet, nic nie tracisz. Przebieg spotkań zawsze zależy od
            Twojego celu - niezależnie od tego, czy szlifujemy konwersacje,
            przygotowujemy się do egzaminu, czy nadrabiamy szkolny materiał.
            Różnica polega jedynie na tym, że widzimy się przez ekran, a
            wszystkie potrzebne materiały masz pod ręką w wersji cyfrowej.
          </p>
        </div>

        <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ul class="space-y-3">
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                1
              </span>
              <span class="pt-1 leading-relaxed">
                Otrzymasz link do spotkania, w który wystarczy kliknąć o
                umówionej porze - nie musisz nic instalować ani zakładać konta.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                2
              </span>
              <span class="pt-1 leading-relaxed">
                Spotykamy się na Zoomie o ustalonej godzinie.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                3
              </span>
              <span class="pt-1 leading-relaxed">
                Pracujemy poprzez rozmowę, ćwiczenia i materiały dopasowane do
                Twojego celu.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                4
              </span>
              <span class="pt-1 leading-relaxed">
                Po lekcji możesz zapisać na czacie najważniejsze notatki z zajęć
                lub otrzymać dostęp do materiałów, zadań i linków omawianych
                podczas lekcji.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                5
              </span>
              <span class="pt-1 leading-relaxed">
                Jeśli masz pytania lub dodatkowe potrzeby, omawiamy je podczas
                lekcji.
              </span>
            </li>
            <li class="flex gap-4 text-muted-foreground">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                6
              </span>
              <span class="pt-1 leading-relaxed">
                Uczysz się w swoim tempie, a plan zajęć na bieżąco dopasowujemy
                do Twoich potrzeb.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="cennik" class="scroll-mt-24 border-b border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Ceny
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ile kosztują zajęcia zdalne?
          </h2>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cena zależy od formy nauki - indywidualnie lub w parze - oraz od liczby lekcji w
            pakiecie.
          </p>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Standardowy cennik dotyczy zajęć w godzinach popołudniowo-wieczornych
            oraz lekcji w weekendy.
          </p>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Jeśli masz możliwość nauki rano, wybierz tańszy wariant zajęć online, który obowiązuje
            od poniedziałku do piątku (do godziny
            {{ morningOnlinePromotion.deadlineHour }}) To świetna opcja dla osób z elastycznym
            grafikiem, które chcą uczyć się w spokojniejszych godzinach dnia i jednocześnie
            oszczędzić.
          </p>
          <UiButton :to="ROUTES.pricesMorningOnline" variant="outline" class="mt-6">
            Zobacz pełny cennik
          </UiButton>
        </div>

        <div class="mt-10 inline-flex rounded-full border border-border bg-card p-1 shadow-sm"
          role="radiogroup"
          aria-label="Wybierz porę zajęć online">
          <button
            type="button"
            role="radio"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            :class="selectedOnlineTime === 'morning'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
              "
            :aria-checked="selectedOnlineTime === 'morning'"
            @click="setOnlineTime('morning')"
          >
            Zajęcia rano
          </button>
          <button
            type="button"
            role="radio"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            :class="selectedOnlineTime === 'afternoon'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
              "
            :aria-checked="selectedOnlineTime === 'afternoon'"
            @click="setOnlineTime('afternoon')"
          >
            Po południu
          </button>
        </div>

        <div class="mt-5 grid gap-2.5 sm:grid-cols-2 md:gap-3">
          <article v-for="option in highlightedPrices" :key="option.name"
            class="flex flex-col rounded-xl border border-border bg-card p-3.5 shadow-sm md:p-4">
            <div
              class="flex flex-col items-start gap-1.5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-2.5 md:gap-y-1.5"
            >
              <h3
                class="order-2 min-w-0 max-w-full font-serif text-lg font-semibold text-foreground md:order-1 md:max-w-[calc(100%-10rem)] md:text-xl"
              >
                {{ option.name }}
              </h3>
              <div class="order-1 flex shrink-0 flex-wrap gap-1.5 md:order-2">
                <span class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {{ option.frequency }}
                </span>
                <span class="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {{ option.duration }}
                </span>
              </div>
            </div>
            <div class="mt-2.5 border-t border-border pt-2.5">
              <div v-show="selectedOnlineTime === 'afternoon'">
                <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Cena standardowa
                </p>
                <p class="mt-0.5 font-serif text-xl font-semibold text-primary md:text-2xl">
                  <span v-if="option.pricePrefix">{{ option.pricePrefix }}
                  </span>
                  {{ option.standardLessonPrice }}
                </p>
                <p class="mt-0.5 text-xs text-muted-foreground md:text-sm">
                  {{ option.lessonPriceContext }}
                </p>
              </div>
              <div v-show="selectedOnlineTime === 'morning'">
                <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Poranny wariant online
                </p>
                <p class="mt-0.5 font-serif text-xl font-semibold text-primary md:text-2xl">
                  <span v-if="option.pricePrefix">{{ option.pricePrefix }}
                  </span>
                  {{ option.morningLessonPrice }}
                </p>
                <p class="mt-0.5 text-xs text-muted-foreground md:text-sm">
                  {{ option.lessonPriceContext }} do godziny
                  {{ morningOnlinePromotion.deadlineHour }}
                </p>
              </div>
            </div>
            <div class="mt-2.5 rounded-lg bg-muted px-3 py-2.5">
              <p v-if="isOccasionalPriceOption(option)"
                class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Szczegóły ceny
              </p>
              <button v-else type="button"
                class="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold leading-none text-primary transition-colors hover:text-foreground"
                :aria-expanded="isPriceDetailsOpen(getOnlinePriceDetailsId(option))"
                :aria-controls="getOnlinePriceDetailsId(option)"
                @click="togglePriceDetails(getOnlinePriceDetailsId(option))">
                <span>Szczegóły ceny</span>
                <svg class="h-3.5 w-3.5 shrink-0 translate-y-px transition-transform"
                  :class="{ 'rotate-180': isPriceDetailsOpen(getOnlinePriceDetailsId(option)) }" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <UiCollapse
                :open="
                  isOccasionalPriceOption(option) ||
                    isPriceDetailsOpen(getOnlinePriceDetailsId(option))
                "
              >
                <div
                  :id="getOnlinePriceDetailsId(option)"
                  class="mt-1 text-xs leading-snug text-muted-foreground"
                >
                  <div v-show="selectedOnlineTime === 'afternoon'" class="space-y-1.5">
                    <div v-for="line in option.paymentLines" :key="line.standard.payment" class="space-y-0.5">
                      <p>
                        <span class="font-medium text-foreground/75">
                          Płatność:
                        </span>
                        {{ line.standard.payment }}
                      </p>
                      <p v-if="line.standard.totalPrice">
                        <span class="font-medium text-foreground/75">
                          Cena całkowita:
                        </span>
                        {{ line.standard.totalPrice }}
                      </p>
                    </div>
                  </div>
                  <div v-show="selectedOnlineTime === 'morning'" class="space-y-1.5">
                    <div v-for="line in option.paymentLines" :key="line.morning.payment" class="space-y-0.5">
                      <p>
                        <span class="font-medium text-foreground/75">
                          Płatność:
                        </span>
                        {{ line.morning.payment }}
                      </p>
                      <p v-if="line.morning.totalPrice">
                        <span class="font-medium text-foreground/75">
                          Cena całkowita:
                        </span>
                        {{ line.morning.totalPrice }}
                      </p>
                    </div>
                  </div>
                </div>
              </UiCollapse>
            </div>
            <p class="mt-2.5 text-xs leading-snug text-muted-foreground md:text-sm md:leading-relaxed">
              {{ option.details }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <FaqAccordion
      id="faq"
      id-prefix="online-faq"
      title="Najczęstsze pytania o zajęcia zdalne"
      :faqs="faqs"
    />

    <CtaBanner
      title="Chcesz uczyć się angielskiego online?"
      description="Napisz, jaki jest Twój cel. Wspólnie dobierzemy idealną formę i dogodny termin."
      button-label="Zapytaj o zajęcia →"
      :button-to="contactCtaPath"
    />
  </main>
</template>

<script setup>
import { getPricingPlans, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildServicePageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.onlineClasses
const pageUrl = `${SITE_URL}${pageRoute}`

const priceOptions = getPricingPlans('onlineClasses')
const morningOnlinePromotion = getPricingPromotion('morningOnline')
const getPriceOption = (id) => priceOptions.find((option) => option.id === id)
const individualAnnualStandard = priceOptions.find(
  (option) => option.id === 'individualAnnualWeekly',
)
const individualAnnualIntense = priceOptions.find(
  (option) => option.id === 'individualAnnualTwiceWeekly',
)
const duoAnnualStandard = priceOptions.find(
  (option) => option.id === 'duoAnnualWeekly',
)
const duoAnnualIntense = priceOptions.find(
  (option) => option.id === 'duoAnnualTwiceWeekly',
)
const miniIndividual = getPriceOption('miniIndividual')
const miniDuo = getPriceOption('miniDuo')
const occasionalIndividual = getPriceOption('occasionalIndividual')
const morningOnlineOptions = getPricingPlans('morningOnline')
const morningOnlineIndividualStandard = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningIndividualAnnualWeekly',
)
const morningOnlineIndividualIntense = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningIndividualAnnualTwiceWeekly',
)
const morningOnlineDuoStandard = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningDuoAnnualWeekly',
)
const morningOnlineDuoIntense = morningOnlineOptions.find(
  (option) => option.id === 'onlineMorningDuoAnnualTwiceWeekly',
)
const morningOnlineOccasionalIndividual = morningOnlineOptions.find(
  (option) => option.id === 'occasionalMorningOnlineIndividual',
)
const morningOnlineOccasionalDuo = morningOnlineOptions.find(
  (option) => option.id === 'occasionalMorningOnlineDuo',
)
const paymentWithoutPrefix = (value) => value.replace(/^miesięcznie:\s*/, '')
const formatPriceValue = (value) => {
  const formatted = value.toFixed(2).replace('.', ',')
  return `${formatted.endsWith(',00') ? formatted.slice(0, -3) : formatted} zł`
}

const totalPriceFromInstallments = (
  plan,
  installmentPrice = Number(plan.schemaPrice),
) => {
  const installments = Number.parseInt(plan.price, 10)
  const suffix = plan.price.includes('/ osoba') ? ' / osoba' : ''

  return `${formatPriceValue(installments * installmentPrice)}${suffix}`
}

const installmentPaymentLine = (
  plan,
  installmentPrice = Number(plan.schemaPrice),
) => {
  const suffix = plan.price.includes('/ osoba') ? ' / osoba' : ''

  return `${Number.parseInt(plan.price, 10)} rat × ${formatPriceValue(
    installmentPrice,
  )}${suffix}`
}

const priceDetailLine = (
  plan,
  payment = plan.price,
  totalPrice = plan.priceDetails?.totalPrice ?? plan.price,
) => ({
  payment,
  totalPrice,
})

const buildPaymentLine = (label, plan, morningPlan = plan) => ({
  standard: priceDetailLine(
    plan,
    `${label}: ${paymentWithoutPrefix(plan.paymentNote)}`,
  ),
  morning: priceDetailLine(
    morningPlan,
    `${label}: ${paymentWithoutPrefix(morningPlan.paymentNote)}`,
  ),
})
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const priceWithContext = (plan) =>
  `${personPrice(plan.fromPrice)} ${plan.fromPriceContext}`
const individualAnnualPrice = priceWithContext(individualAnnualIntense)
const morningOnlinePriceRatio =
  Number(morningOnlineIndividualStandard.schemaPrice) /
  Number(individualAnnualStandard.schemaPrice)
const miniIndividualMorningInstallment =
  Number(miniIndividual.schemaPrice) * morningOnlinePriceRatio
const miniDuoMorningInstallment =
  Number(miniDuo.schemaPrice) * morningOnlinePriceRatio
const miniIndividualPaymentLine = {
  standard: priceDetailLine(
    miniIndividual,
    `24 lekcje: ${miniIndividual.price}`,
  ),
  morning: priceDetailLine(
    miniIndividual,
    `24 lekcje: ${installmentPaymentLine(
      miniIndividual,
      miniIndividualMorningInstallment,
    )}`,
    totalPriceFromInstallments(
      miniIndividual,
      miniIndividualMorningInstallment,
    ),
  ),
}
const miniDuoPaymentLine = {
  standard: priceDetailLine(miniDuo, `24 lekcje: ${miniDuo.price}`),
  morning: priceDetailLine(
    miniDuo,
    `24 lekcje: ${installmentPaymentLine(
      miniDuo,
      miniDuoMorningInstallment,
    )}`,
    totalPriceFromInstallments(miniDuo, miniDuoMorningInstallment),
  ),
}
const individualAnnualPaymentLines = [
  miniIndividualPaymentLine,
  buildPaymentLine(
    '32 lekcje',
    individualAnnualStandard,
    morningOnlineIndividualStandard,
  ),
  buildPaymentLine(
    '64 lekcje',
    individualAnnualIntense,
    morningOnlineIndividualIntense,
  ),
]
const duoAnnualPaymentLines = [
  miniDuoPaymentLine,
  buildPaymentLine('32 lekcje', duoAnnualStandard, morningOnlineDuoStandard),
  buildPaymentLine('64 lekcje', duoAnnualIntense, morningOnlineDuoIntense),
]
const morningOnlinePrices = {
  individual: morningOnlineIndividualIntense.fromPrice,
  duo: morningOnlineDuoIntense.fromPrice,
  occasionalIndividual: morningOnlineOccasionalIndividual.price,
  occasionalDuo: morningOnlineOccasionalDuo.price,
}

const highlightedPrices = [
  {
    ...individualAnnualIntense,
    name: 'Pakiety 1:1 online',
    frequency: '24/32/64 lekcje',
    pricePrefix: 'od',
    standardLessonPrice: individualAnnualIntense.fromPrice,
    morningLessonPrice: morningOnlineIndividualIntense.fromPrice,
    lessonPriceContext: individualAnnualIntense.fromPriceContext,
    paymentLines: individualAnnualPaymentLines,
    details:
      'Pakiet MINI, Standard lub Intense dla osób, które chcą uczyć się online regularnie, z programem dopasowanym do celu.',
  },
  {
    ...duoAnnualIntense,
    name: 'Pakiety DUO online',
    frequency: '24/32/64 lekcje',
    pricePrefix: 'od',
    standardLessonPrice: duoAnnualIntense.fromPrice,
    morningLessonPrice: morningOnlineDuoIntense.fromPrice,
    lessonPriceContext: duoAnnualIntense.fromPriceContext,
    paymentLines: duoAnnualPaymentLines,
    details:
      'Pakiet MINI, Standard lub Intense dla dwóch osób uczących się razem online w podobnym rytmie.',
  },
  {
    ...occasionalIndividual,
    standardLessonPrice: occasionalIndividual.price,
    morningLessonPrice: morningOnlineOccasionalIndividual.price,
    lessonPriceContext: `za lekcję ${occasionalIndividual.duration}`,
    paymentLines: [
      {
        standard: priceDetailLine(
          occasionalIndividual,
          'płatność za pojedynczą lekcję',
        ),
        morning: priceDetailLine(
          morningOnlineOccasionalIndividual,
          'płatność za pojedynczą lekcję',
        ),
      },
    ],
  },
]

const onlineBenefits = [
  {
    title: 'Zero dojazdów',
    body: 'Nie tracisz czasu na korki, szukanie parkingu, przesiadki ani pogodowe niespodzianki. Wystarczy komputer lub tablet, spokojne miejsce i kilka minut na przygotowanie przed lekcją.',
  },
  {
    title: 'Nie wypadasz z rytmu tak łatwo',
    body: 'Jeśli w dniu zajęć czujesz się gorzej, ale nadal masz siłę na spokojną pracę, nie musisz od razu przenosić lekcji. Możesz zostać w domu, mieć koc i herbatę obok, a mimo to utrzymać kontakt z językiem.',
  },
  {
    title: 'Odległość przestaje mieć znaczenie',
    body: 'Mieszkasz dalej niż Rumia? Żaden problem. Zajęcia zdalne są dostępne z całej Polski, więc możesz uczyć się w Talkaterii bez organizowania dojazdów.',
  },
  {
    title: 'Łatwiej dopasować naukę do dnia',
    body: 'Online sprawdza się przy pracy zmianowej, napiętym planie lekcji, opiece nad dzieckiem albo wtedy, gdy po prostu trudno wcisnąć dojazd między kolejne obowiązki.',
  },
  {
    title: 'Materiały są zawsze pod ręką',
    body: 'Notatki, linki, ćwiczenia i powtórki mogą trafiać w jedno cyfrowe miejsce, więc łatwiej wracać do nich między lekcjami i nadrabiać drobne zaległości.',
  },
  {
    title: 'Komfort sprzyja mówieniu',
    body: 'Własne biurko i spokojne otoczenie często pomagają przełamać barierę językową. Nadal pracujemy aktywnie: rozmawiamy, poprawiamy błędy i ćwiczymy reakcje.',
  },
]

const onlineScenarios = [
  {
    title: 'Kiedy dojazd zabiera więcej energii niż sama nauka',
    body: 'Po szkole, pracy albo dodatkowych zajęciach czasem najtrudniejsza jest logistyka. Online skraca drogę do lekcji do jednego kliknięcia.',
  },
  {
    title: 'Kiedy pogoda, korki albo choroba mieszają w planie',
    body: 'Nie każda gorsza dyspozycja oznacza, że trzeba odwoływać zajęcia. Jeśli możesz pracować, spotykamy się zdalnie i robimy lekcję w spokojniejszym tempie.',
  },
  {
    title: 'Kiedy mieszkasz poza Trójmiastem',
    body: 'Zdalnie możesz uczyć się z małej miejscowości, innego województwa albo z miejsca, do którego trudno byłoby regularnie dojeżdżać do studia.',
  },
  {
    title: 'Kiedy jesteś w podróży lub zmieniasz miejsce pobytu',
    body: 'Wyjazd rodzinny, delegacja czy czasowy pobyt poza domem nie muszą przerywać kursu, jeśli masz internet i spokojną przestrzeń do rozmowy.',
  },
]

const faqs = [
  {
    q: 'Ile kosztują lekcje angielskiego online?',
    a: `Popołudniowo-wieczorne pakiety 1:1 online zaczynają się od ${individualAnnualPrice}. Poranny wariant online do godziny ${morningOnlinePromotion.deadlineHour} zaczyna się od ${morningOnlinePrices.individual} za lekcję 50 min w pakiecie 1:1 oraz od ${morningOnlinePrices.duo} za lekcję 50 min w pakiecie DUO. Lekcja okazjonalna w porannym wariancie online kosztuje ${morningOnlinePrices.occasionalIndividual} w formule 1:1 albo ${personPrice(morningOnlinePrices.occasionalDuo)} w DUO. Pod ceną podana jest miesięczna płatność i liczba rat, np. w pakiecie 1:1 Standard: 32 lekcje - ${paymentWithoutPrefix(individualAnnualStandard.paymentNote)}, a w pakiecie 1:1 Intense: 64 lekcje - ${paymentWithoutPrefix(individualAnnualIntense.paymentNote)}.`,
  },
  {
    q: 'Czy zajęcia zdalne są tak samo skuteczne jak stacjonarne?',
    a: 'Tak, jeśli są dobrze prowadzone i regularne. Program, tempo pracy i informacja zwrotna pozostają takie same jak w studiu, a forma online daje dodatkowo wygodę, oszczędność czasu i większą odporność na codzienne zmiany planu.',
  },
  {
    q: 'Czego potrzebuję do lekcji online?',
    a: `Wystarczy stabilne połączenie internetowe, komputer lub tablet, kamerka oraz mikrofon.
Wiele osób chętnie korzysta też ze słuchawek, co pomaga lepiej się skupić i odciąć od
otoczenia. Przyda się również spokojne miejsce do rozmowy oraz – jeśli lubisz taką formę –
tradycyjny zeszyt lub kartka do robienia własnych notatek. Link do spotkania dostajesz ode
mnie przed zajęciami, więc nie musisz niczego wcześniej instalować.
`,
  },
  {
    q: 'Czy online można przygotować się do egzaminu?',
    a: `Zajęcia online świetnie sprawdzają się w przygotowaniu do egzaminów. Pracujemy na
arkuszach, rozwijamy strategie egzaminacyjne oraz ćwiczymy słuchanie, czytanie, gramatykę
i pisanie. To skuteczna forma nauki zarówno do egzaminu ósmoklasisty, jak i matury z języka
angielskiego - szczególnie przy napiętym harmonogramie maturzysty.`,
  },
  {
    q: 'Czy mogę łączyć zajęcia zdalne ze stacjonarnymi?',
    a: `Tak, jeśli pozwala na to grafik. Możesz łączyć zajęcia stacjonarne w studiu z lekcjami online.
Wielu kursantów uczy się głównie stacjonarnie, a online korzysta okazjonalnie, gdy wygodniej
zostać w domu. To wygodne rozwiązanie, które pozwala utrzymać regularność nauki bez
rezygnowania z elastyczności i dopasować formę zajęć do Twoich aktualnych potrzeb i planu
dnia.`,
  },
  {
    q: 'Czy zajęcia online są dostępne tylko dla osób z okolic Rumi?',
    a: 'Nie. W zajęciach zdalnych możesz uczestniczyć z dowolnego miejsca w Polsce. To dobre rozwiązanie, jeśli mieszkasz dalej, często wyjeżdżasz albo po prostu chcesz uczyć się bez dojazdów.',
  },
  {
    q: 'Co jeśli gorzej się czuję w dniu lekcji?',
    a:
      'Jeśli czujesz, że coś Cię „bierze”, nawet lekko, najbezpieczniej zostać w domu i odpocząć. ' +
      'W takiej sytuacji możesz też przejść na lekcję online i uczyć się bez wychodzenia z domu - ' +
      'dzięki temu nie tracisz zajęć i pozostajesz w rytmie nauki.\n\n' +
      'Jeśli nie dasz rady wziąć udziału w lekcji, możesz ją odwołać najpóźniej dzień wcześniej. ' +
      'W innym przypadku lekcja przepada.',
  },
]

const selectedOnlineTime = ref('morning')
const openPriceDetailsId = ref(null)

const setOnlineTime = (time) => {
  if (selectedOnlineTime.value === time) {
    return
  }

  openPriceDetailsId.value = null
  selectedOnlineTime.value = time
}

const getOnlinePriceDetailsId = (option) =>
  `online-price-details-${option.id}-${selectedOnlineTime.value}`

const isOccasionalPriceOption = (option) => option.id.startsWith('occasional')

const isPriceDetailsOpen = (detailsId) => openPriceDetailsId.value === detailsId

const togglePriceDetails = (detailsId) => {
  openPriceDetailsId.value = isPriceDetailsOpen(detailsId) ? null : detailsId
}

useSeoMeta({
  title: 'Angielski online – zajęcia zdalne',
  description:
    'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
  ogTitle: 'Angielski online – zajęcia zdalne | Talkateria',
  ogDescription:
    'Angielski online bez dojazdów, z całej Polski: wygodnie, regularnie i z takim samym indywidualnym podejściem jak w studiu.',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    jsonLdScript(
      buildServicePageJsonLd({
        pageUrl,
        pageName: 'Angielski online – zajęcia zdalne',
        pageDescription:
          'Lekcje angielskiego online na Zoomie dla dorosłych i uczniów z całej Polski. Bez dojazdów, z indywidualnym planem i naciskiem na mówienie.',
        serviceName: 'Lekcje angielskiego online',
        serviceType: 'Lekcje języka angielskiego online',
        serviceDescription:
          'Indywidualne i kameralne zajęcia z języka angielskiego online na platformie Zoom, prowadzone przez studio w Rumi.',
        priceOptions,
        audience: {
          '@type': 'Audience',
          audienceType: 'młodzież i dorośli',
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: pageUrl,
          serviceLocation: {
            '@type': 'VirtualLocation',
            url: pageUrl,
          },
        },
        faqs,
      }),
    ),
  ],
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .online-hero-image {
    -webkit-mask-image: linear-gradient(to right,
        transparent 0%,
        rgba(0, 0, 0, 0.35) 10%,
        rgba(0, 0, 0, 0.7) 22%,
        rgba(0, 0, 0, 0.9) 32%,
        #000 40%);
    mask-image: linear-gradient(to right,
        transparent 0%,
        rgba(0, 0, 0, 0.35) 10%,
        rgba(0, 0, 0, 0.7) 22%,
        rgba(0, 0, 0, 0.9) 32%,
        #000 40%);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
}
</style>
