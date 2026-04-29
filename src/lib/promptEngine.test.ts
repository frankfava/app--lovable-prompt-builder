import { describe, it, expect } from 'vitest'
import { renderPrompt, parseMarkedRegions, SECTION_IDS } from './promptEngine'
import {
  emptyData,
  partialData,
  fullData,
} from './__fixtures__/promptEngine.examples'

describe('renderPrompt', () => {
  it('always renders header and what-to-do-first, even on empty data', () => {
    const out = renderPrompt(emptyData)
    expect(out).toMatch(/<!-- section:header:start -->/)
    expect(out).toMatch(/<!-- section:what-to-do-first:start -->/)
    expect(out).not.toMatch(/<!-- section:purpose:start -->/)
    expect(out).not.toMatch(/<!-- section:design-direction:start -->/)
  })

  it('skips empty sections in partial data but keeps filled ones', () => {
    const out = renderPrompt(partialData)
    expect(out).toMatch(/<!-- section:header:start -->/)
    expect(out).toMatch(/<!-- section:purpose:start -->/)
    expect(out).toMatch(/<!-- section:design-direction:start -->/)
    expect(out).not.toMatch(/<!-- section:target-user:start -->/)
    expect(out).not.toMatch(/<!-- section:pages:start -->/)
  })

  it('renders all expected sections for full data', () => {
    const out = renderPrompt(fullData)
    for (const id of SECTION_IDS) {
      expect(out).toContain(`<!-- section:${id}:start -->`)
      expect(out).toContain(`<!-- section:${id}:end -->`)
    }
  })

  it('strips markers when stripMarkers: true', () => {
    const out = renderPrompt(fullData, { stripMarkers: true })
    expect(out).not.toContain('<!-- section:')
    expect(out).toContain('## Purpose')
    expect(out).toContain('## Design Direction')
    expect(out).toContain('## What to do first')
  })

  it('is idempotent: same input yields identical output across calls', () => {
    const a = renderPrompt(fullData)
    const b = renderPrompt(fullData)
    expect(a).toBe(b)
  })

  it('places exactly one blank line between sections in stripMarkers output', () => {
    const out = renderPrompt(fullData, { stripMarkers: true })
    expect(out).not.toMatch(/\n{3,}/)
    expect(out).toMatch(/## Purpose[\s\S]*?\n\n## Target User/)
  })

  it('produces no orphan or duplicate markers', () => {
    const out = renderPrompt(fullData)
    const startCount = (out.match(/<!-- section:[a-z-]+:start -->/g) ?? []).length
    const endCount = (out.match(/<!-- section:[a-z-]+:end -->/g) ?? []).length
    expect(startCount).toBe(endCount)
    expect(startCount).toBe(SECTION_IDS.length)
  })
})

describe('parseMarkedRegions', () => {
  it('locates each section in a rendered prompt', () => {
    const out = renderPrompt(fullData)
    const regions = parseMarkedRegions(out)
    for (const id of SECTION_IDS) {
      expect(regions[id]).toBeDefined()
      expect(regions[id].body.length).toBeGreaterThan(0)
    }
  })
})
