export const personPrice = (value) => value.replace(' / osoba', ' za osobę')

export const paymentWithoutPrefix = (value) =>
  value.replace(/^miesięcznie:\s*/, '')

export const priceDetailLine = (plan, payment = plan.price) => ({
  payment,
  totalPrice: plan.priceDetails?.totalPrice ?? undefined,
})

export const isSimplePriceOption = (option) =>
  Boolean(option.simple) || option.id?.startsWith('occasional')

/** @deprecated Use isSimplePriceOption */
export const isOccasionalPriceOption = isSimplePriceOption
