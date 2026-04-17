import { Request, Response } from 'express'

jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}))

jest.mock('@/models/Academy', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}))

jest.mock('@/models/Subject', () => ({
  __esModule: true,
  default: {},
}))

jest.mock('@/utils/auth', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password_123'),
  checkPassword: jest.fn(),
}))

jest.mock('@/utils/jwt', () => ({
  generateJWT: jest.fn().mockReturnValue('jwt-token-mock'),
}))

jest.mock('@/utils/token', () => ({
  generateToken: jest.fn().mockReturnValue('123456'),
}))

jest.mock('@/emails/AuthEmail', () => ({
  AuthEmail: {
    sendConfirmationEmail: jest.fn().mockResolvedValue(undefined),
    sendResetPasswordEmail: jest.fn().mockResolvedValue(undefined),
  },
}))

import { AuthController } from '@/controllers/AuthController'
import User from '@/models/User'
import Academy from '@/models/Academy'
import { hashPassword, checkPassword } from '@/utils/auth'
import { generateJWT } from '@/utils/jwt'
import { generateToken } from '@/utils/token'
import { AuthEmail } from '@/emails/AuthEmail'

const mockUser = User as jest.Mocked<typeof User>
const mockAcademy = Academy as jest.Mocked<typeof Academy>
const mockCheckPassword = checkPassword as jest.Mock

describe('AuthController', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      headers: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  // ─── createAccount ───────────────────────────────────────────

  describe('createAccount', () => {
    it('debe retornar 409 si el usuario ya existe', async () => {
      req.body = { email: 'test@ipn.mx', password: '123456' }
      mockUser.findOne.mockResolvedValue({ id: 1 } as any)

      await AuthController.createAccount(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(409)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Un usuario con este correo ya existe',
      })
    })

    it('debe retornar 404 si la academyId no existe', async () => {
      req.body = { email: 'nuevo@ipn.mx', password: '123456', academyId: 999 }
      mockUser.findOne.mockResolvedValue(null)
      mockAcademy.findByPk.mockResolvedValue(null)

      await AuthController.createAccount(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'La academia seleccionada no existe',
      })
    })

    it('debe crear la cuenta exitosamente y enviar correo', async () => {
      req.body = { email: 'nuevo@ipn.mx', password: '123456', name: 'Test' }
      mockUser.findOne.mockResolvedValue(null)
      const fakeUser = {
        id: 1,
        name: 'Test',
        email: 'nuevo@ipn.mx',
        token: null,
        password: null,
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.create.mockResolvedValue(fakeUser as any)

      await AuthController.createAccount(req as Request, res as Response)

      expect(mockUser.create).toHaveBeenCalledWith(req.body)
      expect(fakeUser.save).toHaveBeenCalled()
      expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(
        'Cuenta creada exitosamente, verifique su correo para confirmarla'
      )
    })
  })

  // ─── confirmAccount ──────────────────────────────────────────

  describe('confirmAccount', () => {
    it('debe retornar 401 si el token no existe', async () => {
      req.body = { token: '000000' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.confirmAccount(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ error: 'Token no encontrado' })
    })

    it('debe confirmar la cuenta exitosamente', async () => {
      req.body = { token: '123456' }
      const fakeUser = {
        token: '123456',
        confirmed: false,
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)

      await AuthController.confirmAccount(req as Request, res as Response)

      expect(fakeUser.token).toBeNull()
      expect(fakeUser.confirmed).toBe(true)
      expect(fakeUser.save).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith('Cuenta confirmada exitosamente')
    })
  })

  // ─── login ───────────────────────────────────────────────────

  describe('login', () => {
    it('debe retornar 404 si el usuario no existe', async () => {
      req.body = { email: 'noexiste@ipn.mx', password: '123456' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.login(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' })
    })

    it('debe retornar 401 si la cuenta no está confirmada y reenviar correo', async () => {
      req.body = { email: 'test@ipn.mx', password: '123456' }
      const fakeUser = {
        id: 1,
        name: 'Test',
        email: 'test@ipn.mx',
        confirmed: false,
        token: null,
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)

      await AuthController.login(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalled()
    })

    it('debe retornar 403 si el password es incorrecto', async () => {
      req.body = { email: 'test@ipn.mx', password: 'wrong' }
      const fakeUser = {
        id: 1,
        confirmed: true,
        password: 'hashed',
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)
      mockCheckPassword.mockResolvedValue(false)

      await AuthController.login(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(403)
      expect(res.json).toHaveBeenCalledWith({ error: 'Contraseña incorrecta' })
    })

    it('debe retornar el JWT si las credenciales son válidas', async () => {
      req.body = { email: 'test@ipn.mx', password: '123456' }
      const fakeUser = {
        id: 1,
        confirmed: true,
        password: 'hashed',
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)
      mockCheckPassword.mockResolvedValue(true)

      await AuthController.login(req as Request, res as Response)

      expect(generateJWT).toHaveBeenCalledWith(1)
      expect(res.json).toHaveBeenCalledWith('jwt-token-mock')
    })
  })

  // ─── requestConfirmationCode ─────────────────────────────────

  describe('requestConfirmationCode', () => {
    it('debe retornar 404 si el usuario no existe', async () => {
      req.body = { email: 'noexiste@ipn.mx' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.requestConfirmationCode(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe retornar 401 si la cuenta ya está confirmada', async () => {
      req.body = { email: 'test@ipn.mx' }
      mockUser.findOne.mockResolvedValue({ confirmed: true } as any)

      await AuthController.requestConfirmationCode(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        error: 'La cuenta ya ha sido confirmada',
      })
    })

    it('debe enviar un nuevo código de confirmación', async () => {
      req.body = { email: 'test@ipn.mx' }
      const fakeUser = {
        name: 'Test',
        email: 'test@ipn.mx',
        confirmed: false,
        token: null,
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)

      await AuthController.requestConfirmationCode(req as Request, res as Response)

      expect(fakeUser.save).toHaveBeenCalled()
      expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(
        'Correo de confirmación de cuenta enviado'
      )
    })
  })

  // ─── forgotPassword ──────────────────────────────────────────

  describe('forgotPassword', () => {
    it('debe retornar 404 si el usuario no existe', async () => {
      req.body = { email: 'noexiste@ipn.mx' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.forgotPassword(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe enviar correo de restablecimiento de contraseña', async () => {
      req.body = { email: 'test@ipn.mx' }
      const fakeUser = {
        name: 'Test',
        email: 'test@ipn.mx',
        token: null,
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)

      await AuthController.forgotPassword(req as Request, res as Response)

      expect(fakeUser.save).toHaveBeenCalled()
      expect(AuthEmail.sendResetPasswordEmail).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(
        'Correo de restablecimiento de contraseña enviado'
      )
    })
  })

  // ─── validateToken ───────────────────────────────────────────

  describe('validateToken', () => {
    it('debe retornar 403 si el token no es válido', async () => {
      req.body = { token: '000000' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.validateToken(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(403)
      expect(res.json).toHaveBeenCalledWith({ error: 'Token no válido' })
    })

    it('debe retornar mensaje de éxito si el token es válido', async () => {
      req.body = { token: '123456' }
      mockUser.findOne.mockResolvedValue({ id: 1 } as any)

      await AuthController.validateToken(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(
        'Token válido, puedes restablecer tu contraseña'
      )
    })
  })

  // ─── resetPassword ───────────────────────────────────────────

  describe('resetPassword', () => {
    it('debe retornar 403 si el token no existe', async () => {
      req.params = { token: '000000' }
      req.body = { password: 'newpassword' }
      mockUser.findOne.mockResolvedValue(null)

      await AuthController.resetPassword(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(403)
    })

    it('debe restablecer la contraseña exitosamente', async () => {
      req.params = { token: '123456' }
      req.body = { password: 'newpassword' }
      const fakeUser = {
        password: 'old',
        token: '123456',
        save: jest.fn().mockResolvedValue(undefined),
      }
      mockUser.findOne.mockResolvedValue(fakeUser as any)

      await AuthController.resetPassword(req as Request, res as Response)

      expect(fakeUser.password).toBe('hashed_password_123')
      expect(fakeUser.token).toBeNull()
      expect(fakeUser.save).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(
        'Contraseña restablecida exitosamente'
      )
    })
  })

  // ─── user ────────────────────────────────────────────────────

  describe('user', () => {
    it('debe retornar los datos del usuario autenticado', async () => {
      req.user = { id: 1 } as any
      const fakeUser = {
        id: 1,
        name: 'Test',
        email: 'test@ipn.mx',
        role: 'Docente',
      }
      mockUser.findByPk.mockResolvedValue(fakeUser as any)

      await AuthController.user(req as Request, res as Response)

      expect(mockUser.findByPk).toHaveBeenCalledWith(1, expect.any(Object))
      expect(res.json).toHaveBeenCalledWith(fakeUser)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.user = { id: 1 } as any
      mockUser.findByPk.mockRejectedValue(new Error('DB Error'))

      await AuthController.user(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Hubo un error al obtener el usuario',
      })
    })
  })
})
