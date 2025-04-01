"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
class NotificationService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async getNotificationFromRestaurant(restaurant_id, user_id) {
        const notifications = await this.prisma.notification.findMany({
            where: { restaurant_id }
        });
        return notifications;
    }
    async createNotification(restaurant_id, title, message, user_id) {
        const user = await this.prisma.user.findFirst({
            where: { id: user_id }
        });
        await this.prisma.notification.create({
            data: {
                restaurant_id,
                user_id: (user === null || user === void 0 ? void 0 : user.id) || null,
                title,
                actorName: `${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}`,
                message
            }
        });
    }
    async updateStatusNotification(notificationId) {
        const updatedNotification = await this.prisma.notification.update({
            where: { id: notificationId },
            data: {
                is_read: true
            }
        });
        return updatedNotification;
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map