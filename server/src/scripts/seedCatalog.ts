import { db } from '@/config/db'
import colors from 'colors'
import { seedAcademies } from './seeds/seedAcademies'
import { seedStudyPlans } from './seeds/seedStudyPlans'
import { seedSubjects } from './seeds/seedSubjects'

async function seedCatalog() {
  try {
    console.log(colors.yellow.bold('Starting catalog seeding...'))
    await db.authenticate()

    console.log(colors.green('Database connection established'))

    console.log(colors.cyan.bold('0. Seeding Study Plans'))
    await seedStudyPlans()

    console.log(colors.cyan.bold('1. Seeding Academies'))
    await seedAcademies()

    console.log(colors.cyan.bold('2. Seeding Subjects'))
    await seedSubjects()

    console.log(colors.green.bold('Catalog seeding completed successfully'))
    await db.close()
    process.exit(0)
  } catch (error) {
    console.error(colors.red.bold('Catalog seeding failed:'), error)
    await db.close()
    process.exit(1)
  }
}

seedCatalog()
