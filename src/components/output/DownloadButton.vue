<script setup lang="ts">
import UiButton from '../ui/UiButton.vue'
import { useWizardStore } from '../../stores/wizard'
import { renderPrompt } from '../../lib/promptEngine'

const wizard = useWizardStore()

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-+|-+$/g, '') // Trim dashes from start/end
}

function handleDownload() {
  const stripped = renderPrompt(wizard.data, { stripMarkers: true })
  const appName = wizard.data.basics.appName.trim()

  // Slug the app name, fallback to generic name if empty
  const filename = appName
    ? `${slugify(appName)}-lovable-prompt.md`
    : 'lovable-prompt.md'

  // Create blob and trigger download
  const blob = new Blob([stripped], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <UiButton
    variant="secondary"
    size="md"
    @click="handleDownload"
  >
    Download prompt
  </UiButton>
</template>
