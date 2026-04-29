<script setup lang="ts">
import ThemeToggle from '../ui/ThemeToggle.vue'

withDefaults(
  defineProps<{
    tagline?: string
    repoUrl?: string
  }>(),
  {
    tagline: 'Make Lovable lovestruck.',
    repoUrl: '',
  }
)
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-lovable-night/80"
  >
    <div
      class="mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 md:px-8"
    >
      <a href="/" class="flex items-center gap-3 group">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-2xl bg-lovable-gradient text-white text-lg shadow-lovable transition group-hover:rotate-3"
          aria-hidden="true"
        >
          ✨
        </span>
        <span class="flex flex-col leading-tight">
          <span
            class="bg-lovable-gradient bg-clip-text text-lg font-extrabold text-transparent md:text-xl"
          >
            Lovable Prompt Builder
          </span>
          <span class="hidden text-xs text-slate-500 dark:text-slate-400 md:block">
            {{ tagline }}
          </span>
        </span>
      </a>

      <nav class="flex items-center gap-2">
        <a
          v-if="repoUrl"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-lovable-purple/50 hover:text-lovable-purple dark:border-slate-700 dark:text-slate-300 dark:hover:border-lovable-pink/60 dark:hover:text-lovable-pink md:inline-flex"
        >
          GitHub
        </a>
        <span
          class="inline-flex rounded-full border border-lovable-purple/30 bg-lovable-gradient-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-lovable-violet dark:border-lovable-pink/40 dark:text-lovable-pink"
        >
          v0 · MVP
        </span>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
