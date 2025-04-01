"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const RestaurantGuardMiddleware_1 = require("@src/middlewares/RestaurantGuardMiddleware");
const CategoryService_1 = require("@src/services/CategoryService");
let CategoryController = class CategoryController {
    constructor(_categoryService = new CategoryService_1.CategoryService()) {
        this._categoryService = _categoryService;
    }
    async create(req, res) {
        const body = req.body.data;
        const category = { ...JSON.parse(body), ...{ restaurant_id: req.params.restaurant_id } };
        const newCategory = await this._categoryService.createCategory(category, 200000, req.file);
        return res.status(201).json(newCategory);
    }
    async getMenuItensFromCategory(req, res) {
        const categories = await this._categoryService.getAllItemsForCategory(parseInt(req.params.categoryId), req.params.restaurant_id);
        return res.status(200).json(categories);
    }
    async addMenuitensInCategory(req, res) {
        const { menuItensId, category_id } = req.body;
        const quantity = await this._categoryService.addMenuItemInCategory(menuItensId, category_id, req.params.restaurant_id);
        return res.status(201).json(quantity);
    }
    async updateCategoryById(req, res) {
        const updatedcategory = await this._categoryService.updateCategory(parseInt(req.params.categoryId), req.body, req.params.restaurant_id);
        return res.status(202).json(updatedcategory);
    }
    async deleteCategoryrById(req, res) {
        const deletedcategory = await this._categoryService.deleteCategory(parseInt(req.params.categoryId), req.params.restaurant_id);
        return res.status(200).json(deletedcategory);
    }
    async allCategoriesByRestaurant(req, res) {
        const deletedcategory = await this._categoryService.getAllCategoriesByRestaurant(req.params.restaurant_id);
        return res.status(200).json(deletedcategory);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, core_1.Middleware)([RestaurantGuardMiddleware_1.restaurantGuardMiddleware]),
    (0, core_1.Post)(':restaurant_id/categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurant_id/categories/:categoryId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getMenuItensFromCategory", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Post)(':restaurant_id/categories/menu-item'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addMenuitensInCategory", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Patch)(':restaurant_id/categories/:categoryId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryById", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Delete)(':restaurant_id/categories/:categoryId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategoryrById", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurant_id/categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "allCategoriesByRestaurant", null);
exports.CategoryController = CategoryController = __decorate([
    (0, core_1.ClassMiddleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [CategoryService_1.CategoryService])
], CategoryController);
//# sourceMappingURL=CategoryController.js.map