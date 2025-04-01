import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import axios from 'axios'

const decodeToken = (token: string) => {
  return jwt.verify(token, 'ABCD')
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['@cardapiozin.token']

  if(token) {
    const claims = <jwt.UserIDJwtPayload>decodeToken(token)
  
    req.context.user_id = claims.user_id
    
    const customer = await axios(`http://localhost:5000/customers/me`, {
      headers: {
        'x-access-token': token
      }
    });

    if(customer) {
      req.context.customer = customer.data as any
    } 

  }

  next()
}

export default authMiddleware