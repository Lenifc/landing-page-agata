<template>
  <div class="relative max-w-2xl">
    <div
      v-if="status === 'success'"
      class="space-y-2"
      role="status"
      aria-live="polite"
    >
      <h3 class="font-serif text-lg font-semibold text-foreground md:text-xl">
        Dziękuję — zgłoszenie poszło.
      </h3>
      <p class="text-sm leading-relaxed text-muted-foreground">
        Odpowiem zwykle w ciągu kilku godzin z propozycją konsultacji albo
        kolejnego kroku.
      </p>
    </div>

    <form v-else class="space-y-3" novalidate @submit.prevent="onSubmit">
      <!-- Honeypoty: niewidoczne dla ludzi -->
      <div
        class="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label>
          Strona WWW
          <input
            v-model="honeypot.website"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
          />
        </label>
        <label>
          Firma
          <input
            v-model="honeypot.company"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
          />
        </label>
      </div>

      <div>
        <label
          :for="ids.name"
          class="mb-1 block text-sm font-medium text-foreground"
        >
          Imię *
        </label>
        <input
          :id="ids.name"
          v-model.trim="form.name"
          type="text"
          name="name"
          autocomplete="given-name"
          required
          maxlength="80"
          :disabled="status === 'sending'"
          :class="fieldClass"
          :aria-invalid="Boolean(errors.name)"
          placeholder="np. Anna"
        />
        <p v-if="errors.name" class="mt-1 text-xs text-red-700">
          {{ errors.name }}
        </p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            :for="ids.email"
            class="mb-1 block text-sm font-medium text-foreground"
          >
            E-mail *
          </label>
          <input
            :id="ids.email"
            v-model.trim="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            maxlength="120"
            :disabled="status === 'sending'"
            :class="fieldClass"
            :aria-invalid="Boolean(errors.email)"
            placeholder="np. anna@email.pl"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-red-700">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            :for="ids.phone"
            class="mb-1 block text-sm font-medium text-foreground"
          >
            Telefon
          </label>
          <input
            :id="ids.phone"
            :value="form.phone"
            type="tel"
            name="phone"
            autocomplete="tel-national"
            inputmode="numeric"
            maxlength="11"
            :disabled="status === 'sending'"
            :class="fieldClass"
            :aria-invalid="Boolean(errors.phone)"
            placeholder="np. 455 407 926"
            @input="onPhoneInput"
          />
          <p v-if="errors.phone" class="mt-1 text-xs text-red-700">
            {{ errors.phone }}
          </p>
        </div>
      </div>

      <div>
        <label
          :for="ids.message"
          class="mb-1 block text-sm font-medium text-foreground"
        >
          Czego szukasz? *
        </label>
        <textarea
          :id="ids.message"
          v-model.trim="form.message"
          name="message"
          required
          rows="2"
          maxlength="800"
          :disabled="status === 'sending'"
          :class="`${fieldClass} min-h-[4.25rem] resize-y`"
          :aria-invalid="Boolean(errors.message)"
          placeholder="np. córka 14 lat, ósmoklasista, online lub Rumia"
        />
        <p v-if="errors.message" class="mt-1 text-xs text-red-700">
          {{ errors.message }}
        </p>
      </div>

      <label
        class="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground"
      >
        <input
          v-model="form.consent"
          type="checkbox"
          name="consent"
          required
          :disabled="status === 'sending'"
          class="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
        />
        <span>
          Zgadzam się na kontakt w sprawie zajęć.
          <a
            :href="CONTACT_FORM.privacyPolicyPath"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Polityka prywatności
          </a>
          .
        </span>
      </label>
      <p v-if="errors.consent" class="mt-1 text-xs text-red-700">
        {{ errors.consent }}
      </p>

      <div
        v-if="status === 'error'"
        class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        role="alert"
      >
        {{ errorMessage }}
        Napisz na
        <a
          :href="`mailto:${CONTACT_FORM.toEmail}`"
          data-tracking-skip-delegated="true"
          class="font-medium underline underline-offset-2"
          @click="
            trackEvent({
              eventType: 'mailto_click',
              label: 'Formularz błąd - mail kontaktowy',
              href: `mailto:${CONTACT_FORM.toEmail}`,
            })
          "
        >
          {{ CONTACT_FORM.toEmail }}
        </a>
        .
      </div>

      <UiButton
        type="submit"
        class="w-full gap-2 px-5 py-2.5 sm:w-auto cursor-pointer"
        :disabled="status === 'sending'"
      >
        <span v-if="status === 'sending'">Wysyłanie…</span>
        <span v-else>Wyślij zgłoszenie →</span>
      </UiButton>
    </form>
  </div>
</template>

<script setup>
import { CONTACT_FORM } from '~/config/forms'

const { trackEvent } = useTracking()
const STORAGE_KEY = 'talkateria-contact-sent-at'
const SPAM_PATTERN =
  /(viagra|cialis|crypto|bitcoin|casino|porn|xxx|seo\s*service|make\s*money|click\s*here|https?:\/\/|www\.|\.ru\b|\.cn\b)/i

const ids = {
  name: 'contact-name',
  phone: 'contact-phone',
  email: 'contact-email',
  message: 'contact-message',
}

const fieldClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60'

const emptyForm = () => ({
  name: '',
  phone: '',
  email: '',
  message: '',
  consent: false,
})

const form = reactive(emptyForm())
const honeypot = reactive({ website: '', company: '' })
const errors = reactive({})
const status = ref('idle')
const errorMessage = ref('')
const openedAt = ref(0)
const jsToken = ref('')

onMounted(() => {
  openedAt.value = Date.now()
  window.setTimeout(() => {
    jsToken.value = `tk_${openedAt.value.toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  }, 900)
})

/** Tylko cyfry: max 9, bez +48/48/0048 i wiodących 0. */
const normalizePlPhone = (raw) => {
  let digits = String(raw || '').replace(/\D/g, '')
  if (digits.startsWith('0048')) {
    digits = digits.slice(4)
  } else if (digits.startsWith('48') && digits.length >= 11) {
    digits = digits.slice(2)
  }
  digits = digits.replace(/^0+/, '')
  return digits.slice(0, 9)
}

const isValidPlPhone = (raw) => /^[1-9]\d{8}$/.test(normalizePlPhone(raw))

const formatPlPhoneDisplay = (digits) => {
  const d = digits.slice(0, 9)
  if (d.length <= 3) {
    return d
  }
  if (d.length <= 6) {
    return `${d.slice(0, 3)} ${d.slice(3)}`
  }
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
}

const caretPosAfterDigits = (formatted, digitCount) => {
  if (digitCount <= 0) {
    return 0
  }

  let pos = 0
  let seen = 0
  while (pos < formatted.length && seen < digitCount) {
    if (/\d/.test(formatted[pos])) {
      seen += 1
    }
    pos += 1
  }
  return pos
}

const onPhoneInput = (event) => {
  const input = event.target
  const selectionStart = input.selectionStart ?? 0
  const oldDigits = normalizePlPhone(form.phone)

  let digitsBeforeCursor = input.value
    .slice(0, selectionStart)
    .replace(/\D/g, '').length
  let digits = normalizePlPhone(input.value)

  // Backspace na spacji: usuń cyfrę przed nią zamiast „zablokować” pole.
  if (
    event.inputType === 'deleteContentBackward' &&
    digits === oldDigits &&
    digitsBeforeCursor > 0
  ) {
    digits =
      digits.slice(0, digitsBeforeCursor - 1) + digits.slice(digitsBeforeCursor)
    digitsBeforeCursor -= 1
  }

  const formatted = formatPlPhoneDisplay(digits)
  form.phone = formatted
  // Gdy model się nie zmienia (np. same litery → ""), Vue nie odświeża DOM —
  // wymuszamy wartość w inpucie.
  input.value = formatted

  nextTick(() => {
    input.value = formatted
    const pos = caretPosAfterDigits(formatted, digitsBeforeCursor)
    input.setSelectionRange(pos, pos)
  })
}

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

const emailDomain = (email) => email.split('@')[1]?.toLowerCase() || ''

const looksLikeSpam = () => {
  const message = form.message
  if (
    (message.match(/https?:\/\/|www\./gi) || []).length > 0 ||
    SPAM_PATTERN.test(message) ||
    SPAM_PATTERN.test(form.name)
  ) {
    return true
  }

  if (CONTACT_FORM.blockedEmailDomains.includes(emailDomain(form.email))) {
    return true
  }

  if ((form.name.match(/[0-9]/g) || []).length > 2) {
    return true
  }

  return false
}

const isInCooldown = () => {
  try {
    const last = Number(localStorage.getItem(STORAGE_KEY) || 0)
    return last > 0 && Date.now() - last < CONTACT_FORM.cooldownMs
  } catch {
    return false
  }
}

const markSent = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

const validate = () => {
  clearErrors()

  if (!form.name || form.name.length < 2) {
    errors.name = 'Podaj imię.'
  }

  if (form.phone.trim() && !isValidPlPhone(form.phone)) {
    errors.phone = 'Podaj polski numer (9 cyfr), np. 455 407 926.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Podaj poprawny e-mail.'
  } else if (CONTACT_FORM.blockedEmailDomains.includes(emailDomain(form.email))) {
    errors.email = 'Użyj stałego adresu e-mail.'
  }

  if (!form.message || form.message.length < 5) {
    errors.message = 'Napisz krótko, czego szukasz.'
  } else if (SPAM_PATTERN.test(form.message)) {
    errors.message = 'Usuń linki i spróbuj jeszcze raz.'
  }

  if (!form.consent) {
    errors.consent = 'Zaznacz zgodę, żeby wysłać.'
  }

  return Object.keys(errors).length === 0
}

const onSubmit = async () => {
  if (status.value === 'sending') {
    return
  }

  const isBot =
    Boolean(honeypot.website) ||
    Boolean(honeypot.company) ||
    !jsToken.value ||
    Date.now() - openedAt.value < CONTACT_FORM.minSubmitMs ||
    looksLikeSpam() ||
    isInCooldown()

  if (isBot) {
    status.value = 'success'
    return
  }

  if (!validate()) {
    return
  }

  status.value = 'sending'
  errorMessage.value = ''

  const phoneDigits = normalizePlPhone(form.phone)
  const payload = {
    name: form.name,
    email: form.email,
    message: form.message,
    consent: 'Tak',
    source: 'talkateria.pl/kontakt',
    _subject: `${CONTACT_FORM.subject} — ${form.name}`,
    _replyto: form.email,
    _gotcha: honeypot.website || honeypot.company || '',
  }

  if (phoneDigits) {
    payload.phone = formatPlPhoneDisplay(phoneDigits)
  }

  try {
    const response = await $fetch(CONTACT_FORM.submitUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload,
    })

    if (response?.ok === false || response?.error) {
      throw new Error(response?.error || 'Send failed')
    }

    markSent()
    trackEvent({
      eventType: 'form_submit_success',
      label: 'Formularz kontaktowy',
      details: {
        hasPhone: Boolean(phoneDigits),
        source: 'kontakt_form',
      },
    })
    status.value = 'success'
    Object.assign(form, emptyForm())
    honeypot.website = ''
    honeypot.company = ''
  } catch {
    status.value = 'error'
    errorMessage.value =
      'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę albo'
  }
}
</script>
