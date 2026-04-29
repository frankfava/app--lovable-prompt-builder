import type { WizardData } from '../../types/wizard'
import { EMPTY_WIZARD_DATA } from '../../types/wizard'

export const emptyData: WizardData = EMPTY_WIZARD_DATA

export const partialData: WizardData = {
  ...EMPTY_WIZARD_DATA,
  basics: {
    appType: 'personal finance app',
    appName: 'Drift',
    purpose:
      'A budgeting app for Gen Z freelancers with irregular income. The core job is making variable monthly income feel predictable.',
    targetUser: '',
  },
  design: {
    ...EMPTY_WIZARD_DATA.design,
    styles: ['bold', 'editorial'],
    moods: ['confident', 'warm'],
  },
}

export const fullData: WizardData = {
  basics: {
    appType: 'personal finance app',
    appName: 'Drift',
    purpose:
      'A budgeting app for Gen Z freelancers with irregular income. The core job is making variable monthly income feel predictable.',
    targetUser: 'Gen Z freelancers tracking irregular income',
  },
  design: {
    styles: ['bold', 'expressive', 'editorial'],
    moods: ['confident', 'warm'],
    colors: 'off-white #FAF8F3, deep green #1F3D2B, coral accent #F26B5E',
    typography: 'serif headlines, sans-serif body',
    layout: 'top nav, full-width hero, generous whitespace',
    inspiration: "Monzo's clarity meets Are.na's editorial feel",
  },
  pages: {
    pages: [
      { path: '/', description: 'Hero, 3-feature grid, testimonial, pricing, CTA' },
      {
        path: '/dashboard',
        description: 'Income smoothing graph, category spend, upcoming bills',
      },
    ],
  },
  features: {
    features: [
      { description: 'Connect bank account (mock for now)' },
      { description: 'Auto-categorize transactions' },
      {
        description:
          '"Smoothed income" view that averages variable freelance income across 90 days',
      },
    ],
    entities: [
      { name: 'Account', fields: 'id, name, balance, type' },
      { name: 'Transaction', fields: 'id, account_id, amount, category, date' },
    ],
  },
  backend: {
    auth: 'magic-link',
    database: 'supabase',
    storage: 'avatars only',
    constraints: [
      'Mobile-first responsive across all breakpoints',
      'Use modern UI/UX best practices',
      'Keep components modular and reusable',
    ],
  },
  final: {
    whatToDoFirst:
      "Before writing any code, ask me clarifying questions about the dashboard layout and the smoothed-income calculation. Then propose a build order. I'll confirm before you start.",
  },
}
