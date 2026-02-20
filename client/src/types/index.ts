import { z } from 'zod'

/** Academies */
const UserSubjectSchema = z.object({
  period: z.string(),
  active: z.boolean(),
})

export const AcademySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

/** Subjects */
export const SubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  UserSubject: UserSubjectSchema,
})
export type Subject = z.infer<typeof SubjectSchema>

/** Authentication and Users */
export const AuthSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
})
type Auth = z.infer<typeof AuthSchema>
export type LoginFormValues = Pick<Auth, 'email' | 'password'>
export type RegisterFormValues = Pick<
  Auth,
  'name' | 'email' | 'password' | 'password_confirmation'
>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestNewCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export const UserSchema = AuthSchema.pick({ name: true, email: true }).extend({
  id: z.number(),
  role: z.string(),
  academy: AcademySchema,
  subjects: z.array(
    SubjectSchema.pick({ id: true, name: true, UserSubject: true })
  ),
})
export type User = z.infer<typeof UserSchema>

/** Planning */
export const modalitiesSchema = z.enum([
  'Escolarizada',
  'No escolarizada',
  'Mixta',
])
export const typesSchema = z.enum([
  'Teórica',
  'Práctica',
  'Teórico-Práctica',
  'Clínica',
  'Obligatoria',
  'Optativa',
  'Tópicos Selectos',
  'Otro',
])
export const GeneralDataSchema = z.object({
  academicUnit: z.string(),
  program: z.string(),
  learningUnit: z.string(),
  areaFormation: z.string(),
  semester: z.string(),

  // Modalidad y tipo
  modality: modalitiesSchema,
  type: typesSchema,

  // Objetos anidados con coerción numérica
  credits: z.object({
    tepic: z.coerce.number(),
    satca: z.coerce.number(),
  }),
  academy: AcademySchema.pick({ id: true, name: true }),

  weeksPerSemester: z.coerce.number().int(),

  sessionsPerSemester: z.object({
    classroom: z.coerce.number(),
    laboratory: z.coerce.number(),
    clinic: z.coerce.number(),
    other: z.coerce.number(),
    total: z.coerce.number(),
  }),

  hoursPerSemester: z.object({
    theory: z.coerce.number(),
    practice: z.coerce.number(),
    total1: z.coerce.number(), // Total de Teoría + Práctica
    classroom: z.coerce.number(),
    laboratory: z.coerce.number(),
    clinic: z.coerce.number(),
    other: z.coerce.number(),
    total2: z.coerce.number(), // Total de horas presenciales
  }),

  period: z.string(),

  // Array de strings para los grupos (asumiendo que usas un input de tags o multiselect)
  groups: z.array(z.string()),
  user: UserSchema.pick({ id: true, name: true }),
})

// 2. Inferencia del Tipo (Best Practice)
// En lugar de escribir la interfaz manualmente, deja que Zod la genere por ti
// para que siempre coincida con la validación.
export type GeneralDataFormValues = z.infer<typeof GeneralDataSchema>
