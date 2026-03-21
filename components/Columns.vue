<script setup>
defineProps({
  columns: {
    type: String,
    default: '1fr 1fr'
  },
  gap: {
    type: String,
    default: '2rem'
  }
})
</script>

<template>
  <div class="columns">
    <slot />
  </div>
</template>

<style scoped>
.columns {
  display: grid;
  grid-template-columns: v-bind(columns);
  gap: v-bind(gap);
}
</style>
