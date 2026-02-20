// 1. Datos Generales (Sección 1 del PDF)
export interface GeneralData {
  academicUnit: string // "Escuela Superior de Cómputo (ESCOM)"
  program: string // "Ingeniería en Sistemas Computacionales/2020"
  learningUnit: string // "Sistemas Operativos"
  areaFormation: string // "Ciencias de la Computación"
  semester: string // "IV"
  modality: 'escolarizada' | 'no_escolarizada' | 'mixta'
  type:
    | 'teórica'
    | 'práctica'
    | 'teórico_práctica'
    | 'clínica'
    | 'obligatoria'
    | 'optativa'
    | 'tópicos_selectos'
    | 'otro'
  credits: {
    tepic: number // 7.5
    satca: number // 6.3
  }
  weeksPerSemester: number // 16
  sessionsPerSemester: {
    classroom: number // 8
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
  period: string // "25/2"
  groups: string[] // ["4CV1", "4CV2"]
}

// 2. Ejes Transversales (Sección 2.2 del PDF)
export interface TransversalAxes {
  social_commitment: string // Compromiso social y sustentabilidad
  gender_perspective: string // Perspectiva de género...
  internationalization: string // Internacionalización
}

// 3. Detalle de la Unidad Temática (Sección 3 del PDF)
export interface ThematicUnit {
  number: number // I, II, III
  name: string // "Estructura de un sistema operativo"
  objective: string // "Identifica los sistemas..."

  // Fechas importantes de la unidad
  schedule: {
    startDate: string // YYYY-MM-DD
    endDate: string
    evaluationDate: string
    totalSessions: number
  }

  // La tabla de sesiones (Sección 3.12 - 3.18)
  sessions: SessionActivity[]
}

// Fila de la tabla de sesiones
export interface SessionActivity {
  sessionNumber: string // "1" o "3-4"
  topics: string[] // ["1.1 Aspectos básicos...", "1.1.1 Objetivos"]
  activities: {
    start: string // "Bienvenida a la materia..."
    development: string // "Presentación del docente..."
    closure: string // "Aclaración de dudas..."
  }
  resources: string[] // ["Proyector", "PDF"]
  evidence: string // "Mapa conceptual"
  evaluationPercentage: number // 5, 10, etc.
  evaluationInstrument: string // "Rúbrica", "Lista de cotejo"
}

// 4. Bibliografía (Sección 4 del PDF)
export interface Reference {
  text: string // La cita en formato APA
  type: 'Básica' | 'Complementaria'
}

// --- INTERFAZ MAESTRA ---
// Esta es la que usarás en tu Modelo y Controlador
export interface PlanningContent {
  generalData: GeneralData
  transversalAxes: TransversalAxes
  units: ThematicUnit[]
  references: Reference[]
}
