<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import SplitLayout from './components/layout/SplitLayout.vue'
import WizardShell from './components/wizard/WizardShell.vue'
import PreviewPane from './components/preview/PreviewPane.vue'
import MobilePreviewSheet from './components/preview/MobilePreviewSheet.vue'
import PresetPicker from './components/presets/PresetPicker.vue'

const presetPickerRef = ref<InstanceType<typeof PresetPicker>>()

function openPresetPicker() {
  presetPickerRef.value?.reopenPicker()
}
</script>

<template>
  <div
    class="flex h-screen flex-col bg-white font-sans text-lovable-ink antialiased dark:bg-lovable-night dark:text-slate-100"
  >
    <AppHeader @open-preset-picker="openPresetPicker" />

    <SplitLayout>
      <template #wizard>
        <WizardShell />
      </template>

      <template #preview>
        <PreviewPane />
      </template>
    </SplitLayout>

    <MobilePreviewSheet />
    <PresetPicker ref="presetPickerRef" />
  </div>
</template>
