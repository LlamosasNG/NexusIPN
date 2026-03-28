import Academy from '@/models/Academy'
import StudyPlan from '@/models/StudyPlan'
import Subject from '@/models/Subject'
import SubjectStudyPlan from '@/models/SubjectStudyPlan'
import { subjectsByAcademy } from '@/scripts/data/subjects'
import colors from 'colors'

export async function seedSubjects() {
  try {
    const subjectCount = await Subject.count()

    if (subjectCount === 0) {
      console.log(colors.cyan('Loading subjects...'))
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
          const subjectsToCreate = academyData.subjects.map((subjectData) => {
            // Extraer unidades y competencias dinámicas (unit1..unitN, competencyUnit1..competencyUnitN)
            const units: { name: string; competency: string }[] = []
            let unitIndex = 1
            while (
              (subjectData as Record<string, unknown>)[`unit${unitIndex}`]
            ) {
              units.push({
                name: (subjectData as Record<string, unknown>)[
                  `unit${unitIndex}`
                ] as string,
                competency:
                  ((subjectData as Record<string, unknown>)[
                    `competencyUnit${unitIndex}`
                  ] as string) || '',
              })
              unitIndex++
            }

            // Separar los campos que no van directo al modelo
            const {
              studyPlans: studyPlanNamesRaw,
              ...rest
            } = subjectData

            // Eliminar los campos unitN y competencyUnitN del spread
            const cleanedRest: Record<string, unknown> = {}
            for (const [key, value] of Object.entries(rest)) {
              if (
                !key.match(/^unit\d+$/) &&
                !key.match(/^competencyUnit\d+$/)
              ) {
                cleanedRest[key] = value
              }
            }

            return {
              ...cleanedRest,
              studyPlanNames: studyPlanNamesRaw,
              units,
              academyId: academy.id,
            }
          })

          await Subject.bulkCreate(subjectsToCreate)
          totalSubjects += subjectsToCreate.length

          console.log(
            colors.gray(
              `- ${subjectsToCreate.length} subjects for ${academy.name}`
            )
          )
        } else {
          console.log(
            colors.yellow(`Academy not found: ${academyData.academyName}`)
          )
        }
      }
      console.log(colors.green(`${totalSubjects} subjects seeded successfully`))

      // Relacionar materias con planes de estudio
      const allSubjects = await Subject.findAll()
      const subjectMap = new Map(allSubjects.map((s) => [s.code, s.id]))

      const studyPlans = await StudyPlan.findAll()
      const studyPlanMap = new Map(studyPlans.map((sp) => [sp.name, sp.id]))

      const subjectStudyPlansToCreate: {
        subjectId: number
        studyPlanId: number
      }[] = []

      for (const academyData of subjectsByAcademy) {
        for (const subjectData of academyData.subjects) {
          const subjectId = subjectMap.get(subjectData.code)
          if (subjectId && subjectData.studyPlans) {
            for (const spName of subjectData.studyPlans) {
              const studyPlanId = studyPlanMap.get(spName)
              if (studyPlanId) {
                subjectStudyPlansToCreate.push({ subjectId, studyPlanId })
              }
            }
          }
        }
      }

      if (subjectStudyPlansToCreate.length > 0) {
        await SubjectStudyPlan.bulkCreate(subjectStudyPlansToCreate)
        console.log(
          colors.green(
            `Created ${subjectStudyPlansToCreate.length} study plan associations for subjects`
          )
        )
      }
    } else {
      console.log(colors.yellow('Subjects already exist, skipping'))
    }
  } catch (error) {
    console.error(colors.red('Error seeding subjects:'), error)
    throw error
  }
}
