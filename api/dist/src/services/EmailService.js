"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const dotenv_1 = require("dotenv");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const nodemailer_1 = __importDefault(require("nodemailer"));
(0, dotenv_1.config)();
class EmailService {
    constructor() {
        this._isProduction = process.env.NODE_ENV === 'producao';
        this.transporter = null;
        if (this._isProduction) {
            const apiKey = process.env.SENDGRID_API_KEY;
            if (!apiKey)
                throw new Error('SENDGRID_API_KEY não configurado no .env');
            mail_1.default.setApiKey(apiKey);
        }
        else {
            this.transporter = nodemailer_1.default.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: 'estefania.kohler80@ethereal.email',
                    pass: 'D1tfyqw6UNsaS5jJQP',
                },
            });
        }
    }
    async sendMail({ to, subject, text, html }) {
        var _a;
        try {
            if (this._isProduction) {
                const fromEmail = process.env.SENDGRID_FROM_EMAIL;
                if (!fromEmail)
                    throw new Error('SENDGRID_FROM_EMAIL não configurado no .env');
                await mail_1.default.send({
                    to,
                    from: fromEmail,
                    subject,
                    text,
                    html,
                });
            }
            else if (this.transporter) {
                await this.transporter.sendMail({
                    from: 'noreply@cardapiozin.com',
                    to,
                    subject,
                    text,
                    html,
                });
            }
            console.log(`Email enviado para ${to}`);
        }
        catch (error) {
            console.error('Erro ao enviar email:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.body) || error);
            throw new Error('Falha no envio do email.');
        }
    }
}
exports.EmailService = EmailService;
exports.default = new EmailService();
//# sourceMappingURL=EmailService.js.map