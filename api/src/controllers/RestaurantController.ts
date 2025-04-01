import { ClassMiddleware, Controller, Get, Middleware, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { restaurantGuardMiddleware } from "@src/middlewares/RestaurantGuardMiddleware";
import { RestaurantService } from "@src/services/RestaurantService";
import { NotFound, UnauthorizedError } from "@src/util/errors/ApiError";
// import { NotFound, UnauthorizedError } from "@src/util/errors/ApiError";
import { Request, Response } from "express";

@ClassMiddleware(authMiddleware)
@Controller('restaurants')
export class RestaurantController {
  constructor(private _restaurantService: RestaurantService = new RestaurantService()) {}

  @Post('')
  public async create(req: Request, res: Response) {
    const newRestaurant = await this._restaurantService.createRestaurant({...req.body, ...{ user_id: req.context.user_id }})

    return res.status(201).json(newRestaurant)
  }

  @Middleware(restaurantGuardMiddleware)
  @Post(':restaurantId/users')
  public async addUserToRestaurant(req: Request, res: Response) {
    const restaurant_id = req.params.restaurantId
    const userRestaurant = await this._restaurantService.addUserToRestaurant({...req.body, ...{ restaurant_id }})

    return res.status(201).json(userRestaurant)
  }

  @Get('')
  public async getRestaurants(req: Request, res: Response) {
    const userId = req.context.user_id

    if(!userId)
      throw new NotFound('User id not provided')

    const restaurants = await this._restaurantService.getRestaurantsForLoggedUser(userId)

    return res.status(200).json(restaurants)
  }

  @Middleware(restaurantGuardMiddleware)
  @Get(':restaurantId/users')
  public async getUsersRestaurants(req: Request, res: Response) {
    const usersRestaurant = await this._restaurantService.getUsersRestaurants(req.params.restaurantId)

    return res.status(200).json(usersRestaurant)
  }

  @Middleware(authMiddleware)
  @Get('me')
  public async me(req: Request, res: Response) {
    const restaurantId = req.context.restaurant_id

    if(!restaurantId)
      throw new NotFound('Restaurant id not provided')

    const restaurant = await this._restaurantService.getLoggedRestaurant(restaurantId)

    return res.status(200).json(restaurant)
  }
}