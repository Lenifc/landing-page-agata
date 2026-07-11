export function useAccordion(initialIndex = null) {
  const openIndex = ref(initialIndex)

  const isOpen = (index) => openIndex.value === index

  const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
  }

  return {
    openIndex,
    isOpen,
    toggle,
  }
}
