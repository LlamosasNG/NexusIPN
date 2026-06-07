import api from '@/lib/axios'
import { AcademySchema } from '@/types'
import { isAxiosError } from 'axios'
import { z } from 'zod'

export async function getAcademies() {
  try {
    const { data } = await api.get('/academies')
    return z.array(AcademySchema).parse(data)
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw error
  }
}
