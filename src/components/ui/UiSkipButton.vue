<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  { label: 'Skip this — I trust the defaults' }
)

defineEmits<{ (e: 'skip'): void }>()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-dashed border-lovable-purple/40 bg-lovable-gradient-soft px-4 py-2 text-sm font-medium text-lovable-violet transition hover:border-lovable-purple hover:text-lovable-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-lovable-purple/60 focus-visible:ring-offset-2"
    @click="$emit('skip')"
  >
    <span aria-hidden="true">✨</span>
    <slot>{{ label }}</slot>
  </button>
</template>
