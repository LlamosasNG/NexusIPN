import { db } from '@/config/db'
import colors from 'colors'
import { seedUsers } from './seeds/seedUsers'

async function seedPrivateUsers() {
  try {
    console.log(colors.yellow.bold('Starting private users seeding...'))
    await db.authenticate()

    await seedUsers({
      requirePrivateUsers: true,
      updateExistingPasswords: true,
    })

    console.log(colors.green.bold('Private users seeding completed successfully'))
    await db.close()
    process.exit(0)
  } catch (error) {
    console.error(colors.red.bold('Private users seeding failed:'), error)
    await db.close()
    process.exit(1)
  }
}

seedPrivateUsers()
