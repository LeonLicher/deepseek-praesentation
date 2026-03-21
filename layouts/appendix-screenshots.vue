<script setup>
import { useSlideContext } from '@slidev/client'
import SlideLayout from '@components/SlideLayout.vue'
import Columns from '@components/Columns.vue'

const { $frontmatter } = useSlideContext()

const title = $frontmatter?.title || ''
const subtitle = $frontmatter?.subtitle
</script>

<template>
  <SlideLayout :title="title" :subtitle="subtitle">
    <Columns columns="1fr 1fr" gap="3rem">
      <slot />
    </Columns>
  </SlideLayout>
</template>
