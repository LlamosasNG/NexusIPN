import { validateToken } from '@/api/AuthAPI'
import { CardContent } from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import type { ConfirmToken } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type NewPasswordTokenProps = {
  token: ConfirmToken['token']
  setToken: (token: ConfirmToken['token']) => void
  setIsValidToken: (isValidToken: boolean) => void
}

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }
  const handleComplete = () => mutate({ token })

  return (
    <CardContent className="space-y-5">
      <p className="text-muted-foreground">
        Ingresa el código que recibiste en tu correo electrónico para
        reestablecer tu contraseña
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
  )
}
