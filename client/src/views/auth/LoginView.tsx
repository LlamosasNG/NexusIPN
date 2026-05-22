import { login } from '@/api/AuthAPI'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { LoginFormValues } from '@/types'
import { EnvelopeIcon, EyeIcon } from '@heroicons/react/24/solid'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

type LoginFormWithTerms = LoginFormValues & {
  termsAccepted: boolean
}

export default function LoginView() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormWithTerms>({
    defaultValues: {
      email: '',
      password: '',
      termsAccepted: false,
    },
  })
  const termsAccepted = watch('termsAccepted')

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/my-home')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = ({ email, password }: LoginFormWithTerms) => {
    mutate({ email, password })
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Iniciar Sesión</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                className="pl-10"
                {...register('email', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'El correo electrónico no es válido',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <EyeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="pl-10"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                })}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <label
              htmlFor="termsAccepted"
              className="flex items-start gap-3 text-sm leading-5 text-gray-700"
            >
              <input
                id="termsAccepted"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#7C2855]"
                {...register('termsAccepted', {
                  required:
                    'Debes aceptar los Términos y Condiciones para ingresar.',
                })}
              />
              <span>
                Acepto los{' '}
                <Link
                  to="/auth/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#7C2855] underline underline-offset-2"
                >
                  Términos y Condiciones
                </Link>{' '}
                para el uso de la plataforma.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-2 text-xs text-red-500">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full mt-5"
            disabled={isSubmitting || !termsAccepted}
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
