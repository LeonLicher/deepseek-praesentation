<script setup>
import { useSlideContext } from '@slidev/client'
import SlideLayout from '@components/SlideLayout.vue'

const { $frontmatter } = useSlideContext()
const title = $frontmatter?.title || ''
const subtitle = $frontmatter?.subtitle
</script>

<template>
  <SlideLayout :title="title" :subtitle="subtitle">
    <div class="desktop-container">
      <slot />
    </div>
  </SlideLayout>
</template>

<style scoped>
.desktop-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}

.desktop-container :deep(.image-figure) {
  height: 100%;
  width: 100%;
  margin: 0;
}

.desktop-container :deep(.img-contain) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>
