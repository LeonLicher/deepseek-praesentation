<script setup>
import { useSlots, computed } from 'vue'
import SectionTitle from '@components/SectionTitle.vue'
import NumberBadge from '@components/NumberBadge.vue'

const { title, size, start } = defineProps({
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'sm',
    validator: value => ['sm', 'md'].includes(value)
  },
  start: {
    type: Number,
    default: 1
  }
})

const slots = useSlots()

const items = computed(() => {
  const defaultSlot = slots.default?.() || []
  return defaultSlot.filter(vnode => vnode.type === 'li')
})
</script>

<template>
  <div>
    <SectionTitle v-if="title" :text="title" />

    <ol class="list-none pl-0 space-y-3">
      <li v-for="(item, index) in items" :key="index" class="flex gap-3">
        <div class="flex-shrink-0 mt-1.5">
          <NumberBadge :number="start + index" :size="size" />
        </div>
        <div
          class="flex-1 text-gray-800 leading-relaxed text-base [&_.subtext]:block [&_.subtext]:text-gray-400 [&_.subtext]:text-sm [&_.subtext]:mt-1 [&_.subtext]:leading-relaxed"
        >
          <component :is="item" />
        </div>
      </li>
    </ol>
  </div>
</template>
