import type { Component } from 'vue'
import type { StepId } from '../../types/wizard'

import StepBasics from './steps/StepBasics.vue'
import StepDesign from './steps/StepDesign.vue'
import StepPages from './steps/StepPages.vue'
import StepFeatures from './steps/StepFeatures.vue'
import StepBackend from './steps/StepBackend.vue'
import StepFinal from './steps/StepFinal.vue'

export const stepRegistry: Record<StepId, Component> = {
  basics: StepBasics,
  design: StepDesign,
  pages: StepPages,
  features: StepFeatures,
  backend: StepBackend,
  final: StepFinal,
}
