<script setup>
import Outline from '@components/Outline.vue'
import OutlineItem from '@components/OutlineItem.vue'

const props = defineProps({
  chapter: {
    type: Number,
    required: true
  }
})

const chapters = $slidev.configs?.presentationInfo?.chapters || []
</script>

<template>
  <Outline>
    <OutlineItem
      v-for="chapterItem in chapters"
      :key="chapterItem.number"
      :number="chapterItem.number"
      :active="chapterItem.number === props.chapter"
      :disabled="chapterItem.number > props.chapter"
    >
      {{ chapterItem.title }}
    </OutlineItem>
  </Outline>
</template>
w
