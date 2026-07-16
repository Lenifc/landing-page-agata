// Google Forms: Send > Embed HTML > use the iframe src value (?embedded=true).
const GOOGLE_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeH0Tnelw-lrebqnSYGTmxBQ6W_u1ED4GLb01VP52ftNJHTaw/viewform?embedded=true'

export const GOOGLE_FORM = Object.freeze({
  embedUrl: GOOGLE_FORM_EMBED_URL,
  openUrl: GOOGLE_FORM_EMBED_URL.replace('?embedded=true', ''),
  isConfigured: Boolean(GOOGLE_FORM_EMBED_URL),
})
