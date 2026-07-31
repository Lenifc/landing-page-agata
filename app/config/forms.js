import { CONTACT } from './contact'
import { ROUTES, SITE_URL } from './routes'

/** FormSubmit (AJAX) — działa na statycznym hostingu; pierwsze zgłoszenie wymaga aktywacji maila. */
export const CONTACT_FORM = Object.freeze({
  submitUrl: `https://formsubmit.co/ajax/${CONTACT.email}`,
  toEmail: CONTACT.email,
  subject: 'Zgłoszenie z formularza talkateria.pl',
  minSubmitMs: 5000,
  cooldownMs: 60_000,
  privacyPolicyPath: ROUTES.privacyPolicy,
  thankYouPath: `${SITE_URL}${ROUTES.contact}#formularz`,
  /** Typowe domeny jednorazowe / spam — odrzucane po stronie klienta. */
  blockedEmailDomains: Object.freeze([
    'mailinator.com',
    'guerrillamail.com',
    'guerrillamail.net',
    'sharklasers.com',
    'tempmail.com',
    'temp-mail.org',
    'throwawaymail.com',
    'yopmail.com',
    'yopmail.fr',
    'trashmail.com',
    '10minutemail.com',
    '10minutemail.net',
    'dispostable.com',
    'fakeinbox.com',
    'getnada.com',
    'maildrop.cc',
    'moakt.com',
    'tempail.com',
    'emailondeck.com',
    'mailnesia.com',
  ]),
})
