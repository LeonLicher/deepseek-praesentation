<script setup>
import { computed } from 'vue'

const info = $slidev.configs?.presentationInfo || {
  title: '',
  subtitle: '',
  chapters: []
}

const props = defineProps({
  chapter: {
    type: String,
    default: ''
  },
  section: {
    type: String,
    default: ''
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const chapterTitle = computed(() => {
  if (!props.chapter || !info.chapters) {
    return ''
  }
  const chapterNum = parseInt(props.chapter)
  const chapter = info.chapters.find(ch => ch.number === chapterNum)
  return chapter?.title || ''
})

const footerText = computed(() => {
  if (props.chapter && chapterTitle.value) {
    return `${info.title} | ${info.subtitle} | ${chapterTitle.value}`
  }
  return `${info.title} | ${info.subtitle}`
})
</script>

<template>
  <div
    class="footer-container relative flex justify-between items-center py-1 pl-5.5 pr-7 -mx-8 -mb-4 mt-2"
  >
    <div class="bg-white px-3 py-0.5 rounded-lg text-gray-600 text-[11px] relative z-10">
      {{ footerText }}
    </div>
    <span class="bg-white px-3 py-0.5 rounded-lg text-gray-600 text-[11.5px] relative z-10">
      {{ currentPage - 1 }}
    </span>
  </div>
</template>

<style scoped>
.footer-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/images/footer-background.png');
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: center;
  filter: grayscale(1) opacity(0.15) blur(1.5px);
  z-index: 0;
}
</style>
