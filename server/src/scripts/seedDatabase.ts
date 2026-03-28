import { db } from '@/config/db'
import colors from 'colors'
import { seedAcademies } from './seeds/seedAcademies'
import { seedSubjects } from './seeds/seedSubjects'
import { seedUsers } from './seeds/seedUsers'

import { seedStudyPlans } from './seeds/seedStudyPlans'

async function runSeeds() {
  try {
    console.log(colors.yellow.bold('Starting database seeding...'))
    await db.authenticate()

    console.log(colors.green('Database connection established'))

    console.log(colors.cyan.bold('0. Seeding Study Plans'))
    await seedStudyPlans()

    console.log(colors.cyan.bold('1. Seeding Academies'))
    await seedAcademies()

    console.log(colors.cyan.bold('\n2. Seeding Subjects'))
    await seedSubjects()

    console.log(colors.cyan.bold('\n3. Seeding Users'))
    await seedUsers()

    console.log(colors.green.bold('Database seeding completed successfully'))
    process.exit(0)
  } catch (error) {
    console.error(colors.red.bold('Seeding failed:'), error)
    process.exit(1)
  }
}

runSeeds()
