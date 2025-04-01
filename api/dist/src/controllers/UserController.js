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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const core_1 = require("@overnightjs/core");
const folder_1 = require("@src/enum/folder");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const FileUpload_1 = __importDefault(require("@src/middlewares/FileUpload"));
const UserService_1 = require("@src/services/UserService");
const ApiError_1 = require("@src/util/errors/ApiError");
let UserController = class UserController {
    constructor(_userService = new UserService_1.UserService()) {
        this._userService = _userService;
    }
    async createUserWithRestaurant(req, res) {
        const newUser = await this._userService.createUserWithRestaurant(req.body);
        return res.status(201).json(newUser);
    }
    async createUserFromInvite(req, res) {
        const newUser = await this._userService.createUserFromInvite(req.body);
        return res.status(201).json(newUser);
    }
    async getUsers(req, res) {
        const users = await this._userService.getUsers();
        return res.status(200).send(users);
    }
    async checkEmail(req, res) {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const userByEmail = await this._userService.checkEmail(email);
        return res.status(200).json(userByEmail);
    }
    async me(req, res) {
        var _a;
        const userId = (_a = req.context) === null || _a === void 0 ? void 0 : _a.user_id;
        if (!userId)
            throw new ApiError_1.NotFound('User id not provided');
        const user = await this._userService.getLoggedUser(userId);
        return res.status(200).json(user);
    }
    async getUserById(req, res) {
        const user = await this._userService.getUserById(req.params.id);
        return res.status(200).json(user);
    }
    async getRestaurantsFromUser(req, res) {
        const restaurants = await this._userService.getRestaurants(req.params.id);
        return res.status(200).json(restaurants);
    }
    async updateUserById(req, res) {
        const bodyJSON = req.body;
        const user = await this._userService.updateUserById(req.params.id, bodyJSON, req.file);
        return res.status(200).json(user);
    }
    async updateProfile(req, res) {
        const user = await this._userService.updateProfileByUserId(req.params.id, req.body, req.file);
        return res.status(200).json(user);
    }
    async deleteUser(req, res) {
        const user = await this._userService.deleteUser(req.params.id);
        return res.status(202).json(user);
    }
    async currentRestaurantt(req, res) {
        var _a;
        const userId = (_a = req.context) === null || _a === void 0 ? void 0 : _a.user_id;
        const { restaurant_id, role } = req.body;
        if (!userId)
            throw new ApiError_1.NotFound('User id not provided');
        const user = await this._userService.currentRestaurant(restaurant_id, userId, role);
        return res.status(200).json(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, core_1.Post)('restaurants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserWithRestaurant", null);
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserFromInvite", null);
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, core_1.Get)('check-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkEmail", null);
__decorate([
    (0, core_1.Get)('me'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    (0, core_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, core_1.Get)(':id/restaurants'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRestaurantsFromUser", null);
__decorate([
    (0, core_1.Patch)(':id'),
    (0, core_1.Middleware)((0, FileUpload_1.default)(folder_1.Folder.PROFILE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserById", null);
__decorate([
    (0, core_1.Patch)(':id/profile'),
    (0, core_1.Middleware)((0, FileUpload_1.default)(folder_1.Folder.PROFILE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, core_1.Delete)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, core_1.Put)('current-restaurant'),
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "currentRestaurantt", null);
exports.UserController = UserController = __decorate([
    (0, core_1.Controller)('users'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
//# sourceMappingURL=UserController.js.map