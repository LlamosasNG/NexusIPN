import { confirmAccount } from '@/api/AuthAPI'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import type { ConfirmToken } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function ConfirmAccountView() {
  const navigate = useNavigate()
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data)
      navigate('/auth/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = () => {
    mutate({ token })
  }
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Confirmar Cuenta</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-muted-foreground">
            Ingresa el código de confirmación que recibiste en tu correo
            electrónico
          </p>
          <InputOTP
            maxLength={6}
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="mt-4 text-center text-sm">
            ¿Perdiste tu código de confirmación?{' '}
            <Link to="/auth/request-new-code" className="underline">
              Solicita uno nuevo
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
