import { generateTemporaryPassword } from '@/utils/temporaryPassword'

describe('Utils — temporaryPassword', () => {
  it('genera una contraseña segura con los grupos de caracteres requeridos', () => {
    const password = generateTemporaryPassword()

    expect(password).toHaveLength(16)
    expect(password).toMatch(/[A-Z]/)
    expect(password).toMatch(/[a-z]/)
    expect(password).toMatch(/[0-9]/)
    expect(password).toMatch(/[^A-Za-z0-9]/)
  })

  it('genera valores distintos en llamadas consecutivas', () => {
    expect(generateTemporaryPassword()).not.toBe(generateTemporaryPassword())
  })
})
