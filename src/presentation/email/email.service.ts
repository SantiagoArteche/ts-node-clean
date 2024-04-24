import nodemailer from "nodemailer";
import "dotenv/config";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
  //   attachments
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  });

  private async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `<h3>Logs del sistema - NOC</h3>`;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-all.log", path: "./logs/logs-high.log" },
      { filename: "logs-all.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
