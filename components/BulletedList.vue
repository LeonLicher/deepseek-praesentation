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
  <div class="bulleted-list">
    <SectionTitle v-if="title" :text="title" />

    <ul class="list-none pl-0 space-y-1.5 mt-0">
      <slot />
    </ul>
  </div>
</template>

<style scoped>
.bulleted-list :deep(li) {
  position: relative;
  padding-left: 1.25rem;
  color: #333;
  line-height: 1.4;
  font-size: 0.95rem;
  margin: 0;
  display: block;
}

.bulleted-list :deep(li)::before {
  content: '■';
  position: absolute;
  left: 0.2rem;
  top: 0.4rem;
  color: var(--fh-dark-blue, #0066b3);
  font-size: 0.35em;
}

.bulleted-list :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0.25rem 0 0.25rem 0;
}

.bulleted-list :deep(li > ul > li) {
  padding-left: 1.25rem;
  font-size: 0.9rem;
  color: #4d4d4d;
}

.bulleted-list :deep(li > ul > li)::before {
  content: '■';
  font-size: 0.3em;
  color: var(--fh-dark-blue, #0066b3);
}

.bulleted-list :deep(li > ul > li > ul > li) {
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: #666;
}

.bulleted-list :deep(li > ul > li > ul > li)::before {
  content: '■';
  font-size: 0.25em;
  color: var(--fh-gray, #6b7280);
}

.bulleted-list :deep(.highlight) {
  color: var(--fh-orange, #f79646);
  font-weight: 600;
  display: inline;
}

.bulleted-list :deep(.subtext) {
  display: block;
  width: 100%;
  color: #888;
  font-size: 0.85rem;
  line-height: 1.3;
}
</style>
