import { transport } from '@/config/nodemailer'
import {
  INSTITUTIONAL_LOGO_CID,
  renderInstitutionalEmail,
} from '@/emails/templates/institutionalEmailTemplate'
import path from 'path'

type EmailType = {
  name: string
  email: string
  token: string
}

type TemporaryCredentialsEmail = Omit<EmailType, 'token'> & {
  temporaryPassword: string
  role: 'Docente' | 'Jefe de Departamento'
}

const institutionalLogoAttachment = {
  filename: 'logo_nexusipn.png',
  path: path.join(__dirname, 'assets', 'logo_nexusipn.png'),
  cid: INSTITUTIONAL_LOGO_CID,
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Confirma tu cuenta de Nexus IPN',
      title: 'Confirma tu cuenta',
      recipientName: user.name,
      paragraphs: [
        'Recibimos una solicitud para confirmar tu cuenta en Nexus IPN.',
        'Ingresa el siguiente código en la pantalla de confirmación para completar el proceso.',
      ],
      highlight: {
        label: 'Código de confirmación',
        value: user.token,
      },
      actionLabel: 'Confirmar cuenta',
      actionPath: '/auth/confirm-account',
      securityNotice:
        'Si no solicitaste esta acción, puedes ignorar este mensaje.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Confirma tu cuenta',
      ...content,
      attachments: [institutionalLogoAttachment],
    })
    console.log('Email enviado correctamente', email.messageId)
  }

  static sendResetPasswordEmail = async (user: EmailType) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Restablece tu contraseña de Nexus IPN',
      title: 'Restablece tu contraseña',
      recipientName: user.name,
      paragraphs: [
        'Recibimos una solicitud para restablecer la contraseña de tu cuenta.',
        'Ingresa el siguiente código en la pantalla de restablecimiento para continuar.',
      ],
      highlight: {
        label: 'Código de restablecimiento',
        value: user.token,
      },
      actionLabel: 'Restablecer contraseña',
      actionPath: '/auth/reset-password',
      securityNotice:
        'No compartas este código. Si no solicitaste el cambio, ignora este mensaje.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Restablece tu contraseña',
      ...content,
      attachments: [institutionalLogoAttachment],
    })
    console.log('Email enviado correctamente', email.messageId)
  }

  static sendTemporaryCredentialsEmail = async (
    user: TemporaryCredentialsEmail
  ) => {
    const content = renderInstitutionalEmail({
      frontendUrl: process.env.FRONTEND_URL,
      preheader: 'Tu cuenta de Nexus IPN está lista',
      title: 'Bienvenido a Nexus IPN',
      recipientName: user.name,
      paragraphs: [
        `Se creó tu cuenta con el rol ${user.role}.`,
        'Usa la contraseña temporal para iniciar sesión. El sistema te pedirá establecer una contraseña nueva en tu primer acceso.',
      ],
      highlight: {
        label: 'Contraseña temporal',
        value: user.temporaryPassword,
      },
      actionLabel: 'Iniciar sesión',
      actionPath: '/auth/login',
      securityNotice:
        'No compartas esta contraseña. Si no esperabas esta cuenta, contacta al administrador.',
    })

    const email = await transport.sendMail({
      from: 'Nexus IPN <admin@nexusipn.com>',
      to: user.email,
      subject: 'Nexus IPN - Credenciales temporales',
      ...content,
      attachments: [institutionalLogoAttachment],
    })
    console.log('Email enviado correctamente', email.messageId)
  }
}
