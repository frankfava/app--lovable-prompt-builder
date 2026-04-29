<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
  }
)

defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-4 py-2 text-base rounded-2xl',
  lg: 'px-6 py-3 text-lg rounded-3xl',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-lovable-gradient text-white shadow-lovable hover:brightness-110 active:brightness-95 dark:bg-lovable-gradient-muted',
  secondary:
    'bg-white text-lovable-ink border border-lovable-purple/30 hover:border-lovable-purple/60 hover:bg-lovable-gradient-soft dark:bg-slate-800 dark:text-slate-100 dark:border-lovable-pink/40 dark:hover:border-lovable-pink/70',
  ghost:
    'bg-transparent text-lovable-ink hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800',
}

const classes = computed(() =>
  [
    'inline-flex items-center justify-center gap-2 font-semibold transition',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-lovable-purple/60 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[props.size],
    variantClasses[props.variant],
  ].join(' ')
)
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="(e) => $emit('click', e)"
  >
    <span
      v-if="loading"
      class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
