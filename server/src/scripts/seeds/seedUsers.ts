import Subject from '@/models/Subject'
import User from '@/models/User'
import UserSubject from '@/models/UserSubject'
import { getCurrentAcademicPeriod } from '@/utils/academicPeriod'
import { hashPassword } from '@/utils/auth'
import colors from 'colors'
import { loadSeedUsers } from './loadSeedUsers'

type SeedUsersOptions = {
  requirePrivateUsers?: boolean
  updateExistingPasswords?: boolean
  markPasswordsAsTemporary?: boolean
}

export async function seedUsers({
  requirePrivateUsers = false,
  updateExistingPasswords = false,
  markPasswordsAsTemporary = false,
}: SeedUsersOptions = {}) {
  try {
    const { users, source } = loadSeedUsers({ requirePrivateUsers })

    const subjects = await Subject.findAll()
    const subjectMap = new Map(
      subjects.map((subject) => [
        subject.code,
        {
          id: subject.id,
          academyId: subject.academyId,
        },
      ])
    )

    const academicPeriod = getCurrentAcademicPeriod()
    let createdCount = 0
    let updatedCount = 0
    let assignmentCount = 0

    for (const user of users) {
      const existingUser = await User.findOne({
        where: { email: user.email },
      })

      const userPayload = {
        name: user.name,
        email: user.email,
        academyId: user.academyId,
        role: user.role,
        confirmed: user.confirmed,
      }
      const mustChangePassword =
        markPasswordsAsTemporary || user.mustChangePassword === true

      const passwordPolicyPayload = mustChangePassword
        ? {
            mustChangePassword: true,
            passwordChangedAt: null,
          }
        : {}

      let userId: number

      if (existingUser) {
        const updates: Record<string, unknown> = {
          ...userPayload,
          ...passwordPolicyPayload,
        }

        if (updateExistingPasswords) {
          updates.password = await hashPassword(user.password)
        }

        await existingUser.update(updates)
        userId = existingUser.id
        updatedCount++
      } else {
        const createdUser = await User.create({
          ...userPayload,
          ...passwordPolicyPayload,
          password: await hashPassword(user.password),
        })
        userId = createdUser.id
        createdCount++
      }

      if (user.subjectCodes && user.subjectCodes.length > 0) {
        for (const code of user.subjectCodes) {
          const subject = subjectMap.get(code)

          if (!subject) {
            throw new Error(`La materia ${code} no existe en el catálogo`)
          }

          if (subject.academyId !== user.academyId) {
            throw new Error(
              `La materia ${code} no pertenece a la academia configurada para uno de los usuarios`
            )
          }

          const [userSubject, created] = await UserSubject.findOrCreate({
            where: {
              userId,
              subjectId: subject.id,
              period: academicPeriod,
            },
            defaults: {
              userId,
              subjectId: subject.id,
              period: academicPeriod,
              active: true,
            },
          })

          if (created) {
            assignmentCount++
          } else if (!userSubject.active) {
            userSubject.active = true
            await userSubject.save()
          }
        }
      }
    }

    console.log(
      colors.green(
        `Users loaded from ${source}: ${createdCount} created, ${updatedCount} updated, ${assignmentCount} subject assignments created`
      )
    )
  } catch (error) {
    console.error(colors.red('Error loading users:'), error)
    throw error
  }
}
