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
  <div class="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-8 pb-24 md:px-10 md:pt-12 md:pb-32">
    <StepProgress />

    <div class="flex flex-col gap-8">
      <component :is="ActiveStep" />
    </div>

    <WizardNav />
  </div>
</template>
