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
exports.InviteController = void 0;
const core_1 = require("@overnightjs/core");
const InviteService_1 = require("@src/services/InviteService");
const ApiError_1 = require("@src/util/errors/ApiError");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
let InviteController = class InviteController {
    constructor(_inviteService = new InviteService_1.InviteService()) {
        this._inviteService = _inviteService;
    }
    async create(req, res) {
        const restaurantId = req.context.restaurant_id;
        const { email } = req.body;
        if (!restaurantId)
            throw new ApiError_1.NotFound('Restaurant id not provided');
        const invite = await this._inviteService.createInvite(restaurantId, email);
        return res.status(201).json(invite);
    }
    async getInvite(req, res) {
        const token = req.params.inviteToken;
        const invite = await this._inviteService.getInviteByToken(token);
        return res.status(200).json(invite);
    }
    async acceptInvite(req, res) {
        const token = req.params.inviteToken;
        const user = await this._inviteService.acceptInvite(token);
        return res.status(201).json(user);
    }
};
exports.InviteController = InviteController;
__decorate([
    (0, core_1.Middleware)(AuthMiddleware_1.authMiddleware),
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "create", null);
__decorate([
    (0, core_1.Get)(':inviteToken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "getInvite", null);
__decorate([
    (0, core_1.Post)(':inviteToken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "acceptInvite", null);
exports.InviteController = InviteController = __decorate([
    (0, core_1.Controller)('invite'),
    __metadata("design:paramtypes", [InviteService_1.InviteService])
], InviteController);
//# sourceMappingURL=InviteController.js.map