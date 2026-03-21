<script setup>
defineProps({
  color: {
    type: String,
    default: 'var(--fh-orange, #f79646)'
  },
  weight: {
    type: String,
    default: '500'
  }
})
</script>

<template>
  <span class="highlighted-text">
    <slot />
  </span>
</template>

<style scoped>
.highlighted-text {
  color: v-bind(color);
  font-weight: v-bind(weight);
}
</style>
