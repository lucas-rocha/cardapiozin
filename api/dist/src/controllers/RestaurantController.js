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
exports.RestaurantController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const RestaurantGuardMiddleware_1 = require("@src/middlewares/RestaurantGuardMiddleware");
const RestaurantService_1 = require("@src/services/RestaurantService");
const ApiError_1 = require("@src/util/errors/ApiError");
let RestaurantController = class RestaurantController {
    constructor(_restaurantService = new RestaurantService_1.RestaurantService()) {
        this._restaurantService = _restaurantService;
    }
    async create(req, res) {
        const newRestaurant = await this._restaurantService.createRestaurant({ ...req.body, ...{ user_id: req.context.user_id } });
        return res.status(201).json(newRestaurant);
    }
    async addUserToRestaurant(req, res) {
        const restaurant_id = req.params.restaurantId;
        const userRestaurant = await this._restaurantService.addUserToRestaurant({ ...req.body, ...{ restaurant_id } });
        return res.status(201).json(userRestaurant);
    }
    async getRestaurants(req, res) {
        const userId = req.context.user_id;
        if (!userId)
            throw new ApiError_1.NotFound('User id not provided');
        const restaurants = await this._restaurantService.getRestaurantsForLoggedUser(userId);
        return res.status(200).json(restaurants);
    }
    async getUsersRestaurants(req, res) {
        const usersRestaurant = await this._restaurantService.getUsersRestaurants(req.params.restaurantId);
        return res.status(200).json(usersRestaurant);
    }
    async me(req, res) {
        const restaurantId = req.context.restaurant_id;
        if (!restaurantId)
            throw new ApiError_1.NotFound('Restaurant id not provided');
        const restaurant = await this._restaurantService.getLoggedRestaurant(restaurantId);
        return res.status(200).json(restaurant);
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Post)(':restaurantId/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "addUserToRestaurant", null);
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurants", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurantId/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getUsersRestaurants", null);
__decorate([
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Get)('me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "me", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, core_1.ClassMiddleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [RestaurantService_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=RestaurantController.js.map