import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import "dotenv/config";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);

const emailService = new EmailService();
export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("30 12 * * *", function () {
      new SendEmailLogs(emailService, fileSystemLogRepository).execute(
        process.env.MAIL_TO as string
      );
    });

    CronService.createJob(`*/5 * * * * *`, function () {
      const url = `http://localhost:${Number(process.env.PORT)}`;
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
