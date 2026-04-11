import api from '@/lib/axios'
import { SubjectCardListSchema } from '@/types'
import { isAxiosError } from 'axios'

export async function getUserSubjects() {
  try {
    const { data } = await api('/subjects/my-subjects')
    const response = SubjectCardListSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
