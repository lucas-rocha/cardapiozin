import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { InviteService } from "@src/services/InviteService";
import { NotFound } from "@src/util/errors/ApiError";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";

@Controller('invite')
export class InviteController {
  constructor(private _inviteService: InviteService = new InviteService()) {}

  @Middleware(authMiddleware)
  @Post('')
  public async create(req: Request, res: Response) {
    const restaurantId = req.context.restaurant_id
    const { email } = req.body

    if(!restaurantId)
      throw new NotFound('Restaurant id not provided')

    const invite = await this._inviteService.createInvite(restaurantId, email)

    return res.status(201).json(invite)
  }

  @Get(':inviteToken')
  public async getInvite(req: Request, res: Response) {
    const token = req.params.inviteToken as string

    const invite = await this._inviteService.getInviteByToken(token)

    return res.status(200).json(invite)
  }

  @Post(':inviteToken')
  public async acceptInvite(req: Request, res: Response) {
    const token = req.params.inviteToken as string
    
    const user = await this._inviteService.acceptInvite(token)

    return res.status(201).json(user)
  }

}