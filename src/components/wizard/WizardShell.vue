<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useWizardStore } from '../../stores/wizard'
import { stepRegistry } from './stepRegistry'
import StepProgress from './StepProgress.vue'
import WizardNav from './WizardNav.vue'

const wizard = useWizardStore()

const ActiveStep = computed(() => stepRegistry[wizard.currentStep.id])
const root = ref<HTMLElement | null>(null)

function scrollWizardToTop() {
  let el: HTMLElement | null = root.value
  while (el) {
    const style = getComputedStyle(el)
    if (/(auto|scroll)/.test(style.overflowY)) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    el = el.parentElement
  }
}

watch(
  () => [wizard.currentStepIndex, wizard.dataResetTick],
  () => {
    nextTick(scrollWizardToTop)
  }
)
</script>

<template>
  <div ref="root" class="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-8 pb-24 md:px-10 md:pt-12 md:pb-32">
    <StepProgress />

    <div class="flex flex-col gap-8">
      <component :is="ActiveStep" />
    </div>

    <WizardNav />
  </div>
</template>
