import { Controller, Get, Middleware, Patch } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { NotificationService } from "@src/services/NotificationService";
import { BadRequestError } from "@src/util/errors/ApiError";
import { Request, Response } from "express";

@Controller('notifications')
export class NotificationController {
  constructor(private _notificationService: NotificationService = new NotificationService()) {}

  @Get('')
  @Middleware(authMiddleware)
  public async getNotificationsRestaurant(req: Request, res: Response) {
    const restaurant_id = req.context.restaurant_id
    const user_id = req.context.user_id

    if(!restaurant_id)
      throw new BadRequestError('Something went wrong')

    if(!user_id)
      throw new BadRequestError('Something went wrong')

    const notifications = await this._notificationService.getNotificationFromRestaurant(restaurant_id, user_id)

    return res.status(200).json(notifications)
  }

  @Patch(':id')
  @Middleware(authMiddleware)
  public async updateNotification(req: Request, res: Response) {
    const notificationId = req.params.id

    const notification =  await this._notificationService.updateStatusNotification(notificationId)

    return res.status(200).json(notification)
  }
}