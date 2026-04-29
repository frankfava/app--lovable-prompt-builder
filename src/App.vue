<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import SplitLayout from './components/layout/SplitLayout.vue'
import WizardShell from './components/wizard/WizardShell.vue'
import PreviewPane from './components/preview/PreviewPane.vue'
</script>

<template>
  <div
    class="flex h-screen flex-col bg-white font-sans text-lovable-ink antialiased dark:bg-lovable-night dark:text-slate-100"
  >
    <AppHeader />

    <SplitLayout>
      <template #wizard>
        <WizardShell />
      </template>

      <template #preview>
        <PreviewPane />
      </template>
    </SplitLayout>
  </div>
</template>
