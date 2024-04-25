import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServicesUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServices implements CheckServicesUseCase {
  private origin: string;
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
    this.origin = "check-service.ts";
  }

  private callLogs(log: LogEntity): void {
    this.logRepository.forEach((repository) => repository.saveLog(log));
  }

  async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);

      if (!request.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: this.origin,
      });

      this.callLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: this.origin,
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
