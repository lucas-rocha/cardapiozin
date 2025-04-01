import { ClassMiddleware, Controller, Delete, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import { restaurantGuardMiddleware } from "@src/middlewares/RestaurantGuardMiddleware";
import { CouponService } from "@src/services/CouponService";
import { Request, Response } from "express";



@ClassMiddleware(authMiddleware)
@Controller('restaurants')
export class CouponController {
    constructor(private _couponService: CouponService = new CouponService()){}

    @Middleware(restaurantGuardMiddleware)
    @Post(':restaurant_id/coupons')
    public async create(req: Request, res: Response) {
        const coupon = { ...req.body, ...{ restaurant_id: req.context.restaurant_id } }
        const newCoupon = await this._couponService.createCoupon(coupon)
        return res.status(201).json(newCoupon);
    }

    @Middleware(restaurantGuardMiddleware)
    @Patch(':restaurant_id/coupons')
    public async update(req: Request, res: Response) {
        const coupon = { ...req.body, ...{ restaurant_id: req.context.restaurant_id } }
        const updatedCoupon = await this._couponService.updateCoupon(coupon)
        return res.status(200).json(updatedCoupon);
    }


    @Middleware(restaurantGuardMiddleware)
    @Delete(':restaurant_id/coupons/:coupon_id')
    public async delete(req: Request, res: Response) {
        const deletedCoupon = await this._couponService.deleteCoupon(parseInt(req.params.coupon_id))
        return res.status(200).json(deletedCoupon);
    }

    @Middleware(restaurantGuardMiddleware)
    @Get(':restaurant_id/coupons/:coupon_id')
    public async getCoupon(req: Request, res: Response) {
        const coupon = await this._couponService.getCoupon(parseInt(req.params.coupon_id))
        return res.status(200).json(coupon);
    }

    @Middleware(restaurantGuardMiddleware)
    @Get(':restaurant_id/coupons')
    public async getCouponByRestaurant(req: Request, res: Response) {
        const coupons = await this._couponService.getAllCouponsByRestaurant( req.context?.restaurant_id);
        return res.status(200).json(coupons);
    }

    @Middleware(restaurantGuardMiddleware)
    @Get(':restaurant_id/coupons')
    public async validCouponsByRestaurant(req: Request, res: Response) {
        const coupons = await this._couponService.getValidCouponsByRestaurant(req.body.coupon_id, req.context?.restaurant_id);
        return res.status(200).json(coupons);
    }





}
