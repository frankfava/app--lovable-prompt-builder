<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '../ui/UiButton.vue'
import { useWizardStore } from '../../stores/wizard'
import { renderPrompt } from '../../lib/promptEngine'

const wizard = useWizardStore()
const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

async function handleCopy() {
  const stripped = renderPrompt(wizard.data, { stripMarkers: true })

  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(stripped)
    } else {
      // Fallback for older browsers or insecure contexts
      fallbackCopy(stripped)
    }

    // Show "Copied!" feedback
    copied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
    // Try fallback if clipboard API fails
    try {
      fallbackCopy(stripped)
      copied.value = true
      if (copyTimeout) clearTimeout(copyTimeout)
      copyTimeout = setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (fallbackErr) {
      console.error('Fallback copy also failed:', fallbackErr)
      alert('Failed to copy. Please try again or copy manually from the preview pane.')
    }
  }
}

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}
</script>

<template>
  <UiButton
    variant="primary"
    size="md"
    @click="handleCopy"
    :disabled="copied"
  >
    <span v-if="copied">
      ✓ Copied!
    </span>
    <span v-else>
      Copy prompt
    </span>
  </UiButton>
</template>
