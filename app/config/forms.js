// Google Forms: Send > Embed HTML > use the iframe src value.
const GOOGLE_FORM_EMBED_URL = ''

export const GOOGLE_FORM = Object.freeze({
  embedUrl: GOOGLE_FORM_EMBED_URL,
  openUrl: GOOGLE_FORM_EMBED_URL.replace('?embedded=true', ''),
  isConfigured: Boolean(GOOGLE_FORM_EMBED_URL),
})
