export const users = [
  {
    name: 'Juan Pérez García',
    email: 'juan.perez@ipn.mx',
    password: 'password123', // Se hasheará en el seed
    academyId: 2, // Academia de Homeopatía
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['MMH-201', 'FH-202', 'REP-203'], // Materias que imparte
  },
  {
    name: 'María López Hernández',
    email: 'maria.lopez@ipn.mx',
    password: 'password123',
    academyId: 5, // Academia de Ciencias Básicas
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['AH-501', 'FIS-502', 'BQ-503'],
  },
  {
    name: 'Carlos Rodríguez Sánchez',
    email: 'carlos.rodriguez@ipn.mx',
    password: 'password123',
    academyId: 3, // Academia de Acupuntura y Rehabilitación
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['ATC-301', 'MTC-302', 'RF-303'],
  },
  {
    name: 'Ana Martínez Torres',
    email: 'ana.martinez@ipn.mx',
    password: 'password123',
    academyId: 4, // Academia de Optometría
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['OC-401', 'RO-402', 'PO-403'],
  },
  {
    name: 'Luis González Ramírez',
    email: 'luis.gonzalez@ipn.mx',
    password: 'password123',
    academyId: 1, // Academia de Medicina Tradicional y Herbolaria
    role: 'Docente' as const,
    confirmed: true,
    subjectCodes: ['HM-101', 'FC-102', 'BM-103'],
  },
  {
    name: 'Admin Sistema',
    email: 'admin@ipn.mx',
    password: 'admin123',
    academyId: null,
    role: 'Academia' as const,
    confirmed: true,
    subjectCodes: [], // Admin no tiene materias asignadas
  },
]
