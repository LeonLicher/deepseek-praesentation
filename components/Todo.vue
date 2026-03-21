<template>
  <div class="todo-badge">
    <span class="icon">🚧</span>
    <span class="label"
      >TODO<span v-if="text">: {{ text }}</span></span
    >
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.todo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #fff3cd;
  border: 1px dashed #f0a500;
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #856404;
  margin: 0.25rem 0;
}
</style>
