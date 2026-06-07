import api from '@/lib/axios'
import { SubjectCardListSchema, SubjectSchema } from '@/types'
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

export async function getSubjectById(subjectId: number) {
  try {
    const { data } = await api(`/subjects/${subjectId}`)
    const response = SubjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getSubjectsByAcademy(academyId: number) {
  try {
    const { data } = await api(`/subjects/academy/${academyId}`)
    return SubjectSchema.array().parse(data)
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw error
  }
}
