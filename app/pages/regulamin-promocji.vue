<script setup>
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
  BUSINESS_NIP,
} from '~/config/business'
import { CONTACT } from '~/config/contact'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.promotionRules
const pageUrl = `${SITE_URL}${pageRoute}`
const updatedAt = '21 czerwca 2026 r.'

useSeoMeta({
  title: 'Regulamin promocji',
  description:
    'Uproszczone zasady promocji na kursy egzaminacyjne, pierwszą lekcję oraz poranne zajęcia online w Talkaterii.',
  robots: 'noindex, follow',
  ogTitle: 'Talkateria | Regulamin promocji',
  ogDescription: 'Sprawdź warunki aktualnych zniżek i promocji w Talkaterii.',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <article class="mx-auto max-w-3xl px-6 py-12 text-foreground md:py-16">
      <span class="text-sm font-medium uppercase tracking-widest text-primary">
        Zniżki i promocje
      </span>
      <h1 class="mt-3 font-serif text-4xl font-semibold tracking-tight">
        Uproszczony regulamin promocji
      </h1>
      <p class="mt-3 text-sm text-muted-foreground">
        Ostatnia aktualizacja: {{ updatedAt }}
      </p>
      <p class="mt-6 leading-relaxed text-muted-foreground">
        Poniższe zasady opisują aktualne promocje dostępne w Talkaterii. Przed
        zapisem zapoznaj się również z wybraną ofertą i warunkami umowy.
      </p>

      <section class="mt-10 space-y-3">
        <h2 class="text-xl font-semibold">1. Organizator promocji</h2>
        <p>
          Organizatorem promocji jest {{ BUSINESS_LEGAL_NAME }}, prowadząca
          studio języka angielskiego {{ BUSINESS_NAME }} w Rumi, NIP:
          {{ BUSINESS_NIP }}.
        </p>
        <p>
          Kontakt:
          <a :href="`mailto:${CONTACT.email}`" class="text-primary underline underline-offset-4 hover:text-foreground">
            {{ CONTACT.email }}
          </a>
          lub {{ CONTACT.phoneNumber }}.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">2. Zasady wspólne</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Promocje są przeznaczone wyłącznie dla nowych klientów, którzy nie
            korzystali wcześniej z odpłatnych zajęć w Talkaterii.
          </li>
          <li>
            Jeden klient może skorzystać tylko z jednej spośród opisanych
            promocji.
          </li>
          <li>
            Promocje nie łączą się ze sobą ani z innymi rabatami, zniżkami lub
            ofertami specjalnymi, chyba że wyraźnie wskazano inaczej.
          </li>
          <li>
            Rabat nie podlega wymianie na gotówkę, nie działa wstecz i jest
            naliczany po potwierdzeniu spełnienia warunków promocji.
          </li>
          <li>
            Możliwość zapisu zależy od dostępności terminów, a w przypadku kursu
            grupowego także od uruchomienia grupy.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          3. –10% na cały grupowy kurs egzaminacyjny
        </h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Promocja obejmuje grupowy kurs przygotowujący do egzaminu
            ósmoklasisty albo matury z języka angielskiego.
          </li>
          <li>
            Warunkiem skorzystania z promocji jest podpisanie umowy do 31 lipca
            2026 r.
          </li>
          <li>
            Cena regularna kursu wynosi 3000 zł za osobę, a cena po rabacie 2700
            zł za osobę. Oznacza to oszczędność 300 zł.
          </li>
          <li>
            Płatność promocyjna jest rozłożona na 10 równych rat po 270 zł za
            osobę.
          </li>
          <li>
            Promocja nie obejmuje alternatywnej formy zajęć zaproponowanej w
            przypadku nieuruchomienia grupy.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">4. –20% na pierwszą lekcję</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Promocja obejmuje pierwszą pojedynczą lekcję okazjonalną 1:1 albo
            DUO, realizowaną stacjonarnie w studiu w Rumi lub online.
          </li>
          <li>
            Z promocji można skorzystać jeden raz. Kolejne lekcje są rozliczane
            zgodnie z aktualnym cennikiem lub wybranym pakietem.
          </li>
          <li>
            Cena pierwszej lekcji 1:1 po rabacie wynosi 88 zł zamiast 110 zł.
          </li>
          <li>
            Cena pierwszej lekcji DUO po rabacie wynosi 64 zł za osobę zamiast
            80 zł za osobę.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">5. –20% na poranne lekcje online</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Promocja dotyczy lekcji online rozpoczynających się najpóźniej o
            godzinie 12:00.
          </li>
          <li>
            Rabat wynosi 20% od standardowej ceny wybranego wariantu zajęć
            online.
          </li>
          <li>
            Zniżka obowiązuje dla lekcji realizowanych w kwalifikujących się
            godzinach i zależy od dostępności porannych terminów.
          </li>
          <li>
            Przeniesienie lekcji na późniejszą godzinę może oznaczać rozliczenie
            jej według ceny bez rabatu.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">6. Czas obowiązywania</h2>
        <p>
          Promocje obowiązują w okresie, w którym są opublikowane na stronie
          Cennika. Wyjątkiem jest promocja na grupowy kurs egzaminacyjny, w
          której umowę należy podpisać najpóźniej 31 lipca 2026 r.
        </p>
        <p>
          Organizator zastrzega sobie prawo do zakończenia promocji lub zmiany
          jej warunków w dowolnym momencie. Nie narusza to praw osób, które
          nabyły uprawnienie do zniżki przed dniem wejścia w życie zmiany
          regulaminu lub zakończenia promocji.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          7. Reklamacje i postanowienia końcowe
        </h2>
        <p>
          Pytania lub reklamacje dotyczące promocji można zgłaszać mailowo na
          adres
          <a :href="`mailto:${CONTACT.email}`" class="text-primary underline underline-offset-4 hover:text-foreground">
            {{ CONTACT.email }}</a>.
        </p>
        <p>
          W sprawach nieopisanych na tej stronie zastosowanie mają warunki
          wybranej oferty, zawarta umowa oraz obowiązujące przepisy prawa.
        </p>
      </section>

      <NuxtLink :to="ROUTES.prices"
        class="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
        Wróć do cennika
      </NuxtLink>
    </article>
  </main>
</template>
