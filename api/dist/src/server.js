"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
const core_1 = require("@overnightjs/core");
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const UserController_1 = require("@src/controllers/UserController");
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const client_1 = require("@prisma/client");
const RestaurantController_1 = require("./controllers/RestaurantController");
const BlogController_1 = require("./controllers/BlogController");
const MenuItemController_1 = require("./controllers/MenuItemController");
const CustomerController_1 = require("./controllers/CustomerController");
const OrderController_1 = require("./controllers/OrderController");
const CouponController_1 = require("./controllers/CouponController");
const RestaurantHourController_1 = require("./controllers/RestaurantHourController");
const CategoryController_1 = require("./controllers/CategoryController");
const AdditionalItemController_1 = require("./controllers/AdditionalItemController");
const InfoController_1 = require("./controllers/InfoController");
const InviteController_1 = require("./controllers/InviteController");
const NotificationController_1 = require("./controllers/NotificationController");
const AuthController_1 = require("./controllers/AuthController");
const prisma = new client_1.PrismaClient();
class SetupServer extends core_1.Server {
    constructor(port = 5000) {
        super();
        this.port = port;
    }
    async init() {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }
    setupExpress() {
        const corsOptions = {
            origin: ['http://localhost:3000', 'http://hamburgueria.localhost:4000'],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        };
        this.app.use((0, express_1.json)());
        this.app.use((0, cors_1.default)(corsOptions));
    }
    setupControllers() {
        const usersControllers = new UserController_1.UserController();
        const authController = new AuthController_1.AuthController();
        const restaurantController = new RestaurantController_1.RestaurantController();
        const blogController = new BlogController_1.BlogController();
        const menuItemController = new MenuItemController_1.MenuItemController();
        const customerController = new CustomerController_1.CustomerController();
        const orderController = new OrderController_1.OrderController();
        const couponController = new CouponController_1.CouponController();
        const restaurantHourController = new RestaurantHourController_1.RestaurantHourController();
        const categoryController = new CategoryController_1.CategoryController();
        const additionalItemController = new AdditionalItemController_1.AdditionalMenuController();
        const infoController = new InfoController_1.InfoController();
        const inviteController = new InviteController_1.InviteController();
        const notificationController = new NotificationController_1.NotificationController();
        this.addControllers([
            usersControllers,
            authController,
            restaurantController,
            blogController,
            menuItemController,
            customerController,
            orderController,
            couponController,
            restaurantHourController,
            categoryController,
            additionalItemController,
            infoController,
            inviteController,
            notificationController
        ]);
    }
    setupErrorMiddleware() {
        this.app.use(ErrorMiddleware_1.errorMiddleware);
    }
    databaseSetup() {
        return prisma.$connect()
            .then(() => console.log('Database running'))
            .catch(error => console.log(error));
    }
    getApp() {
        return this.app;
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('Server listening of port:', this.port);
        });
    }
    close() {
        prisma.$disconnect();
    }
}
exports.SetupServer = SetupServer;
//# sourceMappingURL=server.js.map