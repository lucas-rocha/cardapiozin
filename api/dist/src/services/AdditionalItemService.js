"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalItemService = void 0;
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const AdditionalItemRequest_1 = require("@src/models/requests/AdditionalItemRequest");
const ApiError_1 = require("@src/util/errors/ApiError");
const validate_1 = require("@src/util/validate");
class AdditionalItemService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async createAdditionalItems(additionalItems, restaurant_id, transaction) {
        this.prisma = transaction ? transaction : this.prisma;
        for (const item of additionalItems) {
            await (0, validate_1.validateInputs)(item, AdditionalItemRequest_1.AdditionalItemRequest);
        }
        const existingItems = await this.prisma.additional_Item.findMany({
            where: {
                restaurant_id: restaurant_id,
                name: { in: additionalItems.map(item => item.name) },
            },
        });
        if (existingItems.length > 0) {
            const existingNames = existingItems.map(item => item.name).join(", ");
            throw new ApiError_1.ConflictError(`The following Additional Items already exist: ${existingNames}`);
        }
        await this.prisma.additional_Item.createMany({
            data: additionalItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                restaurant_id: restaurant_id,
            })),
        });
        const createdItems = await this.prisma.additional_Item.findMany({
            where: {
                restaurant_id: restaurant_id,
                name: { in: additionalItems.map(item => item.name) },
            },
        });
        return createdItems;
    }
    async updateAdditionalItem(additionalItemUpdate) {
        await (0, validate_1.validateInputs)(additionalItemUpdate, AdditionalItemRequest_1.AdditionalItemRequest);
        const exists = await this.prisma.additional_Item.findFirst({
            where: {
                id: additionalItemUpdate.id,
                restaurant_id: additionalItemUpdate.restaurant_id
            },
        });
        if (!exists)
            throw new ApiError_1.ConflictError("Additional Item does not exists!");
        return await this.prisma.additional_Item.update({
            where: { id: additionalItemUpdate.id },
            data: {
                name: additionalItemUpdate.name,
                quantity: additionalItemUpdate.quantity,
                price: additionalItemUpdate.price,
            }
        });
    }
    async deleteAdditionalItem(id, restaurant_id) {
        const exists = await this.prisma.additional_Item
            .findFirst({ where: { id, restaurant_id: restaurant_id } });
        if (!exists)
            throw new ApiError_1.ConflictError("Additional Item does not exists!");
        return await this.prisma.additional_Item.delete({ where: { id } });
    }
    async additionalItemInMenuItem(addAdditionalItemRequest, restaurant_id, transactionPrisma) {
        const { menuItem_id, addAdditionalItemsIds, removeAdditionalItemsIds } = addAdditionalItemRequest;
        const existMenuitem = await transactionPrisma.menu_item.findFirst({
            where: {
                restaurant_id: restaurant_id,
                id: addAdditionalItemRequest.menuItem_id
            }
        });
        if (!existMenuitem)
            throw new ApiError_1.ConflictError("Menu Item does not exist!");
        const uniqueIds = Array.from(new Set([...addAdditionalItemsIds,
            ...removeAdditionalItemsIds]));
        const removedAddtionalItems = await transactionPrisma.menu_Item_Additional_Item.findMany({
            where: {
                menu_item_id: menuItem_id,
                additional_item_id: {
                    notIn: uniqueIds
                }
            }
        });
        if (removedAddtionalItems.length > 0) {
            const removedAddtionalItemsIds = removedAddtionalItems.map(x => x.additional_item_id);
            await transactionPrisma.menu_Item_Additional_Item.deleteMany({
                where: {
                    additional_item_id: {
                        in: removedAddtionalItemsIds
                    }
                }
            });
        }
        const additionalItems = await transactionPrisma.menu_Item_Additional_Item.findMany({
            where: {
                menu_item_id: menuItem_id,
                additional_item_id: {
                    in: uniqueIds
                }
            },
        });
        const additionalItemsIds = additionalItems.map(item => item.additional_item_id);
        const insertAddItemInMenuitem = uniqueIds
            .filter(id => !additionalItemsIds.includes(id))
            .map(id => ({
            menu_item_id: menuItem_id,
            additional_item_id: id,
            add_item: false,
            remove_item: false,
        }));
        if (insertAddItemInMenuitem.length > 0) {
            const createResult = await transactionPrisma.menu_Item_Additional_Item.createMany({
                data: insertAddItemInMenuitem
            });
            if (createResult.count === 0)
                throw new ApiError_1.BadRequestError("Failed to add additional items.");
        }
        const updateResults = await Promise.all(uniqueIds.map(async (id) => {
            const result = await transactionPrisma.menu_Item_Additional_Item.updateMany({
                where: {
                    menu_item_id: menuItem_id,
                    additional_item_id: id,
                },
                data: {
                    add_item: addAdditionalItemsIds.includes(id),
                    remove_item: removeAdditionalItemsIds.includes(id),
                }
            });
            return result.count;
        }));
        await transactionPrisma.menu_Item_Additional_Item.deleteMany({
            where: {
                menu_item_id: menuItem_id,
                add_item: false,
                remove_item: false
            }
        });
        return { success: true };
    }
    async getAdditionalItensByRestaurant(restaurant_id) {
        return await this.prisma.additional_Item.findMany({ where: { restaurant_id: restaurant_id } });
    }
    async getAdditionalItemById(additional_item_id) {
        return await this.prisma.additional_Item.findUnique({ where: { id: additional_item_id } });
    }
    async getAdditionalItemsByIds(additional_item_ids, restaurant_id) {
        return await this.prisma.additional_Item.findMany({
            where: {
                id: { in: additional_item_ids },
                restaurant_id
            }
        });
    }
}
exports.AdditionalItemService = AdditionalItemService;
//# sourceMappingURL=AdditionalItemService.js.map