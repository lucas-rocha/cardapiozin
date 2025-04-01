import { Controller, Post } from "@overnightjs/core";
import AuthService from "@src/services/AuthService";
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService = new AuthService()
  ) {}

  @Post('login')
  public async login(req: Request, res: Response) {
    const user = await this._authService.login(req.body)
    
    return res.status(200).json(user)
  }

  @Post('customer-login')
  public async customerLogin(req: Request, res: Response) {
    const customer = await this._authService.customerLogin(req.body)

    return res.status(200).json(customer)
  }

  @Post('forgot-password')
  public async forgotPassword(req: Request, res: Response) {
    const { email, user_type } = req.body

    const token = await this._authService.forgotPassword(email, user_type)

    return res.status(200).json(token)
  }

  @Post('reset-password')
  public async resetPassword(req: Request, res: Response) {
    const { token, newPassword, user_type } = req.body

    const resetedPassword = await this._authService.resetPassword(token, newPassword, user_type)

    res.status(200).json(resetedPassword)
  }

  @Post('verify-email')
  public async verifyEmail(req: Request, res: Response) {
    const { token } = req.query

    const verifiedUser = await this._authService.verifyEmail(token as string)

    res.status(200).json(verifiedUser)
  }

  @Post('resend-email')
  public async resendEmail(req: Request, res: Response) {
    const { email } = req.body

    const resendEmail = await this._authService.resendEmail(email)

    return res.status(200).json(resendEmail)
  }
}