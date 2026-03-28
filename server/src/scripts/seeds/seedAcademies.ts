import colors from 'colors'
import Academy from '../../models/Academy'
import { academies } from '../data/academies'

export async function seedAcademies() {
  try {
    const count = await Academy.count()
    if (count === 0) {
      await Academy.bulkCreate(academies)
      console.log(colors.green('Loading Academies...'))
    } else {
      console.log(colors.yellow('Academies already exist, skipping'))
    }
  } catch (error) {
    console.error(colors.red('Error loading academies:'), error)
    throw error
  }
}
