<script setup lang="ts">
import { computed } from 'vue'
import { useWizardStore } from '../../stores/wizard'
import { renderPrompt } from '../../lib/promptEngine'

const wizard = useWizardStore()

const renderedDisplay = computed(() =>
  renderPrompt(wizard.data, { stripMarkers: true })
)

const charCount = computed(() => renderedDisplay.value.length)

const isEmptyShape = computed(() => {
  const b = wizard.data.basics
  return (
    !b.appType.trim() &&
    !b.appName.trim() &&
    !b.purpose.trim() &&
    !b.targetUser.trim() &&
    wizard.data.design.styles.length === 0 &&
    wizard.data.design.moods.length === 0 &&
    wizard.data.pages.pages.length === 0 &&
    wizard.data.features.features.length === 0
  )
})
</script>

<template>
  <div class="mx-auto flex h-full max-w-2xl flex-col gap-4 px-6 py-8 md:px-10 md:py-12">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Live Preview
      </h2>
      <div class="flex items-center gap-2">
        <span
          class="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400"
        >
          {{ charCount.toLocaleString() }} chars
        </span>
        <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Markdown
        </span>
      </div>
    </div>

    <div
      v-if="isEmptyShape"
      class="flex flex-1 items-center justify-center"
    >
      <div class="text-center">
        <p class="text-base font-medium text-slate-600 dark:text-slate-300">
          Your prompt will appear here, looking spectacular.
        </p>
        <p class="mt-2 text-sm text-slate-400 dark:text-slate-500">
          (Empty state. The wizard is shy. Talk to it on the left.)
        </p>
      </div>
    </div>

    <pre
      v-else
      class="flex-1 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-5 font-mono text-sm leading-relaxed text-lovable-ink dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
    ><code>{{ renderedDisplay }}</code></pre>
  </div>
</template>
