<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '../../stores/theme'

const theme = useThemeStore()

const label = computed(() =>
  theme.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
)
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-lovable-purple/50 hover:text-lovable-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-lovable-purple/60 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:border-lovable-pink/60 dark:hover:text-lovable-pink dark:focus-visible:ring-offset-lovable-night"
    @click="theme.toggle()"
  >
    <svg
      v-if="theme.theme === 'dark'"
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
    <svg
      v-else
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
