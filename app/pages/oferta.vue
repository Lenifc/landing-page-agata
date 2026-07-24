<template>
  <main id="main-content" class="pb-20 md:pb-0">
    <section class="bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-14 text-center md:pb-20">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Oferta</span>
        <h1
          class="mx-auto mt-4 max-w-4xl font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl sm:leading-[1.08] md:text-5xl">
          <span class="block sm:whitespace-nowrap">
            Angielski w Rumi oraz online -
          </span>
          <span class="block">oferta i cennik zajęć</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          W jednym miejscu znajdziesz formy zajęć, orientacyjne dopasowanie do
          celu oraz pełny cennik. Dzięki temu łatwiej porównać opcje i wybrać
          kurs odpowiedni do poziomu, tempa nauki i budżetu - stacjonarnie w kameralnym studiu w Rumi (Janowo) lub wygodnie online z
          dowolnego miejsca.
        </p>
      </div>
    </section>

    <section id="cennik" class="scroll-mt-24 border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div class="mb-5 max-w-2xl md:mb-7">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Cennik</span>
        <h2 class="mt-2 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:mt-3 md:text-4xl">
          Cennik zajęć
        </h2>
         <p class="mt-3 text-pretty leading-relaxed text-muted-foreground md:mt-4">
          Różne potrzeby wymagają różnych rozwiązań. Wybierz formę nauki dopasowaną do swoich celów, tempa pracy i możliwości czasowych.
         </p>
         <p class="mt-3 text-pretty leading-relaxed text-muted-foreground md:mt-4">
          Prosty cennik: stawka za lekcję 50 minut zależy od formy nauki
          (1:1 albo DUO) oraz częstotliwości (1× lub 2× w tygodniu). Kurs
          egzaminacyjny to jedyny pakiet z płatnością w ratach.
        </p>
        <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-3" id="cennik-sekcje">
          Te same stawki obowiązują stacjonarnie w Rumi i online poza godzinami
          porannymi. Cennik poranny online znajdziesz na początku listy poniżej.
          Przed startem możesz umówić bezpłatną konsultację online (15&nbsp;min) —
          po krótkiej rozmowie dobierzemy formę zajęć do celu nauki i dostępnych terminów.
        </p>
      </div>

      <nav class="mb-5 flex flex-wrap gap-1.5 md:mb-8 md:gap-2" aria-label="Sekcje cennika">
        <a v-for="link in pricingLinks" :key="link.href" :href="link.href" :aria-label="link.label"
          class="inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary md:px-3.5 md:py-1.5">
          {{ link.label }}
        </a>
      </nav>

      <div class="space-y-6 md:space-y-8">
        <article
          id="zajecia-online"
          class="scroll-mt-24 border-t border-border pt-5 first:border-t-0 first:pt-0 md:pt-6"
        >
          <div class="max-w-3xl">
            <div class="flex flex-wrap items-center gap-2 md:gap-3">
              <h3 class="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Cennik poranny online
              </h3>
              <span
                class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary md:px-3 md:py-1">
                Pn–Pt do 12:00
              </span>
            </div>
            <div class="mt-2 space-y-1.5 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">
              <p>{{ PRICING_NOTES.morningOnline }}</p>
            </div>
          </div>

          <PricingTable :plans="morningOnlinePlans" class="mt-4 md:mt-5" />
        </article>

        <div class="space-y-6 border-t border-border pt-5 md:space-y-8 md:pt-6">
          <header class="max-w-3xl">
            <div class="flex flex-wrap items-center gap-2 md:gap-3">
              <h3 class="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Cennik popołudniowy
              </h3>
              <span
                class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary md:px-3 md:py-1">
                Studio | online od 15:00
              </span>
            </div>
            <p class="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">
              Te same stawki obowiązują stacjonarnie w Rumi i online w godzinach popołudniowych.
            </p>
          </header>

          <article
            v-for="(section, index) in pricingSections"
            :id="section.id"
            :key="section.title"
            class="scroll-mt-24"
            :class="index > 0 ? 'border-t border-border pt-5 md:pt-6' : ''"
          >
            <div class="max-w-3xl">
              <div class="flex flex-wrap items-center gap-2 md:gap-3">
                <h4 class="font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {{ section.title }}
                </h4>
                <span
                  v-if="section.badge"
                  class="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary md:px-3 md:py-1">
                  {{ section.badge }}
                </span>
              </div>
              <div class="mt-2 space-y-1.5 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">
                <p v-for="paragraph in section.description" :key="paragraph">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <div v-if="section.groups" class="mt-4 space-y-4 md:mt-5 md:space-y-5">
              <div v-for="group in section.groups" :id="group.id" :key="group.title" class="scroll-mt-24">
                <h5 class="font-serif text-base font-semibold text-foreground md:text-lg">
                  {{ group.title }}
                </h5>
                <PricingTable :plans="group.plans" class="mt-2" />
              </div>
            </div>

            <PricingTable v-else :plans="section.plans" class="mt-4 md:mt-5" />
          </article>
        </div>
      </div>

      <div class="mt-6 max-w-3xl space-y-1.5 text-sm leading-relaxed text-muted-foreground md:mt-8">
        <p>{{ PRICING_NOTES.advancePayment }}</p>
      </div>

      <div class="mt-8 flex flex-wrap gap-3 md:mt-10">
        <UiButton :to="contactCtaPath">Zapytaj o zajęcia →</UiButton>
      </div>
      </div>
    </section>

    <section class="border-t border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">Formy zajęć</span>
          <h2 class="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
            Jak wybrać odpowiednią formę zajęć?
          </h2>
          <p class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Jeśli nie wiesz jeszcze, czy lepsze będą zajęcia 1:1, DUO czy kurs
            egzaminacyjny, zacznij od tego krótkiego porównania.
          </p>
        </div>

        <div class="mt-12 grid gap-6">
          <article class="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm md:p-5">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Zajęcia indywidualne (1:1)
            </p>
            <div class="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              <p>
                To najlepszy wybór, jeśli zależy Ci na pełnym dopasowaniu
                programu, tempa pracy i materiałów do jednej osoby.
              </p>
              <p>
                Sprawdza się szczególnie u osób przygotowujących się do
                <NuxtLink :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  egzaminu ósmoklasisty</NuxtLink>,
                <NuxtLink :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  matury z języka angielskiego</NuxtLink>, albo potrzebujących
                <NuxtLink :to="ROUTES.schoolSupport"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  korepetycji z angielskiego</NuxtLink>
                przy poprawie wyników w szkole, a także u tych, którzy chcą
                rozwijać konwersacje i szybciej widzieć postępy. Dorośli
                kursanci mogą sprawdzić też
                <NuxtLink :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  zajęcia z angielskiego dla dorosłych</NuxtLink>.
              </p>
            </div>
          </article>

          <article class="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm md:p-5">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Zajęcia DUO w parach
            </p>
            <div class="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              <p>
                To dobra opcja dla dwóch osób - z rodzeństwem, przyjacielem, partnerem lub inną bliską
                osobą, które chcą uczyć się razem i
                mają podobny poziom oraz zbliżony cel nauki.
              </p>
              <p>
                Lekcje mogą obejmować przygotowanie do
                <NuxtLink :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  egzaminu ósmoklasisty</NuxtLink>,
                <NuxtLink :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  matury</NuxtLink>,
                <NuxtLink :to="ROUTES.schoolSupport"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  korepetycje z angielskiego</NuxtLink>, wsparcie w nauce szkolnej, rozwijanie umiejętności
                konwersacyjnych lub praktyczną naukę
                <NuxtLink :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  języka dla dorosłych</NuxtLink>.
              </p>
              <p>
                DUO łączy większą motywację i niższy koszt z nadal kameralną
                formą pracy.
              </p>
            </div>
          </article>

          <article class="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm md:p-5">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Kurs egzaminacyjny
            </p>
            <div class="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Kursy egzaminacyjne są przeznaczone dla uczniów przygotowujących
                się do
                <NuxtLink :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  Egzaminu Ósmoklasisty</NuxtLink>
                oraz
                <NuxtLink :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  matury z języka angielskiego</NuxtLink>
                na poziomie podstawowym i rozszerzonym. Zajęcia odbywają się w
                kameralnych 3-osobowych grupach i obejmują 25 spotkań po 100 minut.
              </p>
              <p>
                Program kursu koncentruje się na wymaganiach egzaminacyjnych:
                arkuszach, strategiach, gramatyce, słownictwie i regularnych
                powtórkach przed egzaminem.
              </p>
              <p>
                Kameralna grupa 3 osób pozwala korzystać z motywacji pracy z
                innymi i zachować indywidualne wsparcie.
              </p>
              <p class="text-xs leading-relaxed text-muted-foreground/70">
                Informacja organizacyjna: kursy egzaminacyjne są uruchamiane po
                skompletowaniu grupy. W przypadku niewystarczającej liczby
                zgłoszeń może zostać zaproponowana alternatywna forma nauki, np.
                zajęcia DUO lub lekcje indywidualne.
              </p>
            </div>
          </article>
        </div>

        <UiButton :href="ROUTES.prices" class="mt-8">
          Porównaj stawki
        </UiButton>
      </div>
    </section>

    <section class="border-t border-border">
      <div class="mx-auto max-w-6xl px-6 py-10">
        <div
          class="flex flex-col items-center rounded-[2rem] border border-border bg-card px-8 py-10 text-center shadow-sm">
          <div class="max-w-2xl">
            <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
              Nie wiesz jeszcze, która opcja będzie najlepsza?
            </h2>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Napisz, dla kogo mają być zajęcia i jaki jest cel nauki —
              albo umów bezpłatną konsultację online (15&nbsp;min).
              Podpowiem, czy lepiej sprawdzą się zajęcia 1:1, DUO czy kurs
              egzaminacyjny.
            </p>
          </div>
          <UiButton :to="contactCtaPath" class="mt-6">
            Napisz, czego szukasz →
          </UiButton>
        </div>
      </div>
    </section>

    <FaqAccordion
      id="faq"
      title="Najczęstsze pytania"
      :faqs="faqs"
      padding="lg"
      variant="secondary"
    />

    <StickyContactCta :to="contactCtaPath" label="Umów bezpłatną konsultację →" />
  </main>
</template>

<script setup>
import {
  getMorningOnlinePlans,
  getPricingPlan,
  getPricingPlans,
  PRICING_NOTES,
} from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildOfferPageJsonLd, jsonLdScript } from '~/config/schema'

const contactCtaPath = useContactCtaPath()
const pageRoute = ROUTES.offer
const pageUrl = `${SITE_URL}${pageRoute}`
const plans = getPricingPlans('offer')
const morningOnlinePlans = getMorningOnlinePlans()
const offerCatalogPlans = plans.map((plan) =>
  Object.fromEntries(
    Object.entries(plan).filter(
      ([key]) => !['fromPrice', 'fromPriceContext'].includes(key),
    ),
  ),
)
const individualWeekly = getPricingPlan('individualWeekly')
const individualTwiceWeekly = getPricingPlan('individualTwiceWeekly')
const duoWeekly = getPricingPlan('duoWeekly')
const duoTwiceWeekly = getPricingPlan('duoTwiceWeekly')
const examGroup = getPricingPlan('examGroup')
const offerPricingFaqAnswer = `Cennik jest prosty: cena za lekcję 50 min zależy od formy i częstotliwości. Zajęcia 1:1: ${individualWeekly.price} (1×) / ${individualTwiceWeekly.price} (2×), DUO: ${personPrice(duoWeekly.price)} (1×) / ${personPrice(duoTwiceWeekly.price)} (2×). Kurs egzaminacyjny w 3-osobowej grupie: 108 zł / osoba za spotkanie 100 min, płatność ${paymentWithoutPrefix(examGroup.paymentNote)}. Osobny cennik obowiązuje przy porannych lekcjach online (Pn–Pt do 12:00).`

useSeoMeta({
  title: 'Oferta oraz cennik zajęć z angielskiego w Rumi',
  description:
    'Sprawdź cennik lekcji angielskiego w Rumi: zajęcia indywidualne, DUO i kurs egzaminacyjny. Bezpłatna konsultacja online 15 min.',
  ogTitle: 'Cennik zajęć z angielskiego w Rumi | Talkateria',
  ogDescription:
    'Aktualne ceny lekcji angielskiego w Rumi: 1:1, DUO i kurs egzaminacyjny. Umów bezpłatną konsultację online (15 min).',
})

const pricingSections = [
  {
    id: 'zajecia-indywidualne',
    navLabel: '1:1',
    title: 'Lekcje indywidualne 1:1',
    description: [
      'Stawka za lekcję zależy od częstotliwości. Przy dwóch lekcjach w tygodniu obowiązuje niższa cena za spotkanie.',
    ],
    plans: getPricingPlans('individual'),
  },
  {
    id: 'zajecia-duo',
    navLabel: 'DUO',
    title: 'Lekcje DUO (cena za osobę)',
    description: [
      'Zajęcia w parze — cena podana za osobę. Przy dwóch lekcjach w tygodniu stawka jest niższa.',
    ],
    plans: getPricingPlans('duo'),
  },
  {
    id: 'kurs-egzaminacyjny',
    navLabel: 'Egzaminacyjny',
    title: 'Kurs egzaminacyjny',
    badge: 'Pakiet · 8 rat',
    description: [
      'Jedyny pakiet w ofercie: 25 spotkań po 100 minut w 3-osobowej grupie (egzamin ósmoklasisty lub matura). Spotkanie 100 min = 108 zł / osoba (54 zł za 50 min). Płatność w 8 równych ratach.',
    ],
    plans: getPricingPlans('annualExam'),
  },
]

const pricingLinks = [
  {
    href: '#zajecia-online',
    label: 'Poranny online',
  },
  ...pricingSections.map((section) => ({
    href: `#${section.id}`,
    label: section.navLabel,
  })),
]

const faqs = [
  {
    q: 'Ile kosztują zajęcia?',
    a: offerPricingFaqAnswer,
    link: {
      label: 'cenniku',
      href: ROUTES.prices,
      before: 'Aktualne stawki znajdziesz w ',
      after: `. ${offerPricingFaqAnswer}`,
    },
  },
  {
    q: 'Jaką formę zajęć wybrać: indywidualne, DUO czy kurs egzaminacyjny?',
    a: 'Zajęcia indywidualne sprawdzają się, gdy potrzebujesz maksymalnego dopasowania tempa i programu. DUO jest dobre dla dwóch osób, które chcą uczyć się razem i pracować w podobnym rytmie. Kurs egzaminacyjny jest przeznaczony dla uczniów przygotowujących się do egzaminu ósmoklasisty albo matury.',
  },
  {
    q: 'Czy przygotowujesz do egzaminu ósmoklasisty?',
    a: 'Tak, prowadzę przygotowanie do egzaminu ósmoklasisty z angielskiego w Rumi. Na zajęciach ćwiczymy arkusze, strategie egzaminacyjne, czytanie, słuchanie, środki językowe, wypowiedź pisemną oraz najważniejsze powtórki gramatyczno-leksykalne.',
  },
  {
    q: 'Czy przygotowujesz do matury z angielskiego?',
    a: 'Tak. Przygotowuję do matury z angielskiego na poziomie podstawowym i rozszerzonym. Program obejmuje pracę z arkuszami, pisanie, słownictwo, gramatykę, strategie rozwiązywania zadań oraz wzmacnianie tych obszarów, które najbardziej wpływają na wynik.',
  },
  {
    q: 'Czy prowadzisz zajęcia dla dorosłych?',
    a: 'Tak, dorośli mogą uczyć się od podstaw, wrócić do angielskiego po przerwie albo rozwijać swobodę mówienia. Zajęcia dla dorosłych są dopasowane do celu: rozmowy, podróże, praca, przełamanie blokady językowej lub uporządkowanie gramatyki.',
  },
  {
    q: 'Czy można zacząć od zera?',
    a: 'Tak. Zajęcia mogą rozpocząć osoby bez wcześniejszej znajomości angielskiego. Tempo, materiały i sposób pracy dobieram tak, aby nauka była spokojna, zrozumiała i stopniowo budowała pewność w komunikacji.',
  },
  {
    q: 'Czy zajęcia są tylko dla osób z Rumi?',
    a: 'Nie. Studio znajduje się w Rumi, ale na zajęcia zgłaszają się też osoby z Redy, Gdyni i okolic. Możliwa jest również nauka online, jeśli dojazd do studia nie jest wygodny.',
  },
  {
    q: 'Jak odbywają się zajęcia?',
    a: 'Zajęcia prowadzone są w studiu przy ul. Wrocławskiej 2 w Rumi (Janowo) lub online na platformie Zoom.',
  },
  {
    q: 'Jak ustalane są terminy zajęć i kontakt?',
    a: 'Terminy zajęć ustalam indywidualnie przy zapisie, po dopasowaniu formy nauki i dostępności kursanta. Najprościej wysłać formularz, e-mail lub SMS z krótką informacją o celu nauki.',
  },
  {
    q: 'Jak wygląda pierwsze spotkanie?',
    a: 'Przed startem możesz umówić bezpłatną konsultację online (15 min). Rozmawiamy o celu nauki, dotychczasowych doświadczeniach i dostępnych terminach. W przypadku uczniów sprawdzamy też poziom, potrzeby szkolne lub egzaminacyjne, aby dobrać odpowiednią formę zajęć i zakres pracy.',
  },
  {
    q: 'Czy zajęcia online różnią się od stacjonarnych?',
    a: 'Zajęcia online nie różnią się pod względem treści ani jakości od zajęć stacjonarnych. Prowadzone są na platformie Zoom i zapewniają taką samą interakcję, wsparcie oraz indywidualne podejście do kursanta. Poza godzinami porannymi stawki są takie same jak przy zajęciach stacjonarnych. Poranne lekcje online (Pn–Pt do 12:00) mają osobny cennik.',
  },
  {
    q: 'Jak często warto chodzić na angielski?',
    a: 'Najczęściej wystarcza jedno spotkanie tygodniowo, jeśli celem jest regularna nauka i utrzymanie kontaktu z językiem. Dwa razy w tygodniu warto wybrać przy przygotowaniu do egzaminu, nadrabianiu zaległości albo wtedy, gdy zależy Ci na szybszych efektach — wtedy obowiązuje też niższa stawka za lekcję.',
  },
  {
    q: 'Jak wygląda nauka w DUO i kursie egzaminacyjnym?',
    a: 'DUO to zajęcia w parze dla dwóch osób, które chcą uczyć się razem. Kurs egzaminacyjny dla uczniów klasy 7/8 i maturzystów ma formę 3-osobowej grupy i obejmuje 25 spotkań po 100 minut. Mała grupa daje motywację wspólnej pracy, a jednocześnie pozwala zachować indywidualne podejście.',
  },
  {
    q: 'Czy trzeba kupować podręcznik?',
    a: 'To zależy od rodzaju zajęć i celu kursu. Materiały są dobierane do programu, poziomu i potrzeb kursanta. Jeśli podręcznik będzie potrzebny, informacja pojawi się wcześniej, bez zaskakiwania dodatkowymi kosztami.',
  },
  {
    q: 'Jak wygląda płatność za zajęcia?',
    a: 'Lekcje 1:1 i DUO rozliczane są według stawki za lekcję (zależnej od częstotliwości). Płatność jest z góry, na podstawie prognozowanej liczby spotkań w danym miesiącu. Kurs egzaminacyjny jest płatny w 8 równych ratach miesięcznych. Szczegóły płatności i odwołań ustalamy przy zapisie.',
  },
  {
    q: 'Co w przypadku nieobecności?',
    a: 'Zasady odwoływania i odrabiania zajęć ustalamy przy zapisie, ponieważ zależą od formy nauki i grafiku. Najważniejsza jest wcześniejsza informacja, żeby można było sensownie zaplanować pracę i terminy. W przypadku zajęć indywidualnych (1:1), jeśli nieobecność zostanie zgłoszona najpóźniej dzień przed zajęciami, lekcję można odrobić w innym terminie ustalonym wspólnie. Jeżeli lekcja zostanie odwołana w dniu zajęć, lekcja jest uznawana za zrealizowaną. W przypadku zajęć grupowych, na prośbę uczestnika możliwe jest otrzymanie materiałów z opuszczonych zajęć.',
  },
  {
    q: 'Czy można dołączyć w trakcie roku szkolnego?',
    a: 'Tak, jeśli są dostępne terminy albo wolne miejsce w grupie egzaminacyjnej. Przy dołączeniu w trakcie roku sprawdzam poziom i cel nauki, aby zaproponować zajęcia dopasowane do potrzeb.',
  },
  {
    q: 'Jak zapisać się na zajęcia?',
    a: 'Najprościej napisać wiadomość przez formularz lub mailowo. Można też zadzwonić lub wysłać SMS. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    link: {
      label: 'formularz lub mailowo',
      href: ROUTES.contactDetails,
      before: 'Najprościej napisać wiadomość przez ',
      after:
        '. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    },
  },
]

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    jsonLdScript(
      buildOfferPageJsonLd({
        pageUrl,
        name: 'Oferta i cennik zajęć z angielskiego w Rumi',
        description:
          'Sprawdź cennik lekcji angielskiego w Rumi: zajęcia indywidualne, DUO i kurs egzaminacyjny. Bezpłatna konsultacja online 15 min.',
        plans: offerCatalogPlans,
        faqs,
      }),
    ),
  ],
})
</script>
