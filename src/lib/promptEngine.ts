import type { WizardData } from '../types/wizard'

export type SectionId =
  | 'header'
  | 'purpose'
  | 'target-user'
  | 'design-direction'
  | 'pages'
  | 'core-features'
  | 'data-model'
  | 'backend'
  | 'constraints'
  | 'what-to-do-first'

interface SectionDef {
  id: SectionId
  alwaysOn?: boolean
  build: (data: WizardData) => string
}

function startMarker(id: SectionId): string {
  return `<!-- section:${id}:start -->`
}

function endMarker(id: SectionId): string {
  return `<!-- section:${id}:end -->`
}

function joinSections(blocks: string[]): string {
  return blocks.filter((b) => b.trim().length > 0).join('\n\n')
}

const SECTIONS: readonly SectionDef[] = [
  {
    id: 'header',
    alwaysOn: true,
    build: ({ basics }) => {
      const appType = basics.appType.trim() || '[type of app]'
      const appName = basics.appName.trim() || '[App Name]'
      return `Build a ${appType} called **${appName}**.`
    },
  },
  {
    id: 'purpose',
    build: ({ basics }) => {
      const purpose = basics.purpose.trim()
      if (!purpose) return ''
      return `## Purpose\n${purpose}`
    },
  },
  {
    id: 'target-user',
    build: ({ basics }) => {
      const target = basics.targetUser.trim()
      if (!target) return ''
      return `## Target User\n${target}`
    },
  },
  {
    id: 'design-direction',
    build: ({ design }) => {
      const lines: string[] = []
      if (design.styles.length > 0) {
        lines.push(`- Style: ${design.styles.join(' / ')}`)
      }
      if (design.moods.length > 0) {
        lines.push(`- Mood: ${design.moods.join(' / ')}`)
      }
      if (design.colors.trim()) lines.push(`- Colors: ${design.colors.trim()}`)
      if (design.typography.trim())
        lines.push(`- Typography: ${design.typography.trim()}`)
      if (design.layout.trim()) lines.push(`- Layout: ${design.layout.trim()}`)
      if (design.inspiration.trim())
        lines.push(`- Inspiration: ${design.inspiration.trim()}`)
      if (lines.length === 0) return ''
      return `## Design Direction\n${lines.join('\n')}`
    },
  },
  {
    id: 'pages',
    build: ({ pages }) => {
      const items = pages.pages.filter((p) => p.path.trim() || p.description.trim())
      if (items.length === 0) return ''
      const body = items
        .map((p, i) => {
          const path = p.path.trim() || '/'
          const desc = p.description.trim()
          return desc ? `${i + 1}. \`${path}\` — ${desc}` : `${i + 1}. \`${path}\``
        })
        .join('\n')
      return `## Pages & Routes\n${body}`
    },
  },
  {
    id: 'core-features',
    build: ({ features }) => {
      const items = features.features.filter((f) => f.description.trim())
      if (items.length === 0) return ''
      const body = items.map((f) => `- ${f.description.trim()}`).join('\n')
      return `## Core Features (MVP only)\n${body}`
    },
  },
  {
    id: 'data-model',
    build: ({ features }) => {
      const items = features.entities.filter((e) => e.name.trim())
      if (items.length === 0) return ''
      const body = items
        .map((e) => `- **${e.name.trim()}**: ${e.fields.trim() || '[fields]'}`)
        .join('\n')
      return `## Data Model\n${body}`
    },
  },
  {
    id: 'backend',
    build: ({ backend }) => {
      const lines: string[] = []
      if (backend.auth !== 'none') {
        const label =
          backend.auth === 'email-password'
            ? 'email + password'
            : backend.auth === 'magic-link'
            ? 'magic link'
            : 'OAuth'
        lines.push(`- Auth: ${label}`)
      } else {
        lines.push(`- Auth: none for now`)
      }
      lines.push(
        `- Database: ${backend.database === 'supabase' ? 'Supabase' : 'none'}`
      )
      if (backend.storage.trim()) {
        lines.push(`- Storage: ${backend.storage.trim()}`)
      }
      return `## Backend\n${lines.join('\n')}`
    },
  },
  {
    id: 'constraints',
    build: ({ backend }) => {
      const items = backend.constraints.map((c) => c.trim()).filter(Boolean)
      if (items.length === 0) return ''
      const body = items.map((c) => `- ${c}`).join('\n')
      return `## Constraints\n${body}`
    },
  },
  {
    id: 'what-to-do-first',
    alwaysOn: true,
    build: ({ final }) => {
      const text = final.whatToDoFirst.trim()
      return `## What to do first\n${text}`
    },
  },
]

export interface RenderOptions {
  stripMarkers?: boolean
}

export function renderSection(id: SectionId, data: WizardData): string {
  const def = SECTIONS.find((s) => s.id === id)
  if (!def) return ''
  return def.build(data).trim()
}

export function renderPrompt(data: WizardData, opts: RenderOptions = {}): string {
  const stripMarkers = opts.stripMarkers ?? false
  const blocks: string[] = []

  for (const section of SECTIONS) {
    const body = section.build(data).trim()
    if (!body && !section.alwaysOn) continue

    if (stripMarkers) {
      blocks.push(body)
    } else {
      blocks.push(`${startMarker(section.id)}\n${body}\n${endMarker(section.id)}`)
    }
  }

  return joinSections(blocks).trim() + '\n'
}

export interface ParsedRegion {
  id: SectionId
  start: number
  end: number
  body: string
}

export type RegionMap = Record<string, ParsedRegion>

export function parseMarkedRegions(prompt: string): RegionMap {
  const map: RegionMap = {}
  const re = /<!-- section:([a-z-]+):start -->([\s\S]*?)<!-- section:\1:end -->/g
  let match: RegExpExecArray | null
  while ((match = re.exec(prompt)) !== null) {
    const id = match[1] as SectionId
    map[id] = {
      id,
      start: match.index,
      end: match.index + match[0].length,
      body: match[2].trim(),
    }
  }
  return map
}

export const SECTION_IDS: readonly SectionId[] = SECTIONS.map((s) => s.id)
