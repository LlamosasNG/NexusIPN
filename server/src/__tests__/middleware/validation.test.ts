import { Request, Response, NextFunction } from 'express'
import { validationResult, Result, ValidationError } from 'express-validator'
import { handleInputErrors } from '@/middleware/validation'

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}))

const mockValidationResult = validationResult as unknown as jest.Mock

describe('Middleware — handleInputErrors', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    next = jest.fn()
  })

  it('debe llamar a next() cuando no hay errores de validación', () => {
    mockValidationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => [],
    })

    handleInputErrors(req as Request, res as Response, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('debe retornar 400 con los errores cuando hay errores de validación', () => {
    const errors = [
      { msg: 'El email es obligatorio', path: 'email' },
      { msg: 'El password es obligatorio', path: 'password' },
    ]
    mockValidationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => errors,
    })

    handleInputErrors(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ errors })
    expect(next).not.toHaveBeenCalled()
  })
})
