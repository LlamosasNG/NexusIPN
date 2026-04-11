import api from '@/lib/axios'
import { GeneralDataSchema, type GeneralDataFormValues } from '@/types'
import { isAxiosError } from 'axios'

type CreateGeneralData = {
  planningId: string
  formData: GeneralDataFormValues
}

export async function createGeneralData({
  planningId,
  formData,
}: CreateGeneralData) {
  try {
    const { data } = await api.post<string>(
      `/plannings/${planningId}/general-data`,
      formData
    )
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getGeneralData(planningId: string) {
  try {
    const { data } = await api(`/plannings/${planningId}/general-data`)
    const response = GeneralDataSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
    return null
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    return null
  }
}
