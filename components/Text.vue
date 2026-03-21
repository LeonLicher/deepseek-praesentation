<script setup>
import SectionTitle from '@components/SectionTitle.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="text-content">
    <SectionTitle v-if="title" :text="title" />

    <div class="text-gray-700 leading-relaxed text-sm space-y-1">
      <slot />
    </div>
  </div>
</template>
