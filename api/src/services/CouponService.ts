import { Coupon, PrismaClient } from "@prisma/client";
import { CouponRequest } from "@src/models/requests/CouponRequest";
import { ConflictError, NotFound, UnprocessableError } from "@src/util/errors/ApiError";
import { validateInputs } from "@src/util/validate";

const prisma = new PrismaClient()

export class CouponService {
    constructor() {}

    public async createCoupon(coupon: CouponRequest){
        
        const couponRequest = await validateInputs(coupon,CouponRequest)
          
        if(couponRequest.startAt > couponRequest.finishAt)
            throw new UnprocessableError('Start date cannot be greater than the final date!')

        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id: coupon.restaurant_id, 
                finishAt:{
                    gt: new Date()
                },
                deletedAt: null,
                name: coupon.name
            }
        })

        if(coupons.length > 0)
            throw new ConflictError('There is already an active coupon with this name!')

        const newCoupon = await prisma.coupon.create({
            data:{
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
        }) 
        return newCoupon;

    }

    public async getCoupon(id:number): Promise<Coupon>{
        const coupon = await prisma.coupon.findUnique({
            where: {id}
        })

        if(!coupon)
            throw new NotFound('coupon not found!')
      
        return coupon;
    }

    public async getAllCouponsByRestaurant(id?: string): Promise<Coupon[]>{

        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id: id}
        })

        return coupons
    }

    public async deleteCoupon(id: number): Promise<Coupon>{

        const deletedCoupon = await prisma.coupon.update({
            where:{id: id, deletedAt: null},
            data:{
                deletedAt: new Date()
            }
        })

        return deletedCoupon;
    }


    public async updateCoupon(coupon: CouponRequest):Promise<Coupon>{

        await validateInputs(coupon,CouponRequest)

        const updatedCoupon = await prisma.coupon.update({
            where:{id: coupon.id},
            data:{
                name: coupon.name,
                description: coupon.description,
                value: coupon.value,
                startAt: coupon.startAt,
                finishAt: coupon.finishAt,
                updatedAt: new Date(),
            }
        })

        return updatedCoupon;
    }

    public async getValidCouponsByRestaurant(coupon_id: number, restaurant_id?: string){

        const usedCoupons = await prisma.order.count({
            where:{coupon_id}
        })

        const coupons = await prisma.coupon.findMany({
            where: { restaurant_id, 
                finishAt:{
                    gt: new Date()
                },
                quantity:{
                    gte: usedCoupons
                }
            }
        })

        return coupons
    }
   


      
}