<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import SplitLayout from './components/layout/SplitLayout.vue'
import UiCard from './components/ui/UiCard.vue'
import UiButton from './components/ui/UiButton.vue'
</script>

<template>
  <div class="min-h-screen bg-lovable-cloud font-sans text-lovable-ink antialiased">
    <AppHeader />

    <SplitLayout>
      <template #wizard>
        <UiCard elevated>
          <template #header>
            <h1 class="text-2xl font-extrabold md:text-3xl">
              Let's build a
              <span class="bg-lovable-gradient bg-clip-text text-transparent">
                lovable
              </span>
              prompt.
            </h1>
            <p class="mt-1 text-slate-500">
              The wizard wires up in Phase 3 — for now, here's the shell.
            </p>
          </template>

          <p class="text-slate-600">
            Six friendly steps. Smart defaults you can absolutely override.
            Skip what doesn't matter, sweat the bits that do.
          </p>

          <template #footer>
            <UiButton variant="primary" size="lg">Start the wizard ✨</UiButton>
          </template>
        </UiCard>
      </template>

      <template #preview>
        <UiCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold">Live Preview</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400">
                Markdown
              </span>
            </div>
          </template>

          <div
            class="rounded-2xl bg-slate-50 p-6 text-center text-slate-500"
          >
            <p class="text-base font-medium">
              Your prompt will appear here, looking spectacular.
            </p>
            <p class="mt-2 text-sm">
              (Empty state. The wizard is shy. Talk to it on the left.)
            </p>
          </div>
        </UiCard>
      </template>
    </SplitLayout>
  </div>
</template>
