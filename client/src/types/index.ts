import { z } from 'zod'

// Autenticación y Usuarios
export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
})

type Auth = z.infer<typeof authSchema>
export type LoginFormValues = Pick<Auth, 'email' | 'password'>
export type RegisterFormValues = Pick<
  Auth,
  'name' | 'email' | 'password' | 'password_confirmation'
>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestNewCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>


