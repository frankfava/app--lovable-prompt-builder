<script setup lang="ts">
import { computed } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiButton from '../../ui/UiButton.vue'
import { useWizardStore } from '../../../stores/wizard'
import type { PageDef } from '../../../types/wizard'

const wizard = useWizardStore()

const pages = computed(() => wizard.data.pages.pages)

function commit(next: PageDef[]) {
  wizard.setStepData('pages', { pages: next })
}

function addRow() {
  commit([...pages.value, { path: '', description: '' }])
}

function removeRow(idx: number) {
  if (pages.value.length <= 1) return
  const next = [...pages.value]
  next.splice(idx, 1)
  commit(next)
}

function updatePath(idx: number, value: string) {
  const next = pages.value.map((p, i) => (i === idx ? { ...p, path: value } : p))
  commit(next)
}

function updateDescription(idx: number, value: string) {
  const next = pages.value.map((p, i) =>
    i === idx ? { ...p, description: value } : p
  )
  commit(next)
}
</script>

<template>
  <StepContainer
    title="Pages & Routes"
    blurb="Routes are road signs. Tell us where users can go."
  >
    <div class="flex flex-col gap-3">
      <div
        v-for="(page, idx) in pages"
        :key="idx"
        class="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-start"
      >
        <div class="flex flex-col gap-1 sm:w-40 sm:shrink-0">
          <label
            :for="`page-path-${idx}`"
            class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Path
          </label>
          <input
            :id="`page-path-${idx}`"
            :value="page.path"
            placeholder="/"
            class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
            @input="(e) => updatePath(idx, (e.target as HTMLInputElement).value)"
          />
        </div>
        <div class="flex flex-1 flex-col gap-1">
          <label
            :for="`page-desc-${idx}`"
            class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            What lives here?
          </label>
          <input
            :id="`page-desc-${idx}`"
            :value="page.description"
            placeholder="Landing page with hero, features, pricing, CTA"
            class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
            @input="(e) => updateDescription(idx, (e.target as HTMLInputElement).value)"
          />
        </div>
        <div class="sm:pt-5">
          <button
            type="button"
            class="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm text-slate-500 transition hover:border-rose-300 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400"
            :disabled="pages.length <= 1"
            :aria-label="`Remove page row ${idx + 1}`"
            @click="removeRow(idx)"
          >
            Remove
          </button>
        </div>
      </div>

      <p
        v-if="pages.length === 0"
        class="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        No pages yet. Add one to get started — at minimum, the home page.
      </p>

      <div>
        <UiButton variant="secondary" size="sm" @click="addRow">
          + Add a page
        </UiButton>
      </div>
    </div>
  </StepContainer>
</template>
