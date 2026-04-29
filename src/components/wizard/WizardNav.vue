<script setup lang="ts">
import { useWizardStore } from '../../stores/wizard'
import UiButton from '../ui/UiButton.vue'
import UiSkipButton from '../ui/UiSkipButton.vue'

const wizard = useWizardStore()
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <UiButton
      variant="ghost"
      :disabled="wizard.isFirst"
      @click="wizard.goBack()"
    >
      ← Back
    </UiButton>

    <div class="flex flex-wrap items-center gap-3">
      <UiSkipButton @skip="wizard.skipStep(wizard.currentStep.id)" />
      <UiButton
        v-if="!wizard.isLast"
        variant="primary"
        @click="wizard.goNext()"
      >
        Next →
      </UiButton>
      <UiButton v-else variant="primary" @click="wizard.goNext()">
        Finish ✨
      </UiButton>
    </div>
  </div>
</template>
