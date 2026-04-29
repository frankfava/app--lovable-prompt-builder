<script setup lang="ts">
defineSlots<{
  wizard(): unknown
  preview(): unknown
}>()
</script>

<template>
  <div class="flex flex-1 min-h-0 flex-col md:flex-row">
    <section
      aria-label="Wizard"
      class="flex-1 min-w-0 overflow-y-auto border-b border-slate-200 dark:border-slate-800 md:border-b-0 md:border-r"
    >
      <slot name="wizard" />
    </section>
    <aside
      aria-label="Live prompt preview"
      class="flex-1 min-w-0 overflow-y-auto bg-slate-50/60 dark:bg-lovable-midnight"
    >
      <slot name="preview" />
    </aside>
  </div>
</template>
