import { ClassMiddleware, Controller, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { restaurantGuardMiddleware } from "@src/middlewares/RestaurantGuardMiddleware";
import { RestaurantHourService } from "@src/services/RestaurantHourService";
import { Request, Response } from "express";

@ClassMiddleware(authMiddleware)
@Controller('restaurants')
export class RestaurantHourController {
  constructor(private _restaurantHourService: RestaurantHourService = new RestaurantHourService()) { }

  @Middleware(restaurantGuardMiddleware)
  @Post(':restaurantId/hours')
  public async createHour(req: Request, res: Response) {

    const newHour = await this._restaurantHourService.createHour({ ...req.body, ... { restaurant_id: req.context.restaurant_id } })

    return res.status(200).json(newHour)
  }

  @Middleware(restaurantGuardMiddleware)
  @Get(':restaurantId/hours')
  public async getHours(req: Request, res: Response) {

    const hours = await this._restaurantHourService.getHoursForLoggedRestaurant(req.params.restaurant_id)

    return res.status(200).json(hours)
  }

  @Middleware(restaurantGuardMiddleware)
  @Get(':restaurantId/hours/:id')
  public async getHourById(req: Request, res: Response) {

    const hour = await this._restaurantHourService.getHourById(parseInt(req.params.id))

    return res.status(200).json(hour)
  }

  @Middleware(restaurantGuardMiddleware)
  @Patch(':restaurantId/hours/:id')
  public async updateHourById(req: Request, res: Response) {

    const updatedHour = await this._restaurantHourService.updateHourById(req.body, parseInt(req.params.id))

    return res.status(200).json(updatedHour)
  }
}