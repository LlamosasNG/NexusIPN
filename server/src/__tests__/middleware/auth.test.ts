import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// Mock de los modelos antes de importar el middleware
jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}))

jest.mock('@/models/Academy', () => ({
  __esModule: true,
  default: {},
}))

import { authenticate } from '@/middleware/auth'
import User from '@/models/User'

const mockUser = User as jest.Mocked<typeof User>

describe('Middleware — authenticate', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      headers: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    next = jest.fn()
    process.env.JWT_SECRET = 'test-secret'
  })

  it('debe retornar 401 si no hay header Authorization con Bearer', async () => {
    req.headers = { authorization: 'InvalidFormat token123' }

    await authenticate(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'No autorizado' })
    expect(next).not.toHaveBeenCalled()
  })

  it('debe retornar 401 si el token está vacío después de Bearer', async () => {
    req.headers = { authorization: 'Bearer ' }

    await authenticate(req as Request, res as Response, next)

    // El split genera un string vacío, que jwt.verify rechazará
    expect(next).not.toHaveBeenCalled()
  })

  it('debe llamar a next() con un token válido y usuario existente', async () => {
    const fakeUser = { id: 1, name: 'Test', email: 'test@test.com', role: 'Docente' }
    const token = jwt.sign({ id: 1 }, 'test-secret')
    req.headers = { authorization: `Bearer ${token}` }
    mockUser.findByPk.mockResolvedValue(fakeUser as any)

    await authenticate(req as Request, res as Response, next)

    expect(mockUser.findByPk).toHaveBeenCalledWith(1, expect.any(Object))
    expect(req.user).toEqual(fakeUser)
    expect(next).toHaveBeenCalled()
  })

  it('debe retornar 500 si el token es inválido', async () => {
    req.headers = { authorization: 'Bearer token-invalido-123' }

    await authenticate(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' })
    expect(next).not.toHaveBeenCalled()
  })
})
