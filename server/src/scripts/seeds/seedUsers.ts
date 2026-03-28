import Subject from '@/models/Subject'
import User from '@/models/User'
import UserSubject from '@/models/UserSubject'
import { hashPassword } from '@/utils/auth'
import colors from 'colors'
import { users } from '../data/users'

export async function seedUsers() {
  try {
    const count = await User.count()
    if (count === 0) {
      // Hash passwords before creating users
      const usersWithHashedPasswords = await Promise.all(
        users.map(async (user) => ({
          name: user.name,
          email: user.email,
          password: await hashPassword(user.password),
          academyId: user.academyId,
          role: user.role,
          confirmed: user.confirmed,
        }))
      )

      // Create users
      const createdUsers = await User.bulkCreate(usersWithHashedPasswords)

      // Get all subjects to map codes to IDs
      const subjects = await Subject.findAll()
      const subjectMap = new Map(subjects.map((s) => [s.code, s.id]))

      // Assign subjects to users
      const userSubjects = []
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const createdUser = createdUsers[i]

        if (user.subjectCodes && user.subjectCodes.length > 0) {
          for (const code of user.subjectCodes) {
            const subjectId = subjectMap.get(code)
            if (subjectId) {
              userSubjects.push({
                userId: createdUser.id,
                subjectId,
                period: new Date().getFullYear().toString(),
                active: true,
              })
            }
          }
        }
      }

      // Create user-subject associations
      if (userSubjects.length > 0) {
        await UserSubject.bulkCreate(userSubjects)
      }

      console.log(colors.green('Loading Users...'))
    } else {
      console.log(colors.yellow('Users already exist, skipping'))
    }
  } catch (error) {
    console.error(colors.red('Error loading users:'), error)
    throw error
  }
}
