<script setup>
import { getCurrentInstance, provide } from 'vue'
import { useSlideContext } from '@slidev/client'
import Title from '@layouts/Title.vue'
import Logo from '@layouts/Logo.vue'
import Footer from '@layouts/Footer.vue'
import FootnoteList from '@layouts/footnote/List.vue'
import { provideFootnotes } from '@composables/useFootnotes'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: undefined
  }
})

const { $frontmatter, $slidev } = useSlideContext()

const instance = getCurrentInstance()
const { register, footnotes } = provideFootnotes(instance)
provide('registerFootnote', register)
provide('footnotes', footnotes)
</script>

<template>
  <div class="h-full flex flex-col px-8 pt-3 pb-4 bg-white relative">
    <div class="flex justify-between items-start mb-1.5">
      <Title :title="props.title" :subtitle="props.subtitle" />
      <Logo />
    </div>

    <Divider :length="100" color="border-fh-orange" thickness="border-t-2" class="mb-3" />

    <div class="flex-1 py-3.5 flex flex-col gap-4 overflow-hidden">
      <slot />
    </div>

    <FootnoteList :divider-length="25" />

    <Footer
      :presentation="$frontmatter?.presentation"
      :chapter="$frontmatter?.chapter ? String($frontmatter.chapter) : undefined"
      :section="$frontmatter?.section"
      :current-page="$slidev?.nav.currentPage"
    />
  </div>
</template>
