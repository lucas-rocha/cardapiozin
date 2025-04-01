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
exports.InfoController = void 0;
const core_1 = require("@overnightjs/core");
const RestaurantService_1 = require("@src/services/RestaurantService");
const ApiError_1 = require("@src/util/errors/ApiError");
let InfoController = class InfoController {
    constructor(_restaurantService = new RestaurantService_1.RestaurantService()) {
        this._restaurantService = _restaurantService;
    }
    async getInfoRestaurant(req, res) {
        const restaurant_url = req.params.restaurantUrl;
        if (!restaurant_url)
            throw new ApiError_1.NotFound('Restaurant url not provided');
        const restaurant = await this._restaurantService.getInfoRestaurant(restaurant_url);
        return res.status(200).json(restaurant);
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, core_1.Get)(':restaurantUrl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getInfoRestaurant", null);
exports.InfoController = InfoController = __decorate([
    (0, core_1.Controller)('info'),
    __metadata("design:paramtypes", [RestaurantService_1.RestaurantService])
], InfoController);
//# sourceMappingURL=InfoController.js.map