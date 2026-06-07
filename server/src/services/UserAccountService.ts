import { db } from '@/config/db'
import { AuthEmail } from '@/emails/AuthEmail'
import Academy from '@/models/Academy'
import Subject from '@/models/Subject'
import User from '@/models/User'
import UserSubject from '@/models/UserSubject'
import { normalizeAcademicPeriod } from '@/utils/academicPeriod'
import { hashPassword } from '@/utils/auth'
import { generateTemporaryPassword } from '@/utils/temporaryPassword'
import { Op, Transaction } from 'sequelize'

export type ManagedRole = 'Docente' | 'Jefe de Departamento'

type ManagedUserInput = {
  name: string
  email: string
  academyId: number
}

type TeacherInput = ManagedUserInput & {
  subjectIds: number[]
  period: string
}

export class AccountManagementError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
  }
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const ensureAcademy = async (academyId: number, transaction?: Transaction) => {
  const academy = await Academy.findByPk(academyId, { transaction })
  if (!academy) {
    throw new AccountManagementError('La academia seleccionada no existe', 404)
  }
  return academy
}

const ensureUniqueEmail = async (
  email: string,
  excludedUserId?: number,
  transaction?: Transaction
) => {
  const user = await User.findOne({
    where: {
      email,
      ...(excludedUserId ? { id: { [Op.ne]: excludedUserId } } : {}),
    },
    transaction,
  })
  if (user) {
    throw new AccountManagementError(
      'Un usuario con este correo ya existe',
      409
    )
  }
}

const ensureHeadAvailability = async (
  academyId: number,
  excludedUserId?: number,
  transaction?: Transaction
) => {
  const existingHead = await User.findOne({
    where: {
      academyId,
      role: 'Jefe de Departamento',
      isActive: true,
      ...(excludedUserId ? { id: { [Op.ne]: excludedUserId } } : {}),
    },
    transaction,
  })
  if (existingHead) {
    throw new AccountManagementError(
      'La academia ya tiene un Jefe de Departamento activo',
      409
    )
  }
}

const ensureTeacherSubjects = async (
  academyId: number,
  subjectIds: number[],
  transaction: Transaction
) => {
  const uniqueIds = [...new Set(subjectIds)]
  if (uniqueIds.length < 1 || uniqueIds.length > 5) {
    throw new AccountManagementError(
      'Debes seleccionar entre 1 y 5 unidades de aprendizaje',
      400
    )
  }

  const subjects = await Subject.findAll({
    where: { id: uniqueIds, academyId },
    transaction,
  })
  if (subjects.length !== uniqueIds.length) {
    throw new AccountManagementError(
      'Todas las unidades de aprendizaje deben pertenecer a la academia',
      400
    )
  }
  return uniqueIds
}

const createBaseUser = async (
  input: ManagedUserInput,
  role: ManagedRole,
  transaction: Transaction
) => {
  const email = normalizeEmail(input.email)
  await ensureAcademy(input.academyId, transaction)
  await ensureUniqueEmail(email, undefined, transaction)
  if (role === 'Jefe de Departamento') {
    await ensureHeadAvailability(input.academyId, undefined, transaction)
  }

  const temporaryPassword = generateTemporaryPassword()
  const user = await User.create(
    {
      name: input.name.trim(),
      email,
      academyId: input.academyId,
      role,
      password: await hashPassword(temporaryPassword),
      confirmed: true,
      isActive: true,
      mustChangePassword: true,
      passwordChangedAt: null,
      token: null,
    },
    { transaction }
  )
  return { user, temporaryPassword }
}

const sendCredentials = async (
  user: User,
  temporaryPassword: string,
  role: ManagedRole
) => {
  try {
    await AuthEmail.sendTemporaryCredentialsEmail({
      name: user.name,
      email: user.email,
      temporaryPassword,
      role,
    })
    return true
  } catch {
    return false
  }
}

export class UserAccountService {
  static createDepartmentHead = async (input: ManagedUserInput) => {
    const result = await db.transaction((transaction) =>
      createBaseUser(input, 'Jefe de Departamento', transaction)
    )
    return {
      user: result.user,
      notificationSent: await sendCredentials(
        result.user,
        result.temporaryPassword,
        'Jefe de Departamento'
      ),
    }
  }

  static createTeacher = async (input: TeacherInput, academyId: number) => {
    const result = await db.transaction(async (transaction) => {
      const subjectIds = await ensureTeacherSubjects(
        academyId,
        input.subjectIds,
        transaction
      )
      const account = await createBaseUser(
        { ...input, academyId },
        'Docente',
        transaction
      )
      const period = normalizeAcademicPeriod(input.period)
      await UserSubject.bulkCreate(
        subjectIds.map((subjectId) => ({
          userId: account.user.id,
          subjectId,
          period,
          active: true,
        })),
        { transaction }
      )
      return account
    })
    return {
      user: result.user,
      notificationSent: await sendCredentials(
        result.user,
        result.temporaryPassword,
        'Docente'
      ),
    }
  }

  static updateDepartmentHead = async (
    userId: number,
    input: ManagedUserInput
  ) =>
    db.transaction(async (transaction) => {
      const user = await User.findOne({
        where: { id: userId, role: 'Jefe de Departamento' },
        transaction,
      })
      if (!user) {
        throw new AccountManagementError(
          'Jefe de Departamento no encontrado',
          404
        )
      }
      const email = normalizeEmail(input.email)
      await ensureAcademy(input.academyId, transaction)
      await ensureUniqueEmail(email, user.id, transaction)
      if (user.isActive) {
        await ensureHeadAvailability(input.academyId, user.id, transaction)
      }
      await user.update(
        { name: input.name.trim(), email, academyId: input.academyId },
        { transaction }
      )
      return user
    })

  static updateTeacher = async (
    userId: number,
    input: TeacherInput,
    academyId: number
  ) =>
    db.transaction(async (transaction) => {
      const user = await User.findOne({
        where: { id: userId, role: 'Docente', academyId },
        transaction,
      })
      if (!user) {
        throw new AccountManagementError('Docente no encontrado', 404)
      }
      const email = normalizeEmail(input.email)
      await ensureUniqueEmail(email, user.id, transaction)
      const subjectIds = await ensureTeacherSubjects(
        academyId,
        input.subjectIds,
        transaction
      )
      await user.update({ name: input.name.trim(), email }, { transaction })
      await UserSubject.destroy({ where: { userId }, transaction })
      const period = normalizeAcademicPeriod(input.period)
      await UserSubject.bulkCreate(
        subjectIds.map((subjectId) => ({
          userId,
          subjectId,
          period,
          active: true,
        })),
        { transaction }
      )
      return user
    })

  static setActive = async ({
    userId,
    role,
    isActive,
    academyId,
  }: {
    userId: number
    role: ManagedRole
    isActive: boolean
    academyId?: number
  }) =>
    db.transaction(async (transaction) => {
      const user = await User.findOne({
        where: {
          id: userId,
          role,
          ...(academyId ? { academyId } : {}),
        },
        transaction,
      })
      if (!user) {
        throw new AccountManagementError('Usuario no encontrado', 404)
      }
      if (role === 'Jefe de Departamento' && isActive) {
        await ensureHeadAvailability(user.academyId, user.id, transaction)
      }
      user.isActive = isActive
      await user.save({ transaction })
      return user
    })

  static resetTemporaryPassword = async ({
    userId,
    role,
    academyId,
  }: {
    userId: number
    role: ManagedRole
    academyId?: number
  }) => {
    const temporaryPassword = generateTemporaryPassword()
    const user = await User.findOne({
      where: {
        id: userId,
        role,
        ...(academyId ? { academyId } : {}),
      },
    })
    if (!user) {
      throw new AccountManagementError('Usuario no encontrado', 404)
    }
    user.password = await hashPassword(temporaryPassword)
    user.mustChangePassword = true
    user.passwordChangedAt = null
    user.token = null
    await user.save()
    return {
      user,
      notificationSent: await sendCredentials(user, temporaryPassword, role),
    }
  }
}
