import { Request, Response } from 'express'

jest.mock('@/models/GeneralData', () => ({
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

import { GeneralDataController } from '@/controllers/GeneralDataController'
import GeneralData from '@/models/GeneralData'
import Planning from '@/models/Planning'

const mockGeneralData = GeneralData as jest.Mocked<typeof GeneralData>
const mockPlanning = Planning as jest.Mocked<typeof Planning>

describe('GeneralDataController', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      body: { academicUnit: 'ENMH', program: 'Plan 2020' },
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

      await GeneralDataController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Planeación no encontrada',
      })
    })

    it('debe actualizar los datos si ya existen', async () => {
      req.params = { planningId: '10' }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      const fakeExisting = {
        update: jest.fn().mockResolvedValue(undefined),
      }
      mockGeneralData.findOne.mockResolvedValue(fakeExisting as any)

      await GeneralDataController.createOrUpdate(req as Request, res as Response)

      expect(fakeExisting.update).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith('Datos generales actualizados')
    })

    it('debe crear los datos si no existen', async () => {
      req.params = { planningId: '10' }
      mockPlanning.findOne.mockResolvedValue({ id: 10 } as any)
      mockGeneralData.findOne.mockResolvedValue(null)
      mockGeneralData.create.mockResolvedValue({} as any)

      await GeneralDataController.createOrUpdate(req as Request, res as Response)

      expect(mockGeneralData.create).toHaveBeenCalledWith(
        expect.objectContaining({ planningId: 10 })
      )
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith('Datos generales guardados')
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockPlanning.findOne.mockRejectedValue(new Error('DB Error'))

      await GeneralDataController.createOrUpdate(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ─── get ─────────────────────────────────────────────────────

  describe('get', () => {
    it('debe retornar los datos generales', async () => {
      req.params = { planningId: '10' }
      const fakeData = { id: 1, academicUnit: 'ENMH' }
      mockGeneralData.findOne.mockResolvedValue(fakeData as any)

      await GeneralDataController.get(req as Request, res as Response)

      expect(res.json).toHaveBeenCalledWith(fakeData)
    })

    it('debe retornar 404 si no existen datos generales', async () => {
      req.params = { planningId: '10' }
      mockGeneralData.findOne.mockResolvedValue(null)

      await GeneralDataController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Datos generales no encontrados',
      })
    })

    it('debe retornar 500 si ocurre un error', async () => {
      req.params = { planningId: '10' }
      mockGeneralData.findOne.mockRejectedValue(new Error('DB Error'))

      await GeneralDataController.get(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
})
