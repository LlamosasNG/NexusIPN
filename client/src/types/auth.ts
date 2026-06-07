import { z } from 'zod'
import { AcademySchema } from './academy'
import { SubjectRelationSchema } from './subject'

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
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestNewCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type ChangeInitialPasswordForm = Pick<
  Auth,
  'password' | 'password_confirmation'
> & {
  currentPassword: string
}

export const UserSchema = AuthSchema.pick({ name: true, email: true }).extend({
  id: z.number(),
  role: z.enum([
    'Docente',
    'Jefe de Departamento',
    'Administrador',
  ]),
  isActive: z.boolean(),
  mustChangePassword: z.boolean().default(false),
  academy: AcademySchema.nullable(),
  subjects: z.array(SubjectRelationSchema).default([]),
})
export type User = z.infer<typeof UserSchema>
