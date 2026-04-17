import { hashPassword, checkPassword } from '@/utils/auth'

describe('Utils — auth', () => {
  const plainPassword = 'MiContraseña123!'

  describe('hashPassword', () => {
    it('debe devolver un hash diferente al password original', async () => {
      const hash = await hashPassword(plainPassword)
      expect(hash).not.toBe(plainPassword)
      expect(hash.length).toBeGreaterThan(0)
    })

    it('debe generar hashes diferentes para el mismo password (salt aleatorio)', async () => {
      const hash1 = await hashPassword(plainPassword)
      const hash2 = await hashPassword(plainPassword)
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('checkPassword', () => {
    it('debe retornar true cuando el password coincide con el hash', async () => {
      const hash = await hashPassword(plainPassword)
      const result = await checkPassword(plainPassword, hash)
      expect(result).toBe(true)
    })

    it('debe retornar false cuando el password no coincide', async () => {
      const hash = await hashPassword(plainPassword)
      const result = await checkPassword('PasswordIncorrecto', hash)
      expect(result).toBe(false)
    })
  })
})
