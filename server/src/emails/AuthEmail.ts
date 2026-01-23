import { transport } from '@/config/nodemailer'

type EmailType = {
  name: string
  email: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    //const confirmUrl = `${process.env.FRONTEND_URL}/auth/confirm-account`

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Confirma tu cuenta',
      html: `<h1>Confirma tu cuenta</h1>
      <p>Hola ${user.name}, por favor confirma tu cuenta haciendo clic en el siguiente enlace e ingresa el token: ${user.token}</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>`,
    })
    console.log('Email enviado correctamente', email.messageId)
  }

  static sendResetPasswordEmail = async (user: EmailType) => {
    //const confirmUrl = `${process.env.FRONTEND_URL}/auth/forgot-password`

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Restablece tu contraseña',
      html: `<h1>Restablece tu contraseña</h1>
      <p>Hola ${user.name}, por favor restablece tu contraseña haciendo clic en el siguiente enlace e ingresa el token: ${user.token}</p>
      <a href="${process.env.FRONTEND_URL}/auth/reset-password">Restablecer contraseña</a>`,
    })
    console.log('Email enviado correctamente', email.messageId)
  }
}
