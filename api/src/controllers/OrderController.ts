import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { OrderService } from "@src/services/OrderService";
import { InternalError } from "@src/util/errors/InternalError";
import { Request, Response } from "express";

@Controller('orders')
export class OrderController {
  constructor(private _orderService: OrderService = new OrderService()) {
  }

  @Post('')
  public async createOrder(req: Request, res: Response) {
    const newOrder = await this._orderService.createOrder(req.body)

    return res.status(201).json(newOrder)
  }

  @Get('')
  @Middleware(authMiddleware)
  public async getOrdersForLoggedRestaurant(req: Request, res: Response) {
    const restaurantId = req.context.restaurant_id
   
    if(!restaurantId)
      throw new InternalError('Something went wrong')

    const orders = await this._orderService.getAllOrdersForRestaurant(restaurantId)

    return res.status(200).json(orders)
  }

  @Get(':id')
  @Middleware(authMiddleware)
  public async getOrder(req: Request, res: Response) {
    const order = await this._orderService.getOrderById(parseInt(req.params.id))

    return res.status(200).json(order)
  }
}