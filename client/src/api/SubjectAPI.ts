import api from '@/lib/axios'
import { SubjectCardSchema } from '@/types'
import { isAxiosError } from 'axios'
import { z } from 'zod'

export async function getUserSubjects() {
  try {
    const { data } = await api('/subjects/my-subjects')
    const response = z.array(SubjectCardSchema).safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
