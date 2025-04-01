import { api } from "./api"

export const createInvite = async (email: string) => {
  const response = await api.post('/invite', { email })

  return response.data
}

export const getInvite = async (token: string) => {
  const response = await api.get(`/invite/${token}`)

  return response.data
}

export const acceptedInvite = async (token: string) => {
  const response = await api.post(`/invite/${token}`)

  return response.data
}