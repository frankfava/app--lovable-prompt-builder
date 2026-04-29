<script setup lang="ts">
defineSlots<{
  wizard(): unknown
  preview(): unknown
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <section
        aria-label="Wizard"
        class="min-w-0"
      >
        <slot name="wizard" />
      </section>
      <aside
        aria-label="Live prompt preview"
        class="min-w-0 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-7rem)] md:overflow-y-auto"
      >
        <slot name="preview" />
      </aside>
    </div>
  </div>
</template>
