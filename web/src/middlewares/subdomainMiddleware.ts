import { NextFunction, Request, Response } from "express";
import { RestaurantService } from "../services/RestaurantService";

const subdomainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host
  const subdomain = host?.split('.')[0]

  req.context = req.context || {}

  if (subdomain !== 'localhost') {
    const restaurant = await RestaurantService.findBySubdomain(subdomain)
    
    if (restaurant) {
      req.context.restaurantSubdomain = restaurant

      res.cookie("restaurantSub", restaurant.id, { maxAge: 3600000 })
    }
  }

  next()
}

export default subdomainMiddleware