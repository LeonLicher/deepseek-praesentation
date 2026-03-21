<script setup>
import { useSlideContext } from '@slidev/client'
import SlideLayout from '@components/SlideLayout.vue'

const { $frontmatter } = useSlideContext()

const title = $frontmatter?.title || ''
const subtitle = $frontmatter?.subtitle
</script>

<template>
  <SlideLayout :title="title" :subtitle="subtitle">
    <slot />
  </SlideLayout>
</template>
