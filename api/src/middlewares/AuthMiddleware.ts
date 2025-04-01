import AuthService from "@src/services/AuthService";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function authMiddleware(
  req: Partial<Request>, 
  res: Partial<Response>, 
  next: NextFunction): void {
  const token = req.headers?.['x-access-token']
  const claims = <jwt.UserIDJwtPayload>AuthService.decodeToken(token as string)
  const userId = claims.user_id
  const restaurantId = claims.restaurant_id
  const role = claims.role
  req.context = { user_id: userId, restaurant_id: restaurantId, role }
  next()
}