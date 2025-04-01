import { Controller, Delete, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { Folder } from "@src/enum/folder";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import verifyFile from "@src/middlewares/FileUpload";
import { restaurantGuardMiddleware } from "@src/middlewares/RestaurantGuardMiddleware";
import { MenuItemService } from "@src/services/MenuItemService";
import { Request, Response } from "express";

@Controller('restaurants')
export class MenuItemController {
  constructor(private _menuItemService: MenuItemService = new MenuItemService()) {}

  @Post(':restaurantId/menu-items')
  @Middleware([authMiddleware, restaurantGuardMiddleware, verifyFile(Folder.MENUITEM)])
  public async create(req: Request, res: Response) {
    const body = req.body.data
    const menu_item = { ...JSON.parse(body), ...{ restaurant_id: req.params.restaurantId } }
    const newMenuItem = await this._menuItemService.createMenuItem(menu_item, req.file)
    return res.status(201).json(newMenuItem)
  }

  @Get(':restaurantId/menu-items')
  public async getMenuItems(req: Request, res: Response) {
    const menuItems = await this._menuItemService.getMenuItem()
    return res.status(200).send(menuItems)
  }

  @Get(':restaurantId/menu-items/:id')
  public async getMenuItemById(req: Request, res: Response) {
    const menuitem = await this._menuItemService.getMenuItemById(parseInt(req.params.id))
    return res.status(200).json(menuitem)
  }

  @Patch(':restaurantId/menu-items/:id')
  @Middleware([authMiddleware, restaurantGuardMiddleware, verifyFile(Folder.MENUITEM)])
  public async updateMenuItemById(req: Request, res: Response) {
    const body = req.body.data
    const menu_item = { id: parseInt(req.params.id), ...JSON.parse(body), restaurant_id: req.params.restaurantId }
    const menuitem = await this._menuItemService.updateMenuItemById(menu_item, req.file)
    return res.status(200).json(menuitem)
  }

  @Delete(':restaurantId/menu-items/:id')
  @Middleware([authMiddleware, restaurantGuardMiddleware])
  public async deleteMenuItemById(req: Request, res: Response) {
    const menuItem_id = parseInt(req.params.id)
    const menuitem = await this._menuItemService.deleteMenuItem(menuItem_id)
    return res.status(200).json(menuitem)
  }

  @Patch(':restaurantId/menu-items/:id/visible')
  @Middleware([authMiddleware, restaurantGuardMiddleware])
  public async changeVisibilityMenuItemById(req: Request, res: Response) {
    const menuItem_id = parseInt(req.params.id)
    const menuitem = await this._menuItemService.visibilityMenuItem(menuItem_id)
    return res.status(200).json(menuitem)
  }
}