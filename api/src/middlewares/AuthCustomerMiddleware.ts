import AuthService from "@src/services/AuthService";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function authCustomerMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['x-access-token']
  const claims = <jwt.CustomerIDJwtPayload>AuthService.decodeToken(token as string)
  const customer_id = claims.user_id
  const restaurant_id = claims.restaurant_id

  req.context = { customer_id, restaurant_id }
  next()
}