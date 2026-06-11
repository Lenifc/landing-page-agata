<script setup>
import { BUSINESS_ENTITY } from '~/config/business'
import { CONTACT } from '~/config/contact'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.privacyPolicy
const pageUrl = `${SITE_URL}${pageRoute}`
const updatedAt = '11 czerwca 2026 r.'

useSeoMeta({
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności Talkaterii: zasady przetwarzania danych osobowych, kontaktu, usług Google i plików cookies.',
  robots: 'index, follow',
  ogTitle: 'Talkateria | Polityka prywatności',
  ogDescription:
    'Informacje o przetwarzaniu danych osobowych przez Talkaterię.',
})

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
        '@type': 'PrivacyPolicy',
        name: 'Polityka prywatności Talkateria',
        url: pageUrl,
        publisher: BUSINESS_ENTITY,
        dateModified: '2026-06-11',
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <article class="mx-auto max-w-3xl px-6 py-12 text-foreground md:py-16">
      <h1 class="text-3xl font-semibold">Polityka prywatności</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Ostatnia aktualizacja: {{ updatedAt }}
      </p>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">1. Administrator danych</h2>
        <p>
          Administratorem danych osobowych jest Talkateria, studio języka
          angielskiego w Rumi.
        </p>
        <p>Adres studia: {{ CONTACT.addressShort }}.</p>
        <p>
          Administrator nie wyznaczył Inspektora Ochrony Danych. W sprawach
          dotyczących danych osobowych należy kontaktować się bezpośrednio z
          administratorem.
        </p>
        <p>
          Kontakt w sprawach związanych z danymi osobowymi:
          <a
            :href="`mailto:${CONTACT.email}`"
            class="text-primary underline underline-offset-4"
          >
            {{ CONTACT.email }}
          </a>
          lub tel. {{ CONTACT.phoneNumber }}.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          2. Jakie dane mogą być przetwarzane
        </h2>
        <p>
          Przetwarzane są wyłącznie dane przekazane dobrowolnie podczas kontaktu
          mailowego, telefonicznego, SMS lub przez formularz zgłoszeniowy.
        </p>
        <p>
          Podanie danych jest dobrowolne, ale bez danych kontaktowych odpowiedź
          na zapytanie lub ustalenie szczegółów zajęć może być niemożliwe.
        </p>
        <p>Dane mogą obejmować w szczególności:</p>
        <ul class="list-disc space-y-1 pl-6">
          <li>imię i nazwisko,</li>
          <li>adres e-mail i numer telefonu,</li>
          <li>wiek ucznia lub klasę,</li>
          <li>cel nauki i poziom językowy,</li>
          <li>preferowaną formę zajęć i dostępność terminową,</li>
          <li>inne informacje podane dobrowolnie w wiadomości.</li>
        </ul>
        <p>
          Prosimy nie przekazywać danych szczególnych kategorii, takich jak dane
          o zdrowiu, przekonaniach czy sytuacji rodzinnej, jeżeli nie jest to
          potrzebne do obsługi zapytania.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">3. Cele przetwarzania danych</h2>
        <p>Dane są przetwarzane w celu:</p>
        <ul class="list-disc space-y-1 pl-6">
          <li>odpowiedzi na zapytanie,</li>
          <li>ustalenia terminu i formy zajęć,</li>
          <li>organizacji lekcji języka angielskiego,</li>
          <li>prowadzenia rozliczeń, jeżeli dojdzie do współpracy,</li>
          <li>dochodzenia lub obrony ewentualnych roszczeń.</li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">4. Podstawa prawna</h2>
        <p>Dane są przetwarzane na podstawie:</p>
        <ul class="list-disc space-y-1 pl-6">
          <li>
            art. 6 ust. 1 lit. b RODO - podjęcie działań przed zawarciem umowy
            lub wykonanie umowy,
          </li>
          <li>
            art. 6 ust. 1 lit. c RODO - obowiązki wynikające z przepisów prawa,
            w szczególności podatkowych i rachunkowych,
          </li>
          <li>
            art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes
            administratora, czyli obsługa kontaktu, organizacja zajęć oraz
            dochodzenie lub obrona ewentualnych roszczeń,
          </li>
          <li>
            art. 6 ust. 1 lit. a RODO - zgoda, jeżeli konkretna funkcja lub
            forma kontaktu jej wymaga.
          </li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">5. Usługi Google</h2>
        <p>
          Na stronie może być osadzony formularz Google Forms. Wypełnienie
          formularza jest dobrowolne. Dane wpisane w formularzu mogą być
          przetwarzane także przez Google Ireland Limited jako dostawcę
          narzędzia.
        </p>
        <p>
          W przyszłości na stronie może pojawić się także mapa Google z
          lokalizacją studia. Po otwarciu formularza lub mapy Google może
          przetwarzać dane techniczne, takie jak adres IP, informacje o
          przeglądarce, urządzeniu, aktywności oraz lokalizacji, zależnie od
          ustawień użytkownika i usług Google.
        </p>
        <p>
          Zasady przetwarzania danych przez Google opisuje
          <a
            href="https://policies.google.com/privacy?hl=pl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline underline-offset-4"
          >
            Polityka prywatności Google</a
          >.
        </p>
        <p>
          Zamiast formularza możesz skontaktować się bezpośrednio mailowo,
          telefonicznie lub SMS-em.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">6. Odbiorcy danych</h2>
        <p>
          Dane mogą być przekazywane podmiotom wspierającym obsługę strony,
          poczty e-mail, formularzy, narzędzi komunikacyjnych, usług księgowych,
          hostingu oraz podmiotom uprawnionym na podstawie przepisów prawa.
        </p>
        <p>Dane nie są sprzedawane innym podmiotom.</p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          7. Profilowanie i zautomatyzowane decyzje
        </h2>
        <p>
          Dane przekazane administratorowi nie są wykorzystywane do
          zautomatyzowanego podejmowania decyzji, w tym profilowania, które
          wywoływałoby wobec Ciebie skutki prawne lub w podobny sposób istotnie
          na Ciebie wpływało.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">8. Czas przechowywania danych</h2>
        <p>
          Dane z zapytań kontaktowych są przechowywane przez czas potrzebny do
          obsługi kontaktu i organizacji zajęć, a następnie przez okres
          niezbędny do zabezpieczenia ewentualnych roszczeń.
        </p>
        <p>
          Dane związane z rozliczeniami są przechowywane przez okres wymagany
          przepisami podatkowymi i rachunkowymi.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          9. Prawa osoby, której dane dotyczą
        </h2>
        <p>Masz prawo do:</p>
        <ul class="list-disc space-y-1 pl-6">
          <li>dostępu do swoich danych,</li>
          <li>sprostowania danych,</li>
          <li>usunięcia danych,</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>wniesienia sprzeciwu wobec przetwarzania,</li>
          <li>złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
        </ul>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">10. Pliki cookies</h2>
        <p>
          Strona może korzystać z plików cookies potrzebnych do prawidłowego
          działania serwisu. Elementy zewnętrzne, takie jak formularz Google lub
          mapa Google, mogą stosować własne pliki cookies i podobne technologie
          zgodnie z zasadami dostawcy.
        </p>
        <p>
          Ustawienia cookies możesz zmienić w swojej przeglądarce. Ograniczenie
          cookies może wpłynąć na działanie niektórych elementów strony.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">11. Zmiany polityki prywatności</h2>
        <p>
          Polityka prywatności może zostać zaktualizowana, jeżeli zmienią się
          funkcje strony, wykorzystywane narzędzia lub obowiązujące przepisy.
        </p>
      </section>
    </article>
  </main>
</template>
