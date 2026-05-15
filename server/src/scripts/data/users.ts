/**
 * Códigos de materias
 * Morfología: M-101, M-102, M-103, M-201
 * Fisiológicas: F-101, F-201, F-202
 * Ambiente y Salud Pública: ASP-101, ASP-102, ASP-201, ASP-202, ASP-103, ASP-104, ASP-105, ASP-106, ASP-107
 * Terapeútica Homepática: TH-101, TH-201, TH-102
 * Clínicas: C-101, C-102, C-103
 */

export const users = [
  {
    name: "Juan Pérez García",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!", // Se hasheará en el seed
    academyId: 2, // Academia de Homeopatía
    role: "Docente" as const,
    confirmed: true,
    subjectCodes: ["TH-101", "TH-201", "TH-102"], // Materias que imparte
  },
  {
    name: "María López Hernández",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: 5, // Academia de Ciencias Básicas
    role: "Docente" as const,
    confirmed: true,
    subjectCodes: ["M-101", "M-102", "M-103", "M-201"],
  },
  {
    name: "Carlos Rodríguez Sánchez",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: 3, // Academia de Acupuntura y Rehabilitación
    role: "Docente" as const,
    confirmed: true,
    subjectCodes: ["M-101", "M-102", "M-103", "M-201"],
  },
  {
    name: "Ana Martínez Torres",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: 4, // Academia de Optometría
    role: "Docente" as const,
    confirmed: true,
    subjectCodes: ["M-101", "M-102", "M-103", "M-201"],
  },
  {
    name: "Luis González Ramírez",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: 1, // Academia de Medicina Tradicional y Herbolaria
    role: "Docente" as const,
    confirmed: true,
    subjectCodes: ["M-101", "M-102", "M-103", "M-201"],
  },
  {
    name: "Super Admin",
    email: "super_admin.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: null,
    role: "Administrador" as const,
    confirmed: true,
  },
  {
    name: "Jefe de Departamento",
    email: "usuario.demo@example.edu.mx",
    password: "ChangeMeDemo-2026!",
    academyId: null,
    role: "Jefe de Departamento" as const,
    confirmed: true,
  },
];
