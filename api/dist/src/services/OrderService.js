"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = require("@src/util/errors/ApiError");
const MenuItemService_1 = require("./MenuItemService");
const AdditionalItemService_1 = require("./AdditionalItemService");
const prisma = new client_1.PrismaClient();
class OrderService {
    constructor(menuItemService = new MenuItemService_1.MenuItemService(), additionalItemService = new AdditionalItemService_1.AdditionalItemService()) {
        this.menuItemService = menuItemService;
        this.additionalItemService = additionalItemService;
    }
    async createOrder(order) {
        if (order.coupon_id) {
            const coupon = await prisma.coupon.findUnique({
                where: { id: order.coupon_id }
            });
            if (!coupon)
                throw new ApiError_1.NotFound('This coupon does not exist!');
            const usedCoupons = await prisma.order.count({
                where: { coupon_id: order.coupon_id }
            });
            if (usedCoupons == coupon.quantity)
                throw new ApiError_1.UnprocessableError('This coupon has been sold out!');
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
            await Promise.all(order.items.map(async (item) => {
                const menuItem = await this.menuItemService.getMenuItemById(item.menuItemId);
                const createdItem = await prisma.order_item.create({
                    data: {
                        quantity: item.quantity,
                        name: menuItem.name,
                        image: menuItem.image,
                        price: menuItem.price,
                        order_id: newOrder.id,
                    },
                });
                if (item.additionalItemsId.length > 0) {
                    const additionalItems = await this.additionalItemService.getAdditionalItemsByIds(item.additionalItemsId, order.restaurant_id);
                    if (item.additionalItemsId.length != (additionalItems === null || additionalItems === void 0 ? void 0 : additionalItems.length))
                        throw new ApiError_1.NotFound('A an additional item does not exist!');
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
            }));
            return newOrder;
        });
        return result;
    }
    async getAllOrdersForRestaurant(restaurant_id) {
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
                    include: {
                        order_additional_item: {
                            select: {
                                quantity: true,
                                name: true,
                                price: true
                            }
                        }
                    }
                },
            }
        });
        if (!orders)
            throw new ApiError_1.NotFound('Orders not found');
        return orders;
    }
    async getOrderById(id) {
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
                    include: {
                        order_additional_item: {
                            select: {
                                quantity: true,
                                name: true,
                                price: true
                            }
                        }
                    }
                }
            }
        });
        if (!order)
            throw new ApiError_1.NotFound('Order not found!');
        return order;
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map