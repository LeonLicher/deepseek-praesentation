<script setup>
import { useSlideContext } from '@slidev/client'
import SlideLayout from '@components/SlideLayout.vue'
import ChapterOutline from '@components/ChapterOutline.vue'

const { $frontmatter, $slidev } = useSlideContext()

const currentChapter = $frontmatter.chapter || 1

const info = $slidev.configs?.presentationInfo || {}
const title = info.title || ''
const subtitle = info.subtitle
</script>

<template>
  <SlideLayout :title="title" :subtitle="subtitle">
    <ChapterOutline :chapter="currentChapter" />
  </SlideLayout>
</template>
