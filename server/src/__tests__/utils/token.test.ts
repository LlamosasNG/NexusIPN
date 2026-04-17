import { generateToken } from '@/utils/token'

describe('Utils — token', () => {
  it('debe generar un string numérico de 6 dígitos', () => {
    const token = generateToken()

    expect(typeof token).toBe('string')
    expect(token).toHaveLength(6)
    expect(/^\d{6}$/.test(token)).toBe(true)
  })

  it('debe generar un número entre 100000 y 999999', () => {
    const token = generateToken()
    const num = parseInt(token, 10)

    expect(num).toBeGreaterThanOrEqual(100000)
    expect(num).toBeLessThanOrEqual(999999)
  })

  it('debe generar tokens diferentes en llamadas sucesivas (probabilístico)', () => {
    const tokens = new Set<string>()
    for (let i = 0; i < 50; i++) {
      tokens.add(generateToken())
    }
    // Con 50 tokens de 6 dígitos, es altamente improbable que todos sean iguales
    expect(tokens.size).toBeGreaterThan(1)
  })
})
