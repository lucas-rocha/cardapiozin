"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const client_1 = require("@prisma/client");
const CouponRequest_1 = require("@src/models/requests/CouponRequest");
const ApiError_1 = require("@src/util/errors/ApiError");
const validate_1 = require("@src/util/validate");
const prisma = new client_1.PrismaClient();
class CouponService {
    constructor() { }
    async createCoupon(coupon) {
        const couponRequest = await (0, validate_1.validateInputs)(coupon, CouponRequest_1.CouponRequest);
        if (couponRequest.startAt > couponRequest.finishAt)
            throw new ApiError_1.UnprocessableError('Start date cannot be greater than the final date!');
        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id: coupon.restaurant_id,
                finishAt: {
                    gt: new Date()
                },
                deletedAt: null,
                name: coupon.name
            }
        });
        if (coupons.length > 0)
            throw new ApiError_1.ConflictError('There is already an active coupon with this name!');
        const newCoupon = await prisma.coupon.create({
            data: {
                name: coupon.name,
                description: coupon.description,
                value: coupon.value,
                startAt: coupon.startAt,
                quantity: coupon.quantity,
                finishAt: coupon.finishAt,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
                restaurant_id: coupon.restaurant_id
            }
        });
        return newCoupon;
    }
    async getCoupon(id) {
        const coupon = await prisma.coupon.findUnique({
            where: { id }
        });
        if (!coupon)
            throw new ApiError_1.NotFound('coupon not found!');
        return coupon;
    }
    async getAllCouponsByRestaurant(id) {
        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id: id }
        });
        return coupons;
    }
    async deleteCoupon(id) {
        const deletedCoupon = await prisma.coupon.update({
            where: { id: id, deletedAt: null },
            data: {
                deletedAt: new Date()
            }
        });
        return deletedCoupon;
    }
    async updateCoupon(coupon) {
        await (0, validate_1.validateInputs)(coupon, CouponRequest_1.CouponRequest);
        const updatedCoupon = await prisma.coupon.update({
            where: { id: coupon.id },
            data: {
                name: coupon.name,
                description: coupon.description,
                value: coupon.value,
                startAt: coupon.startAt,
                finishAt: coupon.finishAt,
                updatedAt: new Date(),
            }
        });
        return updatedCoupon;
    }
    async getValidCouponsByRestaurant(coupon_id, restaurant_id) {
        const usedCoupons = await prisma.order.count({
            where: { coupon_id }
        });
        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id,
                finishAt: {
                    gt: new Date()
                },
                quantity: {
                    gte: usedCoupons
                }
            }
        });
        return coupons;
    }
}
exports.CouponService = CouponService;
//# sourceMappingURL=CouponService.js.map