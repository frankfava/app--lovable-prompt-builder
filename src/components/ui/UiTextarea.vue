<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    helper?: string
    error?: string
    rows?: number
    disabled?: boolean
  }>(),
  { rows: 5, disabled: false }
)

defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const fieldId = useId()
const helperId = computed(() => (props.helper ? `${fieldId}-helper` : undefined))
const errorId = computed(() => (props.error ? `${fieldId}-error` : undefined))
const describedBy = computed(() =>
  [errorId.value, helperId.value].filter(Boolean).join(' ') || undefined
)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="fieldId"
      class="text-sm font-semibold text-lovable-ink dark:text-slate-100"
    >
      {{ label }}
    </label>
    <textarea
      :id="fieldId"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :aria-invalid="!!error || undefined"
      :aria-describedby="describedBy"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-lovable-ink placeholder:text-slate-400 transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 disabled:opacity-60 resize-y dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
      :class="{ 'border-rose-400 focus:border-rose-500 focus:ring-rose-300/40': !!error }"
      @input="
        (e) =>
          $emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
      "
    />
    <p v-if="error" :id="errorId" class="text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>
    <p v-else-if="helper" :id="helperId" class="text-sm text-slate-500 dark:text-slate-400">
      <slot name="helper">{{ helper }}</slot>
    </p>
  </div>
</template>
