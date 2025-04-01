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
exports.AdditionalMenuController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const AdditionalItemService_1 = require("@src/services/AdditionalItemService");
let AdditionalMenuController = class AdditionalMenuController {
    constructor(_additionalItemService = new AdditionalItemService_1.AdditionalItemService()) {
        this._additionalItemService = _additionalItemService;
    }
    async create(req, res) {
        const newMenuItem = await this._additionalItemService.createAdditionalItem({ ...req.body, ...{ restaurant_id: req.context.restaurant_id } });
        return res.status(201).json(newMenuItem);
    }
    async delete(req, res) {
        const menuitem = await this._additionalItemService.deleteAdditionalItem(parseInt(req.params.additionalItemId), req.params.restaurantId);
        return res.status(200).json(menuitem);
    }
    async update(req, res) {
        const menuitem = await this._additionalItemService.updateAdditionalItem({ ...req.body, ...{ restaurant_id: req.params.restaurantId } });
        return res.status(200).json(menuitem);
    }
    async getAllAdditionalItemsByRestaurant(req, res) {
        const menuitem = await this._additionalItemService.getAdditionalItensByRestaurant(req.params.restaurantId);
        return res.status(200).json(menuitem);
    }
    async addAdd(req, res) {
        const menuitem = await this._additionalItemService.additionalItemInMenuItem(req.body, req.params.restaurantId);
        return res.status(200).json(menuitem);
    }
};
exports.AdditionalMenuController = AdditionalMenuController;
__decorate([
    (0, core_1.Post)(':restaurantId/additional-items'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdditionalMenuController.prototype, "create", null);
__decorate([
    (0, core_1.Delete)(':restaurantId/additional-items/:additionalItemId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdditionalMenuController.prototype, "delete", null);
__decorate([
    (0, core_1.Patch)(':restaurantId/additional-items/:additionalItemId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdditionalMenuController.prototype, "update", null);
__decorate([
    (0, core_1.Delete)(':restaurantId/additional-items'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdditionalMenuController.prototype, "getAllAdditionalItemsByRestaurant", null);
__decorate([
    (0, core_1.Delete)(':restaurantId/additional-items/:additionalItemId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdditionalMenuController.prototype, "addAdd", null);
exports.AdditionalMenuController = AdditionalMenuController = __decorate([
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [AdditionalItemService_1.AdditionalItemService])
], AdditionalMenuController);
//# sourceMappingURL=AdditionalItemController.js.map