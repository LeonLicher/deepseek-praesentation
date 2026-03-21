<script setup>
defineProps({
  source: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="bg-gray-100 border-l-4 border-fh-blue py-2 px-3 relative">
    <p class="text-gray-700 m-0 pr-20" style="font-size: 0.9rem">
      <slot />
    </p>
    <span v-if="source" class="absolute bottom-2 right-3 text-gray-500" style="font-size: 0.7rem">
      {{ source }}
    </span>
  </div>
</template>

<style scoped></style>
