import { UnauthorizedError } from "@src/util/errors/ApiError";
import { NextFunction, Request, Response } from "express";


export function restaurantGuardMiddleware(
  req: Request, 
  res: Response,
  next: NextFunction
): void {
  
  if (req.context?.restaurant_id !== req.params?.restaurantId) {
    throw new UnauthorizedError('Unauthorized restaurant!');
  }
  
  next();
}