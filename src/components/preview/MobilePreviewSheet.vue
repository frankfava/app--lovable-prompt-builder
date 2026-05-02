<script setup lang="ts">
import { computed, ref } from 'vue'
import PreviewPane from './PreviewPane.vue'
import { useWizardStore } from '../../stores/wizard'
import { renderPrompt } from '../../lib/promptEngine'

const wizard = useWizardStore()
const isOpen = ref(false)

const isEmptyShape = computed(() => {
  const b = wizard.data.basics
  return (
    !b.appType.trim() &&
    !b.appName.trim() &&
    !b.purpose.trim() &&
    !b.targetUser.trim() &&
    wizard.data.design.styles.length === 0 &&
    wizard.data.design.moods.length === 0 &&
    wizard.data.pages.pages.length === 0 &&
    wizard.data.features.features.length === 0
  )
})

const charCount = computed(() =>
  isEmptyShape.value ? 0 : renderPrompt(wizard.data, { stripMarkers: true }).length
)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

const DISMISS_THRESHOLD = 120

const dragY = ref(0)
const dragStartY = ref<number | null>(null)
const dragging = ref(false)

function onPointerDown(e: PointerEvent) {
  dragStartY.value = e.clientY
  dragY.value = 0
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (dragStartY.value === null) return
  const delta = e.clientY - dragStartY.value
  dragY.value = Math.max(0, delta)
}

function onPointerEnd(e: PointerEvent) {
  if (dragStartY.value === null) return
  const target = e.currentTarget as HTMLElement
  if (target.hasPointerCapture(e.pointerId)) {
    target.releasePointerCapture(e.pointerId)
  }
  if (dragY.value > DISMISS_THRESHOLD) {
    close()
  }
  dragStartY.value = null
  dragging.value = false
  dragY.value = 0
}
</script>

<template>
  <button
    type="button"
    @click="open"
    class="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-lovable-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-lovable md:hidden"
    aria-label="Open prompt preview"
  >
    <span aria-hidden="true">✨</span>
    Preview
    <span class="rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-bold tabular-nums">
      {{ charCount.toLocaleString() }}
    </span>
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Live prompt preview"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          leave-active-class="transition duration-200 ease-in"
          enter-from-class="translate-y-full"
          leave-to-class="translate-y-full"
          appear
        >
          <div
            v-if="isOpen"
            class="absolute inset-x-0 bottom-0 top-10 flex flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl dark:bg-lovable-midnight"
            :style="{
              transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
              transition: dragging ? 'none' : undefined,
            }"
          >
            <div
              class="flex cursor-grab items-center justify-center pt-2 pb-1 touch-none select-none active:cursor-grabbing"
              @pointerdown="onPointerDown"
              @pointermove="onPointerMove"
              @pointerup="onPointerEnd"
              @pointercancel="onPointerEnd"
              aria-hidden="true"
            >
              <div class="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
            <div class="flex-1 overflow-y-auto">
              <PreviewPane />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
