import { api } from "./api"

export const getNotifications = async () => {
  const response = await api.get('notifications')

  return response.data
}

export const updateNotificationStatus = async (notificationId: string) => {
  const response = await api.patch(`notifications/${notificationId}`)

  return response.data
}