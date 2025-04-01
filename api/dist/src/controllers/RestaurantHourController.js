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
exports.RestaurantHourController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const RestaurantGuardMiddleware_1 = require("@src/middlewares/RestaurantGuardMiddleware");
const RestaurantHourService_1 = require("@src/services/RestaurantHourService");
let RestaurantHourController = class RestaurantHourController {
    constructor(_restaurantHourService = new RestaurantHourService_1.RestaurantHourService()) {
        this._restaurantHourService = _restaurantHourService;
    }
    async createHour(req, res) {
        const newHour = await this._restaurantHourService.createHour({ ...req.body, ...{ restaurant_id: req.context.restaurant_id } });
        return res.status(200).json(newHour);
    }
    async getHours(req, res) {
        const hours = await this._restaurantHourService.getHoursForLoggedRestaurant(req.params.restaurant_id);
        return res.status(200).json(hours);
    }
    async getHourById(req, res) {
        const hour = await this._restaurantHourService.getHourById(parseInt(req.params.id));
        return res.status(200).json(hour);
    }
    async updateHourById(req, res) {
        const updatedHour = await this._restaurantHourService.updateHourById(req.body, parseInt(req.params.id));
        return res.status(200).json(updatedHour);
    }
};
exports.RestaurantHourController = RestaurantHourController;
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Post)(':restaurantId/hours'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantHourController.prototype, "createHour", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurantId/hours'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantHourController.prototype, "getHours", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurantId/hours/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantHourController.prototype, "getHourById", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Patch)(':restaurantId/hours/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantHourController.prototype, "updateHourById", null);
exports.RestaurantHourController = RestaurantHourController = __decorate([
    (0, core_1.ClassMiddleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [RestaurantHourService_1.RestaurantHourService])
], RestaurantHourController);
//# sourceMappingURL=RestaurantHourController.js.map