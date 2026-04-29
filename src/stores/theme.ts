import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'lpb:theme'
type Theme = 'light' | 'dark'

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(readInitial())
  apply(theme.value)

  watch(theme, (next) => {
    apply(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function set(next: Theme) {
    theme.value = next
  }

  return { theme, toggle, set }
})
