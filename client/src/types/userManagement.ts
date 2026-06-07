import { AcademySchema } from './academy'
import { z } from 'zod'

export const ManagedSubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  UserSubject: z
    .object({
      period: z.string(),
      active: z.boolean(),
    })
    .optional(),
})

export const ManagedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['Docente', 'Jefe de Departamento']),
  academyId: z.number(),
  isActive: z.boolean(),
  mustChangePassword: z.boolean(),
  createdAt: z.string().optional(),
  academy: AcademySchema.optional(),
  subjects: z.array(ManagedSubjectSchema).default([]),
})

export const ManagedUserListSchema = z.array(ManagedUserSchema)
export const ManagedUserResponseSchema = z.object({
  message: z.string(),
  data: ManagedUserSchema,
  notificationSent: z.boolean().optional(),
})

export type ManagedUser = z.infer<typeof ManagedUserSchema>
export type ManagedUserInput = {
  name: string
  email: string
  academyId?: number
  subjectIds?: number[]
  period?: string
}
