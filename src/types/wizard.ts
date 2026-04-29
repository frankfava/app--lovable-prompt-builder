export type StepId =
  | 'basics'
  | 'design'
  | 'pages'
  | 'features'
  | 'backend'
  | 'final'

export type StyleBuzzword =
  | 'minimal'
  | 'bold'
  | 'premium'
  | 'playful'
  | 'editorial'
  | 'brutalist'
  | 'expressive'
  | 'cinematic'
  | 'developer-focused'

export type MoodBuzzword = 'calm' | 'energetic' | 'serious' | 'fun' | 'warm' | 'confident'

export type AuthChoice = 'none' | 'email-password' | 'magic-link' | 'oauth'
export type DbChoice = 'none' | 'supabase'

export interface BasicsData {
  appType: string
  appName: string
  purpose: string
  targetUser: string
}

export interface DesignData {
  styles: StyleBuzzword[]
  moods: MoodBuzzword[]
  colors: string
  typography: string
  layout: string
  inspiration: string
}

export interface PageDef {
  path: string
  description: string
}

export interface PagesData {
  pages: PageDef[]
}

export interface FeatureDef {
  description: string
}

export interface DataModelEntity {
  name: string
  fields: string
}

export interface FeaturesData {
  features: FeatureDef[]
  entities: DataModelEntity[]
}

export interface BackendData {
  auth: AuthChoice
  database: DbChoice
  storage: string
  constraints: string[]
}

export interface FinalData {
  whatToDoFirst: string
}

export interface WizardData {
  basics: BasicsData
  design: DesignData
  pages: PagesData
  features: FeaturesData
  backend: BackendData
  final: FinalData
}

export type StepDataMap = {
  basics: BasicsData
  design: DesignData
  pages: PagesData
  features: FeaturesData
  backend: BackendData
  final: FinalData
}

export interface WizardStep {
  id: StepId
  title: string
  blurb: string
  defaults: StepDataMap[StepId]
}

export const DEFAULT_CONSTRAINTS: string[] = [
  'Mobile-first responsive across all breakpoints',
  'Use modern UI/UX best practices',
  'Keep components modular and reusable',
]

export const DEFAULT_WHAT_TO_DO_FIRST = `Before writing any code, ask me any clarifying questions you need to fully understand the design direction, user flow, and data model. Then propose a build order. I'll confirm before you start.`

export const EMPTY_WIZARD_DATA: WizardData = {
  basics: { appType: '', appName: '', purpose: '', targetUser: '' },
  design: {
    styles: [],
    moods: [],
    colors: '',
    typography: '',
    layout: '',
    inspiration: '',
  },
  pages: { pages: [] },
  features: { features: [], entities: [] },
  backend: {
    auth: 'none',
    database: 'none',
    storage: '',
    constraints: [...DEFAULT_CONSTRAINTS],
  },
  final: { whatToDoFirst: DEFAULT_WHAT_TO_DO_FIRST },
}

export const STEP_SKIP_DEFAULTS: WizardData = {
  basics: {
    appType: 'web app',
    appName: '',
    purpose: '',
    targetUser: '',
  },
  design: {
    styles: ['minimal'],
    moods: ['confident'],
    colors: '',
    typography: 'Sans-serif everywhere',
    layout: 'Top nav',
    inspiration: '',
  },
  pages: {
    pages: [
      {
        path: '/',
        description: 'Landing page with hero, features, pricing, CTA',
      },
    ],
  },
  features: { features: [], entities: [] },
  backend: {
    auth: 'none',
    database: 'none',
    storage: '',
    constraints: [...DEFAULT_CONSTRAINTS],
  },
  final: { whatToDoFirst: DEFAULT_WHAT_TO_DO_FIRST },
}
