<script setup lang="ts">
import { computed } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiInput from '../../ui/UiInput.vue'
import UiTextarea from '../../ui/UiTextarea.vue'
import UiChip from '../../ui/UiChip.vue'
import { useWizardStore } from '../../../stores/wizard'

const wizard = useWizardStore()

const APP_TYPE_CHIPS: readonly string[] = [
  'web app',
  'SaaS product',
  'marketing site',
  'internal tool',
  'mobile-first PWA',
  'dashboard',
  'landing page',
]

const appName = computed({
  get: () => wizard.data.basics.appName,
  set: (v: string) => wizard.setStepData('basics', { appName: v }),
})

const appType = computed({
  get: () => wizard.data.basics.appType,
  set: (v: string) => wizard.setStepData('basics', { appType: v }),
})

const purpose = computed({
  get: () => wizard.data.basics.purpose,
  set: (v: string) => wizard.setStepData('basics', { purpose: v }),
})

const targetUser = computed({
  get: () => wizard.data.basics.targetUser,
  set: (v: string) => wizard.setStepData('basics', { targetUser: v }),
})

function pickType(type: string) {
  wizard.setStepData('basics', { appType: type })
}
</script>

<template>
  <StepContainer
    title="The Basics"
    blurb="Tell us what you're building. Be specific — 'budgeting app for Gen Z freelancers' beats 'budgeting app.'"
  >
    <UiInput
      v-model="appName"
      label="App name"
      placeholder="e.g. Pocketwise"
      helper="A working title is fine — you can change it anytime."
    />

    <div class="flex flex-col gap-2">
      <UiInput
        v-model="appType"
        label="Type of app"
        placeholder="e.g. personal finance app"
        helper="One short phrase. Pick a chip below if you want a starting point."
      />
      <div class="flex flex-wrap gap-2 pt-1">
        <UiChip
          v-for="chip in APP_TYPE_CHIPS"
          :key="chip"
          :selected="appType === chip"
          @toggle="pickType(chip)"
        >
          {{ chip }}
        </UiChip>
      </div>
    </div>

    <UiTextarea
      v-model="purpose"
      label="Purpose"
      :rows="3"
      placeholder="In 1–2 sentences, what does this app do and why does it matter?"
      helper="The clearer this is, the less Lovable has to guess."
    />

    <UiTextarea
      v-model="targetUser"
      label="Target user"
      :rows="3"
      placeholder="Who's it for? Be specific — 'freelance designers in their first year' beats 'creators.'"
      helper="A persona, not a market. One sentence is plenty."
    />
  </StepContainer>
</template>
