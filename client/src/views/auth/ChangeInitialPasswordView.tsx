import { changeInitialPassword } from '@/api/AuthAPI'
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
import type { ChangeInitialPasswordForm } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function ChangeInitialPasswordView() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeInitialPasswordForm>({
    defaultValues: {
      currentPassword: '',
      password: '',
      password_confirmation: '',
    },
  })
  const password = watch('password')

  const { mutate } = useMutation({
    mutationFn: changeInitialPassword,
    onSuccess: async (message) => {
      toast.success(message)
      reset()
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate('/my-home', { replace: true })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData: ChangeInitialPasswordForm) => {
    mutate(formData)
  }

  return (
    <div className="mx-auto max-w-xl">
      <Card className="border-[#7C2855]/20 shadow-xl">
        <CardHeader className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7C2855]">
            Seguridad de la cuenta
          </p>
          <CardTitle className="text-2xl">
            Restablece tu contraseña inicial
          </CardTitle>
          <p className="text-sm text-gray-600">
            Para continuar usando Nexus IPN debes reemplazar la contraseña
            proporcionada por una contraseña personal.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-5 mb-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                {...register('currentPassword', {
                  required: 'La contraseña actual es obligatoria',
                })}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'La nueva contraseña es obligatoria',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                  validate: (value) =>
                    value !== watch('currentPassword') ||
                    'La nueva contraseña debe ser diferente a la actual',
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">
                Confirmar nueva contraseña
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                autoComplete="new-password"
                {...register('password_confirmation', {
                  required: 'Confirma la nueva contraseña',
                  validate: (value) =>
                    value === password || 'Las contraseñas no coinciden',
                })}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Actualizar contraseña
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
