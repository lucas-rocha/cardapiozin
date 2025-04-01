import { Controller, Get } from "@overnightjs/core";
import { RestaurantService } from "@src/services/RestaurantService";
import { NotFound } from "@src/util/errors/ApiError";
import { Request, Response } from "express";

@Controller('info')
export class InfoController {
  constructor(private _restaurantService: RestaurantService = new RestaurantService()) {}

  @Get(':restaurantUrl') 
  public async getInfoRestaurant(req: Request, res: Response) {
    const restaurant_url = req.params.restaurantUrl

    if(!restaurant_url)
      throw new NotFound('Restaurant url not provided')

    const restaurant = await this._restaurantService.getInfoRestaurant(restaurant_url)

    return res.status(200).json(restaurant)
  }
}