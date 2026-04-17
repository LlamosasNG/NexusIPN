import { Request, Response } from 'express'

jest.mock('@/models/Academy', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
  },
}))

import { AcademyController } from '@/controllers/AcademyController'
import Academy from '@/models/Academy'

const mockAcademy = Academy as jest.Mocked<typeof Academy>

describe('AcademyController', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  describe('getAcademies', () => {
    it('debe retornar la lista de academias', async () => {
      const fakeAcademies = [
        { id: 1, name: 'Homeopatía', description: 'Desc 1' },
        { id: 2, name: 'Acupuntura', description: 'Desc 2' },
      ]
      mockAcademy.findAll.mockResolvedValue(fakeAcademies as any)

      await AcademyController.getAcademies(req as Request, res as Response)

      expect(mockAcademy.findAll).toHaveBeenCalledWith({
        attributes: ['id', 'name', 'description'],
        order: [['createdAt', 'DESC']],
      })
      expect(res.json).toHaveBeenCalledWith(fakeAcademies)
    })

    it('debe retornar 500 si ocurre un error', async () => {
      mockAcademy.findAll.mockRejectedValue(new Error('DB Error'))

      await AcademyController.getAcademies(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error al obtener las academias',
      })
    })
  })
})
