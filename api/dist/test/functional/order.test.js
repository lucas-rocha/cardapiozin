"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const client_1 = require("@prisma/client");
const customerFactory_1 = require("@test/factories/customerFactory");
const restaurantFactory_1 = require("@test/factories/restaurantFactory");
const menuItemFactory_1 = require("@test/factories/menuItemFactory");
const prisma = new client_1.PrismaClient();
describe('Order functional tests', () => {
    beforeEach(async () => {
        await prisma.order.deleteMany({});
        await prisma.customer.deleteMany({});
        await prisma.menu_item.deleteMany({});
        await prisma.restaurant.deleteMany({});
    });
    describe('When creating a new order', () => {
        it('should create a new order', async () => {
            const customer = await (0, customerFactory_1.createCustomer)();
            const restaurant = await (0, restaurantFactory_1.createRestaurant)();
            const menuItem = await (0, menuItemFactory_1.createMenuItem)({ restaurant_id: restaurant.id });
            const newOrder = {
                total_amount: 15,
                customer_id: customer.id,
                restaurant_id: restaurant.id,
                menu_item_id: menuItem.id
            };
            const response = await global.testRequest.post('/orders').send(newOrder);
            await expect(response.status).toBe(201);
        });
    });
});
//# sourceMappingURL=order.test.js.map