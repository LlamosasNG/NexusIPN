import StudyPlan from '@/models/StudyPlan'
import { studyPlans } from '../data/studyPlans'

export const seedStudyPlans = async () => {
  try {
    for (const plan of studyPlans) {
      await StudyPlan.findOrCreate({
        where: { name: plan.name },
        defaults: plan,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
