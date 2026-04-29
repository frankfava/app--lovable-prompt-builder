<script setup lang="ts">
import { computed } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiTextarea from '../../ui/UiTextarea.vue'
import UiChip from '../../ui/UiChip.vue'
import UiButton from '../../ui/UiButton.vue'
import { useWizardStore } from '../../../stores/wizard'
import type { StyleBuzzword, MoodBuzzword } from '../../../types/wizard'

const wizard = useWizardStore()

const STYLE_OPTIONS: readonly StyleBuzzword[] = [
  'minimal',
  'bold',
  'premium',
  'playful',
  'editorial',
  'brutalist',
  'expressive',
  'cinematic',
  'developer-focused',
]

const MOOD_OPTIONS: readonly MoodBuzzword[] = [
  'calm',
  'energetic',
  'serious',
  'fun',
  'warm',
  'confident',
]

const TYPOGRAPHY_OPTIONS: readonly string[] = [
  'Sans-serif everywhere',
  'Serif headlines, sans-serif body',
  'All monospace',
  'Display + sans body',
  'Custom',
]

const LAYOUT_OPTIONS: readonly string[] = [
  'Top nav',
  'Sidebar nav',
  'Centered single-column',
  'Full-width dashboard',
  'Split-screen',
]

const PALETTE_SUGGESTIONS: readonly string[] = [
  'Soft cream background, charcoal ink, accent in warm coral (#ff6f61).',
  'Deep navy base (#0b1d3a), bright lime accent (#c4ff61), white surfaces.',
  'Warm off-white, plum primary (#5b2a86), peach highlight (#ff9b71).',
]

const STYLE_CAP = 2

const styles = computed(() => wizard.data.design.styles)
const moods = computed(() => wizard.data.design.moods)

const colors = computed({
  get: () => wizard.data.design.colors,
  set: (v: string) => wizard.setStepData('design', { colors: v }),
})

const typography = computed({
  get: () => wizard.data.design.typography,
  set: (v: string) => wizard.setStepData('design', { typography: v }),
})

const layout = computed({
  get: () => wizard.data.design.layout,
  set: (v: string) => wizard.setStepData('design', { layout: v }),
})

const inspiration = computed({
  get: () => wizard.data.design.inspiration,
  set: (v: string) => wizard.setStepData('design', { inspiration: v }),
})

function toggleStyle(option: StyleBuzzword) {
  const current = [...styles.value]
  const idx = current.indexOf(option)
  if (idx >= 0) {
    current.splice(idx, 1)
  } else {
    if (current.length >= STYLE_CAP) return
    current.push(option)
  }
  wizard.setStepData('design', { styles: current })
}

function pickMood(option: MoodBuzzword) {
  const isOn = moods.value.includes(option)
  wizard.setStepData('design', { moods: isOn ? [] : [option] })
}

function suggestPalette() {
  const idx = Math.floor(Math.random() * PALETTE_SUGGESTIONS.length)
  wizard.setStepData('design', { colors: PALETTE_SUGGESTIONS[idx] })
}

const styleAtCap = computed(() => styles.value.length >= STYLE_CAP)
</script>

<template>
  <StepContainer
    title="Design Direction"
    blurb="Lovable speaks fluent buzzword. Pick the words that match your vision."
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-baseline justify-between">
        <span class="text-sm font-semibold text-lovable-ink dark:text-slate-100">
          Style — pick up to {{ STYLE_CAP }}
        </span>
        <span class="text-xs text-slate-500 dark:text-slate-400">
          {{ styles.length }} / {{ STYLE_CAP }}
        </span>
      </div>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Style options">
        <UiChip
          v-for="opt in STYLE_OPTIONS"
          :key="opt"
          :selected="styles.includes(opt)"
          :disabled="!styles.includes(opt) && styleAtCap"
          @toggle="toggleStyle(opt)"
        >
          {{ opt }}
        </UiChip>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold text-lovable-ink dark:text-slate-100">Mood</span>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Mood options">
        <UiChip
          v-for="opt in MOOD_OPTIONS"
          :key="opt"
          :selected="moods.includes(opt)"
          @toggle="pickMood(opt)"
        >
          {{ opt }}
        </UiChip>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <UiTextarea
        v-model="colors"
        label="Colors"
        :rows="2"
        placeholder="Describe a palette, paste hex codes, or vibe-words."
        helper="Optional — Lovable picks tasteful defaults if you skip."
      />
      <div>
        <UiButton variant="secondary" size="sm" @click="suggestPalette">
          Suggest a palette ✨
        </UiButton>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-semibold text-lovable-ink dark:text-slate-100" for="design-typography">
        Typography
      </label>
      <select
        id="design-typography"
        v-model="typography"
        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
      >
        <option value="">— pick one —</option>
        <option v-for="opt in TYPOGRAPHY_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-semibold text-lovable-ink dark:text-slate-100" for="design-layout">
        Layout
      </label>
      <select
        id="design-layout"
        v-model="layout"
        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
      >
        <option value="">— pick one —</option>
        <option v-for="opt in LAYOUT_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>

    <UiTextarea
      v-model="inspiration"
      label="Inspiration"
      :rows="2"
      placeholder="Name 1–2 sites or apps you'd point at. 'Like Linear meets Notion' is plenty."
      helper="Concrete references travel well."
    />
  </StepContainer>
</template>
