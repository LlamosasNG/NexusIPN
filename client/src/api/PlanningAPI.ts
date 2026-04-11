import api from '@/lib/axios'
import {
  PlanningListSchema,
  PlanningSubjectDetailsSchema,
  type CreatePlanningData,
  type SubjectCard,
} from '@/types'
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

export async function getPlannings() {
  try {
    const { data } = await api.get('/plannings')
    const response = PlanningListSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getPlanningById(planningId: number) {
  try {
    const { data } = await api.get(`/plannings/${planningId}`)
    const response = PlanningSubjectDetailsSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
