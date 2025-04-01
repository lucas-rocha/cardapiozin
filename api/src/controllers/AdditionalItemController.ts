import { Controller, Delete, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { AdditionalItemService } from "@src/services/AdditionalItemService";
import { Request, Response } from "express";

@Controller('restaurants')
export class AdditionalMenuController {
  constructor(private _additionalItemService: AdditionalItemService = new AdditionalItemService()) {}

  @Post(':restaurantId/additional-items')
  @Middleware(authMiddleware)
  public async create(req: Request, res: Response) {
    const newMenuItem = await this._additionalItemService.createAdditionalItem({ ...req.body, ...{ restaurant_id: req.context.restaurant_id } })
    return res.status(201).json(newMenuItem)
  }

  @Delete(':restaurantId/additional-items/:additionalItemId')
  public async delete(req: Request, res: Response) {
    const menuitem = await this._additionalItemService.deleteAdditionalItem(parseInt(req.params.additionalItemId),req.params.restaurantId)
    return res.status(200).json(menuitem)
  }

  @Patch(':restaurantId/additional-items/:additionalItemId')
  public async update(req: Request, res: Response) {
    const menuitem = await this._additionalItemService.updateAdditionalItem({...req.body, ... {restaurant_id: req.params.restaurantId}})

    return res.status(200).json(menuitem)
  }

  @Delete(':restaurantId/additional-items')
  public async getAllAdditionalItemsByRestaurant(req: Request, res: Response) {
    const menuitem = await this._additionalItemService.getAdditionalItensByRestaurant(req.params.restaurantId)
    return res.status(200).json(menuitem)
  }

  @Delete(':restaurantId/additional-items/:additionalItemId')
  public async addAdd(req: Request, res: Response) {
    const menuitem = await this._additionalItemService.additionalItemInMenuItem(req.body, req.params.restaurantId)

    return res.status(200).json(menuitem)
  }
}