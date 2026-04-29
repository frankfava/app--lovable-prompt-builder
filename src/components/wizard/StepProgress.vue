<script setup lang="ts">
import { useWizardStore } from '../../stores/wizard'

const wizard = useWizardStore()
</script>

<template>
  <nav aria-label="Wizard progress" class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Step {{ wizard.currentStepIndex + 1 }} of {{ wizard.stepCount }}
      </span>
      <span class="text-xs font-medium text-slate-400 dark:text-slate-500">
        {{ wizard.progressPct }}%
      </span>
    </div>

    <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div
        class="h-full rounded-full bg-lovable-gradient transition-all duration-300 dark:bg-lovable-gradient-muted"
        :style="{ width: `${wizard.progressPct}%` }"
      />
    </div>

    <ol class="flex flex-wrap gap-1.5">
      <li v-for="(step, idx) in wizard.steps" :key="step.id">
        <button
          type="button"
          :disabled="!wizard.visited.has(step.id) && idx > wizard.currentStepIndex"
          :aria-current="idx === wizard.currentStepIndex ? 'step' : undefined"
          class="rounded-full border px-2.5 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            idx === wizard.currentStepIndex
              ? 'border-transparent bg-lovable-gradient text-white shadow-sm dark:bg-lovable-gradient-muted'
              : wizard.visited.has(step.id)
              ? 'border-lovable-purple/40 text-lovable-violet hover:border-lovable-purple dark:border-lovable-pink/40 dark:text-lovable-pink dark:hover:border-lovable-pink'
              : 'border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500'
          "
          @click="wizard.goTo(step.id)"
        >
          {{ idx + 1 }}. {{ step.title }}
          <span v-if="wizard.skipped.has(step.id)" aria-label="Skipped" title="Skipped">
            ⏭
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>
