<script setup>
import {
  getPricingPlan,
  getPricingPlans,
  getPricingPromotion,
} from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'
import { buildOfferPageJsonLd, jsonLdScript } from '~/config/schema'

const pageRoute = ROUTES.offer
const pageUrl = `${SITE_URL}${pageRoute}`
const plans = getPricingPlans('offer')
const morningOnlinePlans = getPricingPlans('morningOnline')
const morningOnlineIndividualPlans = morningOnlinePlans.filter(
  (plan) => plan.id.includes('Annual') && plan.id.includes('Individual'),
)
const morningOnlineDuoPlans = morningOnlinePlans.filter(
  (plan) => plan.id.includes('Annual') && plan.id.includes('Duo'),
)
const offerCatalogPlans = plans.map((plan) =>
  Object.fromEntries(
    Object.entries(plan).filter(
      ([key]) => !['fromPrice', 'fromPriceContext'].includes(key),
    ),
  ),
)
const individualAnnualStandard = getPricingPlan('individualAnnualWeekly')
const individualAnnualIntense = getPricingPlan('individualAnnualTwiceWeekly')
const duoAnnualIntense = getPricingPlan('duoAnnualTwiceWeekly')
const examGroup = getPricingPlan('examGroup')
const examEarlyBirdPromotion = getPricingPromotion('examEarlyBird')
const personPrice = (value) => value.replace(' / osoba', ' za osobę')
const priceWithContext = (plan) =>
  `${personPrice(plan.fromPrice)} ${plan.fromPriceContext}`
const individualAnnualPrice = priceWithContext(individualAnnualIntense)
const duoAnnualPrice = priceWithContext(duoAnnualIntense)
const examGroupPrice = priceWithContext(examGroup)
const offerPricingFaqAnswer = `W pakietach rocznych i egzaminacyjnych ceny są przeliczone na koszt jednej lekcji. Cena „od” dotyczy wyboru wariantu pakietu: 1:1 od ${individualAnnualPrice} przy pakiecie rocznym i DUO od ${duoAnnualPrice} przy pakiecie rocznym. Grupowy kurs egzaminacyjny ma stałą cenę ${examGroupPrice}. Pod taką ceną znajdziesz też miesięczną płatność i liczbę rat, np. ${individualAnnualStandard.price} albo ${personPrice(examGroup.price)}.`

useSeoMeta({
  title: 'Oferta oraz cennik zajęć z angielskiego w Rumi',
  description:
    'Sprawdź cennik lekcji angielskiego w Rumi: zajęcia indywidualne, DUO, kursy egzaminacyjne, pakiet MINI i lekcje okazjonalne.',
  ogTitle: 'Cennik zajęć z angielskiego w Rumi | Talkateria',
  ogDescription:
    'Zobacz aktualne pakiety i ceny lekcji angielskiego w Rumi: 1:1, DUO, kurs egzaminacyjny i lekcje okazjonalne.',
})

const promotions = [
  {
    title: '–10% na cały grupowy kurs egzaminacyjny',
    description: `Zaoszczędź ${examEarlyBirdPromotion.savings} na całym kursie! Cena regularna całego kursu to ${personPrice(examEarlyBirdPromotion.regularTotalPrice)}, a cena obniżona to ${personPrice(examEarlyBirdPromotion.promoTotalPrice)}. Promocja obowiązuje osoby zapisujące się na kurs egzaminacyjny (ósmoklasisty lub maturalny) przy podpisaniu umowy do ${examEarlyBirdPromotion.deadline}`,
  },
]

const pricingSections = [
  {
    id: 'poranne-zajecia-online',
    navLabel: 'Online rano',
    title: 'Poranne zajęcia online',
    badge: 'Do 12:00',
    description: [
      'Osobny wariant zajęć online dla osób, które mogą uczyć się rano, do godziny 12:00.',
      'Ceny są rozłożone na 10 równych rat miesięcznych i dotyczą pakietów rocznych 1:1 oraz DUO.',
    ],
    groups: [
      {
        id: 'poranne-online-indywidualne',
        title: 'Poranne online 1:1',
        plans: morningOnlineIndividualPlans,
      },
      {
        id: 'poranne-online-duo',
        title: 'Poranne online DUO',
        plans: morningOnlineDuoPlans,
      },
    ],
  },
  {
    id: 'pakiety-roczne',
    title: 'Pakiety indywidualne, DUO i egzaminacyjne',
    badge: 'Stała cena',
    description: [
      'Kompleksowe cykle nauki z gwarancją stałej ceny. Pakiety Standard i Intense są rozłożone na 10 równych rat miesięcznych, a pakiet MINI i grupowy kurs egzaminacyjny na 8 równych rat.',
      'Wysokość rat pozostaje stała niezależnie od liczby zajęć w danym miesiącu oraz przerw świątecznych i feryjnych.',
    ],
    groups: [
      {
        id: 'zajecia-indywidualne',
        navLabel: '1:1',
        title: 'Zajęcia indywidualne (1:1)',
        plans: [
          getPricingPlan('miniIndividual'),
          ...getPricingPlans('annualIndividual'),
        ],
      },
      {
        id: 'zajecia-duo',
        navLabel: 'DUO',
        title: 'Zajęcia w parze (DUO)',
        plans: [getPricingPlan('miniDuo'), ...getPricingPlans('annualDuo')],
      },
      {
        id: 'pakiet-egzaminacyjny',
        navLabel: 'Egzaminacyjny',
        title: 'Kurs egzaminacyjny',
        plans: getPricingPlans('annualExam'),
      },
    ],
  },
  {
    id: 'lekcje-okazjonalne',
    navLabel: 'Lekcje okazjonalne',
    title: 'Lekcje okazjonalne - bez zobowiązań',
    badge: 'Płatność z góry',
    description: [
      'Doraźna pomoc, nadrabianie materiału lub konsultacje przed sprawdzianem bez długoterminowych umów. Dla nowych kursantów dostępna jest jednorazowa lekcja w osobnej cenie wskazanej w cenniku.',
      'W tej sekcji znajdziesz też poranny wariant online do godziny 12:00.',
      'Płatność odbywa się z góry przed zajęciami.',
    ],
    plans: getPricingPlans('occasional'),
  },
]

const pricingLinks = pricingSections.flatMap((section) => [
  ...(section.navLabel
    ? [
      {
        href: `#${section.id}`,
        label: section.navLabel,
      },
    ]
    : []),
  ...(section.groups
    ?.filter((group) => group.navLabel)
    .map((group) => ({
      href: `#${group.id}`,
      label: group.navLabel,
    })) ?? []),
])

const faqs = [
  {
    q: 'Ile kosztują zajęcia?',
    a: 'Ceny zależą od formy zajęć - indywidualnych, w parze lub w kursie egzaminacyjnym - oraz od tego, czy wybierzesz pakiet roczny, pakiet MINI czy pojedynczą lekcję. Aktualne ceny znajdziesz w cenniku.',
    link: {
      label: 'cenniku',
      href: ROUTES.prices,
      before:
        'Ceny zależą od formy zajęć - indywidualnych, w parze lub w kursie egzaminacyjnym - oraz od tego, czy wybierzesz pakiet roczny, pakiet MINI czy pojedynczą lekcję. Aktualne ceny znajdziesz w ',
      after: '.',
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
    a: 'Na początku rozmawiamy o celu nauki, dotychczasowych doświadczeniach i dostępnych terminach. W przypadku uczniów sprawdzamy też poziom, potrzeby szkolne lub egzaminacyjne, aby dobrać odpowiednią formę zajęć i zakres pracy.',
  },
  {
    q: 'Czy zajęcia online różnią się od stacjonarnych?',
    a: 'Zajęcia online nie różnią się pod względem treści ani jakości od zajęć stacjonarnych. Prowadzone są na platformie Zoom i zapewniają taką samą interakcję, wsparcie oraz indywidualne podejście do kursanta. To idealna opcja dla osób ceniących komfort i wygodę nauki bez konieczności dojazdów.',
  },
  {
    q: 'Jak często warto chodzić na angielski?',
    a: 'Najczęściej wystarcza jedno spotkanie tygodniowo, jeśli celem jest regularna nauka i utrzymanie kontaktu z językiem. Wariant z dwiema lekcjami tygodniowo, zwykle realizowanymi w jednym bloku 2 × 50 minut, warto wybrać przy przygotowaniu do egzaminu, nadrabianiu zaległości albo wtedy, gdy zależy Ci na szybszych efektach.',
  },
  {
    q: 'Jak długo trwa kurs?',
    a: 'Czas trwania kursu zależy od jego rodzaju oraz celu językowego. Pakiety roczne obejmują 32 lekcje w wersji Standard albo 64 lekcje w wersji Intense. Wariant Intense jest zwykle realizowany w 32 cotygodniowych blokach 2 × 50 minut. Kurs egzaminacyjny obejmuje 25 spotkań po 100 minut, a pakiet MINI obejmuje 24 lekcje po 50 minut.',
  },
  {
    q: 'Jak wygląda nauka w DUO i kursie egzaminacyjnym?',
    a: 'DUO to zajęcia w parze dla dwóch osób, które chcą uczyć się razem. Kurs egzaminacyjny dla uczniów klasy 7/8 i maturzystów ma formę kameralnej grupy maksymalnie 4-osobowej i obejmuje 25 spotkań po 100 minut. Mała grupa daje motywację wspólnej pracy, a jednocześnie pozwala zachować indywidualne podejście.',
  },
  {
    q: 'Czy trzeba kupować podręcznik?',
    a: 'To zależy od rodzaju zajęć i celu kursu. Materiały są dobierane do programu, poziomu i potrzeb kursanta. Jeśli podręcznik będzie potrzebny, informacja pojawi się wcześniej, bez zaskakiwania dodatkowymi kosztami.',
  },
  {
    q: 'Jak wygląda płatność za kurs?',
    a: 'Pakiety Standard i Intense są płatne w 10 stałych ratach miesięcznych. Grupowy kurs egzaminacyjny i pakiet MINI są płatne w 8 ratach miesięcznych. Raty są stałe i niezależne od liczby zajęć w danym miesiącu oraz przerw świątecznych i feryjnych. Lekcje okazjonalne są płatne z góry przed zajęciami.',
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
    a: 'Najprościej napisać wiadomość przez formularz lub mailowo. Można też zadzwonić lub wysłać SMS. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    link: {
      label: 'formularz lub mailowo',
      href: ROUTES.contact,
      before: 'Najprościej napisać wiadomość przez ',
      after:
        '. W wiadomości warto podać wiek ucznia, cel nauki, preferowaną formę zajęć oraz informację, czy interesują Cię lekcje stacjonarne w Rumi, czy online.',
    },
  },
]

const openFaqIndex = ref(null)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

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
          'Sprawdź cennik lekcji angielskiego w Rumi: zajęcia indywidualne, DUO, kursy egzaminacyjne, pakiet MINI i lekcje okazjonalne.',
        plans: offerCatalogPlans,
        faqs,
      }),
    ),
  ],
})
</script>

<template>
  <main id="main-content">
    <section class="mx-auto max-w-4xl px-6 py-16 text-center md:pb-24">
      <span class="text-sm font-medium uppercase tracking-widest text-primary">Oferta</span>
      <h1
        class="mx-auto mt-4 max-w-[52rem] font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl sm:leading-[1.08] md:text-5xl">
        <span class="block sm:whitespace-nowrap">
          Angielski w Rumi oraz online -
        </span>
        <span class="block">oferta i cennik zajęć</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-pretty text-justify text-lg leading-relaxed text-muted-foreground">
        Każdy uczy się inaczej, dlatego oferuję elastyczne formy nauki. Wybierz
        kurs dopasowany do swoich celów, tempa i możliwości czasowych -
        stacjonarnie w kameralnym studiu w Rumi (Janowo) lub wygodnie online z
        dowolnego miejsca.
      </p>
    </section>

    <section class="border-y border-border bg-primary/5">
      <div class="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">
            Promocje
          </span>
          <h2 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Niższy próg wejścia na start
          </h2>
        </div>

        <div class="mt-7 grid gap-5 md:grid-cols-3">
          <article v-for="promotion in promotions" :key="promotion.title"
            class="rounded-2xl border border-primary/15 bg-card p-6 shadow-sm">
            <h3 class="font-serif text-xl font-semibold text-primary">
              {{ promotion.title }}
            </h3>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {{ promotion.description }}
            </p>
          </article>
        </div>

        <p class="mt-5 text-xs text-muted-foreground">
          Promocje dotyczą nowych kursantów i nie łączą się ze sobą.
          <NuxtLink :to="ROUTES.promotionRules"
            class="font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground">
            Sprawdź regulamin promocji </NuxtLink>.
        </p>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div class="max-w-3xl">
          <span class="text-sm font-medium uppercase tracking-widest text-primary">Formy zajęć</span>
          <h2 class="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
            Znajdź zajęcia idealne dla siebie
          </h2>
          <p class="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Możesz wybrać zajęcia indywidualne, naukę w parze, kurs
            egzaminacyjny albo krótszy pakiet MINI.
          </p>
        </div>

        <div class="mt-12 grid gap-6">
          <article class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Zajęcia indywidualne (1:1)
            </p>
            <div class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Indywidualne zajęcia to najbardziej elastyczna i
                spersonalizowana forma nauki. Program, tempo pracy oraz
                materiały są dostosowywane do potrzeb, poziomu i celów kursanta,
                dzięki czemu każda lekcja koncentruje się na tym, co jest dla
                niego najważniejsze.
              </p>
              <p>
                To doskonałe rozwiązanie dla osób przygotowujących się do
                <NuxtLink :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  egzaminu ósmoklasisty</NuxtLink>,
                <NuxtLink :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  matury z języka angielskiego</NuxtLink>, poprawiających wyniki w szkole, a także dla tych, którzy chcą
                rozwijać umiejętności konwersacyjne i swobodniej komunikować się
                po angielsku. Dzięki pełnemu skupieniu na jednym kursancie nauka
                jest bardziej efektywna, a postępy widoczne szybciej. Dorośli
                kursanci mogą sprawdzić też
                <NuxtLink :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  zajęcia z angielskiego dla dorosłych</NuxtLink>.
              </p>
            </div>
          </article>

          <article class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Zajęcia DUO w parach
            </p>
            <div class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Zajęcia DUO są przeznaczone dla dwóch osób, które chcą uczyć się
                razem - z rodzeństwem, przyjacielem, partnerem lub inną bliską
                osobą. To połączenie indywidualnego podejścia z zaletami nauki
                we dwoje, takimi jak wzajemna motywacja, większa swoboda
                komunikacji i możliwość wspólnego osiągania celów.
              </p>
              <p>
                Program zajęć jest dopasowywany do poziomu i potrzeb
                uczestników. Lekcje mogą obejmować przygotowanie do
                <NuxtLink :to="ROUTES.eighthGradeExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  egzaminu ósmoklasisty</NuxtLink>,
                <NuxtLink :to="ROUTES.maturaExam"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  matury</NuxtLink>, wsparcie w nauce szkolnej, rozwijanie umiejętności
                konwersacyjnych lub praktyczną naukę
                <NuxtLink :to="ROUTES.adultClasses"
                  class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                  języka dla dorosłych</NuxtLink>.
              </p>
              <p>
                To świetna opcja dla osób, które cenią kameralną atmosferę,
                regularny kontakt z językiem i aktywną pracę podczas zajęć, a
                jednocześnie chcą uczyć się w towarzystwie osoby, z którą czują
                się komfortowo. Dodatkowym atutem jest niższy koszt nauki w
                porównaniu z zajęciami indywidualnymi.
              </p>
            </div>
          </article>

          <article class="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-8">
            <p class="text-sm font-medium uppercase tracking-widest text-primary">
              Kurs egzaminacyjny
            </p>
            <div class="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
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
                kameralnych grupach liczących maksymalnie 4 osoby i obejmują 25
                spotkań po 100 minut.
              </p>
              <p>
                Program kursu koncentruje się na wymaganiach egzaminacyjnych.
                Podczas zajęć rozwijamy wszystkie sprawności językowe,
                systematycznie pracujemy z arkuszami egzaminacyjnymi oraz
                ćwiczymy strategie, które pomagają osiągnąć lepszy wynik i
                zwiększają pewność siebie na egzaminie.
              </p>
              <p>
                Niewielka liczba uczestników pozwala na aktywny udział w
                zajęciach, indywidualne wsparcie lektora oraz naukę w
                motywującym środowisku rówieśników. Dzięki temu kursanci mogą
                korzystać zarówno z zalet pracy grupowej, jak i uwagi
                poświęconej ich własnym potrzebom.
              </p>
              <p>
                Kurs obejmuje ponad 41 godzin nauki i kończy się przed terminem
                egzaminu, pozostawiając czas na samodzielne powtórki.
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

        <a :href="ROUTES.prices"
          class="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90">
          Zobacz cennik
        </a>
      </div>
    </section>

    <section id="cennik" class="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
      <div class="mb-7 max-w-2xl">
        <span class="text-sm font-medium uppercase tracking-widest text-primary">Cennik</span>
        <h2 class="mt-3 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
          Cennik zajęć
        </h2>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Różne potrzeby wymagają różnych rozwiązań. Wybierz formę nauki
          dopasowaną do swoich celów, tempa pracy i możliwości czasowych.
        </p>
        <p class="mt-4 text-pretty leading-relaxed text-muted-foreground">
          W ofercie znajdują się pakiety roczne, pakiety MINI oraz pojedyncze
          lekcje. Koszt zajęć zależy od wybranego wariantu, częstotliwości
          spotkań i formy nauki.
        </p>
        <p class="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          Jeśli liczba zajęć w gotowych pakietach nie odpowiada Twoim potrzebom,
          możliwa jest indywidualna wycena po krótkiej rozmowie o celu nauki,
          terminach i preferowanej formie zajęć.
        </p>
      </div>

      <nav class="mb-8 flex flex-wrap gap-2" aria-label="Sekcje cennika">
        <a v-for="link in pricingLinks" :key="link.href" :href="link.href" :aria-label="link.label"
          class="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary">
          {{ link.label }}
        </a>
      </nav>

      <div class="space-y-9">
        <article v-for="section in pricingSections" :id="section.id" :key="section.title"
          class="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0">
          <div class="max-w-3xl">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {{ section.title }}
              </h3>
              <span
                class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {{ section.badge }}
              </span>
            </div>
            <div class="mt-3 space-y-2.5 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              <p v-for="paragraph in section.description" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div v-if="section.groups" class="mt-6 space-y-6">
            <div v-for="group in section.groups" :id="group.id" :key="group.title" class="scroll-mt-24">
              <h4 class="font-serif text-xl font-semibold text-foreground">
                {{ group.title }}
              </h4>
              <div
                class="mt-2 overflow-hidden rounded-xl border border-[#d9e7f7] bg-card shadow-[0_14px_34px_rgba(24,55,110,0.05)]">
                <div
                  class="hidden grid-cols-[1.3fr_1fr_1fr] border-b border-border/80 bg-[linear-gradient(90deg,rgba(244,246,248,0.95),rgba(255,255,255,0.98),rgba(247,248,250,0.98))] md:grid">
                  <div class="px-4 py-2.5 text-xs font-semibold text-foreground">
                    Rodzaj zajęć
                  </div>
                  <div class="border-l border-border/80 px-4 py-2.5 text-center text-xs font-semibold text-foreground">
                    Czas trwania
                  </div>
                  <div class="border-l border-border/80 px-4 py-2.5 text-center text-xs font-semibold text-foreground">
                    Cena
                  </div>
                </div>

                <div v-for="plan in group.plans" :key="`${group.title}-${plan.name}-${plan.frequency}`"
                  class="grid border-b-4 border-border/80 last:border-b-0 md:grid-cols-[1.3fr_1fr_1fr] md:border-b md:border-border/70"
                  :class="plan.featured
                      ? 'bg-[linear-gradient(90deg,rgba(244,246,248,0.7),rgba(255,255,255,0.98),rgba(247,248,250,0.98))]'
                      : 'bg-card'
                    ">
                  <div class="px-4 py-3 md:px-4">
                    <div class="flex flex-wrap items-center gap-2">
                      <h5 class="text-base font-semibold text-foreground">
                        {{ plan.name }}
                      </h5>
                      <span v-if="plan.featured"
                        class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
                        Najczęściej wybierane
                      </span>
                    </div>
                    <p class="mt-0.5 text-xs text-foreground/80">
                      {{ plan.frequency }}
                    </p>
                    <p class="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground">
                      {{ plan.details }}
                    </p>
                  </div>

                  <div class="border-t border-border/70 px-4 py-3 md:border-l md:border-t-0 md:px-4 md:text-center">
                    <p class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                      Czas trwania
                    </p>
                    <p class="mt-1.5 font-serif text-lg font-semibold text-foreground md:mt-0">
                      {{ plan.duration }}
                    </p>
                  </div>

                  <div class="border-t border-border/70 px-4 py-3 md:border-l md:border-t-0 md:px-4 md:text-center">
                    <p class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                      Cena
                    </p>
                    <p class="mt-1.5 font-serif text-lg font-semibold text-foreground md:mt-0">
                      {{ plan.price }}
                    </p>
                    <p v-if="plan.promo" class="mt-2 text-xs font-medium leading-relaxed text-primary">
                      {{ plan.promo.label }}:<br />
                      <span class="font-serif text-base font-semibold">
                        {{ plan.promo.price }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else
            class="mt-5 overflow-hidden rounded-xl border border-[#d9e7f7] bg-card shadow-[0_14px_34px_rgba(24,55,110,0.05)]">
            <div
              class="hidden grid-cols-[1.3fr_1fr_1fr] border-b border-border/80 bg-[linear-gradient(90deg,rgba(244,246,248,0.95),rgba(255,255,255,0.98),rgba(247,248,250,0.98))] md:grid">
              <div class="px-4 py-2.5 text-xs font-semibold text-foreground">
                Rodzaj zajęć
              </div>
              <div class="border-l border-border/80 px-4 py-2.5 text-center text-xs font-semibold text-foreground">
                Czas trwania
              </div>
              <div class="border-l border-border/80 px-4 py-2.5 text-center text-xs font-semibold text-foreground">
                Cena
              </div>
            </div>

            <div v-for="plan in section.plans" :key="`${section.title}-${plan.name}-${plan.frequency}`"
              class="grid border-b-4 border-border/80 last:border-b-0 md:grid-cols-[1.3fr_1fr_1fr] md:border-b md:border-border/70">
              <div class="px-4 py-3 md:px-4">
                <h4 class="text-base font-semibold text-foreground">
                  {{ plan.name }}
                </h4>
                <p class="mt-0.5 text-xs text-foreground/80">
                  {{ plan.frequency }}
                </p>
                <p class="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  {{ plan.details }}
                </p>
              </div>

              <div class="border-t border-border/70 px-4 py-3 md:border-l md:border-t-0 md:px-4 md:text-center">
                <p class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                  Czas trwania
                </p>
                <p class="mt-1.5 font-serif text-lg font-semibold text-foreground md:mt-0">
                  {{ plan.duration }}
                </p>
              </div>

              <div class="border-t border-border/70 px-4 py-3 md:border-l md:border-t-0 md:px-4 md:text-center">
                <p class="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground md:hidden">
                  Cena
                </p>
                <p class="mt-1.5 font-serif text-lg font-semibold text-foreground md:mt-0">
                  {{ plan.price }}
                </p>
                <p v-if="plan.promo" class="mt-2 text-xs font-medium leading-relaxed text-primary">
                  {{ plan.promo.label }}:<br />
                  <span class="font-serif text-base font-semibold">
                    {{ plan.promo.price }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="border-y border-border bg-secondary">
      <div class="mx-auto max-w-6xl px-6 py-10">
        <div
          class="rounded-[2rem] border border-border bg-card px-8 py-10 shadow-sm md:flex md:items-center md:justify-between md:gap-8">
          <div class="max-w-2xl">
            <h2 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
              Masz pytania?
            </h2>
            <p class="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Skontaktuj się ze mną, a wspólnie dobierzemy najlepszą formę
              nauki.
            </p>
          </div>
          <NuxtLink :to="ROUTES.contact"
            class="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_16px_35px_rgba(45,94,181,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-90 md:mt-0">
            Skontaktuj się →
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="faq" class="mx-auto max-w-3xl scroll-mt-24 px-6 py-20">
      <h2 class="text-balance text-center font-serif text-3xl font-semibold tracking-tight text-foreground">
        Najczęstsze pytania
      </h2>
      <div class="mt-10 divide-y divide-border border-y border-border">
        <div v-for="(faq, index) in faqs" :key="faq.q">
          <h3>
            <button type="button"
              class="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left font-medium text-foreground transition-colors hover:text-primary"
              :aria-expanded="openFaqIndex === index" :aria-controls="`faq-answer-${index}`" :aria-label="(openFaqIndex === index ? 'Zwiń' : 'Rozwiń') +
                ' odpowiedź: ' +
                faq.q
                " @click="toggleFaq(index)">
              <span>{{ faq.q }}</span>
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-200"
                :class="{ 'rotate-180': openFaqIndex === index }" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </h3>
          <p :id="`faq-answer-${index}`" v-show="openFaqIndex === index"
            class="pb-6 text-pretty leading-relaxed text-muted-foreground">
            <template v-if="faq.link">
              {{ faq.link.before }}
              <a :href="faq.link.href"
                class="font-medium text-primary underline-offset-4 transition-colors hover:underline">
                {{ faq.link.label }}</a>{{ faq.link.after }}
            </template>
            <template v-else>{{ faq.a }}</template>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
