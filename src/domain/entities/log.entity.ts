export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public message: string;
  public level: LogSeverityLevel;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message) throw new Error("Message is required");
    if (!level) throw new Error("Message is required");

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);

    return log;
  };

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, createdAt, origin } = object;

    if (!message) throw new Error("Message is required");
    if (!level) throw new Error("Message is required");

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);

    return log;
  }
}
