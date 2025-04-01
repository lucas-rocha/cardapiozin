import { api } from "./api"

export const getHours = async (restaurantId: string) => {
  const response = await api.get(`restaurants/${restaurantId}/hours`)

  return response
}