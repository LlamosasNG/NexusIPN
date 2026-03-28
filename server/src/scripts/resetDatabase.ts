import { db } from '@/config/db'
import colors from 'colors'

async function resetDatabase() {
  try {
    console.log(colors.cyan.bold('Resetting database...'))
    await db.sync({ force: true })
    console.log(colors.green.bold('Database reset successfully.'))
    process.exit(0)
  } catch (error) {
    console.error(colors.red.bold('Error resetting database:'), error)
    process.exit(1)
  }
}

resetDatabase()
