import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

config();

type EmailProps = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export class EmailService {
  private _isProduction: boolean;
  private transporter: nodemailer.Transporter | null;

  constructor() {
    this._isProduction = process.env.NODE_ENV === 'producao';
    this.transporter = null;

    if (this._isProduction) {
      const apiKey = process.env.SENDGRID_API_KEY;
      if (!apiKey) throw new Error('SENDGRID_API_KEY não configurado no .env');
      sgMail.setApiKey(apiKey);
    } else {
      this.transporter = nodemailer.createTransport({
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

  public async sendMail({ to, subject, text, html }: EmailProps) {
    try {
      if (this._isProduction) {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL;
        if (!fromEmail) throw new Error('SENDGRID_FROM_EMAIL não configurado no .env');

        await sgMail.send({
          to,
          from: fromEmail, // Usa um remetente autenticado no SendGrid
          subject,
          text,
          html,
        });
      } else if (this.transporter) {
        await this.transporter.sendMail({
          from: 'noreply@cardapiozin.com',
          to,
          subject,
          text,
          html,
        });
      }

      console.log(`Email enviado para ${to}`);
    } catch (error) {
      console.error('Erro ao enviar email:', error.response?.body || error);
      throw new Error('Falha no envio do email.');
    }
  }
}

export default new EmailService();
