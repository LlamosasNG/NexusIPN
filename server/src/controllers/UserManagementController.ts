import Academy from '@/models/Academy'
import Subject from '@/models/Subject'
import User from '@/models/User'
import {
  AccountManagementError,
  UserAccountService,
} from '@/services/UserAccountService'
import { Request, Response } from 'express'

const attributes = [
  'id',
  'name',
  'email',
  'role',
  'academyId',
  'isActive',
  'mustChangePassword',
  'createdAt',
]

const respondError = (res: Response, error: unknown) => {
  if (error instanceof AccountManagementError) {
    return res.status(error.status).json({ error: error.message })
  }
  console.log(error)
  return res.status(500).json({ error: 'No fue posible gestionar la cuenta' })
}

const managedResponse = (
  user: User,
  notificationSent?: boolean,
  message = 'Cuenta actualizada correctamente'
) => {
  const serializedUser =
    typeof user.toJSON === 'function' ? user.toJSON() : user
  const {
    password: _password,
    token: _token,
    ...safeUser
  } = serializedUser as User['dataValues']

  return {
    message,
    data: safeUser,
    ...(notificationSent === undefined ? {} : { notificationSent }),
  }
}

export class UserManagementController {
  static listDepartmentHeads = async (_req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        where: { role: 'Jefe de Departamento' },
        attributes,
        include: [{ model: Academy, attributes: ['id', 'name'] }],
        order: [['name', 'ASC']],
      })
      res.json(users)
    } catch (error) {
      respondError(res, error)
    }
  }

  static createDepartmentHead = async (req: Request, res: Response) => {
    try {
      const result = await UserAccountService.createDepartmentHead(req.body)
      res.status(201).json(
        managedResponse(
          result.user,
          result.notificationSent,
          result.notificationSent
            ? 'Jefe de Departamento creado y credenciales enviadas'
            : 'Jefe de Departamento creado; no fue posible enviar el correo'
        )
      )
    } catch (error) {
      respondError(res, error)
    }
  }

  static updateDepartmentHead = async (req: Request, res: Response) => {
    try {
      const user = await UserAccountService.updateDepartmentHead(
        Number(req.params.userId),
        req.body
      )
      res.json(managedResponse(user))
    } catch (error) {
      respondError(res, error)
    }
  }

  static listTeachers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        where: { role: 'Docente', academyId: req.user.academyId },
        attributes,
        include: [
          { model: Academy, attributes: ['id', 'name'] },
          {
            model: Subject,
            attributes: ['id', 'name', 'code'],
            through: { attributes: ['period', 'active'] },
          },
        ],
        order: [['name', 'ASC']],
      })
      res.json(users)
    } catch (error) {
      respondError(res, error)
    }
  }

  static createTeacher = async (req: Request, res: Response) => {
    try {
      const result = await UserAccountService.createTeacher(
        req.body,
        req.user.academyId
      )
      res.status(201).json(
        managedResponse(
          result.user,
          result.notificationSent,
          result.notificationSent
            ? 'Docente creado y credenciales enviadas'
            : 'Docente creado; no fue posible enviar el correo'
        )
      )
    } catch (error) {
      respondError(res, error)
    }
  }

  static updateTeacher = async (req: Request, res: Response) => {
    try {
      const user = await UserAccountService.updateTeacher(
        Number(req.params.userId),
        req.body,
        req.user.academyId
      )
      res.json(managedResponse(user))
    } catch (error) {
      respondError(res, error)
    }
  }

  static setDepartmentHeadActive = async (req: Request, res: Response) => {
    try {
      const user = await UserAccountService.setActive({
        userId: Number(req.params.userId),
        role: 'Jefe de Departamento',
        isActive: req.body.isActive,
      })
      res.json(managedResponse(user))
    } catch (error) {
      respondError(res, error)
    }
  }

  static setTeacherActive = async (req: Request, res: Response) => {
    try {
      const user = await UserAccountService.setActive({
        userId: Number(req.params.userId),
        role: 'Docente',
        academyId: req.user.academyId,
        isActive: req.body.isActive,
      })
      res.json(managedResponse(user))
    } catch (error) {
      respondError(res, error)
    }
  }

  static resetDepartmentHeadPassword = async (
    req: Request,
    res: Response
  ) => {
    try {
      const result = await UserAccountService.resetTemporaryPassword({
        userId: Number(req.params.userId),
        role: 'Jefe de Departamento',
      })
      res.json(
        managedResponse(
          result.user,
          result.notificationSent,
          result.notificationSent
            ? 'Contraseña temporal regenerada y enviada'
            : 'Contraseña regenerada; no fue posible enviar el correo'
        )
      )
    } catch (error) {
      respondError(res, error)
    }
  }

  static resetTeacherPassword = async (req: Request, res: Response) => {
    try {
      const result = await UserAccountService.resetTemporaryPassword({
        userId: Number(req.params.userId),
        role: 'Docente',
        academyId: req.user.academyId,
      })
      res.json(
        managedResponse(
          result.user,
          result.notificationSent,
          result.notificationSent
            ? 'Contraseña temporal regenerada y enviada'
            : 'Contraseña regenerada; no fue posible enviar el correo'
        )
      )
    } catch (error) {
      respondError(res, error)
    }
  }
}
