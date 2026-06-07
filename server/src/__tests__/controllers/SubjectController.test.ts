import { Request, Response } from 'express'

jest.mock('@/models/Subject', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
  },
}))

jest.mock('@/models/Academy', () => ({
  __esModule: true,
  default: {},
}))

jest.mock('@/models/Planning', () => ({
  __esModule: true,
  default: {},
}))

jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}))

jest.mock('@/models/UserSubject', () => ({
  __esModule: true,
  default: {
    destroy: jest.fn(),
    bulkCreate: jest.fn(),
  },
}))

import { SubjectController } from '@/controllers/SubjectController'
import Subject from '@/models/Subject'
import User from '@/models/User'
import UserSubject from '@/models/UserSubject'

const mockSubject = Subject as jest.Mocked<typeof Subject>
const mockUser = User as jest.Mocked<typeof User>
const mockUserSubject = UserSubject as jest.Mocked<typeof UserSubject>

describe('SubjectController', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: 1 } as any,
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  // ─── getByAcademy ────────────────────────────────────────────

  describe('getByAcademy', () => {
    it('debe retornar las unidades de aprendizaje de una academia', async () => {
      req.params = { academyId: '1' }
      const fakeSubjects = [
        { id: 1, name: 'Unidad de aprendizaje 1' },
        { id: 2, name: 'Unidad de aprendizaje 2' },
      ]
      mockSubject.findAll.mockResolvedValue(fakeSubjects as any)

      await SubjectController.getByAcademy(req as Request, res as Response)

      expect(mockSubject.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ where: { academyId: '1' } })
      )
      expect(res.json).toHaveBeenCalledWith(fakeSubjects)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { academyId: '1' }
      mockSubject.findAll.mockRejectedValue(new Error('DB Error'))

      await SubjectController.getByAcademy(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error al obtener las unidades de aprendizaje',
      })
    })
  })

  // ─── assign ──────────────────────────────────────────────────

  describe('assign', () => {
    it('debe retornar 400 si se intentan asignar más de 5 unidades de aprendizaje', async () => {
      req.body = { subjectIds: [1, 2, 3, 4, 5, 6], period: '2026-1' }

      await SubjectController.assign(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'No puedes asignar más de 5 unidades de aprendizaje',
      })
    })

    it('debe retornar 404 si alguna unidad de aprendizaje no existe', async () => {
      req.body = { subjectIds: [1, 2, 999], period: '2026-1' }
      mockSubject.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }] as any)

      await SubjectController.assign(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Una o más unidades de aprendizaje no existen',
      })
    })

    it('debe asignar unidades de aprendizaje exitosamente', async () => {
      req.body = { subjectIds: [1, 2], period: '2026-1' }
      mockSubject.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }] as any)
      mockUserSubject.destroy.mockResolvedValue(0 as any)
      mockUserSubject.bulkCreate.mockResolvedValue([] as any)

      await SubjectController.assign(req as Request, res as Response)

      expect(mockUserSubject.destroy).toHaveBeenCalledWith({
        where: { userId: 1 },
      })
      expect(mockUserSubject.bulkCreate).toHaveBeenCalledWith([
        { userId: 1, subjectId: 1, period: '2026-1', active: true },
        { userId: 1, subjectId: 2, period: '2026-1', active: true },
      ])
      expect(res.json).toHaveBeenCalledWith({
        message: 'Unidades de aprendizaje asignadas exitosamente',
      })
    })
  })

  // ─── remove ──────────────────────────────────────────────────

  describe('remove', () => {
    it('debe retornar 404 si la unidad de aprendizaje no está asignada', async () => {
      req.params = { subjectId: '5' }
      mockUserSubject.destroy.mockResolvedValue(0 as any)

      await SubjectController.remove(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'No tienes asignada esta unidad de aprendizaje',
      })
    })

    it('debe eliminar la unidad de aprendizaje exitosamente', async () => {
      req.params = { subjectId: '5' }
      mockUserSubject.destroy.mockResolvedValue(1 as any)

      await SubjectController.remove(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith({
        message: 'Unidad de aprendizaje eliminada exitosamente',
      })
    })
  })

  // ─── getByUser ───────────────────────────────────────────────

  describe('getByUser', () => {
    it('debe retornar las unidades de aprendizaje del usuario', async () => {
      const fakeSubjects = [{ id: 1, name: 'Unidad de aprendizaje 1' }]
      mockUser.findByPk.mockResolvedValue({
        subjects: fakeSubjects,
      } as any)

      await SubjectController.getByUser(req as Request, res as Response)

      expect(mockUser.findByPk).toHaveBeenCalledWith(1, expect.any(Object))
      expect(res.json).toHaveBeenCalledWith(fakeSubjects)
    })

    it('debe retornar array vacío si el usuario no tiene unidades de aprendizaje', async () => {
      mockUser.findByPk.mockResolvedValue(null)

      await SubjectController.getByUser(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith([])
    })

    it('debe retornar 500 si ocurre un error', async () => {
      mockUser.findByPk.mockRejectedValue(new Error('DB Error'))

      await SubjectController.getByUser(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ─── subject ─────────────────────────────────────────────────

  describe('subject', () => {
    it('debe retornar la unidad de aprendizaje del request', async () => {
      const fakeSubject = { id: 5, name: 'Unidad de aprendizaje X' }
      req.subject = fakeSubject as any

      await SubjectController.subject(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(fakeSubject)
    })
  })
})
