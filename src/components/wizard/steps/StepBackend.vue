<script setup lang="ts">
import { computed } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiTextarea from '../../ui/UiTextarea.vue'
import { useWizardStore } from '../../../stores/wizard'
import {
  DEFAULT_CONSTRAINTS,
  type AuthChoice,
  type DbChoice,
} from '../../../types/wizard'

const wizard = useWizardStore()

const AUTH_OPTIONS: { value: AuthChoice; label: string }[] = [
  { value: 'none', label: 'None for now' },
  { value: 'email-password', label: 'Email + password' },
  { value: 'magic-link', label: 'Magic link' },
  { value: 'oauth', label: 'OAuth (Google / GitHub / etc.)' },
]

const DB_OPTIONS: { value: DbChoice; label: string }[] = [
  { value: 'none', label: 'None — keep it client-side' },
  { value: 'supabase', label: 'Supabase' },
]

const auth = computed({
  get: () => wizard.data.backend.auth,
  set: (v: AuthChoice) => wizard.setStepData('backend', { auth: v }),
})

const database = computed({
  get: () => wizard.data.backend.database,
  set: (v: DbChoice) => wizard.setStepData('backend', { database: v }),
})

const storage = computed({
  get: () => wizard.data.backend.storage,
  set: (v: string) => wizard.setStepData('backend', { storage: v }),
})

const enabledDefaults = computed(() =>
  new Set(
    wizard.data.backend.constraints.filter((c) =>
      DEFAULT_CONSTRAINTS.includes(c)
    )
  )
)

const extrasText = computed({
  get: () =>
    wizard.data.backend.constraints
      .filter((c) => !DEFAULT_CONSTRAINTS.includes(c))
      .join('\n'),
  set: (v: string) => {
    const extras = v
      .split('\n')
      .map((l) => l.replace(/^[\s\-•*]+/, '').trimEnd())
    const last = extras[extras.length - 1]
    const cleaned = extras.slice(0, -1).filter((l) => l.length > 0)
    if (last !== undefined) cleaned.push(last)
    rebuildConstraints({ extras: cleaned })
  },
})

interface RebuildOpts {
  defaults?: Set<string>
  extras?: string[]
}

function rebuildConstraints(opts: RebuildOpts = {}) {
  const enabled = opts.defaults ?? enabledDefaults.value
  const extras =
    opts.extras ??
    wizard.data.backend.constraints.filter(
      (c) => !DEFAULT_CONSTRAINTS.includes(c)
    )
  const next = [
    ...DEFAULT_CONSTRAINTS.filter((c) => enabled.has(c)),
    ...extras.filter((l) => l.length > 0).map((l) => l.trim()),
  ]
  wizard.setStepData('backend', { constraints: next })
}

function toggleDefault(constraint: string, checked: boolean) {
  const next = new Set(enabledDefaults.value)
  if (checked) next.add(constraint)
  else next.delete(constraint)
  rebuildConstraints({ defaults: next })
}
</script>

<template>
  <StepContainer
    title="Backend & Constraints"
    blurb="Lovable handles plumbing well. Just point at what you want."
  >
    <div class="flex flex-col gap-1">
      <label
        for="backend-auth"
        class="text-sm font-semibold text-lovable-ink dark:text-slate-100"
      >
        Auth
      </label>
      <select
        id="backend-auth"
        v-model="auth"
        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
      >
        <option v-for="opt in AUTH_OPTIONS" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-1">
      <label
        for="backend-db"
        class="text-sm font-semibold text-lovable-ink dark:text-slate-100"
      >
        Database
      </label>
      <select
        id="backend-db"
        v-model="database"
        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-base text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
      >
        <option v-for="opt in DB_OPTIONS" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <UiTextarea
      v-model="storage"
      label="Storage"
      :rows="2"
      placeholder="What gets stored? (e.g. user avatars, PDF receipts) — or leave blank."
      helper="Only fill this if you need file uploads."
    />

    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold text-lovable-ink dark:text-slate-100">
        Constraints
      </span>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Pre-checked are sensible defaults. Toggle off anything you don't want.
      </p>
      <div class="flex flex-col gap-2">
        <label
          v-for="c in DEFAULT_CONSTRAINTS"
          :key="c"
          class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-lovable-ink transition hover:border-lovable-purple/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-lovable-pink/60"
        >
          <input
            type="checkbox"
            class="mt-0.5 h-4 w-4 rounded border-slate-300 text-lovable-purple focus:ring-lovable-purple/40 dark:border-slate-600 dark:bg-slate-800 dark:text-lovable-pink dark:focus:ring-lovable-pink/40"
            :checked="enabledDefaults.has(c)"
            @change="(e) => toggleDefault(c, (e.target as HTMLInputElement).checked)"
          />
          <span>{{ c }}</span>
        </label>
      </div>
      <UiTextarea
        v-model="extrasText"
        label="Anything else?"
        :rows="3"
        placeholder="One per line. e.g. 'Must work offline'&#10;'Loads in under 2s on 3G'"
        helper="Optional. Add specific rules of the road."
      />
    </div>
  </StepContainer>
</template>
