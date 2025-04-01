import { api } from "./api"

export const getOrders = async () => {
  const response = await api.get('orders')

  return response
}

export const getOrderById = async (id: number) => {
  const response = await api.get(`orders/${id}`)

  return response
}