<script setup lang="ts">
withDefaults(
  defineProps<{
    padded?: boolean
    elevated?: boolean
  }>(),
  { padded: true, elevated: false }
)
</script>

<template>
  <section
    class="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
    :class="[padded ? 'p-6' : '', elevated ? 'shadow-lovable' : 'shadow-sm']"
  >
    <header v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </header>
    <slot />
    <footer v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </footer>
  </section>
</template>
