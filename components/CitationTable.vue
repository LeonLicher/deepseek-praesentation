<script setup>
import SectionTitle from '@components/SectionTitle.vue'
import Table from '@components/Table.vue'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  citations: {
    type: Array,
    default: () => []
  },
  idWidth: {
    type: String,
    default: '100px'
  }
})

const rows = computed(() => props.citations.map(c => [`[${c.id}]`, c.text]))
</script>

<template>
  <SectionTitle v-if="title" :text="title" class="mb-2" />
  <div v-if="title" class="h-0.5 bg-fh-dark-blue mb-0"></div>

  <Table :headers="['Kürzel', 'Quelle']" :column-widths="[idWidth, '1fr']" :rows="rows" size="lg" />
  <slot />
</template>
