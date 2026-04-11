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
  subjects: z.array(SubjectRelationSchema),
})
export type User = z.infer<typeof UserSchema>
