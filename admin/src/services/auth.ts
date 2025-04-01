import { api } from "./api"

export const forgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email, user_type: "user" })

  return response.data
}

export const resetPassword = async (data: any) => {
  const response = await api.post('/auth/reset-password', { data })

  return response.data
}

export const resendEmail = async (email: string) => {
  const response = await api.post('/auth/resend-email', { email })

  return response.data
}
