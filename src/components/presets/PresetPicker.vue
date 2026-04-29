<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWizardStore } from '../../stores/wizard'
import { PRESETS } from '../../data/presets'
import UiButton from '../ui/UiButton.vue'
import UiCard from '../ui/UiCard.vue'

const wizardStore = useWizardStore()
const isOpen = ref(false)
const selectedPresetId = ref<string | null>(null)

// One-shot flag: show picker only on first mount unless ?blank=1
onMounted(() => {
  const hasVisited = sessionStorage.getItem('preset-picker-shown')
  const blankParam = new URLSearchParams(window.location.search).has('blank')

  if (!hasVisited && !blankParam) {
    isOpen.value = true
    sessionStorage.setItem('preset-picker-shown', 'true')
  }
})

function selectPreset(presetId: string) {
  selectedPresetId.value = presetId
  const preset = PRESETS.find((p: typeof PRESETS[number]) => p.id === presetId)
  if (preset) {
    wizardStore.loadPreset(preset.data)
    isOpen.value = false
  }
}

function startBlank() {
  isOpen.value = false
}

function reopenPicker() {
  wizardStore.resetWizard()
  selectedPresetId.value = null
  isOpen.value = true
}

defineExpose({
  reopenPicker,
})
</script>

<template>
  <!-- Modal overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      >
        <!-- Modal panel -->
        <div
          class="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
        >
          <!-- Header -->
          <div class="sticky top-0 border-b border-slate-200 bg-white px-6 py-6 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            <h2 class="text-3xl font-bold bg-lovable-gradient bg-clip-text text-transparent">
              Pick a starter template
            </h2>
            <p class="mt-2 text-slate-600 dark:text-slate-400">
              Each one comes pre-filled with everything your app needs. Tweak and ship in minutes.
            </p>
          </div>

          <!-- Preset grid -->
          <div class="grid gap-4 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <button
              v-for="preset in PRESETS"
              :key="preset.id"
              @click="selectPreset(preset.id)"
              class="group text-left"
            >
              <UiCard
                padded
                class="h-full transition-all duration-200 hover:shadow-lg hover:border-lovable-purple/60 dark:hover:border-lovable-pink/60 cursor-pointer"
              >
                <div class="flex items-start justify-between mb-3">
                  <span class="text-4xl" aria-hidden="true">{{ preset.emoji }}</span>
                  <div
                    class="h-3 w-3 rounded-full border-2 border-slate-300 transition-all group-hover:border-lovable-purple dark:border-slate-600 dark:group-hover:border-lovable-pink"
                    :class="{
                      'bg-lovable-purple dark:bg-lovable-pink': selectedPresetId === preset.id,
                    }"
                  />
                </div>
                <h3 class="text-lg font-bold text-lovable-ink dark:text-slate-100">
                  {{ preset.label }}
                </h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {{ preset.blurb }}
                </p>
              </UiCard>
            </button>
          </div>

          <!-- Divider -->
          <div class="border-t border-slate-200 dark:border-slate-800" />

          <!-- Footer actions -->
          <div class="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:justify-between sm:items-center">
            <button
              @click="startBlank"
              class="text-sm text-slate-600 hover:text-lovable-purple dark:text-slate-400 dark:hover:text-lovable-pink transition-colors font-medium"
            >
              Start from blank
            </button>
            <UiButton
              v-if="selectedPresetId"
              variant="primary"
              @click="selectPreset(selectedPresetId)"
            >
              Use this template
            </UiButton>
            <div v-else class="text-sm text-slate-500 dark:text-slate-400">
              Select a template above
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
