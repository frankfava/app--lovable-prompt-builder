<script setup lang="ts">
import { computed } from 'vue'
import UiButton from '../ui/UiButton.vue'
import { useWizardStore } from '../../stores/wizard'
import { renderPrompt } from '../../lib/promptEngine'

const wizard = useWizardStore()

const stripped = computed(() => renderPrompt(wizard.data, { stripMarkers: true }))

const encodedLength = computed(() => {
  return encodeURIComponent(stripped.value).length
})

const hasWarning = computed(() => encodedLength.value > 8000)
const isBlocked = computed(() => encodedLength.value > 50000)

const warningMessage = computed(() => {
  if (isBlocked.value) {
    return 'Your prompt is over Lovable\'s 50k character limit. Trim a section.'
  }
  if (hasWarning.value) {
    return 'Heads up: this URL is long — some browsers may truncate. Try Copy instead if anything looks off.'
  }
  return ''
})

function handleClick() {
  if (isBlocked.value) {
    alert(warningMessage.value)
    return
  }

  if (hasWarning.value && !confirm(warningMessage.value + '\n\nContinue anyway?')) {
    return
  }

  // Construct the URL synchronously (no async, so pop-up blockers don't interfere)
  const url = `https://lovable.dev/?autosubmit=true#prompt=${encodeURIComponent(stripped.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <UiButton
    variant="primary"
    size="md"
    :disabled="isBlocked"
    @click="handleClick"
  >
    Build with Lovable
  </UiButton>
</template>
