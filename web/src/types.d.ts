import * as http from 'http'
import * as jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context: {
      restaurantSubdomain?: string
      user_id?: string
      customer?: Promise<any> | null
    }
  }
}

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    user_id?: string | undefined;
    customer: []
  }
}