"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = void 0;
const client_1 = require("@prisma/client");
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
const prisma = new client_1.PrismaClient();
const createCustomer = async (overrides = {}) => {
    return prisma.customer.create({
        data: {
            first_name: 'Lucas',
            last_name: 'Rocha',
            phone: '13974197920',
            password: await AuthService_1.default.hashPassword('ABCDEFG'),
            ...overrides
        }
    });
};
exports.createCustomer = createCustomer;
//# sourceMappingURL=customerFactory.js.map