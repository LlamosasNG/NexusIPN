import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ConfirmToken } from "@/types"
import { useState } from "react"

import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { Link } from "react-router"

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Confirmar Cuenta</CardTitle>
        </CardHeader>

        {!isValidToken ? (
          <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
        ) : (
          <NewPasswordForm token={token} />
        )}
        
        <CardFooter className="flex flex-col gap-4">
          <div className="mt-4 text-center text-sm">
            ¿Perdiste tu código para reestablecer tu contraseña?{' '}
            <Link to="/auth/request-new-code" className="underline">
              Solicita uno nuevo
            </Link>
          </div>
        </CardFooter>
      </Card>
  )
}
