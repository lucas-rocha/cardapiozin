import { Order, PrismaClient } from "@prisma/client";
import { OrderRequest } from "@src/models/requests/OrderRequest";
import { NotFound, UnprocessableError } from "@src/util/errors/ApiError";
import { MenuItemService } from "./MenuItemService";
import { AdditionalItemService } from "./AdditionalItemService";

const prisma = new PrismaClient()

export class OrderService {
  constructor(
    private menuItemService: MenuItemService = new MenuItemService(),
    private additionalItemService: AdditionalItemService = new AdditionalItemService()
  ) {}

  public async createOrder(order: OrderRequest): Promise<Order> {
   
    if(order.coupon_id){   
        const coupon = await prisma.coupon.findUnique({
          where: { id: order.coupon_id }
        })

        if(!coupon)
          throw new NotFound('This coupon does not exist!')

        const usedCoupons = await prisma.order.count({
          where:{coupon_id: order.coupon_id}
        })
        
        if(usedCoupons==coupon.quantity)
          throw new UnprocessableError('This coupon has been sold out!')
    }

    const result = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          total_amount: order.total_amount,
          customer_id: order.customer_id,
          payment_method: order.payment_method,
          restaurant_id: order.restaurant_id,
          coupon_id: order.coupon_id || null,
        },
      });
    
      
      await Promise.all(
        order.items.map(async (item) => {
          const menuItem =  await this.menuItemService.getMenuItemById(item.menuItemId)
          const createdItem = await prisma.order_item.create({
            data: {
              quantity: item.quantity,
              name: menuItem.name,
              image: menuItem.image,
              price: menuItem.price,
              order_id: newOrder.id,  
            },
          });
    
          if(item.additionalItemsId.length>0){
            const additionalItems = await this.additionalItemService.getAdditionalItemsByIds(item.additionalItemsId, order.restaurant_id)
            if(item.additionalItemsId.length != additionalItems?.length)
                throw new NotFound('A an additional item does not exist!')

            await prisma.order_additional_item.createMany({
              data: additionalItems.map((additionalItem) => ({
                quantity: additionalItem.quantity,
                name: additionalItem.name,
                price: additionalItem.price,
                order_item_id: createdItem.id,  
              })),
            });
          }
              
          return createdItem;
        })
      );
    
      return newOrder;
    });

    return result
  }

  public async getAllOrdersForRestaurant(restaurant_id: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { restaurant_id },
      include: {
        restaurant: {
          select: {
            id: true,
            restaurant_name: true,
          }
        },
        customer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
          }
        },
        order_items: {
          select: {
            quantity: true,
            name: true,
            image: true,
            price: true
          },
          include:{
            order_additional_item:{
              select:{
                quantity: true,
                name: true,
                price: true
              }
          }
          }          
        },
        
      }
    })

    if(!orders)
      throw new NotFound('Orders not found')

    return orders
  }
  
  public async getOrderById(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            first_name: true,
            last_name: true,
            email: true
          }
        },
        order_items: {
          select: {
            quantity: true,
            name: true,
            image: true,
            price: true
          },
          include:{
            order_additional_item:{
              select:{
                quantity: true,
                name: true,
                price: true
              }
          }
          }          
        }
      }
    })

    if(!order)
      throw new NotFound('Order not found!')

    return order
  }
}