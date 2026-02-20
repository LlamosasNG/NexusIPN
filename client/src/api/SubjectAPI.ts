import api from '@/lib/axios'
import { SubjectSchema } from '@/types'
import { isAxiosError } from 'axios'

export const getUserSubjects = async () => {
  try {
    const { data } = await api('/subjects/my-subjects')
    const response = SubjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
