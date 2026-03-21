<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <h3 class="text-fh-dark-blue text-lg font-medium -mb-0.5">
    <slot>{{ text }}</slot>
  </h3>
</template>

<style scoped>
/* Keine Unterstreichung */
</style>
