"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const ApiError_1 = require("@src/util/errors/ApiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const NotificationService_1 = require("./NotificationService");
const EmailService_1 = require("./EmailService");
class InviteService {
    constructor(prisma = PrismaClient_1.default.getInstance(), _emailService = new EmailService_1.EmailService(), _notificationService = new NotificationService_1.NotificationService()) {
        this.prisma = prisma;
        this._emailService = _emailService;
        this._notificationService = _notificationService;
    }
    async createInvite(restaurantId, email) {
        const existingInvitation = await this.prisma.invitation.findFirst({
            where: {
                email,
                restaurant_id: restaurantId
            }
        });
        if (existingInvitation)
            throw new ApiError_1.BadRequestError('Invite already sent!');
        const token = this._generateToken(email);
        const createdInvite = await this.prisma.invitation.create({
            data: {
                email,
                token,
                restaurant_id: restaurantId
            }
        });
        await this._emailService.sendMail({ to: email, subject: 'Convite', text: 'Hello world', html: `<b>Hello world? http://localhost:3000/invite/${token}</b>` });
        console.log(`/convite/${token}`);
        return createdInvite;
    }
    async getInviteByToken(token) {
        const invite = await this.prisma.invitation.findUnique({
            where: {
                token
            }
        });
        return invite;
    }
    async acceptInvite(token) {
        if (!this._verifyToken(token))
            throw new ApiError_1.BadRequestError('Invalid or experied token!');
        const invitation = await this.prisma.invitation.findUnique({
            where: {
                token
            }
        });
        if (!invitation)
            throw new ApiError_1.BadRequestError('Invitation does not exists!');
        if (invitation.status !== "PENDING")
            throw new ApiError_1.BadRequestError('This invitation cannot be accepted!');
        const user = await this.prisma.user.findUnique({
            where: {
                email: invitation.email
            }
        });
        if (!user)
            throw new ApiError_1.BadRequestError('User does not exists!');
        const newUser = await this.prisma.user_Restaurant.create({
            data: {
                user_id: user.id,
                restaurant_id: invitation.restaurant_id
            }
        });
        const createdInvitation = await this.prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: 'ACCEPTED' }
        });
        await this._notificationService.createNotification(createdInvitation.restaurant_id, "aceitou o convite para participar da organização", "Usuário aceitou o convite para participar da organização", newUser.user_id);
        return newUser;
    }
    _verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, 'ABCD');
    }
    _generateToken(email) {
        return jsonwebtoken_1.default.sign({ email }, 'ABCD', { expiresIn: '1h' });
    }
}
exports.InviteService = InviteService;
//# sourceMappingURL=InviteService.js.map