import { Request, Response } from 'express'

jest.mock('@/models/ThematicUnit', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}))

jest.mock('@/models/SessionActivity', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}))

jest.mock('@/models/Planning', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}))

import { ThematicUnitController } from '@/controllers/ThematicUnitController'
import ThematicUnit from '@/models/ThematicUnit'
import SessionActivity from '@/models/SessionActivity'
import Planning from '@/models/Planning'

const mockThematicUnit = ThematicUnit as jest.Mocked<typeof ThematicUnit>
const mockSession = SessionActivity as jest.Mocked<typeof SessionActivity>
const mockPlanning = Planning as jest.Mocked<typeof Planning>

describe('ThematicUnitController', () => {
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

  // ─── CRUD Unidades Temáticas ─────────────────────────────────

  describe('create', () => {
    it('debe retornar 404 si la planeación no existe', async () => {
      req.params = { planningId: '999' }
      mockPlanning.findOne.mockResolvedValue(null)

      await ThematicUnitController.create(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe crear una unidad temática exitosamente', async () => {
      req.params = { planningId: '10' }
      req.body = { unitNumber: 1, name: 'Unidad 1' }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      mockThematicUnit.create.mockResolvedValue({ id: 1, unitNumber: 1, name: 'Unidad 1' } as any)

      await ThematicUnitController.create(req as Request, res as Response)

      expect(mockThematicUnit.create).toHaveBeenCalledWith(
        expect.objectContaining({ planningId: 10, unitNumber: 1 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('getAll', () => {
    it('debe retornar todas las unidades temáticas de una planeación', async () => {
      req.params = { planningId: '10' }
      const fakeUnits = [{ id: 1, unitNumber: 1 }]
      mockThematicUnit.findAll.mockResolvedValue(fakeUnits as any)

      await ThematicUnitController.getAll(req as Request, res as Response)

      expect(mockThematicUnit.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ where: { planningId: '10' } })
      )
      expect(res.json).toHaveBeenCalledWith(fakeUnits)
    })
  })

  describe('getById', () => {
    it('debe retornar la unidad si existe', async () => {
      req.params = { id: '1' }
      const fakeUnit = { id: 1, unitNumber: 1 }
      mockThematicUnit.findByPk.mockResolvedValue(fakeUnit as any)

      await ThematicUnitController.getById(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(fakeUnit)
    })

    it('debe retornar 404 si la unidad no existe', async () => {
      req.params = { id: '999' }
      mockThematicUnit.findByPk.mockResolvedValue(null)

      await ThematicUnitController.getById(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('update', () => {
    it('debe actualizar la unidad exitosamente', async () => {
      req.params = { id: '1' }
      req.body = { name: 'Unidad Actualizada' }
      const fakeUnit = {
        id: 1,
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockThematicUnit.findByPk.mockResolvedValue(fakeUnit as any)

      await ThematicUnitController.update(req as Request, res as Response)

      expect(fakeUnit.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Unidad temática actualizada' })
      )
    })

    it('debe retornar 404 si la unidad no existe', async () => {
      req.params = { id: '999' }
      mockThematicUnit.findByPk.mockResolvedValue(null)

      await ThematicUnitController.update(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('delete', () => {
    it('debe eliminar la unidad exitosamente', async () => {
      req.params = { id: '1' }
      const fakeUnit = {
        destroy: jest.fn().mockResolvedValue(undefined),
      }
      mockThematicUnit.findByPk.mockResolvedValue(fakeUnit as any)

      await ThematicUnitController.delete(req as Request, res as Response)

      expect(fakeUnit.destroy).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({ message: 'Unidad temática eliminada' })
    })

    it('debe retornar 404 si la unidad no existe', async () => {
      req.params = { id: '999' }
      mockThematicUnit.findByPk.mockResolvedValue(null)

      await ThematicUnitController.delete(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  // ─── CRUD Sesiones ───────────────────────────────────────────

  describe('createSession', () => {
    it('debe retornar 404 si la unidad temática no existe', async () => {
      req.params = { unitId: '999' }
      mockThematicUnit.findByPk.mockResolvedValue(null)

      await ThematicUnitController.createSession(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe crear la sesión exitosamente', async () => {
      req.params = { unitId: '1' }
      req.body = { sessionNumber: 1, topic: 'Tema 1' }
      mockThematicUnit.findByPk.mockResolvedValue({ id: 1 } as any)
      mockSession.create.mockResolvedValue({ id: 1, sessionNumber: 1 } as any)

      await ThematicUnitController.createSession(req as Request, res as Response)

      expect(mockSession.create).toHaveBeenCalledWith(
        expect.objectContaining({ thematicUnitId: 1 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('updateSession', () => {
    it('debe retornar 404 si la sesión no existe', async () => {
      req.params = { sessionId: '999' }
      mockSession.findByPk.mockResolvedValue(null)

      await ThematicUnitController.updateSession(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe actualizar la sesión exitosamente', async () => {
      req.params = { sessionId: '1' }
      req.body = { topic: 'Tema actualizado' }
      const fakeSession = {
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockSession.findByPk.mockResolvedValue(fakeSession as any)

      await ThematicUnitController.updateSession(req as Request, res as Response)

      expect(fakeSession.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Sesión actualizada' })
      )
    })
  })

  describe('deleteSession', () => {
    it('debe retornar 404 si la sesión no existe', async () => {
      req.params = { sessionId: '999' }
      mockSession.findByPk.mockResolvedValue(null)

      await ThematicUnitController.deleteSession(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe eliminar la sesión exitosamente', async () => {
      req.params = { sessionId: '1' }
      const fakeSession = {
        destroy: jest.fn().mockResolvedValue(undefined),
      }
      mockSession.findByPk.mockResolvedValue(fakeSession as any)

      await ThematicUnitController.deleteSession(req as Request, res as Response)

      expect(fakeSession.destroy).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({ message: 'Sesión eliminada' })
    })
  })
})
