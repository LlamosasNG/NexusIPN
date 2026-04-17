import { generateJWT } from '@/utils/jwt'
import jwt from 'jsonwebtoken'

describe('Utils — jwt', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, JWT_SECRET: 'test-secret-key-for-jest' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('debe generar un token JWT válido', () => {
    const userId = '42'
    const token = generateJWT(userId)

    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3) // header.payload.signature
  })

  it('debe contener el id del usuario en el payload', () => {
    const userId = '42'
    const token = generateJWT(userId)
    const decoded = jwt.verify(token, 'test-secret-key-for-jest') as jwt.JwtPayload

    expect(decoded.id).toBe(userId)
  })

  it('debe tener una expiración de 30 días', () => {
    const userId = '42'
    const token = generateJWT(userId)
    const decoded = jwt.verify(token, 'test-secret-key-for-jest') as jwt.JwtPayload

    const now = Math.floor(Date.now() / 1000)
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60
    // La expiración debe estar dentro de un rango razonable (±5 segundos)
    expect(decoded.exp! - decoded.iat!).toBe(thirtyDaysInSeconds)
  })
})
