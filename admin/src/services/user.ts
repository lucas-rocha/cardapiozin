import { User } from "@/contexts/AuthContext"
import { api } from "./api"

export const updateProfileUser = async (userId: string | undefined, data: FormData): Promise<User> => {
  const response = await api
    .patch(`users/${userId}/profile`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )

    return response.data
}

export const checkUserEmail = async (email: string) => {
  const response = await api.get(`users/check-email?email=${email}`)

  return response.data
}

export const createUserWithRestaurant = async (data: any) => {
  const response = await api.post('/users/restaurants', data)

  return response.data
}

export const createUserFromInvite = async (data: any) => {
  const response = await api.post('/users', data)

  return response.data
}

export const currentRestaurant = async (restaurantId: string, role: string) => {
  const response = await api.put('/users/current-restaurant', { restaurant_id: restaurantId, role })

  return response.data
} 