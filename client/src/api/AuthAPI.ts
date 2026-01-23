import api from '@/lib/axios'
import type {
  ConfirmToken,
  ForgotPasswordForm,
  LoginFormValues,
  NewPasswordForm,
  RegisterFormValues,
  RequestNewCodeForm,
} from '@/types'
import { isAxiosError } from 'axios'

export async function createAccount(formData: RegisterFormValues) {
  try {
    const { data } = await api.post<string>('/auth/create-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const { data } = await api.post<string>('/auth/confirm-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function login(formData: LoginFormValues) {
  try {
    const { data } = await api.post<string>('/auth/login', formData)
    localStorage.setItem('NEXUS_TOKEN', data)
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function requestNewCode(formData: RequestNewCodeForm) {
  try {
    const { data } = await api.post<string>('/auth/request-code', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<string>('/auth/forgot-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
    const { data } = await api.post<string>('/auth/validate-token', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function resetPassword({
  formData,
  token,
}: {
  formData: NewPasswordForm
  token: ConfirmToken['token']
}) {
  try {
    const { data } = await api.post<string>(
      `/auth/reset-password/${token}`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
