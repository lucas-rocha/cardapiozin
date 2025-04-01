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
exports.CouponController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const RestaurantGuardMiddleware_1 = require("@src/middlewares/RestaurantGuardMiddleware");
const CouponService_1 = require("@src/services/CouponService");
let CouponController = class CouponController {
    constructor(_couponService = new CouponService_1.CouponService()) {
        this._couponService = _couponService;
    }
    async create(req, res) {
        const coupon = { ...req.body, ...{ restaurant_id: req.context.restaurant_id } };
        const newCoupon = await this._couponService.createCoupon(coupon);
        return res.status(201).json(newCoupon);
    }
    async update(req, res) {
        const coupon = { ...req.body, ...{ restaurant_id: req.context.restaurant_id } };
        const updatedCoupon = await this._couponService.updateCoupon(coupon);
        return res.status(200).json(updatedCoupon);
    }
    async delete(req, res) {
        const deletedCoupon = await this._couponService.deleteCoupon(parseInt(req.params.coupon_id));
        return res.status(200).json(deletedCoupon);
    }
    async getCoupon(req, res) {
        const coupon = await this._couponService.getCoupon(parseInt(req.params.coupon_id));
        return res.status(200).json(coupon);
    }
    async getCouponByRestaurant(req, res) {
        var _a;
        const coupons = await this._couponService.getAllCouponsByRestaurant((_a = req.context) === null || _a === void 0 ? void 0 : _a.restaurant_id);
        return res.status(200).json(coupons);
    }
    async validCouponsByRestaurant(req, res) {
        var _a;
        const coupons = await this._couponService.getValidCouponsByRestaurant(req.body.coupon_id, (_a = req.context) === null || _a === void 0 ? void 0 : _a.restaurant_id);
        return res.status(200).json(coupons);
    }
};
exports.CouponController = CouponController;
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Post)(':restaurant_id/coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "create", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Patch)(':restaurant_id/coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "update", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Delete)(':restaurant_id/coupons/:coupon_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "delete", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurant_id/coupons/:coupon_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getCoupon", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurant_id/coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getCouponByRestaurant", null);
__decorate([
    (0, core_1.Middleware)(RestaurantGuardMiddleware_1.restaurantGuardMiddleware),
    (0, core_1.Get)(':restaurant_id/coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "validCouponsByRestaurant", null);
exports.CouponController = CouponController = __decorate([
    (0, core_1.ClassMiddleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [CouponService_1.CouponService])
], CouponController);
//# sourceMappingURL=CouponController.js.map