<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="relative">
    <!-- Title Badge -->
    <div class="inline-block bg-fh-blue text-white px-4 py-0.75 text-sm font-semibold">
      {{ title }}
    </div>

    <div class="bg-gray-100 border-l-4 border-fh-blue -mt-0.5 px-2.5 py-2">
      <p class="text-gray-600 text-[0.88rem] leading-normal m-0">
        <slot />
      </p>

      <div v-if="source" class="text-right mt-2">
        <span class="text-gray-400 text-xs">{{ source }}</span>
      </div>
    </div>
  </div>
</template>
