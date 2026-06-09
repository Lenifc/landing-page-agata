<script setup>
import { CONTACT } from '~/config/contact'
import { getPricingPlans } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.offer
const pageUrl = `${SITE_URL}${pageRoute}`

useSeoMeta({
  title: 'Oferta i cennik angielskiego w Rumi',
  description:
    'Oferta i cennik lekcji angielskiego Talkateria w Rumi: zajęcia indywidualne, małe grupy i grupy egzaminacyjne dla osób z Rumi, Redy, Gdyni i okolic.',
  keywords:
    'oferta angielski Rumia, lekcje angielskiego Rumia, angielski Reda, angielski Gdynia, cennik angielski Rumia',
  ogTitle: 'Talkateria | Oferta angielskiego w Rumi',
  ogDescription:
    'Zobacz formy zajęć i ceny lekcji angielskiego w Rumi. Indywidualnie, w małych grupach i grupach egzaminacyjnych.',
})

const plans = getPricingPlans('offer')

const pricingSections = [
  {
    id: 'wspolpraca-stala',
    navLabel: 'Współpraca stała',
    title: 'Współpraca stała',
    badge: 'Najczęściej wybierane',
    description: [
      'Pakiety edukacyjne to najkorzystniejsza forma nauki. Pakiety stałe obejmują 30 spotkań, a kurs egzaminacyjny w grupie obejmuje 25 spotkań.',
      'Zapewniają regularność, stałe miejsce w grafiku oraz niższą cenę za lekcję w porównaniu do zajęć pojedynczych.',
      'Cena miesięczna obejmuje zajęcia raz w tygodniu: w wariancie standardowym jedno spotkanie 60-minutowe tygodniowo, a w wariancie intensywnym jedno spotkanie 90-minutowe tygodniowo.',
      'Płatność odbywa się z góry, w 8 miesięcznych ratach.',
    ],
    groups: [
      {
        id: 'zajecia-indywidualne',
        navLabel: '1:1',
        title: 'Zajęcia indywidualne (1:1)',
        plans: getPricingPlans('regularIndividual'),
      },
      {
        id: 'zajecia-duo',
        navLabel: 'DUO',
        title: 'Zajęcia w parze (DUO)',
        plans: getPricingPlans('regularDuo'),
      },
      {
        id: 'male-grupy',
        navLabel: 'Małe grupy',
        title: 'Małe grupy',
        plans: getPricingPlans('regularGroups'),
      },
    ],
  },
  {
    id: 'kursy-express',
    navLabel: 'Kursy EXPRESS',
    title: 'Kursy EXPRESS (15 lekcji)',
    badge: 'Intensywnie',
    description: [
      'Intensywne kursy krótkoterminowe dla osób z konkretnym celem: egzaminem, nadrobieniem materiału, wyjazdem lub pracą.',
      'Możliwość płatności w 4 ratach. Doskonałe dla osób przygotowujących się do egzaminów, takich jak E8 lub matura.',
    ],
    plans: getPricingPlans('express'),
  },
  {
    id: 'lekcje-okazjonalne',
    navLabel: 'Lekcje okazjonalne',
    title: 'Lekcje okazjonalne',
    badge: 'Doraźne wsparcie',
    description: [
      'Dla osób, które potrzebują jednorazowego wsparcia lub nie chcą wiązać się długoterminowym kursem. Idealne do nadrabiania materiału, konsultacji oraz doraźnej pomocy przed sprawdzianami i egzaminami.',
      'Płatność odbywa się z góry przed zajęciami.',
    ],
    plans: getPricingPlans('occasional'),
  },
]

const pricingLinks = pricingSections.flatMap((section) => [
  {
    href: `#${section.id}`,
    label: section.navLabel,
  },
  ...(section.groups?.map((group) => ({
    href: `#${group.id}`,
    label: group.navLabel,
  })) ?? []),
])

const faqs = [
  {
    q: 'Ile kosztują zajęcia?',
    a: 'Ceny zależą od formy zajęć - indywidualnych, w parze lub w grupie - oraz od tego, czy wybierzesz regularną naukę w pakiecie, czy pojedyncze lekcje, na przykład doraźną pomoc przed sprawdzianem. Aktualne ceny znajdziesz w cenniku.',
    link: {
      label: 'cenniku',
      href: ROUTES.prices,
      before:
        'Ceny zależą od formy zajęć - indywidualnych, w parze lub w grupie - oraz od tego, czy wybierzesz regularną naukę w pakiecie, czy pojedyncze lekcje, na przykład doraźną pomoc przed sprawdzianem. Aktualne ceny znajdziesz w ',
      after: '.',
    },
  },
  {
    q: 'Jaką formę zajęć wybrać: indywidualne, DUO, TRIO czy grupę?',
    a: 'Zajęcia indywidualne sprawdzają się, gdy potrzebujesz maksymalnego dopasowania tempa i programu. DUO i TRIO są dobre dla osób, które chcą uczyć się ze znajomymi lub rodzeństwem. Grupy egzaminacyjne są przeznaczone dla uczniów przygotowujących się do egzaminu ósmoklasisty albo matury.',
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
    a: 'Nie. Studio znajduje się w Rumi Janowie, ale na zajęcia zgłaszają się też osoby z Redy, Gdyni i okolic. Możliwa jest również nauka online, jeśli dojazd do studia nie jest wygodny.',
  },
  {
    q: 'Jak odbywają się zajęcia?',
    a: 'Zajęcia prowadzone są w studiu przy ul. Wrocławskiej 2 w Rumi (Janowo) lub online na platformie Zoom.',
  },
  {
    q: 'W jakich godzinach odbywają się zajęcia i kontakt?',
    a: `${CONTACT.lessonHoursText} ${CONTACT.contactHoursText} ${CONTACT.smsText} ${CONTACT.emailResponseText}`,
  },
  {
    q: 'Jak wygląda pierwsze spotkanie?',
    a: 'Na początku rozmawiamy o celu nauki, dotychczasowych doświadczeniach i dostępnych terminach. W przypadku uczniów sprawdzamy też poziom, potrzeby szkolne lub egzaminacyjne, aby dobrać odpowiednią formę zajęć i zakres pracy.',
  },
  {
    q: 'Czy zajęcia online różnią się od stacjonarnych?',
    a: 'Zajęcia online nie różnią się pod względem treści ani jakości od zajęć stacjonarnych. Prowadzone są na platformie Zoom i zapewniają taką samą interakcję, wsparcie oraz indywidualne podejście do kursanta. To idealna opcja dla osób ceniących komfort i wygodę nauki bez konieczności dojazdów.',
  },
  {
    q: 'Jak często warto chodzić na angielski?',
    a: 'Najczęściej wystarcza jedno spotkanie tygodniowo, jeśli celem jest regularna nauka i utrzymanie kontaktu z językiem. Dwa spotkania tygodniowo warto wybrać przy przygotowaniu do egzaminu, nadrabianiu zaległości albo wtedy, gdy zależy Ci na szybszych efektach.',
  },
  {
    q: 'Jak długo trwa kurs?',
    a: 'Czas trwania kursu zależy od jego rodzaju oraz celu językowego. Kursy egzaminacyjne w grupie obejmują 25 spotkań i kończą się przed egzaminami, czyli pod koniec kwietnia. Kursy szkolne trwają zazwyczaj od września do końca czerwca. Najczęściej wybierane są pakiety obejmujące 30 spotkań, które stanowią podstawę regularnej nauki. W przypadku kursantów dorosłych kursy trwają zwykle zgodnie z indywidualnymi potrzebami.',
  },
  {
    q: 'Ile osób jest w grupie?',
    a: 'Małe grupy DUO i TRIO są tworzone przez kursantów, czyli przez 2 lub 3 osoby, które chcą uczyć się razem. Grupa egzaminacyjna liczy 4 osoby i jest dobierana tak, aby uczestnicy mieli zbliżony poziom oraz podobny cel nauki.',
  },
  {
    q: 'Czy trzeba kupować podręcznik?',
    a: 'To zależy od rodzaju zajęć i celu kursu. Materiały są dobierane do programu, poziomu i potrzeb kursanta. Jeśli podręcznik będzie potrzebny, informacja pojawi się wcześniej, bez zaskakiwania dodatkowymi kosztami.',
  },
  {
    q: 'Jak wygląda płatność za kurs?',
    a: 'Płatność za kurs zależy od jego rodzaju. Kursy regularne (30 spotkań) opłacane są w systemie miesięcznym. Kursy EXPRESS (15 spotkań) opłacane są jako całość, z możliwością rozbicia płatności na 4 raty. Pojedyncze lekcje (doraźne) opłacane są z góry przed zajęciami.',
  },
  {
    q: 'Co w przypadku nieobecności?',
    a: 'Zasady odwoływania i odrabiania zajęć ustalamy przy zapisie, ponieważ zależą od formy nauki i grafiku. Najważniejsza jest wcześniejsza informacja, żeby można było sensownie zaplanować pracę i terminy. W przypadku zajęć indywidualnych (1:1), jeśli nieobecność zostanie zgłoszona najpóźniej dzień przed zajęciami, lekcję można odrobić w innym terminie ustalonym wspólnie lub zajęcia zostają przesunięte (lekcja jest dopisana na koniec kursu). Jeżeli lekcja zostanie odwołana w dniu zajęć, lekcja jest uznawana za zrealizowaną. W przypadku zajęć grupowych, na prośbę uczestnika możliwe jest otrzymanie materiałów z opuszczonych zajęć.',
  },
  {
    q: 'Czy można dołączyć w trakcie roku szkolnego?',
    a: 'Tak, jeśli są dostępne terminy albo wolne miejsce w odpowiedniej grupie. Przy dołączeniu w trakcie roku sprawdzam poziom i cel nauki, aby zaproponować zajęcia, które będą realnie dopasowane do potrzeb ucznia lub osoby dorosłej.',
  },
  {
    q: 'Jak zapisać się na zajęcia?',
    a: 'Najprościej napisać wiadomość przez maila/SMS lub zadzwonić. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    link: {
      label: 'maila/SMS lub zadzwonić',
      href: ROUTES.contact,
      before: 'Najprościej napisać wiadomość przez ',
      after:
        ' lub mailowo. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    },
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const areaServed = [
  { '@type': 'City', name: 'Rumia' },
  { '@type': 'City', name: 'Reda' },
  { '@type': 'City', name: 'Gdynia' },
]

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: `${pageUrl}#faq`,
        inLanguage: 'pl-PL',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Cennik lekcji angielskiego Talkateria',
        itemListElement: plans.map((plan) => ({
          '@type': 'Offer',
          name: `${plan.name} - ${plan.frequency}`,
          description: plan.details,
          category: 'Lekcje języka angielskiego',
          price: plan.price.match(/\d+/)?.[0],
          priceCurrency: 'PLN',
          areaServed,
        })),
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <span class="text-sm font-medium uppercase tracking-widest text-primary"
        >Oferta</span
      >
      <h1
        class="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground"
      >
        Oferta lekcji angielskiego w Rumi.
      </h1>
      <p
        class="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
      >
        Zajęcia indywidualne, małe grupy i kursy egzaminacyjne dla osób z Rumi,
        Redy, Gdyni i okolic. Spokojnie, praktycznie i z programem dopasowanym
        do celu nauki.
      </p>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span
            class="text-sm font-medium uppercase tracking-widest text-primary"
            >Formy zajęć</span
          >
          <h2
            class="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground"
          >
            Trzy formy nauki dopasowane do różnych potrzeb i celów.
          </h2>
          <p
            class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Oferuję zajęcia języka angielskiego w trzech formach, dopasowanych
            do różnych potrzeb i celów nauki.
          </p>
        </div>

        <div class="mt-12 grid gap-6">
          <article
            class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <p
              class="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Zajęcia indywidualne (1:1)
            </p>
            <div
              class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground"
            >
              <p>
                Indywidualne zajęcia to najbardziej efektywna i spersonalizowana
                forma nauki. Program, tempo pracy i materiały są dopasowywane do
                potrzeb i celów kursanta, dzięki czemu każda lekcja przynosi
                maksymalne korzyści.
              </p>
              <p>
                To dobre rozwiązanie dla osób przygotowujących się do
                <NuxtLink
                  :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  egzaminu ósmoklasisty</NuxtLink
                >,
                <NuxtLink
                  :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  matury z angielskiego</NuxtLink
                >, poprawiających wyniki w szkole lub chcących mówić płynniej i
                pewniej. Dorośli kursanci mogą sprawdzić też
                <NuxtLink
                  :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  zajęcia z angielskiego dla dorosłych</NuxtLink
                >.
              </p>
            </div>
          </article>

          <article
            class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <p
              class="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Małe grupy tworzone przez kursantów (2-3 osoby)
            </p>
            <div
              class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground"
            >
              <p>
                Zajęcia odbywają się w kameralnych grupach tworzonych przez
                uczestników - z przyjaciółmi, znajomymi lub bliskimi osobami.
                Dzięki temu nauka przebiega w swobodnej i komfortowej
                atmosferze, a uczenie się z osobami, które się zna, pomaga
                zmniejszyć stres i zwiększa pewność siebie.
              </p>
              <p>
                Grupa wspólnie określa cel nauki, a program zajęć jest
                dopasowany do jej potrzeb - może obejmować przygotowanie do
                <NuxtLink
                  :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  egzaminu ósmoklasisty</NuxtLink
                >,
                <NuxtLink
                  :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  matury</NuxtLink
                >, wsparcie w nauce szkolnej lub rozwój umiejętności
                komunikacyjnych, także w formule
                <NuxtLink
                  :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  zajęć dla dorosłych</NuxtLink
                >.
              </p>
              <p>
                Takie połączenie pracy w grupie i indywidualnego podejścia
                sprawia, że nauka jest skuteczna i przynosi realne efekty.
              </p>
            </div>
          </article>

          <article
            class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <p
              class="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Grupy egzaminacyjne (4 osoby)
            </p>
            <div
              class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground"
            >
              <p>
                Kursy egzaminacyjne przeznaczone są dla uczniów przygotowujących
                się do
                <NuxtLink
                  :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Egzaminu Ósmoklasisty</NuxtLink
                >
                oraz
                <NuxtLink
                  :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  matury z angielskiego</NuxtLink
                >
                na poziomie podstawowym i rozszerzonym. Zajęcia odbywają się w
                kameralnych, czteroosobowych grupach dobieranych przez lektora
                pod względem poziomu i celu nauki.
              </p>
              <p>
                Pracujemy według programu skoncentrowanego na wymaganiach
                egzaminacyjnych, rozwijając wszystkie sprawności językowe oraz
                ćwicząc strategie niezbędne do osiągnięcia wysokiego wyniku.
              </p>
              <p>
                Małe grupy pozwalają na indywidualne podejście do każdego
                ucznia, a jednocześnie zapewniają motywację i dynamikę wspólnej
                pracy.
              </p>
              <p class="text-sm leading-relaxed text-muted-foreground/80">
                <strong class="font-semibold text-foreground"
                  >Informacja organizacyjna:</strong
                >
                grupy egzaminacyjne są uruchamiane po skompletowaniu pełnego
                składu uczestników. W przypadku niewystarczającej liczby
                zgłoszeń organizator może zaproponować alternatywną formę nauki,
                np. zajęcia w parze lub inną grupę o zbliżonym poziomie i celu
                nauki.
              </p>
            </div>
          </article>
        </div>

        <a
          :href="ROUTES.prices"
          class="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Zobacz cennik
        </a>
      </div>
    </section>

    <section id="cennik" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
      <div class="mb-7 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary"
          >Cennik</span
        >
        <h2
          class="mt-3 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground"
        >
          Cennik zajęć
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Wybierz konsultację, stały pakiet edukacyjny z zajęciami raz w
          tygodniu, intensywny kurs EXPRESS albo lekcję okazjonalną. Ceny zależą
          od formy zajęć, liczby osób i trybu nauki.
        </p>
      </div>

      <nav class="mb-8 flex flex-wrap gap-2" aria-label="Sekcje cennika">
        <a
          v-for="link in pricingLinks"
          :key="link.href"
          :href="link.href"
          class="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="space-y-9">
        <article
          v-for="section in pricingSections"
          :id="section.id"
          :key="section.title"
          class="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0"
        >
          <div class="max-w-3xl">
            <div class="flex flex-wrap items-center gap-3">
              <h3
                class="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                {{ section.title }}
              </h3>
              <span
                class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
              >
                {{ section.badge }}
              </span>
            </div>
            <div
              class="mt-3 space-y-2.5 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              <p v-for="paragraph in section.description" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div v-if="section.groups" class="mt-6 space-y-6">
            <div
              v-for="group in section.groups"
              :id="group.id"
              :key="group.title"
              class="scroll-mt-24"
            >
              <h4 class="font-serif text-xl font-semibold text-foreground">
                {{ group.title }}
              </h4>
              <div
                class="mt-2 overflow-hidden rounded-xl border border-[#d9e7f7] bg-card shadow-[0_14px_34px_rgba(24,55,110,0.05)]"
              >
                <div
                  class="hidden grid-cols-[1.3fr_1fr_1fr] border-b border-border/80 bg-[linear-gradient(90deg,rgba(218,235,255,0.9),rgba(248,252,255,0.98),rgba(239,252,247,0.98))] md:grid"
                >
                  <div class="px-5 py-3 text-sm font-semibold text-foreground">
                    Rodzaj zajęć
                  </div>
                  <div
                    class="border-l border-border/80 px-5 py-3 text-center text-sm font-semibold text-foreground"
                  >
                    Czas trwania
                  </div>
                  <div
                    class="border-l border-border/80 px-5 py-3 text-center text-sm font-semibold text-foreground"
                  >
                    Cena
                  </div>
                </div>

                <div
                  v-for="plan in group.plans"
                  :key="`${group.title}-${plan.name}-${plan.frequency}`"
                  class="grid border-b-4 border-border/80 last:border-b-0 md:grid-cols-[1.3fr_1fr_1fr] md:border-b md:border-border/70"
                  :class="
                    plan.featured
                      ? 'bg-[linear-gradient(90deg,rgba(218,235,255,0.46),rgba(255,255,255,0.98),rgba(239,252,247,0.98))]'
                      : 'bg-card'
                  "
                >
                  <div class="px-4 py-3.5 md:px-5">
                    <div class="flex flex-wrap items-center gap-3">
                      <h5 class="text-lg font-semibold text-foreground">
                        {{ plan.name }}
                      </h5>
                      <span
                        v-if="plan.featured"
                        class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-primary"
                      >
                        Najczęściej wybierane
                      </span>
                    </div>
                    <p class="mt-0.5 text-sm text-foreground/80">
                      {{ plan.frequency }}
                    </p>
                    <p
                      class="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground"
                    >
                      {{ plan.details }}
                    </p>
                  </div>

                  <div
                    class="border-t border-border/70 px-4 py-3.5 md:border-l md:border-t-0 md:px-5 md:text-center"
                  >
                    <p
                      class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden"
                    >
                      Czas trwania
                    </p>
                    <p
                      class="mt-1.5 font-serif text-xl font-semibold text-foreground md:mt-0"
                    >
                      {{ plan.duration }}
                    </p>
                  </div>

                  <div
                    class="border-t border-border/70 px-4 py-3.5 md:border-l md:border-t-0 md:px-5 md:text-center"
                  >
                    <p
                      class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden"
                    >
                      Cena
                    </p>
                    <p
                      class="mt-1.5 font-serif text-xl font-semibold text-foreground md:mt-0"
                    >
                      {{ plan.price }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="mt-5 overflow-hidden rounded-xl border border-[#d9e7f7] bg-card shadow-[0_14px_34px_rgba(24,55,110,0.05)]"
          >
            <div
              class="hidden grid-cols-[1.3fr_1fr_1fr] border-b border-border/80 bg-[linear-gradient(90deg,rgba(218,235,255,0.9),rgba(248,252,255,0.98),rgba(239,252,247,0.98))] md:grid"
            >
              <div class="px-5 py-3 text-sm font-semibold text-foreground">
                Rodzaj zajęć
              </div>
              <div
                class="border-l border-border/80 px-5 py-3 text-center text-sm font-semibold text-foreground"
              >
                Czas trwania
              </div>
              <div
                class="border-l border-border/80 px-5 py-3 text-center text-sm font-semibold text-foreground"
              >
                Cena
              </div>
            </div>

            <div
              v-for="plan in section.plans"
              :key="`${section.title}-${plan.name}-${plan.frequency}`"
              class="grid border-b-4 border-border/80 last:border-b-0 md:grid-cols-[1.3fr_1fr_1fr] md:border-b md:border-border/70"
            >
              <div class="px-4 py-3.5 md:px-5">
                <h4 class="text-lg font-semibold text-foreground">
                  {{ plan.name }}
                </h4>
                <p class="mt-0.5 text-sm text-foreground/80">
                  {{ plan.frequency }}
                </p>
                <p
                  class="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground"
                >
                  {{ plan.details }}
                </p>
              </div>

              <div
                class="border-t border-border/70 px-4 py-3.5 md:border-l md:border-t-0 md:px-5 md:text-center"
              >
                <p
                  class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden"
                >
                  Czas trwania
                </p>
                <p
                  class="mt-1.5 font-serif text-xl font-semibold text-foreground md:mt-0"
                >
                  {{ plan.duration }}
                </p>
              </div>

              <div
                class="border-t border-border/70 px-4 py-3.5 md:border-l md:border-t-0 md:px-5 md:text-center"
              >
                <p
                  class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden"
                >
                  Cena
                </p>
                <p
                  class="mt-1.5 font-serif text-xl font-semibold text-foreground md:mt-0"
                >
                  {{ plan.price }}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-10">
      <div
        class="rounded-[2rem] border border-border bg-secondary px-8 py-10 md:flex md:items-center md:justify-between md:gap-8"
      >
        <div class="max-w-2xl">
          <h2
            class="font-serif text-3xl font-semibold tracking-tight text-foreground"
          >
            Nie wiesz, która forma będzie najlepsza?
          </h2>
          <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Opowiedz mi o sobie i swoim celu, a pomogę Ci wybrać odpowiednią
            formę zajęć.
          </p>
        </div>
        <NuxtLink
          :to="ROUTES.contact"
          class="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90 md:mt-0"
        >
          Zapytaj o termin →
        </NuxtLink>
      </div>
    </section>

    <section id="faq" class="mx-auto max-w-3xl scroll-mt-24 px-6 py-20">
      <h2
        class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground"
      >
        Najczęstsze pytania
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.q }}</span>
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === index }"
                aria-hidden="true"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </h3>
          <p
            :id="`faq-answer-${index}`"
            v-show="openFaqIndex === index"
            class="pb-6 text-pretty leading-relaxed text-muted-foreground"
          >
            <template v-if="faq.link">
              {{ faq.link.before }}
              <a
                :href="faq.link.href"
                class="font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                {{ faq.link.label }}</a
              >{{ faq.link.after }}
            </template>
            <template v-else>{{ faq.a }}</template>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
