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

export default function LoginView() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/my-home')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData: LoginFormValues) => {
    mutate(formData)
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
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link to="/auth/register" className="underline">
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
