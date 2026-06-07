import fs from 'fs'
import path from 'path'
import { SeedUser, users as demoUsers } from '../data/users'

const ROLES = new Set([
  'Docente',
  'Jefe de Departamento',
  'Administrador',
])

type SeedUsersSource = {
  users: SeedUser[]
  source: 'demo' | 'file' | 'json' | 'json_base64'
}

const parseUsersPayload = (payload: string) => {
  const parsed = JSON.parse(payload) as unknown

  if (Array.isArray(parsed)) return parsed

  if (
    parsed &&
    typeof parsed === 'object' &&
    Array.isArray((parsed as { users?: unknown }).users)
  ) {
    return (parsed as { users: unknown[] }).users
  }

  throw new Error('El payload de usuarios debe ser un arreglo o un objeto { users: [] }')
}

const assertSeedUser = (value: unknown, index: number): SeedUser => {
  if (!value || typeof value !== 'object') {
    throw new Error(`El usuario privado en índice ${index} no es un objeto válido`)
  }

  const user = value as Partial<SeedUser>

  if (!user.name || typeof user.name !== 'string') {
    throw new Error(`El usuario privado en índice ${index} no tiene name válido`)
  }

  if (!user.email || typeof user.email !== 'string') {
    throw new Error(`El usuario privado en índice ${index} no tiene email válido`)
  }

  if (!user.password || typeof user.password !== 'string') {
    throw new Error(`El usuario privado en índice ${index} no tiene password válido`)
  }

  if (!user.role || !ROLES.has(user.role)) {
    throw new Error(`El usuario privado ${user.email} no tiene role válido`)
  }

  if (
    typeof user.academyId !== 'number' &&
    user.academyId !== null
  ) {
    throw new Error(`El usuario privado ${user.email} no tiene academyId válido`)
  }

  if (typeof user.confirmed !== 'boolean') {
    throw new Error(`El usuario privado ${user.email} no tiene confirmed válido`)
  }

  if (
    user.mustChangePassword !== undefined &&
    typeof user.mustChangePassword !== 'boolean'
  ) {
    throw new Error(
      `El usuario privado ${user.email} tiene mustChangePassword inválido`
    )
  }

  if (user.isActive !== undefined && typeof user.isActive !== 'boolean') {
    throw new Error(`El usuario privado ${user.email} tiene isActive inválido`)
  }

  if (
    user.subjectCodes &&
    (!Array.isArray(user.subjectCodes) ||
      user.subjectCodes.some((code) => typeof code !== 'string'))
  ) {
    throw new Error(`El usuario privado ${user.email} tiene subjectCodes inválido`)
  }

  return {
    name: user.name,
    email: user.email.toLowerCase().trim(),
    password: user.password,
    academyId: user.academyId,
    role: user.role,
    confirmed: user.confirmed,
    mustChangePassword: user.mustChangePassword,
    isActive: user.isActive,
    subjectCodes: user.subjectCodes || [],
  }
}

const validateUsers = (values: unknown[]) =>
  values.map((value, index) => assertSeedUser(value, index))

export const loadSeedUsers = ({
  requirePrivateUsers = false,
}: {
  requirePrivateUsers?: boolean
} = {}): SeedUsersSource => {
  if (process.env.SEED_USERS_FILE) {
    const filePath = path.resolve(process.env.SEED_USERS_FILE)
    return {
      users: validateUsers(parseUsersPayload(fs.readFileSync(filePath, 'utf8'))),
      source: 'file',
    }
  }

  if (process.env.SEED_USERS_JSON_BASE64) {
    return {
      users: validateUsers(
        parseUsersPayload(
          Buffer.from(process.env.SEED_USERS_JSON_BASE64, 'base64').toString('utf8')
        )
      ),
      source: 'json_base64',
    }
  }

  if (process.env.SEED_USERS_JSON) {
    return {
      users: validateUsers(parseUsersPayload(process.env.SEED_USERS_JSON)),
      source: 'json',
    }
  }

  if (requirePrivateUsers) {
    throw new Error(
      'Configura SEED_USERS_FILE, SEED_USERS_JSON_BASE64 o SEED_USERS_JSON para cargar usuarios reales'
    )
  }

  return {
    users: demoUsers,
    source: 'demo',
  }
}
