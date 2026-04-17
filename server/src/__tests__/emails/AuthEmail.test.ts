jest.mock('@/config/nodemailer', () => ({
  transport: {
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  },
}))

import { AuthEmail } from '@/emails/AuthEmail'
import { transport } from '@/config/nodemailer'

const mockSendMail = transport.sendMail as jest.Mock

describe('AuthEmail', () => {
  const fakeUser = {
    name: 'Test User',
    email: 'test@ipn.mx',
    token: '123456',
  }

  beforeEach(() => {
    process.env.FRONTEND_URL = 'http://localhost:5173'
  })

  // ─── sendConfirmationEmail ───────────────────────────────────

  describe('sendConfirmationEmail', () => {
    it('debe enviar un correo con los datos correctos', async () => {
      await AuthEmail.sendConfirmationEmail(fakeUser)

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Nexus IPN <admin@nexusipn.com>',
          to: 'test@ipn.mx',
          subject: 'Nexus IPN - Confirma tu cuenta',
        })
      )
    })

    it('debe incluir el nombre y token en el HTML', async () => {
      await AuthEmail.sendConfirmationEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('Test User')
      expect(callArgs.html).toContain('123456')
    })

    it('debe incluir el enlace del frontend', async () => {
      await AuthEmail.sendConfirmationEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('http://localhost:5173/auth/confirm-account')
    })
  })

  // ─── sendResetPasswordEmail ──────────────────────────────────

  describe('sendResetPasswordEmail', () => {
    it('debe enviar un correo de restablecimiento con los datos correctos', async () => {
      await AuthEmail.sendResetPasswordEmail(fakeUser)

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Nexus IPN <admin@nexusipn.com>',
          to: 'test@ipn.mx',
          subject: 'Nexus IPN - Restablece tu contraseña',
        })
      )
    })

    it('debe incluir el nombre y token en el HTML', async () => {
      await AuthEmail.sendResetPasswordEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('Test User')
      expect(callArgs.html).toContain('123456')
    })

    it('debe incluir el enlace del frontend para resetear password', async () => {
      await AuthEmail.sendResetPasswordEmail(fakeUser)

      const callArgs = mockSendMail.mock.calls[0][0]
      expect(callArgs.html).toContain('http://localhost:5173/auth/reset-password')
    })
  })
})
