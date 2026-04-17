import { Request, Response } from 'express'

jest.mock('@/models/Reference', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
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

import { ReferenceController } from '@/controllers/ReferenceController'
import Reference from '@/models/Reference'
import Planning from '@/models/Planning'

const mockReference = Reference as jest.Mocked<typeof Reference>
const mockPlanning = Planning as jest.Mocked<typeof Planning>

describe('ReferenceController', () => {
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

  // ─── create ──────────────────────────────────────────────────

  describe('create', () => {
    it('debe retornar 404 si la planeación no existe', async () => {
      req.params = { planningId: '999' }
      mockPlanning.findOne.mockResolvedValue(null)

      await ReferenceController.create(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe crear la referencia exitosamente', async () => {
      req.params = { planningId: '10' }
      req.body = { type: 'basic', citation: 'Libro de Pruebas, 2026' }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      mockReference.create.mockResolvedValue({
        id: 1,
        type: 'basic',
        citation: 'Libro de Pruebas, 2026',
      } as any)

      await ReferenceController.create(req as Request, res as Response)

      expect(mockReference.create).toHaveBeenCalledWith(
        expect.objectContaining({ planningId: 10 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  // ─── getAll ──────────────────────────────────────────────────

  describe('getAll', () => {
    it('debe retornar todas las referencias de una planeación', async () => {
      req.params = { planningId: '10' }
      const fakeRefs = [{ id: 1 }, { id: 2 }]
      mockReference.findAll.mockResolvedValue(fakeRefs as any)

      await ReferenceController.getAll(req as Request, res as Response)

      expect(mockReference.findAll).toHaveBeenCalledWith({
        where: { planningId: '10' },
      })
      expect(res.json).toHaveBeenCalledWith(fakeRefs)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockReference.findAll.mockRejectedValue(new Error('DB Error'))

      await ReferenceController.getAll(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ─── update ──────────────────────────────────────────────────

  describe('update', () => {
    it('debe retornar 404 si la referencia no existe', async () => {
      req.params = { id: '999' }
      mockReference.findByPk.mockResolvedValue(null)

      await ReferenceController.update(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe actualizar la referencia exitosamente', async () => {
      req.params = { id: '1' }
      req.body = { citation: 'Referencia actualizada' }
      const fakeRef = {
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockReference.findByPk.mockResolvedValue(fakeRef as any)

      await ReferenceController.update(req as Request, res as Response)

      expect(fakeRef.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Referencia actualizada' })
      )
    })
  })

  // ─── delete ──────────────────────────────────────────────────

  describe('delete', () => {
    it('debe retornar 404 si la referencia no existe', async () => {
      req.params = { id: '999' }
      mockReference.findByPk.mockResolvedValue(null)

      await ReferenceController.delete(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe eliminar la referencia exitosamente', async () => {
      req.params = { id: '1' }
      const fakeRef = {
        destroy: jest.fn().mockResolvedValue(undefined),
      }
      mockReference.findByPk.mockResolvedValue(fakeRef as any)

      await ReferenceController.delete(req as Request, res as Response)

      expect(fakeRef.destroy).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({ message: 'Referencia eliminada' })
    })
  })
})
