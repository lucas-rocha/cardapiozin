"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const NotificationService_1 = require("@src/services/NotificationService");
const ApiError_1 = require("@src/util/errors/ApiError");
let NotificationController = class NotificationController {
    constructor(_notificationService = new NotificationService_1.NotificationService()) {
        this._notificationService = _notificationService;
    }
    async getNotificationsRestaurant(req, res) {
        const restaurant_id = req.context.restaurant_id;
        const user_id = req.context.user_id;
        if (!restaurant_id)
            throw new ApiError_1.BadRequestError('Something went wrong');
        if (!user_id)
            throw new ApiError_1.BadRequestError('Something went wrong');
        const notifications = await this._notificationService.getNotificationFromRestaurant(restaurant_id, user_id);
        return res.status(200).json(notifications);
    }
    async updateNotification(req, res) {
        const notificationId = req.params.id;
        const notification = await this._notificationService.updateStatusNotification(notificationId);
        return res.status(200).json(notification);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, core_1.Get)(''),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotificationsRestaurant", null);
__decorate([
    (0, core_1.Patch)(':id'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updateNotification", null);
exports.NotificationController = NotificationController = __decorate([
    (0, core_1.Controller)('notifications'),
    __metadata("design:paramtypes", [NotificationService_1.NotificationService])
], NotificationController);
//# sourceMappingURL=NotificationController.js.map