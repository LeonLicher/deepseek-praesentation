<script setup>
import { computed, ref } from 'vue'
import { useSlideContext } from '@slidev/client'

let clicks
try {
  const ctx = useSlideContext?.()
  clicks = ctx?.$clicks ?? ref(Infinity)
} catch {
  clicks = ref(Infinity)
}

const paddingMap = {
  sm: 'py-0.5 px-1',
  md: 'py-1.5 px-1.5',
  lg: 'py-2.25 px-2.25'
}

const accentMap = {
  blue: 'bg-blue-50',
  gray: 'bg-gray-50'
}

const borderMap = {
  blue: 'border-fh-dark-blue',
  gray: 'border-gray-300'
}

const fontSizeMap = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm'
}

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  columnWidths: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  accent: {
    type: String,
    default: 'blue',
    validator: v => ['blue', 'gray'].includes(v)
  },
  highlights: {
    type: Array,
    default: () => []
  }
})

const isRowHighlighted = rowIndex => {
  const highlightIndex = props.highlights.indexOf(rowIndex)
  if (highlightIndex === -1) return false
  return clicks.value >= highlightIndex + 1
}

const cellPadding = computed(() => paddingMap[props.size])
const accentBg = computed(() => accentMap[props.accent])
const accentBorder = computed(() => borderMap[props.accent])
const fontSize = computed(() => fontSizeMap[props.size])

const getHeaderText = header => {
  return typeof header === 'object' ? header.text : header
}

const getColumnWidth = (index, header) => {
  if (props.columnWidths && props.columnWidths[index]) {
    return props.columnWidths[index]
  }
  if (typeof header === 'object' && header.width) {
    return header.width
  }
  return 'auto'
}
</script>

<template>
  <figure class="table-figure">
    <table :class="['w-full border-collapse leading-relaxed text-gray-700', fontSize]">
      <colgroup>
        <col
          v-for="(header, index) in headers"
          :key="'col-' + index"
          :style="{ width: getColumnWidth(index, header) }"
        />
      </colgroup>
      <thead>
        <tr :class="['border-b-2', accentBorder]">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="[cellPadding, 'text-left font-semibold text-gray-800']"
          >
            {{ getHeaderText(header) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          :class="[
            rowIndex % 2 === 0 ? accentBg : 'bg-white',
            'highlight-row',
            isRowHighlighted(rowIndex) && 'highlighted'
          ]"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="[cellPadding, 'align-top text-gray-700']"
            v-html="cell"
          ></td>
        </tr>
      </tbody>
    </table>

    <figcaption v-if="caption" class="table-caption" v-html="caption" />
  </figure>
</template>

<style scoped>
.table-figure {
  margin: 0;
}

.table-caption {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #9ca3af;
  font-style: italic;
}

.highlight-row {
  position: relative;
  transition:
    background-color 0.3s ease,
    outline 0.3s ease;
}

.highlight-row.highlighted {
  z-index: 2;
}

.highlight-row.highlighted td {
  background-color: #fff7ed !important;
}

:deep(sup) {
  font-size: 0.7em;
  vertical-align: super;
}

:deep(em) {
  font-style: italic;
}
</style>
