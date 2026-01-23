import Academy from '@/models/Academy'
import Subject from '@/models/Subject'
import { subjectsByAcademy } from '@/scripts/data/subjects'
import colors from 'colors'

export async function seedSubjects() {
  try {
    const subjectCount = await Subject.count()

    if (subjectCount === 0) {
      console.log(colors.cyan('📚 Loading subjects...'))
      const academies = await Academy.findAll()
      if (academies.length === 0) {
        throw new Error('No academies found. Please seed academies first.')
      }

      let totalSubjects = 0
      for (const academyData of subjectsByAcademy) {
        const academy = academies.find(
          (a) => a.name === academyData.academyName
        )
        if (academy) {
          const subjectsToCreate = academyData.subjects.map((subjectData) => ({
            ...subjectData,
            academyId: academy.id,
          }))

          await Subject.bulkCreate(subjectsToCreate)
          totalSubjects += subjectsToCreate.length

          console.log(
            colors.gray(
              `• ${subjectsToCreate.length} subjects for ${academy.name}`
            )
          )
        } else {
          console.log(
            colors.yellow(`⚠ Academy not found: ${academyData.academyName}`)
          )
        }
      }
      console.log(
        colors.green(`✓ ${totalSubjects} subjects seeded successfully`)
      )
    } else {
      console.log(colors.yellow('⚠ Subjects already exist, skipping'))
    }
  } catch (error) {
    console.error(colors.red('✗ Error seeding subjects:'), error)
    throw error
  }
}
