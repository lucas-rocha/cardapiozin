import { jwt } from 'jsonwebtoken';

export default class TokenService {
  public static generateToken(user_id: string, restaurant_id: string | null, role: string | null): string {
    return jwt.sign({ user_id, restaurant_id, role }, 'ABCD')
  }

  public static decodeToken(token: string) {
    return jwt.verify(token, 'ABCD')
  }
}