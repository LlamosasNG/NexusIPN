import { Request, Response } from 'express'

jest.mock('@/models/PlagiarismTool', () => ({
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

import { PlagiarismToolController } from '@/controllers/PlagiarismToolController'
import PlagiarismTool from '@/models/PlagiarismTool'
import Planning from '@/models/Planning'

const mockPlagiarismTool = PlagiarismTool as jest.Mocked<typeof PlagiarismTool>
const mockPlanning = Planning as jest.Mocked<typeof Planning>

describe('PlagiarismToolController', () => {
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

      await PlagiarismToolController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Planeación no encontrada',
      })
    })

    it('debe actualizar si ya existe un registro', async () => {
      req.params = { planningId: '10' }
      req.body = { toolName: 'Turnitin', percentage: 15 }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      const fakeExisting = {
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockPlagiarismTool.findOne.mockResolvedValue(fakeExisting as any)

      await PlagiarismToolController.createOrUpdate(req as Request, res as Response)

      expect(fakeExisting.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Herramienta de plagio actualizada' })
      )
    })

    it('debe crear un nuevo registro si no existe', async () => {
      req.params = { planningId: '10' }
      req.body = { toolName: 'Turnitin', percentage: 15 }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      mockPlagiarismTool.findOne.mockResolvedValue(null)
      const fakeCreated = { id: 1, toolName: 'Turnitin' }
      mockPlagiarismTool.create.mockResolvedValue(fakeCreated as any)

      await PlagiarismToolController.createOrUpdate(req as Request, res as Response)

      expect(mockPlagiarismTool.create).toHaveBeenCalledWith(
        expect.objectContaining({ planningId: 10 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockPlanning.findOne.mockRejectedValue(new Error('DB Error'))

      await PlagiarismToolController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ─── get ─────────────────────────────────────────────────────

  describe('get', () => {
    it('debe retornar la herramienta de plagio', async () => {
      req.params = { planningId: '10' }
      const fakeData = { id: 1, toolName: 'Turnitin' }
      mockPlagiarismTool.findOne.mockResolvedValue(fakeData as any)

      await PlagiarismToolController.get(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(fakeData)
    })

    it('debe retornar 404 si no existe', async () => {
      req.params = { planningId: '10' }
      mockPlagiarismTool.findOne.mockResolvedValue(null)

      await PlagiarismToolController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockPlagiarismTool.findOne.mockRejectedValue(new Error('DB Error'))

      await PlagiarismToolController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
})
