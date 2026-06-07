import api from '@/lib/axios'
import {
  ManagedUserListSchema,
  ManagedUserResponseSchema,
  type ManagedUserInput,
} from '@/types'
import { isAxiosError } from 'axios'

const apiError = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    throw new Error(
      error.response.data.error ||
        error.response.data.errors?.[0]?.msg ||
        'No fue posible gestionar la cuenta'
    )
  }
  throw error
}

export async function getDepartmentHeads() {
  try {
    const { data } = await api.get('/admin/department-heads')
    return ManagedUserListSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function getTeachers() {
  try {
    const { data } = await api.get('/department-head/teachers')
    return ManagedUserListSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function createDepartmentHead(input: ManagedUserInput) {
  try {
    const { data } = await api.post('/admin/department-heads', input)
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function createTeacher(input: ManagedUserInput) {
  try {
    const { data } = await api.post('/department-head/teachers', input)
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function updateDepartmentHead({
  userId,
  input,
}: {
  userId: number
  input: ManagedUserInput
}) {
  try {
    const { data } = await api.put(`/admin/department-heads/${userId}`, input)
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function updateTeacher({
  userId,
  input,
}: {
  userId: number
  input: ManagedUserInput
}) {
  try {
    const { data } = await api.put(
      `/department-head/teachers/${userId}`,
      input
    )
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function setManagedUserStatus({
  mode,
  userId,
  isActive,
}: {
  mode: 'admin' | 'department-head'
  userId: number
  isActive: boolean
}) {
  try {
    const path =
      mode === 'admin'
        ? `/admin/department-heads/${userId}/status`
        : `/department-head/teachers/${userId}/status`
    const { data } = await api.patch(path, { isActive })
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}

export async function resetManagedUserPassword({
  mode,
  userId,
}: {
  mode: 'admin' | 'department-head'
  userId: number
}) {
  try {
    const path =
      mode === 'admin'
        ? `/admin/department-heads/${userId}/reset-password`
        : `/department-head/teachers/${userId}/reset-password`
    const { data } = await api.post(path)
    return ManagedUserResponseSchema.parse(data)
  } catch (error) {
    apiError(error)
  }
}
