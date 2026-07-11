<template>
  <div
    class="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
    :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    :aria-hidden="open ? undefined : true"
  >
    <div class="overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})
</script>
