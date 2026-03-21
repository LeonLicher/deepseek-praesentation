<script setup>
import { inject, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import Item from './Item.vue'
import Divider from '@components/Divider.vue'

defineProps({
  dividerLength: {
    type: [String, Number],
    default: 100
  }
})

const { $frontmatter } = useSlideContext()
const footnotes = inject('footnotes', { value: [] })

const allFootnotes = computed(() => {
  const staticFootnotes = ($frontmatter.value?.footnotes || []).map((text, index) => ({
    number: index + 1,
    text
  }))
  const dynamicFootnotes = footnotes.value.map(item => ({
    number: staticFootnotes.length + item.number,
    text: item.text
  }))
  return [...staticFootnotes, ...dynamicFootnotes]
})
</script>

<template>
  <div v-if="allFootnotes.length > 0" class="footnote-list mt-0">
    <Divider :length="dividerLength" thickness="border-t opacity-50" class="mb-1.25" />
    <div class="space-y-0.25">
      <Item
        v-for="item in allFootnotes"
        :key="item.number"
        :number="item.number"
        :text="item.text"
      />
    </div>
  </div>
</template>
