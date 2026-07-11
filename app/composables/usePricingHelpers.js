export const personPrice = (value) => value.replace(' / osoba', ' za osobę')

export const paymentWithoutPrefix = (value) =>
  value.replace(/^miesięcznie:\s*/, '')

export const priceDetailLine = (plan, payment = plan.price) => ({
  payment,
  totalPrice: plan.priceDetails?.totalPrice ?? plan.price,
})

export const isOccasionalPriceOption = (option) =>
  option.id?.startsWith('occasional')

export function usePriceDetailsAccordion() {
  const openPriceDetailsId = ref(null)

  const isPriceDetailsOpen = (optionId) => openPriceDetailsId.value === optionId

  const togglePriceDetails = (optionId) => {
    openPriceDetailsId.value =
      openPriceDetailsId.value === optionId ? null : optionId
  }

  return {
    openPriceDetailsId,
    isPriceDetailsOpen,
    togglePriceDetails,
  }
}
