"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestaurant = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRestaurant = async (overrides = {}) => {
    return prisma.restaurant.create({
        data: {
            restaurant_name: 'My Restaurant',
            ...overrides
        }
    });
};
exports.createRestaurant = createRestaurant;
//# sourceMappingURL=restaurantFactory.js.map