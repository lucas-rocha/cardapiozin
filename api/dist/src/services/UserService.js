"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ApiError_1 = require("@src/util/errors/ApiError");
const AuthService_1 = __importDefault(require("./AuthService"));
const UserDto_1 = require("@src/models/Dtos/UserDto");
const validate_1 = require("@src/util/validate");
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const S3Service_1 = require("./S3Service");
const UserProfileDto_1 = require("@src/models/Dtos/UserProfileDto");
class UserService {
    constructor(s3Service = new S3Service_1.S3Service(), prisma = PrismaClient_1.default.getInstance()) {
        this.s3Service = s3Service;
        this.prisma = prisma;
    }
    async checkEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }
    async createUserWithRestaurant(user) {
        if (user.password !== user.passwordTwo) {
            throw new ApiError_1.BadRequestError("Passwords do not match!");
        }
        const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } });
        if (existingUser) {
            throw new ApiError_1.ConflictError("Email already exists!");
        }
        const hashedPassword = await AuthService_1.default.hashPassword(user.password);
        user.password = hashedPassword;
        user.restaurant_id = '';
        const userDto = await (0, validate_1.validateInputs)(user, UserDto_1.UserDto);
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const newUser = await tx.user.create({
                    data: {
                        firstName: userDto.firstName,
                        lastName: userDto.lastName,
                        email: userDto.email,
                        password: userDto.password,
                        phone: userDto.phone,
                        position: userDto === null || userDto === void 0 ? void 0 : userDto.position,
                        restaurant_id: userDto.restaurant_id
                    }
                });
                const verificationToken = await AuthService_1.default.generateToken(newUser.id, null, null);
                const newRestaurant = await tx.restaurant.create({
                    data: {
                        restaurant_name: user.restaurant_name
                    }
                });
                await tx.user_Restaurant.create({
                    data: {
                        user_id: newUser.id,
                        restaurant_id: newRestaurant.id,
                        role: "OWNER"
                    }
                });
                const updatedUser = await tx.user.update({
                    where: { id: newUser.id },
                    data: {
                        restaurant_id: newRestaurant.id,
                        verification_token: verificationToken
                    }
                });
                return updatedUser;
            });
            console.log(result.verification_token);
            return result;
        }
        catch (error) {
            console.error('Error in transaction', error);
            throw new Error('Transaction failed');
        }
    }
    async createUserFromInvite(user) {
        if (user.password !== user.passwordTwo) {
            throw new ApiError_1.BadRequestError("Passwords do not match!");
        }
        const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } });
        if (existingUser) {
            throw new ApiError_1.ConflictError("Email already exists!");
        }
        const hashedPassword = await AuthService_1.default.hashPassword(user.password);
        user.password = hashedPassword;
        const userDto = await (0, validate_1.validateInputs)(user, UserDto_1.UserDto);
        const newUser = await this.prisma.user.create({
            data: {
                firstName: userDto.firstName,
                lastName: userDto.lastName,
                email: userDto.email,
                password: userDto.password,
                phone: userDto.phone,
                position: userDto === null || userDto === void 0 ? void 0 : userDto.position,
                restaurant_id: userDto.restaurant_id,
                is_email_verified: true
            }
        });
        return newUser;
    }
    async getUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        return user;
    }
    async updateUserById(id, fieldsToUpdate, file) {
        await (0, validate_1.validateInputs)(fieldsToUpdate, UserDto_1.UserDto);
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        if (file)
            this.s3Service.uploadImage(file);
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                firstName: fieldsToUpdate.firstName,
                lastName: fieldsToUpdate.lastName,
                email: fieldsToUpdate.email,
                position: fieldsToUpdate.position,
                photo_url: (file === null || file === void 0 ? void 0 : file.filename) || null
            }
        });
        return updatedUser;
    }
    async updateProfileByUserId(id, userProfile, file) {
        await (0, validate_1.validateInputs)(userProfile, UserProfileDto_1.UserProfileUpdateDto);
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        const updatedFields = {};
        Object.keys(userProfile).forEach((key) => {
            if (userProfile[key] !== undefined) {
                updatedFields[key] = userProfile[key];
            }
        });
        if (file) {
            await this.s3Service.uploadImage(file);
            updatedFields.photo_url = file.filename;
            if (user.photo_url) {
                const photoKey = user.photo_url
                    .split('/')
                    .slice(-1)
                    .toString();
                await this.s3Service.deleteImage(`/images/profile/${photoKey}`);
            }
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updatedFields
        });
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        await this.prisma.user.delete({
            where: { id }
        });
        return user;
    }
    async getLoggedUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                restaurants: {
                    include: { restaurant: true }
                }
            }
        });
        if (!user)
            throw new ApiError_1.NotFound('User not found!');
        if (!user.restaurant_id)
            throw new ApiError_1.NotFound('Restaurant not found');
        const getUserRoleAndAccessType = await this.prisma.user_Restaurant.findUnique({
            where: {
                user_id_restaurant_id: {
                    user_id: id,
                    restaurant_id: user.restaurant_id
                }
            }
        });
        const userWithRoleAndAccessType = {
            ...user,
            role: getUserRoleAndAccessType === null || getUserRoleAndAccessType === void 0 ? void 0 : getUserRoleAndAccessType.role,
            accessType: getUserRoleAndAccessType === null || getUserRoleAndAccessType === void 0 ? void 0 : getUserRoleAndAccessType.accessType
        };
        return userWithRoleAndAccessType;
    }
    async getRestaurants(userId) {
        const userWithRestaurants = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: { restaurants: true }
        });
        return userWithRestaurants;
    }
    async currentRestaurant(restaurantId, userId, role) {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                restaurant_id: restaurantId
            }
        });
        const token = AuthService_1.default.generateToken(updatedUser.id, updatedUser.restaurant_id, role);
        return { ...updatedUser, ...{ token } };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map