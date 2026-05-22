export type SeedUserRole =
  | 'Docente'
  | 'Jefe de Departamento'
  | 'Academia'
  | 'Administrador'

export type SeedUser = {
  name: string
  email: string
  password: string
  academyId: number | null
  role: SeedUserRole
  confirmed: boolean
  subjectCodes?: string[]
}

// Datos ficticios para desarrollo. Los usuarios reales deben cargarse desde
// SEED_USERS_FILE o SEED_USERS_JSON_BASE64, no desde archivos versionados.
export const users: SeedUser[] = [
  {
    name: 'Docente Demo Morfología',
    email: 'docente.morfologia.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1,
    role: 'Docente',
    confirmed: true,
    subjectCodes: ['M-101', 'M-102', 'M-103', 'M-201'],
  },
  {
    name: 'Docente Demo Terapéutica',
    email: 'docente.terapeutica.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 2,
    role: 'Docente',
    confirmed: true,
    subjectCodes: ['TH-101', 'TH-201', 'TH-102'],
  },
  {
    name: 'Docente Demo Salud Pública',
    email: 'docente.salud.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 3,
    role: 'Docente',
    confirmed: true,
    subjectCodes: ['ASP-101', 'ASP-102', 'ASP-201'],
  },
  {
    name: 'Docente Demo Fisiológicas',
    email: 'docente.fisiologicas.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 4,
    role: 'Docente',
    confirmed: true,
    subjectCodes: ['F-101', 'F-201', 'F-202'],
  },
  {
    name: 'Docente Demo Clínicas',
    email: 'docente.clinicas.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 5,
    role: 'Docente',
    confirmed: true,
    subjectCodes: ['C-101', 'C-102', 'C-103'],
  },
  {
    name: 'Administrador Demo',
    email: 'admin.demo@example.edu.mx',
    password: 'ChangeMeAdmin-2026!',
    academyId: null,
    role: 'Administrador',
    confirmed: true,
  },
  {
    name: 'Jefe Demo Morfología',
    email: 'jefe.morfologia.demo@example.edu.mx',
    password: 'ChangeMeHead-2026!',
    academyId: 1,
    role: 'Jefe de Departamento',
    confirmed: true,
  },
  {
    name: 'Jefe Demo Terapéutica',
    email: 'jefe.terapeutica.demo@example.edu.mx',
    password: 'ChangeMeHead-2026!',
    academyId: 2,
    role: 'Jefe de Departamento',
    confirmed: true,
  },
]
