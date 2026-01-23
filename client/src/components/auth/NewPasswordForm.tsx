import { resetPassword } from '@/api/AuthAPI'
import type { ConfirmToken, NewPasswordForm } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router'

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordForm>({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })
  const password = watch('password')
  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data)
      navigate('/auth/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData: NewPasswordForm) => {
    mutate({ formData, token })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            {...register('password_confirmation', {
              required: 'Debes confirmar la contraseña',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.password_confirmation && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </CardContent>
    </form>
  )
}
