import api from '@/lib/axios'
import type { CreatePlanningData, SubjectCard } from '@/types'
import { isAxiosError } from 'axios'

type PlanningAPIProps = {
  subjectId: SubjectCard['id']
  period: CreatePlanningData['period']
}

export async function createPlanning({ subjectId, period }: PlanningAPIProps) {
  try {
    const { data } = await api.post<string>(
      `/plannings/create/${subjectId}`,
      period
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
