<script setup>
defineProps({
  authors: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div v-if="authors?.length" class="grid grid-cols-2 gap-6">
    <div v-for="author in authors" :key="author.name" class="flex items-center gap-3">
      <img
        v-if="author.image"
        :src="author.image"
        :alt="author.name"
        class="h-14 w-14 rounded-full object-cover object-top border border-gray-200"
      />
      <div>
        <p class="text-base font-semibold text-gray-800 mb-0.5">{{ author.name }}</p>
        <p class="text-xs text-gray-600 leading-relaxed">
          Matrikelnummer: {{ author.matrikelnummer }}<br />
          {{ author.email }}
        </p>
      </div>
    </div>
  </div>
</template>
