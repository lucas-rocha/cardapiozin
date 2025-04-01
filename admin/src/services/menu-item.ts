import { api } from "./api"

export const createMenuItem = async (id: string, data: FormData) => {
  const response = await api.post(`restaurants/${id}/menu-items`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })


  return response
}