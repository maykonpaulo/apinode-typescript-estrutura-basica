/* eslint-disable import/no-extraneous-dependencies */
import { IRequestSendMail } from "@interfaces/dtos/request/IRequestSendMail";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../interfaces/IMailProvider";

import "dotenv/config";

class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === "1",
      auth: process.env.SMTP_SECURE === "1" ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : null,
    });
  }

  async sendMail({
    to, subject, body, from,
  }: IRequestSendMail): Promise<{ enviado: boolean, error?: string }> {
    const { name, email } = to;

    let enviado = true;
    let error;

    let fromName = process.env.SMTP_FROM_NAME;
    let fromEmail = process.env.SMTP_FROM_MAIL;

    if (from) {
      const { name, email } = from;

      fromName = name;
      fromEmail = email;
    }

    try {
      await this.client.sendMail({
        to: `${name} <${email}>`,
        subject,
        text: body,
        html: body,
        from: `${fromName} <${fromEmail}>`,
      });
    } catch (err) {
      enviado = false;
      error = err.message;
    }

    return { enviado, error };
  }
}

export { MailProvider };
