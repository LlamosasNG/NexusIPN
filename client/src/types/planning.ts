import { z } from 'zod'

/** Planning Status */
export const PlanningStatusSchema = z.enum([
  'Borrador',
  'Enviada',
  'Aprobada',
  'Rechazada',
  'Desfasado',
])
export type PlanningStatus = z.infer<typeof PlanningStatusSchema>

/** Planning Creation */
export const CreatePlanningSchema = z.object({
  period: z.string(),
})
export type CreatePlanningData = z.infer<typeof CreatePlanningSchema>

/** Planning Validation (para SubjectCard) */
export const PlanningValidationSchema = z.array(
  z.object({
    id: z.number(),
    status: PlanningStatusSchema,
  })
)

/** Planning Item (planificación completa) */
export const PlanningSchema = z.object({
  id: z.number(),
  userId: z.number(),
  subjectId: z.number(),
  period: z.string(),
  status: PlanningStatusSchema,
  submissionDate: z.string().nullable(),
  feedback: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subject: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
  }),
})
export const PlanningListSchema = z.array(PlanningSchema)
export type PlanningItem = z.infer<typeof PlanningSchema>

export const PlanningSubjectDetailsSchema = z.object({
  id: z.number(),
  userId: z.number(),
  subjectId: z.number(),
  period: z.string(),
  status: PlanningStatusSchema,
  submissionDate: z.string().nullable(),
  feedback: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subject: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    academicUnit: z.string(),
    studyPlanNames: z.array(z.string()).nullable(),
    semester: z.string(),
    areaFormation: z.string(),
    modality: z.string(),
    type: z.array(z.string()).nullable(),
    creditsTepic: z.number(),
    weeksPerSemester: z.number(),
    hoursPerSemester: z
      .object({
        theory: z.number(),
        practice: z.number(),
        total1: z.number(),
        classroom: z.number(),
        laboratory: z.number(),
        clinic: z.number(),
        other: z.number(),
        total2: z.number(),
      })
      .nullable(),
    generalObjective: z.string().nullable(),
    units: z
      .array(
        z.object({
          name: z.string(),
          competency: z.string(),
        })
      )
      .nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
})
/** Planning Form - General Data */
export const modalitiesSchema = z.enum([
  'Escolarizada',
  'No escolarizada',
  'Mixta',
])

export const typesSchema = z.array(
  z.enum([
    'Teórica',
    'Práctica',
    'Teórico-Práctica',
    'Clínica',
    'Obligatoria',
    'Optativa',
    'Tópicos Selectos',
    'Otro',
  ])
)

export const GeneralDataSchema = z.object({
  id: z.number(),
  academicUnit: z.string(),
  program: z.string(),
  learningUnit: z.string(),
  areaFormation: z.string(),
  semester: z.string(),
  modality: modalitiesSchema,
  unitType: typesSchema,
  credits: z.object({
    tepic: z.coerce.number(),
    satca: z.coerce.number(),
  }),
  academy: z.string(),
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
    total1: z.coerce.number(),
    classroom: z.coerce.number(),
    laboratory: z.coerce.number(),
    clinic: z.coerce.number(),
    other: z.coerce.number(),
    total2: z.coerce.number(),
  }),
  period: z.string(),
  groups: z.array(z.string()),
  user: z.object({ name: z.string() }),
})
export type GeneralData = z.infer<typeof GeneralDataSchema>

/** Formulario de datos generales (sin id, para crear/editar) */
export const GeneralDataFormSchema = GeneralDataSchema.omit({ id: true })
export type GeneralDataFormValues = z.infer<typeof GeneralDataFormSchema>

