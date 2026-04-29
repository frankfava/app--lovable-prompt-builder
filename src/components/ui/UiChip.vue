<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    selected?: boolean
    removable?: boolean
    disabled?: boolean
  }>(),
  { selected: false, removable: false, disabled: false }
)

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'remove'): void
}>()

const classes = computed(() =>
  [
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-lovable-purple/60 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    props.selected
      ? 'bg-lovable-gradient text-white shadow-sm'
      : 'bg-white text-lovable-ink border border-slate-200 hover:border-lovable-purple/50',
  ].join(' ')
)
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    :aria-pressed="!removable ? selected : undefined"
    @click="emit('toggle')"
  >
    <slot />
    <span
      v-if="removable"
      class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-white/30"
      role="button"
      tabindex="0"
      aria-label="Remove"
      @click.stop="emit('remove')"
      @keydown.enter.stop.prevent="emit('remove')"
      @keydown.space.stop.prevent="emit('remove')"
    >
      <svg
        viewBox="0 0 14 14"
        class="h-3 w-3"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M3 3l8 8M11 3l-8 8" />
      </svg>
    </span>
  </button>
</template>
