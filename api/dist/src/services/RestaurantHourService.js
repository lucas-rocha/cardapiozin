"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantHourService = void 0;
const client_1 = require("@prisma/client");
const RestaurantHourRequest_1 = require("@src/models/requests/RestaurantHourRequest");
const ApiError_1 = require("@src/util/errors/ApiError");
const validate_1 = require("@src/util/validate");
const class_validator_1 = require("class-validator");
const prisma = new client_1.PrismaClient();
class RestaurantHourService {
    async createHour(hours) {
        const restaurantHour = await (0, validate_1.validateInputs)(hours, RestaurantHourRequest_1.RestaurantHourRequest);
        const existingHour = await prisma.restaurant_Hour.findFirst({
            where: { days_of_week_id: hours.days_of_week_id }
        });
        if (existingHour)
            throw new ApiError_1.ConflictError("A schedule for this day already exists. Please modify the existing hours or choose a different day.");
        return await prisma.restaurant_Hour.create({
            data: {
                open_time: restaurantHour.open_time,
                close_time: restaurantHour.close_time,
                is_closed: restaurantHour.is_closed,
                is_24_hours: restaurantHour.is_24_hours,
                days_of_week_id: restaurantHour.days_of_week_id,
                restaurant_id: restaurantHour.restaurant_id
            }
        });
    }
    async getHoursForLoggedRestaurant(restaurant_id) {
        const hours = await prisma.restaurant_Hour.findMany({
            where: { restaurant_id },
            include: {
                Days_of_week: true
            }
        });
        if (!hours)
            throw new ApiError_1.NotFound('Hours not found!');
        return hours;
    }
    async getHourById(id) {
        const hour = await prisma.restaurant_Hour.findFirst({
            where: { id }
        });
        if (!hour)
            throw new ApiError_1.NotFound('Hour not found');
        return hour;
    }
    async updateHourById(hours, id) {
        const restaurantHour = new RestaurantHourRequest_1.RestaurantHourRequest();
        restaurantHour.open_time = hours.open_time;
        restaurantHour.close_time = hours.close_time;
        restaurantHour.is_closed = hours.is_closed;
        restaurantHour.is_24_hours = hours.is_24_hours;
        const validateErrors = await (0, class_validator_1.validate)(restaurantHour);
        if (validateErrors.length > 0) {
            throw new ApiError_1.BadRequestError("Some fields are missing or invalid.");
        }
        const existingHour = await prisma.restaurant_Hour.findFirst({
            where: { id }
        });
        if (!existingHour) {
            throw new ApiError_1.NotFound("The specified schedule for this restaurant does not exist.");
        }
        const updatedHour = await prisma.restaurant_Hour.update({
            where: {
                id: existingHour.id,
            },
            data: {
                open_time: restaurantHour.open_time,
                close_time: restaurantHour.close_time,
                is_closed: restaurantHour.is_closed,
                is_24_hours: restaurantHour.is_24_hours,
            },
        });
        return updatedHour;
    }
}
exports.RestaurantHourService = RestaurantHourService;
//# sourceMappingURL=RestaurantHourService.js.map