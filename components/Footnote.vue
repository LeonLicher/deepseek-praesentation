<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const register = inject('registerFootnote', null)

const footnoteNumber = computed(() => {
  if (!register) {
    return '?'
  }
  return register(props.text)
})
</script>

<template>
  <sup class="text-gray-600 text-[0.65em] font-normal ml-0.5">{{ footnoteNumber }}</sup>
</template>
