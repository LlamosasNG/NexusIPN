import { Request, Response, NextFunction } from 'express'

jest.mock('@/models/Subject', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}))

jest.mock('@/models/UserSubject', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}))

import { subjectExists, hasAccess } from '@/middleware/subject'
import Subject from '@/models/Subject'
import UserSubject from '@/models/UserSubject'

const mockSubject = Subject as jest.Mocked<typeof Subject>
const mockUserSubject = UserSubject as jest.Mocked<typeof UserSubject>

describe('Middleware — subject', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      user: { id: 1 } as any,
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    next = jest.fn()
  })

  describe('subjectExists', () => {
    it('debe llamar a next() si la materia existe', async () => {
      const fakeSubject = { id: 5, name: 'Matemáticas' }
      mockSubject.findByPk.mockResolvedValue(fakeSubject as any)

      await subjectExists(req as Request, res as Response, next, '5', 'subjectId')

      expect(mockSubject.findByPk).toHaveBeenCalledWith('5')
      expect(req.subject).toEqual(fakeSubject)
      expect(next).toHaveBeenCalled()
    })

    it('debe retornar 404 si la materia no existe', async () => {
      mockSubject.findByPk.mockResolvedValue(null)

      await subjectExists(req as Request, res as Response, next, '999', 'subjectId')

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ error: 'Materia no encontrada' })
      expect(next).not.toHaveBeenCalled()
    })

    it('debe retornar 500 si ocurre un error en la BD', async () => {
      mockSubject.findByPk.mockRejectedValue(new Error('DB Error'))

      await subjectExists(req as Request, res as Response, next, '5', 'subjectId')

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Hubo un error' })
    })
  })

  describe('hasAccess', () => {
    it('debe llamar a next() si el usuario tiene acceso a la materia', async () => {
      const fakeUserSubject = { userId: 1, subjectId: 5, period: '2026-1' }
      mockUserSubject.findOne.mockResolvedValue(fakeUserSubject as any)

      await hasAccess(req as Request, res as Response, next, '5', 'subjectId')

      expect(mockUserSubject.findOne).toHaveBeenCalledWith({
        where: { userId: 1, subjectId: '5' },
      })
      expect(req.userSubject).toEqual(fakeUserSubject)
      expect(next).toHaveBeenCalled()
    })

    it('debe retornar 403 si el usuario no tiene acceso', async () => {
      mockUserSubject.findOne.mockResolvedValue(null)

      await hasAccess(req as Request, res as Response, next, '5', 'subjectId')

      expect(res.status).toHaveBeenCalledWith(403)
      expect(res.json).toHaveBeenCalledWith({
        error: 'No tienes acceso a esta materia',
      })
      expect(next).not.toHaveBeenCalled()
    })
  })
})

