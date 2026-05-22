/**
 * Códigos de materias
 * Morfología (academyId 1): M-101, M-102, M-103, M-201
 * Terapeútica Homeopática (academyId 2): TH-101, TH-201, TH-102
 * Ambiente y Salud Pública (academyId 3): ASP-101, ASP-102, ASP-201, ASP-202, ASP-103, ASP-104, ASP-105, ASP-106, ASP-107
 * Fisiológicas (academyId 4): F-101, F-201, F-202
 * Clínicas (academyId 5): C-101, C-102, C-103
 */

export const users = [
  {
    name: 'Docente Demo Morfología',
    email: 'docente.morfologia.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1, // Academia de Morfología
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['M-101', 'M-102', 'M-103', 'M-201'],
  },
  {
    name: 'Docente Demo Terapéutica',
    email: 'docente.terapeutica.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 2, // Academia de Terapeútica Homeopática
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['TH-101', 'TH-201', 'TH-102'],
  },
  {
    name: 'Docente Demo Morfología 2',
    email: 'docente.morfologia2.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1, // Academia de Morfología
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['M-101', 'M-102', 'M-103', 'M-201'],
  },
  {
    name: 'Docente Demo Terapéutica 2',
    email: 'docente.terapeutica2.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 2, // Academia de Terapeútica Homeopática
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['TH-101', 'TH-201', 'TH-102'],
  },
  {
    name: 'Docente Demo Morfología 3',
    email: 'docente.morfologia3.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1, // Academia de Morfología
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['M-101', 'M-102', 'M-103', 'M-201'],
  },
  {
    name: 'Administrador',
    email: 'admin.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: null,
    role: 'Administrador' as const,
    confirmed: true,
  },
  {
    name: 'Jefe Demo Morfología',
    email: 'jefe.morfologia.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1,
    role: 'Jefe de Departamento' as const,
    confirmed: true,
  },
  {
    name: 'Jefe Demo Terapéutica',
    email: 'jefe.terapeutica.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 2,
    role: 'Jefe de Departamento' as const,
    confirmed: true,
  },
]
