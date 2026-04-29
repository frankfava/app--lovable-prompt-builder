import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import type {
  StepId,
  WizardData,
  WizardStep,
  StepDataMap,
} from '../types/wizard'
import { EMPTY_WIZARD_DATA } from '../types/wizard'

const STEPS: readonly WizardStep[] = [
  {
    id: 'basics',
    title: 'The Basics',
    blurb: 'What you\'re building, who it\'s for, and the one-liner that sells it.',
    defaults: EMPTY_WIZARD_DATA.basics,
  },
  {
    id: 'design',
    title: 'Design Direction',
    blurb: 'Pick a vibe. Lovable speaks fluent buzzword.',
    defaults: EMPTY_WIZARD_DATA.design,
  },
  {
    id: 'pages',
    title: 'Pages & Routes',
    blurb: 'The screens that matter on day one.',
    defaults: EMPTY_WIZARD_DATA.pages,
  },
  {
    id: 'features',
    title: 'Features & Data',
    blurb: 'The MVP feature list and the entities behind them.',
    defaults: EMPTY_WIZARD_DATA.features,
  },
  {
    id: 'backend',
    title: 'Backend & Constraints',
    blurb: 'Auth, database, storage, and the rules of the road.',
    defaults: EMPTY_WIZARD_DATA.backend,
  },
  {
    id: 'final',
    title: 'Final Touches',
    blurb: 'How Lovable should kick things off.',
    defaults: EMPTY_WIZARD_DATA.final,
  },
] as const

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export const useWizardStore = defineStore('wizard', () => {
  const steps = ref<readonly WizardStep[]>(STEPS)
  const data = reactive<WizardData>(deepClone(EMPTY_WIZARD_DATA))
  const currentStepIndex = ref(0)
  const visited = reactive(new Set<StepId>(['basics']))
  const skipped = reactive(new Set<StepId>())

  const currentStep = computed(() => steps.value[currentStepIndex.value])
  const stepCount = computed(() => steps.value.length)
  const isFirst = computed(() => currentStepIndex.value === 0)
  const isLast = computed(
    () => currentStepIndex.value === steps.value.length - 1
  )
  const progressPct = computed(() =>
    Math.round(((currentStepIndex.value + 1) / steps.value.length) * 100)
  )
  const isComplete = computed(() =>
    steps.value.every((s) => visited.has(s.id))
  )
  const canGoNext = computed(() => !isLast.value)

  function goNext() {
    if (isLast.value) return
    currentStepIndex.value += 1
    visited.add(steps.value[currentStepIndex.value].id)
  }

  function goBack() {
    if (isFirst.value) return
    currentStepIndex.value -= 1
  }

  function goTo(stepId: StepId) {
    const idx = steps.value.findIndex((s) => s.id === stepId)
    if (idx === -1) return
    if (!visited.has(stepId) && idx > currentStepIndex.value) return
    currentStepIndex.value = idx
    visited.add(stepId)
  }

  function setStepData<K extends StepId>(
    stepId: K,
    partial: Partial<StepDataMap[K]>
  ) {
    Object.assign(data[stepId], partial)
    visited.add(stepId)
    skipped.delete(stepId)
  }

  function skipStep(stepId: StepId) {
    const step = steps.value.find((s) => s.id === stepId)
    if (!step) return
    Object.assign(
      data[stepId] as Record<string, unknown>,
      deepClone(step.defaults) as Record<string, unknown>
    )
    visited.add(stepId)
    skipped.add(stepId)
    if (currentStepIndex.value < steps.value.length - 1) {
      goNext()
    }
  }

  function resetWizard() {
    Object.assign(data, deepClone(EMPTY_WIZARD_DATA))
    currentStepIndex.value = 0
    visited.clear()
    visited.add('basics')
    skipped.clear()
  }

  return {
    steps,
    data,
    currentStepIndex,
    visited,
    skipped,
    currentStep,
    stepCount,
    isFirst,
    isLast,
    progressPct,
    isComplete,
    canGoNext,
    goNext,
    goBack,
    goTo,
    setStepData,
    skipStep,
    resetWizard,
  }
})
