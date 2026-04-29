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
      <template v-if="!wizard.isLast">
        <UiSkipButton @skip="wizard.skipStep(wizard.currentStep.id)" />
        <UiButton variant="primary" @click="wizard.goNext()">
          Next →
        </UiButton>
      </template>
    </div>
  </div>
</template>
