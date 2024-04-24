import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  private origin: string;
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
    this.origin = "check-service.ts";
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

      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: this.origin,
      });
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
