<script setup>
import OutlineBadge from './NumberBadge.vue'

defineProps({
  number: {
    type: [Number, String],
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center gap-2.5">
    <OutlineBadge :number="number" :active="active" :disabled="disabled" :size="'sm'" />
    <span
      class="text-lg"
      :class="{
        'text-fh-orange': active,
        'text-gray-400': disabled,
        'text-fh-dark-blue': !active && !disabled
      }"
    >
      <slot />
    </span>
  </div>
</template>
