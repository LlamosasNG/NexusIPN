import { randomInt } from 'crypto'

const GROUPS = [
  'ABCDEFGHJKLMNPQRSTUVWXYZ',
  'abcdefghijkmnopqrstuvwxyz',
  '23456789',
  '!@#$%&*?',
]
const ALL_CHARACTERS = GROUPS.join('')

const randomCharacter = (characters: string) =>
  characters[randomInt(0, characters.length)]

export const generateTemporaryPassword = (length = 16) => {
  if (length < GROUPS.length) {
    throw new Error('La contraseña temporal debe tener al menos 4 caracteres')
  }

  const characters = GROUPS.map(randomCharacter)
  while (characters.length < length) {
    characters.push(randomCharacter(ALL_CHARACTERS))
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index + 1)
    ;[characters[index], characters[swapIndex]] = [
      characters[swapIndex],
      characters[index],
    ]
  }

  return characters.join('')
}
