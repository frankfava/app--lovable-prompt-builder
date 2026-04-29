<script setup lang="ts">
defineProps<{
  title: string
  blurb?: string
}>()
</script>

<template>
  <section class="flex flex-col gap-5">
    <header class="flex flex-col gap-1">
      <h2 class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
      <p v-if="blurb" class="text-slate-500 dark:text-slate-400">{{ blurb }}</p>
    </header>

    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </section>
</template>
