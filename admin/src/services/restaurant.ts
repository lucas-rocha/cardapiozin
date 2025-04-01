import { api } from "./api"

export const getUsersRestaurants = async (restauranId: string | undefined) => {
  const response = await api.get(`restaurants/${restauranId}/users`)

  return response
}