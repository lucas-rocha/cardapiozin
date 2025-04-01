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
exports.OrderController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const OrderService_1 = require("@src/services/OrderService");
const InternalError_1 = require("@src/util/errors/InternalError");
let OrderController = class OrderController {
    constructor(_orderService = new OrderService_1.OrderService()) {
        this._orderService = _orderService;
    }
    async createOrder(req, res) {
        const newOrder = await this._orderService.createOrder(req.body);
        return res.status(201).json(newOrder);
    }
    async getOrdersForLoggedRestaurant(req, res) {
        const restaurantId = req.context.restaurant_id;
        if (!restaurantId)
            throw new InternalError_1.InternalError('Something went wrong');
        const orders = await this._orderService.getAllOrdersForRestaurant(restaurantId);
        return res.status(200).json(orders);
    }
    async getOrder(req, res) {
        const order = await this._orderService.getOrderById(parseInt(req.params.id));
        return res.status(200).json(order);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, core_1.Get)(''),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersForLoggedRestaurant", null);
__decorate([
    (0, core_1.Get)(':id'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, core_1.Controller)('orders'),
    __metadata("design:paramtypes", [OrderService_1.OrderService])
], OrderController);
//# sourceMappingURL=OrderController.js.map