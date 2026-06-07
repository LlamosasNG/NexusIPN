import { Request, Response } from 'express'

jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
  },
}))
jest.mock('@/models/Academy', () => ({
  __esModule: true,
  default: {},
}))
jest.mock('@/models/Subject', () => ({
  __esModule: true,
  default: {},
}))
jest.mock('@/services/UserAccountService', () => ({
  AccountManagementError: class AccountManagementError extends Error {
    constructor(
      message: string,
      readonly status: number
    ) {
      super(message)
    }
  },
  UserAccountService: {
    createDepartmentHead: jest.fn(),
    createTeacher: jest.fn(),
    updateDepartmentHead: jest.fn(),
    updateTeacher: jest.fn(),
    setActive: jest.fn(),
    resetTemporaryPassword: jest.fn(),
  },
}))

import { UserManagementController } from '@/controllers/UserManagementController'
import { UserAccountService } from '@/services/UserAccountService'

const mockService = UserAccountService as jest.Mocked<
  typeof UserAccountService
>

describe('UserManagementController', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { academyId: 3 } as any,
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  it('crea un Jefe de Departamento mediante el servicio', async () => {
    req.body = {
      name: 'Jefe Clínicas',
      email: 'jefe@example.edu.mx',
      academyId: 3,
    }
    mockService.createDepartmentHead.mockResolvedValue({
      user: { id: 8, ...req.body } as any,
      notificationSent: true,
    })

    await UserManagementController.createDepartmentHead(
      req as Request,
      res as Response
    )

    expect(mockService.createDepartmentHead).toHaveBeenCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ notificationSent: true })
    )
  })

  it('fuerza la academia del jefe al crear un docente', async () => {
    req.body = {
      name: 'Docente',
      email: 'docente@example.edu.mx',
      academyId: 99,
      subjectIds: [1],
      period: '2026-1',
    }
    mockService.createTeacher.mockResolvedValue({
      user: { id: 9 } as any,
      notificationSent: false,
    })

    await UserManagementController.createTeacher(
      req as Request,
      res as Response
    )

    expect(mockService.createTeacher).toHaveBeenCalledWith(req.body, 3)
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
