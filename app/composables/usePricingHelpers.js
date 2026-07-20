export const personPrice = (value) => value.replace(' / osoba', ' za osobę')

export const paymentWithoutPrefix = (value) =>
  value.replace(/^miesięcznie:\s*/, '')
