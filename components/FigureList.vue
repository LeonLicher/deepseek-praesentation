<script setup>
import { computed } from 'vue'
import Table from '@components/Table.vue'
import { useFigures } from '@composables/useFigures'

defineProps({
  title: {
    type: String,
    default: 'Abbildungsverzeichnis'
  }
})

const { getFigures } = useFigures()

const rows = computed(() =>
  getFigures().map((figure, index) => [
    `Abb. ${index + 1}`,
    figure.caption,
    figure.source ? `<span class="italic">${figure.source}</span>` : '–'
  ])
)
</script>

<template>
  <Table
    :headers="['Nr.', 'Beschreibung', 'Quelle']"
    :column-widths="['80px', '1fr', '200px']"
    :rows="rows"
  />
</template>
