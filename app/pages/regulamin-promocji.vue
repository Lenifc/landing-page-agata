<script setup>
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
  BUSINESS_NIP,
} from '~/config/business'
import { CONTACT } from '~/config/contact'
import { getPricingPlan, getPricingPromotion } from '~/config/pricing'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.promotionRules
const pageUrl = `${SITE_URL}${pageRoute}`
const updatedAt = '28 czerwca 2026 r.'
const examEarlyBirdPromotion = getPricingPromotion('examEarlyBird')
const occasionalIndividual = getPricingPlan('occasionalIndividual')
const occasionalDuo = getPricingPlan('occasionalDuo')
const personPrice = (value) => value.replace(' / osoba', ' za osobę')

useSeoMeta({
  title: 'Regulamin promocji',
  description:
    'Zasady promocji na kursy egzaminacyjne oraz jednorazowej lekcji dla nowych kursantów w Talkaterii.',
  robots: 'noindex, follow',
  ogTitle: 'Talkateria | Regulamin promocji',
  ogDescription: 'Sprawdź warunki aktualnych zniżek i ofert specjalnych w Talkaterii.',
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
        Zniżki i oferty specjalne
      </span>
      <h1 class="mt-3 font-serif text-4xl font-semibold tracking-tight">
        Regulamin promocji
      </h1>
      <p class="mt-3 text-sm text-muted-foreground">
        Ostatnia aktualizacja: {{ updatedAt }}
      </p>
      <p class="mt-6 leading-relaxed text-muted-foreground">
        Poniższe zasady opisują aktualne promocje i oferty specjalne dostępne w Talkaterii. Przed
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
            Nowy klient oznacza kursanta, który wcześniej nie korzystał z
            odpłatnych zajęć w Talkaterii. W przypadku osób niepełnoletnich
            promocja dotyczy kursanta, a formalności mogą być prowadzone przez
            rodzica lub opiekuna prawnego.
          </li>
          <li>
            Jeden kursant może skorzystać tylko z jednej spośród opisanych
            promocji lub ofert specjalnych.
          </li>
          <li>
            Promocje i oferty specjalne nie łączą się ze sobą ani z innymi rabatami, zniżkami lub
            ofertami specjalnymi, chyba że wyraźnie wskazano inaczej.
          </li>
          <li>
            Rabat lub cena specjalna nie podlega wymianie na gotówkę, nie działa
            wstecz i jest naliczana po potwierdzeniu spełnienia warunków.
          </li>
          <li>
            Możliwość zapisu zależy od dostępności terminów, a w przypadku kursu
            grupowego także od uruchomienia grupy.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          3. {{ examEarlyBirdPromotion.label }}
        </h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Promocja obejmuje grupowy kurs przygotowujący do egzaminu
            ósmoklasisty albo matury z języka angielskiego.
          </li>
          <li>
            Warunkiem skorzystania z promocji jest podpisanie umowy do
            {{ examEarlyBirdPromotion.deadline }}
          </li>
          <li>
            Cena regularna kursu wynosi
            {{ personPrice(examEarlyBirdPromotion.regularTotalPrice) }}, a cena
            po rabacie {{ personPrice(examEarlyBirdPromotion.promoTotalPrice) }}.
            Oznacza to oszczędność {{ examEarlyBirdPromotion.savings }}.
          </li>
          <li>
            Najniższa cena kursu z 30 dni przed obniżką wynosi
            {{ personPrice(examEarlyBirdPromotion.lowestPriceLast30Days) }}.
          </li>
          <li>
            Płatność promocyjna jest rozłożona na 8 równych rat po
            {{ examEarlyBirdPromotion.installmentPrice }} za osobę.
          </li>
          <li>
            Promocja nie obejmuje alternatywnej formy zajęć zaproponowanej w
            przypadku nieuruchomienia grupy.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">4. Jednorazowa lekcja dla nowych kursantów</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Oferta obejmuje jednorazową lekcję okazjonalną 1:1 albo DUO dla
            nowych kursantów, realizowaną stacjonarnie w studiu w Rumi lub
            online.
          </li>
          <li>
            Z oferty można skorzystać jeden raz. Kolejne lekcje są rozliczane
            zgodnie z aktualnym cennikiem lub wybranym pakietem.
          </li>
          <li>
            Cena jednorazowej lekcji 1:1 dla nowych kursantów wynosi
            {{ occasionalIndividual.promo.price }}.
          </li>
          <li>
            Cena jednorazowej lekcji DUO dla nowych kursantów wynosi
            {{ personPrice(occasionalDuo.promo.price) }}.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">5. Czas obowiązywania</h2>
        <p>
          Promocje i oferty specjalne obowiązują w okresie, w którym są opublikowane na stronie
          Cennika. Wyjątkiem jest promocja na grupowy kurs egzaminacyjny, w
          której umowę należy podpisać najpóźniej
          {{ examEarlyBirdPromotion.deadline }}
        </p>
        <p>
          Organizator zastrzega sobie prawo do zakończenia promocji, oferty specjalnej lub zmiany
          jej warunków w dowolnym momencie. Nie narusza to praw osób, które
          nabyły uprawnienie do zniżki przed dniem wejścia w życie zmiany
          regulaminu, promocji albo oferty specjalnej.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          6. Reklamacje i postanowienia końcowe
        </h2>
        <p>
          Pytania lub reklamacje dotyczące promocji i ofert specjalnych można zgłaszać mailowo na
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
