<script setup>
defineProps({
  authors: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div v-if="authors?.length" class="grid grid-cols-3 gap-6">
    <div v-for="author in authors" :key="author.name">
      <p class="text-base font-semibold text-gray-800 mb-0.5">{{ author.name }}</p>
      <p class="text-xs text-gray-600 leading-relaxed">
        Matrikelnummer: {{ author.matrikelnummer }}<br />
        {{ author.email }}
      </p>
    </div>
  </div>
</template>
