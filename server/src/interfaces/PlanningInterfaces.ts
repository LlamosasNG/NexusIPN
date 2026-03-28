// ============================================
// Interfaces para los atributos de creación
// de cada modelo hijo de Planning
// ============================================

// --- Sección 1: Datos Generales ---
export interface GeneralDataAttributes {
  academicUnit: string
  program: string
  learningUnit: string
  semester: string
  areaFormation: string
  modality: 'Escolarizada' | 'No escolarizada' | 'Mixta'
  unitType: string[]
  creditsTepic: number
  creditsSatca: number
  academy: string
  weeksPerSemester: number
  sessionsPerSemester: {
    classroom: number
    laboratory: number
    clinic: number
    other: number
    total: number
  }
  hoursPerSemester: {
    theory: number
    practice: number
    total1: number
    classroom: number
    laboratory: number
    clinic: number
    other: number
    total2: number
  }
  schoolPeriod: string
  groups: string[]
  teacherName: string
}

// --- Sección 2: Ejes Transversales ---
export interface TransversalAxisAttributes {
  antecedentes: string
  laterales: string
  subsecuentes: string
  socialCommitment: string
  genderPerspective: string
  internationalization: string
}

// --- Sección 3: Unidad Temática ---
export interface ThematicUnitAttributes {
  unitNumber: number
  learningUnit: string
  generalObjective: string
  learningStrategy: string
  teachingMethods: string
  name: string
  competenceObjective: string
  startDate: string
  endDate: string
  evaluationDate: string
  totalSessions: number
  precisions: string
}

// --- Sección 3 (hija): Actividad de Sesión ---
export interface SessionActivityAttributes {
  sessionNumber: string
  topics: string[]
  activityStart: string
  activityDevelopment: string
  activityClosure: string
  resources: string[]
  evidence: string
  evaluationPercentage: number
  evaluationInstrument: string
}

// --- Sección 4: Referencia ---
export interface ReferenceAttributes {
  text: string
  thematicUnits: boolean[]
  types: {
    B: boolean
    S: boolean
    I: boolean
    C: boolean
  }
}

// --- Sección 5: Herramienta de Plagio ---
export interface PlagiarismToolAttributes {
  selectedTool: 'ithenticate' | 'turnitin' | 'ninguna'
}
