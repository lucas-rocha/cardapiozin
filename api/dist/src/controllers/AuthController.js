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
exports.AuthController = void 0;
const core_1 = require("@overnightjs/core");
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
let AuthController = class AuthController {
    constructor(_authService = new AuthService_1.default()) {
        this._authService = _authService;
    }
    async login(req, res) {
        const user = await this._authService.login(req.body);
        return res.status(200).json(user);
    }
    async customerLogin(req, res) {
        const customer = await this._authService.customerLogin(req.body);
        return res.status(200).json(customer);
    }
    async forgotPassword(req, res) {
        const { email, user_type } = req.body;
        const token = await this._authService.forgotPassword(email, user_type);
        return res.status(200).json(token);
    }
    async resetPassword(req, res) {
        const { token, newPassword, user_type } = req.body;
        const resetedPassword = await this._authService.resetPassword(token, newPassword, user_type);
        res.status(200).json(resetedPassword);
    }
    async verifyEmail(req, res) {
        const { token } = req.query;
        const verifiedUser = await this._authService.verifyEmail(token);
        res.status(200).json(verifiedUser);
    }
    async resendEmail(req, res) {
        const { email } = req.body;
        const resendEmail = await this._authService.resendEmail(email);
        return res.status(200).json(resendEmail);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, core_1.Post)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('customer-login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "customerLogin", null);
__decorate([
    (0, core_1.Post)('forgot-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, core_1.Post)('reset-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, core_1.Post)('verify-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, core_1.Post)('resend-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, core_1.Controller)('auth'),
    __metadata("design:paramtypes", [AuthService_1.default])
], AuthController);
//# sourceMappingURL=AuthController.js.map