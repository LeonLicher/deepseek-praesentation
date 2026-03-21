<script setup>
import { useSlideContext } from '@slidev/client'
import SlideLayout from '@components/SlideLayout.vue'

const { $frontmatter } = useSlideContext()
const title = $frontmatter?.title || ''
const subtitle = $frontmatter?.subtitle
</script>

<template>
  <SlideLayout :title="title" :subtitle="subtitle">
    <div class="mobile-grid">
      <slot />
    </div>
  </SlideLayout>
</template>

<style scoped>
.mobile-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 0rem;
  height: 100%;
  overflow: hidden;
  place-items: center;
}

.mobile-grid :deep(.image-figure) {
  height: 100%;
  overflow: hidden;
}

.mobile-grid :deep(.img-contain) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
}
</style>
