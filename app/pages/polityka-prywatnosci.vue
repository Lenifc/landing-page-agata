<script setup>
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
  BUSINESS_NIP,
  BUSINESS_REFERENCE,
} from '~/config/business'
import { CONTACT } from '~/config/contact'
import { ROUTES, SITE_URL } from '~/config/routes'

const pageRoute = ROUTES.privacyPolicy
const pageUrl = `${SITE_URL}${pageRoute}`
const updatedAt = '28 czerwca 2026 r.'

useSeoMeta({
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności Talkaterii: zasady przetwarzania danych osobowych, kontaktu, usług Google, Zoom i plików cookies.',
  robots: 'noindex, follow',
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
        '@graph': [
          {
            '@type': 'PrivacyPolicy',
            '@id': `${pageUrl}#privacy-policy`,
            name: 'Polityka prywatności Talkateria',
            url: pageUrl,
            publisher: BUSINESS_REFERENCE,
            dateModified: '2026-06-28',
          },
        ],
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
          Administratorem danych osobowych jest {{ BUSINESS_LEGAL_NAME }},
          prowadząca studio języka angielskiego {{ BUSINESS_NAME }} w Rumi,
          NIP: {{ BUSINESS_NIP }}.
        </p>
        <p>Adres studia: {{ CONTACT.addressShort }}.</p>
        <p>
          Administrator nie wyznaczył Inspektora Ochrony Danych. W sprawach
          dotyczących danych osobowych należy kontaktować się bezpośrednio z
          administratorem.
        </p>
        <p>
          Kontakt w sprawach związanych z danymi osobowymi:
          <a :href="`mailto:${CONTACT.email}`" class="text-primary underline underline-offset-4">
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
        <h2 class="text-xl font-semibold">
          3. Cele i podstawy prawne przetwarzania
        </h2>
        <p>
          Dane są przetwarzane wyłącznie w zakresie potrzebnym do obsługi
          kontaktu, organizacji zajęć, realizacji umowy, rozliczeń oraz ochrony
          praw administratora.
        </p>
        <div class="overflow-x-auto rounded-xl border border-border">
          <table class="w-full min-w-[38rem] text-left text-sm">
            <thead class="bg-secondary text-foreground">
              <tr>
                <th class="px-4 py-3 font-semibold">Cel</th>
                <th class="px-4 py-3 font-semibold">Podstawa prawna</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr>
                <td class="px-4 py-3">odpowiedź na wiadomość</td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. f RODO</td>
              </tr>
              <tr>
                <td class="px-4 py-3">
                  ustalenie szczegółów zajęć przed umową
                </td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. b RODO</td>
              </tr>
              <tr>
                <td class="px-4 py-3">realizacja zajęć lub umowy</td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. b RODO</td>
              </tr>
              <tr>
                <td class="px-4 py-3">rozliczenia podatkowe i księgowe</td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. c RODO</td>
              </tr>
              <tr>
                <td class="px-4 py-3">dochodzenie lub obrona roszczeń</td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. f RODO</td>
              </tr>
              <tr>
                <td class="px-4 py-3">formularz lub zgoda, jeśli dotyczy</td>
                <td class="px-4 py-3">art. 6 ust. 1 lit. a RODO</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Jeżeli dane są przetwarzane na podstawie zgody, masz prawo cofnąć
          zgodę w dowolnym momencie. Cofnięcie zgody nie wpływa na zgodność z
          prawem przetwarzania dokonanego przed jej cofnięciem.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          4. Usługi Google i narzędzia wideokonferencyjne
        </h2>
        <p>
          Na stronie jest osadzony formularz Google Forms. Wypełnienie
          formularza jest dobrowolne. Dane wpisane w formularzu mogą być
          przetwarzane także przez Google Ireland Limited jako dostawcę
          narzędzia.
        </p>
        <p>
          Na stronie jest także osadzona mapa Google z lokalizacją studia. Po
          otwarciu formularza lub mapy Google może przetwarzać dane techniczne,
          takie jak adres IP, informacje o przeglądarce, urządzeniu, aktywności
          oraz lokalizacji, zależnie od ustawień użytkownika i usług Google.
        </p>
        <p>
          Zasady przetwarzania danych przez Google opisuje
          <a href="https://policies.google.com/privacy?hl=pl" target="_blank" rel="noopener noreferrer"
            class="text-primary underline underline-offset-4">
            Polityka prywatności Google</a>.
        </p>
        <p>
          W przypadku zajęć online korzystam z narzędzia wideokonferencyjnego
          Zoom. Dołączenie do spotkania może wymagać podania imienia lub nazwy
          widocznej dla uczestników oraz wiązać się z przetwarzaniem danych
          technicznych, takich jak adres IP, informacje o urządzeniu,
          przeglądarce lub aplikacji, ustawienia audio/wideo oraz dane o
          przebiegu połączenia.
        </p>
        <p>
          Podczas lekcji Zoom może przetwarzać obraz z kamery, głos z
          mikrofonu, treść czatu, udostępniany ekran lub przesyłane pliki, ale
          tylko w zakresie, w jakim korzystasz z tych funkcji albo jest to
          potrzebne do przeprowadzenia zajęć online. Kamera i mikrofon są
          wykorzystywane po udzieleniu dostępu w urządzeniu lub przeglądarce.
          Lekcje nie są nagrywane bez wcześniejszej informacji.
        </p>
        <p>
          Dane związane z korzystaniem z Zoom mogą być przetwarzane także przez
          Zoom Communications, Inc. lub podmioty z grupy Zoom zgodnie z ich
          zasadami prywatności. Zasady przetwarzania danych przez Zoom opisuje
          <a href="https://www.zoom.com/en/trust/privacy/privacy-statement/" target="_blank" rel="noopener noreferrer"
            class="text-primary underline underline-offset-4">
            Zoom Privacy Statement</a>.
        </p>
        <p>
          Korzystanie z narzędzi zewnętrznych może wiązać się z przetwarzaniem
          danych poza Europejskim Obszarem Gospodarczym, jeżeli dany dostawca
          realizuje taką operację zgodnie ze swoimi zasadami i stosowanymi
          zabezpieczeniami.
        </p>
        <p>
          Zamiast formularza możesz skontaktować się bezpośrednio mailowo,
          telefonicznie lub SMS-em.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">5. Odbiorcy danych</h2>
        <p>
          Dane mogą być przekazywane podmiotom wspierającym obsługę strony,
          poczty e-mail, formularzy, narzędzi komunikacyjnych i
          wideokonferencyjnych, usług księgowych, hostingu oraz podmiotom
          uprawnionym na podstawie przepisów prawa.
        </p>
        <p>Dane nie są sprzedawane innym podmiotom.</p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          6. Profilowanie i zautomatyzowane decyzje
        </h2>
        <p>
          Dane przekazane administratorowi nie są wykorzystywane do
          zautomatyzowanego podejmowania decyzji, w tym profilowania, które
          wywoływałoby wobec Ciebie skutki prawne lub w podobny sposób istotnie
          na Ciebie wpływało.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">7. Czas przechowywania danych</h2>
        <p>
          Dane z zapytań kontaktowych są przechowywane przez czas potrzebny do
          obsługi zapytania, a następnie maksymalnie do 12 miesięcy od
          ostatniego kontaktu, chyba że dojdzie do zawarcia umowy lub istnieje
          potrzeba zabezpieczenia roszczeń.
        </p>
        <p>
          Dane związane z umową i rozliczeniami są przechowywane przez okres
          wymagany przepisami podatkowymi i rachunkowymi.
        </p>
        <p>
          Dane potrzebne do dochodzenia lub obrony roszczeń są przechowywane do
          czasu przedawnienia roszczeń.
        </p>
      </section>

      <section class="mt-8 space-y-3">
        <h2 class="text-xl font-semibold">
          8. Prawa osoby, której dane dotyczą
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
        <h2 class="text-xl font-semibold">9. Pliki cookies</h2>
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
        <h2 class="text-xl font-semibold">10. Zmiany polityki prywatności</h2>
        <p>
          Polityka prywatności może zostać zaktualizowana, jeżeli zmienią się
          funkcje strony, wykorzystywane narzędzia lub obowiązujące przepisy.
        </p>
      </section>
    </article>
  </main>
</template>
