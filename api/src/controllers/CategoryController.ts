import { ClassMiddleware, Controller, Delete, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { Folder } from "@src/enum/folder";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import verifyFile from "@src/middlewares/FileUpload";
import { restaurantGuardMiddleware } from "@src/middlewares/RestaurantGuardMiddleware";
import { CategoryService } from "@src/services/CategoryService";
import { Request, Response } from "express";

@ClassMiddleware(authMiddleware)

@Controller('restaurants')
export class CategoryController {
  constructor(private _categoryService: CategoryService = new CategoryService()) {}

  @Middleware([restaurantGuardMiddleware])
  @Post(':restaurant_id/categories')
  public async create(req: Request, res: Response) {
     const body = req.body.data
     const category = { ...JSON.parse(body), ...{ restaurant_id: req.params.restaurant_id } }
     const newCategory = await this._categoryService.createCategory(category,200000,req.file)
     return res.status(201).json(newCategory)
  }

  @Middleware(restaurantGuardMiddleware)
  @Get(':restaurant_id/categories/:categoryId')
  public async getMenuItensFromCategory(req: Request, res: Response) {
    const categories = await this._categoryService.getAllItemsForCategory(parseInt(req.params.categoryId),req.params.restaurant_id)
    return res.status(200).json(categories)
  }

  @Middleware(restaurantGuardMiddleware)
  @Post(':restaurant_id/categories/menu-item')
  public async addMenuitensInCategory(req: Request, res: Response) {
    const {menuItensId, category_id} = req.body
    const quantity = await this._categoryService.addMenuItemInCategory(menuItensId,category_id,req.params.restaurant_id)
    return res.status(201).json(quantity)
  }

  @Middleware(restaurantGuardMiddleware)
  @Patch(':restaurant_id/categories/:categoryId')
  public async updateCategoryById(req: Request, res: Response) {
    const updatedcategory = await this._categoryService.updateCategory(parseInt(req.params.categoryId),req.body,req.params.restaurant_id)
    return res.status(202).json(updatedcategory)
  }

  @Middleware(restaurantGuardMiddleware)
  @Delete(':restaurant_id/categories/:categoryId')
  public async deleteCategoryrById(req: Request, res: Response) {
    const deletedcategory = await this._categoryService.deleteCategory(parseInt(req.params.categoryId),req.params.restaurant_id)
    return res.status(200).json(deletedcategory)
  }

  @Middleware(restaurantGuardMiddleware)
  @Get(':restaurant_id/categories')
  public async allCategoriesByRestaurant(req: Request, res: Response) {
    const deletedcategory = await this._categoryService.getAllCategoriesByRestaurant(req.params.restaurant_id)
    return res.status(200).json(deletedcategory)
  }
}