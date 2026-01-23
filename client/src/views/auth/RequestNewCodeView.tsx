import { requestNewCode } from '@/api/AuthAPI'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { RequestNewCodeForm } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RequestNewCodeView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestNewCodeForm>({
    defaultValues: {
      email: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: requestNewCode,
    onSuccess: (data) => {
      toast.success(data)
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData: RequestNewCodeForm) => {
    mutate(formData)
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Solicitar nuevo código</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-5">
          <p className="text-muted-foreground">
            Si has perdido tu código de confirmación, puedes solicitar uno nuevo
            aquí.
          </p>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'El correo electrónico no es válido',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
            {isSubmitting ? 'Solicitando...' : 'Solicitar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
