"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const ApiError_1 = require("@src/util/errors/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async login(req) {
        const user = await this.prisma.user.findUnique({
            where: { email: req.email }
        });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        if (!await AuthService.comparePasswords(req.password, user.password))
            throw new ApiError_1.BadRequestError('Password does not match!');
        const userRestaurant = await this.prisma.user_Restaurant.findUnique({
            where: {
                user_id_restaurant_id: {
                    restaurant_id: user === null || user === void 0 ? void 0 : user.restaurant_id,
                    user_id: user === null || user === void 0 ? void 0 : user.id
                }
            }
        });
        const token = AuthService.generateToken(user.id, user.restaurant_id, userRestaurant === null || userRestaurant === void 0 ? void 0 : userRestaurant.role);
        return {
            token
        };
    }
    async customerLogin(req) {
        const customer = await this.prisma.customer.findFirst({
            where: { email: req.email, restaurant_id: req.restaurant_id }
        });
        if (!customer)
            throw new ApiError_1.NotFound('Customer not found!');
        if (!await AuthService.comparePasswords(req.password, customer.password))
            throw new ApiError_1.BadRequestError('Passwords does not match!');
        const token = AuthService.generateToken(customer.id, customer.restaurant_id, null);
        return {
            token
        };
    }
    async forgotPassword(email, userType) {
        let user;
        if (userType === 'user') {
            user = await this.prisma.user.findUnique({ where: { email } });
        }
        else {
            user = await this.prisma.customer.findUnique({ where: { email } });
        }
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        const resetToken = AuthService.generateToken(user.id, null, null);
        const resetLink = `/reset-password?token=${resetToken}`;
        if (userType === 'user') {
            await this.prisma.user.update({ where: { email }, data: { reset_token: resetToken } });
        }
        if (userType === 'customer') {
            await this.prisma.customer.update({ where: { email }, data: { reset_token: resetToken } });
        }
        return resetLink;
    }
    async resetPassword(token, newPassword, userType) {
        let user;
        if (userType === 'user') {
            user = await this.prisma.user.findFirst({ where: { reset_token: token } });
        }
        else {
            user = await this.prisma.customer.findFirst({ where: { reset_token: token } });
        }
        const hashedPassword = await AuthService.hashPassword(newPassword);
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        if (userType === 'user') {
            user = await this.prisma.user.update({ where: { email: user.email }, data: { password: hashedPassword, reset_token: '' } });
        }
        if (userType === 'customer') {
            user = await this.prisma.customer.update({ where: { email: user.email }, data: { password: hashedPassword, reset_token: '' } });
        }
        return user;
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({ where: { verification_token: token } });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        await this.prisma.user.update({ where: { id: user.id }, data: {
                verification_token: null,
                is_email_verified: true
            } });
        return user;
    }
    async resendEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new ApiError_1.NotFound('User not found');
        const verificationToken = await AuthService.generateToken(user.id, null, null);
        await this.prisma.user.update({ where: { email }, data: {
                verification_token: verificationToken
            } });
        console.log(verificationToken);
    }
    static async hashPassword(password, salt = 10) {
        return await bcrypt_1.default.hash(password, salt);
    }
    static async comparePasswords(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    static generateToken(user_id, restaurant_id, role) {
        return jsonwebtoken_1.default.sign({ user_id, restaurant_id, role }, 'ABCD');
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.verify(token, 'ABCD');
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map