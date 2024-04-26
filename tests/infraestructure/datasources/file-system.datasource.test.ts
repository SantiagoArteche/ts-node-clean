import fs from "fs";
import path from "path";
import { FileSystemDataSource } from "../../../src/infrastructure/datasources/file-system.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("file-system.datasource.ts tests", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists", () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const LogDataSource = new FileSystemDataSource();
    await LogDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-medium.log", async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const LogDataSource = new FileSystemDataSource();
    await LogDataSource.saveLog(log);
    const file = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(file).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-high.log", async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const LogDataSource = new FileSystemDataSource();
    await LogDataSource.saveLog(log);
    const file = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(file).toContain(JSON.stringify(log));
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test-filesystem",
      origin: "file-system.datasource.test.ts",
    });

    const LogDataSource = new FileSystemDataSource();

    await LogDataSource.saveLog(logLow);
    await LogDataSource.saveLog(logMedium);
    await LogDataSource.saveLog(logHigh);

    const high = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    const medium = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(high).toContain(JSON.stringify(logHigh));
    expect(medium).toContain(JSON.stringify(logMedium));

    expect(allLogs).toContain(JSON.stringify(logMedium));
    expect(allLogs).toContain(JSON.stringify(logLow));
    expect(allLogs).toContain(JSON.stringify(logHigh));
  });
});
