<script setup lang="ts">
import { computed } from 'vue'
import { useFigures } from '../composables/useFigures'

const props = defineProps({
  title: { type: String, default: '' },
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  source: { type: String, default: '' },
  width: { type: String, default: 'auto' },
  maxWidth: { type: String, default: '100%' },
  figureId: { type: String, default: '' },
  height: { type: String, default: 'auto' },
  captionAlign: { type: String as () => 'left' | 'center' | 'right', default: 'left' }
})

const { registerFigure } = useFigures()

const uniqueId = computed(() => {
  if (props.figureId) {
    return props.figureId
  }
  return `fig-${props.src.replace(/[^a-zA-Z0-9]/g, '-')}`
})

const figureInfo =
  props.caption || props.source
    ? registerFigure(uniqueId.value, {
        src: props.src,
        alt: props.alt || '',
        caption: props.caption || '',
        source: props.source || ''
      })
    : null
</script>

<template>
  <figure
    class="image-figure"
    :data-figure-id="caption || source ? uniqueId : undefined"
    :style="{ maxWidth: maxWidth }"
  >
    <img
      :src="src"
      :alt="alt || title"
      class="img-contain"
      :style="height !== 'auto' ? { maxHeight: height } : {}"
    />
    <figcaption v-if="caption || source" class="image-caption" :style="{ textAlign: captionAlign }">
      <span v-if="figureInfo" class="figure-number">Abb. {{ figureInfo.number }}: </span>
      <span v-if="caption">{{ caption }}</span>
      <span v-if="source" class="figure-source"> (Quelle: {{ source }})</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.image-figure {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  width: fit-content;
  max-width: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: 0.125rem;
}

.img-contain {
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: left;
  min-height: 0;
  flex-shrink: 1;
}

.image-caption {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  color: #6b7280;
  width: 100%;
  flex-shrink: 0;
}

.figure-number {
  font-weight: 600;
}
.figure-source {
  font-style: italic;
}
</style>
