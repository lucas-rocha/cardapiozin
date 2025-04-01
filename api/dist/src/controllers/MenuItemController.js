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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemController = void 0;
const core_1 = require("@overnightjs/core");
const folder_1 = require("@src/enum/folder");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const FileUpload_1 = __importDefault(require("@src/middlewares/FileUpload"));
const RestaurantGuardMiddleware_1 = require("@src/middlewares/RestaurantGuardMiddleware");
const MenuItemService_1 = require("@src/services/MenuItemService");
let MenuItemController = class MenuItemController {
    constructor(_menuItemService = new MenuItemService_1.MenuItemService()) {
        this._menuItemService = _menuItemService;
    }
    async create(req, res) {
        const body = req.body.data;
        const menu_item = { ...JSON.parse(body), ...{ restaurant_id: req.params.restaurantId } };
        const newMenuItem = await this._menuItemService.createMenuItem(menu_item, req.file);
        return res.status(201).json(newMenuItem);
    }
    async getMenuItems(req, res) {
        const menuItems = await this._menuItemService.getMenuItem();
        return res.status(200).send(menuItems);
    }
    async getMenuItemById(req, res) {
        const menuitem = await this._menuItemService.getMenuItemById(parseInt(req.params.id));
        return res.status(200).json(menuitem);
    }
    async updateMenuItemById(req, res) {
        const body = req.body.data;
        const menu_item = { id: parseInt(req.params.id), ...JSON.parse(body), restaurant_id: req.params.restaurantId };
        const menuitem = await this._menuItemService.updateMenuItemById(menu_item, req.file);
        return res.status(200).json(menuitem);
    }
    async deleteMenuItemById(req, res) {
        const menuItem_id = parseInt(req.params.id);
        const menuitem = await this._menuItemService.deleteMenuItem(menuItem_id);
        return res.status(200).json(menuitem);
    }
    async changeVisibilityMenuItemById(req, res) {
        const menuItem_id = parseInt(req.params.id);
        const menuitem = await this._menuItemService.visibilityMenuItem(menuItem_id);
        return res.status(200).json(menuitem);
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, core_1.Post)(':restaurantId/menu-items'),
    (0, core_1.Middleware)([AuthMiddleware_1.authMiddleware, RestaurantGuardMiddleware_1.restaurantGuardMiddleware, (0, FileUpload_1.default)(folder_1.Folder.MENUITEM)]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "create", null);
__decorate([
    (0, core_1.Get)(':restaurantId/menu-items'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "getMenuItems", null);
__decorate([
    (0, core_1.Get)(':restaurantId/menu-items/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "getMenuItemById", null);
__decorate([
    (0, core_1.Patch)(':restaurantId/menu-items/:id'),
    (0, core_1.Middleware)([AuthMiddleware_1.authMiddleware, RestaurantGuardMiddleware_1.restaurantGuardMiddleware, (0, FileUpload_1.default)(folder_1.Folder.MENUITEM)]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "updateMenuItemById", null);
__decorate([
    (0, core_1.Delete)(':restaurantId/menu-items/:id'),
    (0, core_1.Middleware)([AuthMiddleware_1.authMiddleware, RestaurantGuardMiddleware_1.restaurantGuardMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "deleteMenuItemById", null);
__decorate([
    (0, core_1.Patch)(':restaurantId/menu-items/:id/visible'),
    (0, core_1.Middleware)([AuthMiddleware_1.authMiddleware, RestaurantGuardMiddleware_1.restaurantGuardMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "changeVisibilityMenuItemById", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [MenuItemService_1.MenuItemService])
], MenuItemController);
//# sourceMappingURL=MenuItemController.js.map