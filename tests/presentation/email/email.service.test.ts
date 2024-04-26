import nodemailer from "nodemailer";
import {
  EmailService,
  SendMailOptions,
} from "../../../src/presentation/email/email.service";

describe("email.service.ts tests", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });
  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "santeharteche@hotmail.com",
      subject: "test",
      htmlBody: "<h1>Test</h1>",
    };

    const emailSent = await emailService.sendEmail(options);

    expect(emailSent).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: undefined,
      html: "<h1>Test</h1>",
      subject: "test",
      to: "santeharteche@hotmail.com",
    });
  });

  test("should send email with attachments", async () => {
    await emailService.sendEmailWithFileSystemLogs("santeharteche@hotmail.com");

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h3>Logs del sistema - NOC</h3>",
      subject: "Logs del servidor",
      to: "santeharteche@hotmail.com",
    });
  });
});
