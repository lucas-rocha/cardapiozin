import AuthService from "@src/services/AuthService"
import { authMiddleware } from "../AuthMiddleware"

describe('Auth middleware', () => {
  it('should verify a JWT token and call the next middleware', () => {
    const jwtToken = AuthService.generateToken(1)
    const reqFake = {
      headers: {
        'x-access-token': jwtToken
      }
    }
    const resFake = {}
    const nextFake = jest.fn()
    authMiddleware(reqFake, resFake, nextFake)
    expect(nextFake).toHaveBeenCalled()
  })
})