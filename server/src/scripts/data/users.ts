export const users = [
  {
    name: 'Juan Pérez García',
    email: 'usuario.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!', // Se hasheará en el seed
    academyId: 2, // Academia de Homeopatía
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['MMH-201', 'FH-202', 'REP-203'], // Materias que imparte
  },
  {
    name: 'María López Hernández',
    email: 'usuario.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 5, // Academia de Ciencias Básicas
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['AH-501', 'FIS-502', 'BQ-503'],
  },
  {
    name: 'Carlos Rodríguez Sánchez',
    email: 'usuario.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 3, // Academia de Acupuntura y Rehabilitación
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['ATC-301', 'MTC-302', 'RF-303'],
  },
  {
    name: 'Ana Martínez Torres',
    email: 'usuario.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 4, // Academia de Optometría
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['OC-401', 'RO-402', 'PO-403'],
  },
  {
    name: 'Luis González Ramírez',
    email: 'usuario.demo@example.edu.mx',
    password: 'ChangeMeDemo-2026!',
    academyId: 1, // Academia de Medicina Tradicional y Herbolaria
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['HM-101', 'FC-102', 'BM-103'],
  },
  {
    name: 'Admin Sistema',
    email: 'admin.demo@example.edu.mx',
    password: 'admin123',
    academyId: null,
    role: 'Academia' as const,
    confirmed: true,
    subjectCodes: [], // Admin no tiene materias asignadas
  },
]
