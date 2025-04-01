"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const CategoryRequest_1 = require("@src/models/requests/CategoryRequest");
const ApiError_1 = require("@src/util/errors/ApiError");
const validate_1 = require("@src/util/validate");
class CategoryService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async createCategories(categoriesValues, limit, file, transaction) {
        this.prisma = transaction ? transaction : this.prisma;
        await Promise.all(categoriesValues.categoriesList.map(category => (0, validate_1.validateInputs)(category, CategoryRequest_1.CategoryRequest)));
        const categoryCount = await this.prisma.category.count({
            where: { restaurant_id: categoriesValues.restaurant_id },
        });
        if (categoryCount + categoriesValues.categoriesList.length > limit) {
            throw new ApiError_1.ConflictError(`The limit of ${limit} categories has been reached for this restaurant.`);
        }
        const existingCategories = await this.prisma.category.findMany({
            where: {
                restaurant_id: categoriesValues.restaurant_id,
                name: { in: categoriesValues.categoriesList.map(category => category.name) }
            }
        });
        if (existingCategories.length > 0) {
            const existingNames = existingCategories.map(category => category.name).join(", ");
            throw new ApiError_1.ConflictError(`The following categories already exist: ${existingNames}`);
        }
        await this.prisma.category.createMany({
            data: categoriesValues.categoriesList.map(category => ({
                name: category.name,
                category_image_id: category.image_id,
                restaurant_id: categoriesValues.restaurant_id
            })),
        });
        const createdCategories = await this.prisma.category.findMany({
            where: {
                restaurant_id: categoriesValues.restaurant_id,
                name: { in: categoriesValues.categoriesList.map(category => category.name) }
            },
        });
        return createdCategories;
    }
    async getAllItemsForCategory(category_id, restaurant_id) {
        var _a;
        await this.verifyCategory(category_id, restaurant_id);
        const categoryWithMenuItems = await this.prisma.category.findUnique({
            where: {
                restaurant_id: restaurant_id,
                id: category_id
            },
            select: {
                id: true,
                name: true,
                category_images: {
                    select: {
                        image: true,
                    },
                },
                Menu_item_Category: {
                    select: {
                        Menuitem: {
                            select: {
                                id: true,
                                item_name: true,
                                price: true,
                                description: true,
                                serving: true,
                                quantity: true,
                                visible: true,
                            },
                        },
                    },
                },
            },
        });
        if (!categoryWithMenuItems)
            throw new ApiError_1.NotFound("This category does not exist in this restaurant!");
        return {
            id: categoryWithMenuItems.id,
            name: categoryWithMenuItems.name,
            image: ((_a = categoryWithMenuItems.category_images) === null || _a === void 0 ? void 0 : _a.image) || null,
            menuItems: categoryWithMenuItems.Menu_item_Category.map(menuItemCategory => ({
                id: menuItemCategory.Menuitem.id,
                item_name: menuItemCategory.Menuitem.item_name,
                price: menuItemCategory.Menuitem.price,
                description: menuItemCategory.Menuitem.description,
                serving: menuItemCategory.Menuitem.serving,
                quantity: menuItemCategory.Menuitem.quantity,
                visible: menuItemCategory.Menuitem.visible,
            })),
        };
    }
    async getAllItemsForCategories(restaurant_id) {
        const categoriesWithMenuItems = await this.prisma.category.findMany({
            where: {
                restaurant_id: restaurant_id,
            },
            select: {
                id: true,
                name: true,
                category_images: {
                    select: {
                        image: true,
                    },
                },
                Menu_item_Category: {
                    select: {
                        Menuitem: {
                            select: {
                                id: true,
                                item_name: true,
                                price: true,
                                description: true,
                                serving: true,
                                quantity: true,
                                visible: true,
                            },
                        },
                    },
                },
            },
        });
        return categoriesWithMenuItems.map(category => {
            var _a;
            return ({
                id: category.id,
                name: category.name,
                image: ((_a = category.category_images) === null || _a === void 0 ? void 0 : _a.image) || null,
                menuItems: category.Menu_item_Category.map(menuItemCategory => ({
                    id: menuItemCategory.Menuitem.id,
                    item_name: menuItemCategory.Menuitem.item_name,
                    price: menuItemCategory.Menuitem.price,
                    description: menuItemCategory.Menuitem.description,
                    serving: menuItemCategory.Menuitem.serving,
                    quantity: menuItemCategory.Menuitem.quantity,
                    visible: menuItemCategory.Menuitem.visible,
                })),
            });
        });
    }
    async addMenuItemInCategory(menuItemCategory, restaurant_id, transaction) {
        const prisma = transaction ? transaction : this.prisma;
        for (const item of menuItemCategory) {
            await this.verifyCategory(item.category_id, restaurant_id);
        }
        const result = await prisma.menu_item_Category.createMany({
            data: menuItemCategory.map((item) => ({
                menu_item_id: item.menuItem_id,
                category_id: item.category_id,
            })),
            skipDuplicates: true,
        });
        return { count: result.count };
    }
    async removeMenuItemInCategory(menu_item_id, transaction) {
        const prisma = transaction ? transaction : this.prisma;
        const result = await prisma.menu_item_Category.deleteMany({
            where: {
                menu_item_id: menu_item_id
            },
        });
        return result;
    }
    async updateCategory(category_id, categoryUpdate, restaurant_id) {
        await this.verifyCategory(category_id, restaurant_id);
        const result = await this.prisma.$transaction(async (prisma) => {
            const updatedCategory = await this.prisma.category.update({
                where: { id: category_id },
                data: { name: categoryUpdate.name, category_image_id: categoryUpdate.imageId, updated_at: new Date() },
            });
            const currentItemsInCategory = await this.prisma.menu_item_Category.findMany({
                where: {
                    category_id: category_id,
                },
                select: {
                    menu_item_id: true,
                },
            });
            const currentItemIds = currentItemsInCategory.map(item => item.menu_item_id);
            const itemsToRemove = currentItemIds.filter(id => !categoryUpdate.menuItemId.includes(id));
            const removed = await this.prisma.menu_item_Category.deleteMany({
                where: {
                    category_id: category_id,
                    menu_item_id: {
                        in: itemsToRemove,
                    },
                },
            });
            const itemsToAdd = categoryUpdate.menuItemId.filter(id => !currentItemIds.includes(id));
            const added = await this.prisma.menu_item_Category.createMany({
                data: itemsToAdd.map((menuItemId) => ({
                    menu_item_id: menuItemId,
                    category_id: category_id,
                })),
                skipDuplicates: true,
            });
            return {
                countAdded: added.count,
                countRemoved: removed.count,
                updatedCategory,
            };
        });
        return result;
    }
    async deleteCategory(category_id, restaurant_id) {
        await this.verifyCategory(category_id, restaurant_id);
        const result = await this.prisma.$transaction(async (prisma) => {
            await this.prisma.menu_item_Category.deleteMany({
                where: {
                    category_id: category_id,
                },
            });
            await this.prisma.category.delete({
                where: {
                    id: category_id,
                },
            });
        });
        return result;
    }
    async getAllCategoriesByRestaurant(restaurantId) {
        const categories = await this.prisma.category.findMany({
            where: {
                restaurant_id: restaurantId,
            },
            select: {
                id: true,
                name: true,
                category_images: {
                    select: {
                        image: true,
                    },
                },
            },
        });
        return categories.map(category => {
            var _a;
            return ({
                id: category.id,
                name: category.name,
                image: ((_a = category.category_images) === null || _a === void 0 ? void 0 : _a.image) || null,
            });
        });
    }
    async verifyCategory(category_id, restaurant_id) {
        const exists = await this.prisma.category.findFirst({
            where: { id: category_id, restaurant_id: restaurant_id },
        });
        if (!exists)
            throw new ApiError_1.BadRequestError("This category does not exist in this restaurant");
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map