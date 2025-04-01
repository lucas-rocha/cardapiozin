"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const client_1 = require("@prisma/client");
const RestaurantDto_1 = require("@src/models/Dtos/RestaurantDto");
const ApiError_1 = require("@src/util/errors/ApiError");
const UserService_1 = require("./UserService");
const AuthService_1 = __importDefault(require("./AuthService"));
const validate_1 = require("@src/util/validate");
const prisma = new client_1.PrismaClient();
class RestaurantService {
    constructor(_userService = new UserService_1.UserService()) {
        this._userService = _userService;
    }
    async createRestaurant(restaurant) {
        if (await prisma.restaurant.findUnique({ where: { restaurant_name: restaurant.restaurant_name } }))
            throw new ApiError_1.ConflictError('Restaurant already exists!');
        await (0, validate_1.validateInputs)(restaurant, RestaurantDto_1.RestaurantDto);
        const result = await prisma.$transaction(async (tx) => {
            const newRestaurant = await tx.restaurant.create({
                data: {
                    restaurant_name: restaurant.restaurant_name
                }
            });
            await tx.user_Restaurant.create({
                data: {
                    user_id: restaurant.user_id,
                    restaurant_id: newRestaurant.id,
                    role: "OWNER"
                }
            });
            return newRestaurant;
        });
        return result;
    }
    async getUsersRestaurants(restaurantId) {
        const usersRestaurant = await prisma.user_Restaurant.findMany({
            where: {
                restaurant_id: restaurantId
            },
            include: {
                user: true
            }
        });
        return usersRestaurant;
    }
    async addUserToRestaurant(userRestaurant) {
        let user = await prisma.user.findUnique({
            where: { email: userRestaurant.email }
        });
        if (!user) {
            const hashedPassword = await AuthService_1.default.hashPassword(userRestaurant.password);
            user = await prisma.user.create({
                data: {
                    firstName: userRestaurant.firstName,
                    lastName: userRestaurant.lastName,
                    email: userRestaurant.email,
                    password: hashedPassword,
                }
            });
        }
        const existingRelation = await prisma.user_Restaurant.findUnique({
            where: {
                user_id_restaurant_id: {
                    user_id: user.id,
                    restaurant_id: userRestaurant.restaurant_id
                }
            }
        });
        if (existingRelation)
            throw new ApiError_1.ConflictError('User is already associated with this restaurant');
        await prisma.user_Restaurant.create({
            data: {
                user_id: user.id,
                restaurant_id: userRestaurant.restaurant_id,
                role: userRestaurant.role || "USER",
                accessType: userRestaurant.accessType
            }
        });
        return user;
    }
    async getRestaurantsForLoggedUser(id) {
        const restaurants = await prisma.user_Restaurant.findMany({
            where: { user_id: id }
        });
        if (!restaurants)
            throw new ApiError_1.NotFound('Restaurants not found!');
        return restaurants;
    }
    async getLoggedRestaurant(id) {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id }
        });
        if (!restaurant)
            throw new ApiError_1.NotFound('Restaurant not found!');
        return restaurant;
    }
    async getInfoRestaurant(restaurantUrl) {
        const restaurant = await prisma.restaurant.findUnique({
            where: { restaurant_url: restaurantUrl }
        });
        if (!restaurant)
            throw new ApiError_1.NotFound('Restaurant not found!');
        return restaurant;
    }
}
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=RestaurantService.js.map