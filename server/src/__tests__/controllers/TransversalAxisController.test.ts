import { Request, Response } from 'express'

jest.mock('@/models/TransversalAxis', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}))

jest.mock('@/models/Planning', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}))

import { TransversalAxisController } from '@/controllers/TransversalAxisController'
import TransversalAxis from '@/models/TransversalAxis'
import Planning from '@/models/Planning'

const mockTransversalAxis = TransversalAxis as jest.Mocked<typeof TransversalAxis>
const mockPlanning = Planning as jest.Mocked<typeof Planning>

describe('TransversalAxisController', () => {
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

  // ─── createOrUpdate ──────────────────────────────────────────

  describe('createOrUpdate', () => {
    it('debe retornar 404 si la planeación no existe', async () => {
      req.params = { planningId: '999' }
      mockPlanning.findOne.mockResolvedValue(null)

      await TransversalAxisController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Planeación no encontrada',
      })
    })

    it('debe actualizar si ya existen ejes transversales', async () => {
      req.params = { planningId: '10' }
      req.body = { sustainability: true, innovation: false }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      const fakeExisting = {
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockTransversalAxis.findOne.mockResolvedValue(fakeExisting as any)

      await TransversalAxisController.createOrUpdate(req as Request, res as Response)

      expect(fakeExisting.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Ejes transversales actualizados' })
      )
    })

    it('debe crear si no existen ejes transversales', async () => {
      req.params = { planningId: '10' }
      req.body = { sustainability: true }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      mockTransversalAxis.findOne.mockResolvedValue(null)
      const fakeCreated = { id: 1, sustainability: true }
      mockTransversalAxis.create.mockResolvedValue(fakeCreated as any)

      await TransversalAxisController.createOrUpdate(req as Request, res as Response)

      expect(mockTransversalAxis.create).toHaveBeenCalledWith(
        expect.objectContaining({ planningId: 10 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockPlanning.findOne.mockRejectedValue(new Error('DB Error'))

      await TransversalAxisController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ─── get ─────────────────────────────────────────────────────

  describe('get', () => {
    it('debe retornar los ejes transversales', async () => {
      req.params = { planningId: '10' }
      const fakeData = { id: 1, sustainability: true }
      mockTransversalAxis.findOne.mockResolvedValue(fakeData as any)

      await TransversalAxisController.get(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(fakeData)
    })

    it('debe retornar 404 si no existen', async () => {
      req.params = { planningId: '10' }
      mockTransversalAxis.findOne.mockResolvedValue(null)

      await TransversalAxisController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Ejes transversales no encontrados',
      })
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockTransversalAxis.findOne.mockRejectedValue(new Error('DB Error'))

      await TransversalAxisController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
})
