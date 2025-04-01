"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const client_1 = require("@prisma/client");
const CustomerRequest_1 = require("@src/models/requests/CustomerRequest");
const ApiError_1 = require("@src/util/errors/ApiError");
const AuthService_1 = __importDefault(require("./AuthService"));
const validate_1 = require("@src/util/validate");
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const prisma = new client_1.PrismaClient();
class CustomerService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async createCustomer(customer, restaurantId) {
        console.log(restaurantId);
        if (customer.password !== customer.passwordTwo)
            throw new ApiError_1.BadRequestError('Passwords do not match!');
        const existingCustomer = await this.prisma.customer.findFirst({
            where: { phone: customer.phone, restaurant_id: restaurantId }
        });
        if (existingCustomer)
            throw new ApiError_1.ConflictError('Cliente já está cadastrado neste restaurante!');
        const hashedPassword = await AuthService_1.default.hashPassword(customer.password);
        customer.password = hashedPassword;
        const customerRequest = await (0, validate_1.validateInputs)(customer, CustomerRequest_1.CustomerRequest);
        delete customerRequest.passwordTwo;
        const newCustomer = await prisma.customer.create({
            data: {
                email: customer.email,
                first_name: customer.first_name,
                phone: customer.phone,
                password: customer.password,
                restaurant_id: restaurantId
            }
        });
        return newCustomer;
    }
    async getCustomers() {
        const customers = await prisma.customer.findMany();
        return customers;
    }
    async getLoggedCustomer(customer_id, restaurant_id) {
        const customer = await this.prisma.customer.findFirst({
            where: {
                id: customer_id,
                restaurant_id: restaurant_id
            }
        });
        if (!customer)
            throw new ApiError_1.NotFound('Customer not found!');
        return customer;
    }
    async getCustomerById(id) {
        const customer = await prisma.customer.findUnique({
            where: { id }
        });
        if (!customer)
            throw new ApiError_1.NotFound('Customer not found');
        return customer;
    }
    async updateCustomerById(id, { first_name, last_name, email, phone }) {
        const customer = await prisma.customer.findUnique({ where: { id } });
        if (!customer)
            throw new ApiError_1.NotFound('Customer not found');
        const updatedCustomer = await prisma.customer.update({
            where: { id },
            data: {
                first_name,
                last_name,
                email,
                phone
            }
        });
        return updatedCustomer;
    }
    async deleteCustomerById(id) {
        const customer = await prisma.customer.findUnique({
            where: { id }
        });
        if (!customer)
            throw new ApiError_1.NotFound('Customer not found');
        await prisma.customer.delete({
            where: { id }
        });
        return customer;
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map