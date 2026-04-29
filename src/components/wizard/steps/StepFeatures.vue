<script setup lang="ts">
import { computed, ref } from 'vue'
import StepContainer from '../StepContainer.vue'
import UiTextarea from '../../ui/UiTextarea.vue'
import UiButton from '../../ui/UiButton.vue'
import { useWizardStore } from '../../../stores/wizard'
import type { DataModelEntity, FeatureDef } from '../../../types/wizard'

const wizard = useWizardStore()

const skipDataModel = ref(false)

const featuresText = computed({
  get: () =>
    wizard.data.features.features.map((f) => f.description).join('\n'),
  set: (v: string) => {
    const lines = v
      .split('\n')
      .map((line) => line.replace(/^[\s\-•*]+/, '').trimEnd())
    const last = lines[lines.length - 1]
    const trimmed: string[] = lines.slice(0, -1).filter((l) => l.length > 0)
    if (last !== undefined) trimmed.push(last)
    const next: FeatureDef[] = trimmed.map((description) => ({ description }))
    wizard.setStepData('features', { features: next })
  },
})

const entities = computed(() => wizard.data.features.entities)

function commitEntities(next: DataModelEntity[]) {
  wizard.setStepData('features', { entities: next })
}

function addEntity() {
  skipDataModel.value = false
  commitEntities([...entities.value, { name: '', fields: '' }])
}

function removeEntity(idx: number) {
  const next = [...entities.value]
  next.splice(idx, 1)
  commitEntities(next)
}

function updateEntityName(idx: number, value: string) {
  const next = entities.value.map((e, i) =>
    i === idx ? { ...e, name: value } : e
  )
  commitEntities(next)
}

function updateEntityFields(idx: number, value: string) {
  const next = entities.value.map((e, i) =>
    i === idx ? { ...e, fields: value } : e
  )
  commitEntities(next)
}

function toggleSkip() {
  if (!skipDataModel.value) {
    commitEntities([])
  }
  skipDataModel.value = !skipDataModel.value
}

const showEntities = computed(
  () => !skipDataModel.value && entities.value.length > 0
)
</script>

<template>
  <StepContainer
    title="Features & Data"
    blurb="Three features beats thirty. Start with the ones that prove the idea."
  >
    <UiTextarea
      v-model="featuresText"
      label="Core features (MVP only)"
      :rows="6"
      placeholder="One per line. Aim for 3–5.&#10;e.g.&#10;Track expenses with quick-add&#10;Monthly budget by category&#10;Weekly recap email"
      helper="One feature per line. Skip the nice-to-haves — those come later."
    />

    <div class="flex flex-col gap-3">
      <div class="flex items-baseline justify-between gap-2">
        <span class="text-sm font-semibold text-lovable-ink dark:text-slate-100">
          Data model
        </span>
        <button
          type="button"
          class="text-xs font-medium text-lovable-violet underline-offset-2 hover:underline focus:outline-none focus-visible:underline dark:text-lovable-pink"
          @click="toggleSkip"
        >
          {{ skipDataModel ? 'Actually, let me sketch it' : 'Skip — I\'ll figure it out later' }}
        </button>
      </div>

      <p
        v-if="skipDataModel"
        class="rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        Skipped. Lovable will infer entities from the features above. Totally fair move.
      </p>

      <template v-else>
        <div
          v-for="(entity, idx) in entities"
          :key="idx"
          class="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-start"
        >
          <div class="flex flex-col gap-1 sm:w-44 sm:shrink-0">
            <label
              :for="`entity-name-${idx}`"
              class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Entity
            </label>
            <input
              :id="`entity-name-${idx}`"
              :value="entity.name"
              placeholder="Expense"
              class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
              @input="(e) => updateEntityName(idx, (e.target as HTMLInputElement).value)"
            />
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <label
              :for="`entity-fields-${idx}`"
              class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Fields
            </label>
            <input
              :id="`entity-fields-${idx}`"
              :value="entity.fields"
              placeholder="amount, category, note, date"
              class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-lovable-ink transition focus:border-lovable-purple focus:outline-none focus:ring-2 focus:ring-lovable-purple/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-lovable-pink dark:focus:ring-lovable-pink/30"
              @input="(e) => updateEntityFields(idx, (e.target as HTMLInputElement).value)"
            />
          </div>
          <div class="sm:pt-5">
            <button
              type="button"
              class="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm text-slate-500 transition hover:border-rose-300 hover:text-rose-500 dark:border-slate-700 dark:text-slate-400"
              :aria-label="`Remove entity row ${idx + 1}`"
              @click="removeEntity(idx)"
            >
              Remove
            </button>
          </div>
        </div>

        <p
          v-if="!showEntities"
          class="rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
        >
          No entities yet. Add the things your app actually stores — users, posts, tasks, whatever.
        </p>

        <div>
          <UiButton variant="secondary" size="sm" @click="addEntity">
            + Add an entity
          </UiButton>
        </div>
      </template>
    </div>
  </StepContainer>
</template>
