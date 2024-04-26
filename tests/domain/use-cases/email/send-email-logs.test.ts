import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs";

describe("send-email-logs.ts tests", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  test("should call sendEmail and saveLog", async () => {
    const sendEmailLog = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository
    );
    const result = await sendEmailLog.execute("santeharteche@hotmail.com");

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Email Sent",
      origin: "send-email-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    const mockEmailService = {
      sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    };
    const sendEmailLog = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository
    );
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
    const result = await sendEmailLog.execute("santeharteche@hotmail.com");

    expect(result).toBe(false);

    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    });
  });
});
