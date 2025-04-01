"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenuItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMenuItem = async (overrides = {}) => {
    return prisma.menu_item.create({
        data: {
            item_name: 'Hambuger',
            price: 45,
            ...overrides
        }
    });
};
exports.createMenuItem = createMenuItem;
//# sourceMappingURL=menuItemFactory.js.map