<script setup lang="ts">
import { computed } from 'vue'
import { useWizardStore } from '../../stores/wizard'
import { stepRegistry } from './stepRegistry'
import StepProgress from './StepProgress.vue'
import WizardNav from './WizardNav.vue'

const wizard = useWizardStore()

const ActiveStep = computed(() => stepRegistry[wizard.currentStep.id])
</script>

<template>
  <div class="mx-auto flex h-full max-w-2xl flex-col gap-8 px-6 py-8 md:px-10 md:py-12">
    <StepProgress />

    <div class="flex flex-1 flex-col gap-8">
      <component :is="ActiveStep" />
    </div>

    <WizardNav />
  </div>
</template>
