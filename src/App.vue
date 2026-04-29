<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import SplitLayout from './components/layout/SplitLayout.vue'
import UiButton from './components/ui/UiButton.vue'
</script>

<template>
  <div
    class="flex h-screen flex-col bg-white font-sans text-lovable-ink antialiased dark:bg-lovable-night dark:text-slate-100"
  >
    <AppHeader />

    <SplitLayout>
      <template #wizard>
        <div class="mx-auto flex h-full max-w-2xl flex-col gap-4 px-6 py-8 md:px-10 md:py-12">
          <h1 class="text-2xl font-extrabold md:text-3xl">
            Let's build a
            <span class="bg-lovable-gradient bg-clip-text text-transparent">
              lovable
            </span>
            prompt.
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            The wizard wires up in Phase 3 — for now, here's the shell.
            Six friendly steps. Smart defaults you can absolutely override.
            Skip what doesn't matter, sweat the bits that do.
          </p>
          <div class="pt-2">
            <UiButton variant="primary" size="lg">Start the wizard ✨</UiButton>
          </div>
        </div>
      </template>

      <template #preview>
        <div class="mx-auto flex h-full max-w-2xl flex-col gap-4 px-6 py-8 md:px-10 md:py-12">
          <div class="flex items-center justify-between">
            <h2
              class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Live Preview
            </h2>
            <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Markdown
            </span>
          </div>

          <div class="flex flex-1 items-center justify-center">
            <div class="text-center">
              <p class="text-base font-medium text-slate-600 dark:text-slate-300">
                Your prompt will appear here, looking spectacular.
              </p>
              <p class="mt-2 text-sm text-slate-400 dark:text-slate-500">
                (Empty state. The wizard is shy. Talk to it on the left.)
              </p>
            </div>
          </div>
        </div>
      </template>
    </SplitLayout>
  </div>
</template>
