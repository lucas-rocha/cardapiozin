import PrismaClientSingleton from "@src/databases/PrismaClient";

export class NotificationService {
  constructor(
    private prisma = PrismaClientSingleton.getInstance()
  ) {}

  public async getNotificationFromRestaurant(restaurant_id: string, user_id: string) {
    // const user = await this.prisma.user.findFirst({
    //   where: { id: user_id }
    // })

    const notifications = await this.prisma.notification.findMany({
      where: { restaurant_id }
    })

    return notifications
  }

  public async createNotification(restaurant_id: string, title: string, message: string, user_id?: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: user_id }
    })

    await this.prisma.notification.create({
      data: {
        restaurant_id,
        user_id: user?.id || null,
        title,
        actorName: `${user?.firstName} ${user?.lastName}`,
        message
      }
    })
  }

  public async updateStatusNotification(notificationId: string) {
    const updatedNotification = await this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        is_read: true
      }
    })

    return updatedNotification
  }
}