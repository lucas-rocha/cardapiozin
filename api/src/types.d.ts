import * as http from 'http'
import * as jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context: {
      user_id?: string
      restaurant_id?: string;
      role?: string;
      customer_id?: string;
    }
    file: Express.Multer.File
  }
}

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    restaurantId?: string | undefined;
  }
  export interface CustomerIDJwtPayload extends jwt.JwtPayload {
    customer_id?: string | undefined;
  }
}