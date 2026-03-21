<script setup>
defineProps({
  number: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="footnote-item flex gap-1.5 items-start">
    <span class="text-fh-blue text-[9px] leading-tight">{{ number }}</span>
    <span class="text-gray-600 text-[9px] leading-tight flex-1">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<style scoped>
.footnote-item {
  line-height: 1.3;
}
</style>
