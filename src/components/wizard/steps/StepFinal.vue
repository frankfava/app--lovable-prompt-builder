<script setup lang="ts">
import { computed } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiTextarea from '../../ui/UiTextarea.vue'
import UiButton from '../../ui/UiButton.vue'
import CopyButton from '../../output/CopyButton.vue'
import DownloadButton from '../../output/DownloadButton.vue'
import BuildWithLovableButton from '../../output/BuildWithLovableButton.vue'
import { useWizardStore } from '../../../stores/wizard'
import { DEFAULT_WHAT_TO_DO_FIRST } from '../../../types/wizard'

const wizard = useWizardStore()

const whatToDoFirst = computed({
  get: () => wizard.data.final.whatToDoFirst,
  set: (v: string) => wizard.setStepData('final', { whatToDoFirst: v }),
})

function resetToDefault() {
  wizard.setStepData('final', { whatToDoFirst: DEFAULT_WHAT_TO_DO_FIRST })
}
</script>

<template>
  <StepContainer
    title="Final Touches"
    blurb="Look at you. Built different. Ship it."
  >
    <div
      class="rounded-3xl border border-lovable-purple/30 bg-lovable-gradient-soft p-5 text-lovable-ink dark:border-lovable-pink/40 dark:text-slate-100"
    >
      <p class="text-lg font-extrabold">Your prompt is ready ✨</p>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Last call: tell Lovable how to kick things off. The default below asks it to
        clarify before writing code — usually the smart move.
      </p>
    </div>

    <UiTextarea
      v-model="whatToDoFirst"
      label="What Lovable should do first"
      :rows="5"
      helper="Edit if you want a different opener. Otherwise the default is solid."
    />

    <div>
      <UiButton variant="ghost" size="sm" @click="resetToDefault">
        Reset to default
      </UiButton>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:gap-2 md:hidden">
      <CopyButton />
      <DownloadButton />
      <BuildWithLovableButton />
    </div>
  </StepContainer>
</template>
