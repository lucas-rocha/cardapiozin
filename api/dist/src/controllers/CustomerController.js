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
exports.CustomerController = void 0;
const core_1 = require("@overnightjs/core");
const AuthCustomerMiddleware_1 = require("@src/middlewares/AuthCustomerMiddleware");
const CustomerService_1 = require("@src/services/CustomerService");
const ApiError_1 = require("@src/util/errors/ApiError");
let CustomerController = class CustomerController {
    constructor(_customerService = new CustomerService_1.CustomerService()) {
        this._customerService = _customerService;
    }
    async create(req, res) {
        const { restaurant_id } = req.body;
        const newCustomer = await this._customerService.createCustomer(req.body, restaurant_id);
        return res.status(201).json(newCustomer);
    }
    async getCustomers(req, res) {
        const customers = await this._customerService.getCustomers();
        return res.status(200).json(customers);
    }
    async me(req, res) {
        var _a, _b;
        const customer_id = (_a = req.context) === null || _a === void 0 ? void 0 : _a.customer_id;
        const restaurant_id = (_b = req.context) === null || _b === void 0 ? void 0 : _b.restaurant_id;
        if (!customer_id)
            throw new ApiError_1.NotFound('Customer id not provided');
        if (!restaurant_id)
            throw new ApiError_1.NotFound('Customer id not provided');
        const customer = await this._customerService.getLoggedCustomer(customer_id, restaurant_id);
        return res.status(200).json(customer);
    }
    async getCustomerById(req, res) {
        const customer = await this._customerService.getCustomerById(req.params.id);
        return res.status(200).json(customer);
    }
    async updateCustomerById(req, res) {
        const updatedCustomer = await this._customerService.getCustomerById(req.params.id);
        return res.status(202).json(updatedCustomer);
    }
    async deleteCustomerById(req, res) {
        const deletedCustomer = await this._customerService.deleteCustomerById(req.params.id);
        return res.status(202).json(deletedCustomer);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomers", null);
__decorate([
    (0, core_1.Get)('me'),
    (0, core_1.Middleware)(AuthCustomerMiddleware_1.authCustomerMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "me", null);
__decorate([
    (0, core_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerById", null);
__decorate([
    (0, core_1.Patch)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerById", null);
__decorate([
    (0, core_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomerById", null);
exports.CustomerController = CustomerController = __decorate([
    (0, core_1.Controller)('customers'),
    __metadata("design:paramtypes", [CustomerService_1.CustomerService])
], CustomerController);
//# sourceMappingURL=CustomerController.js.map