import mongoose from "mongoose";
import { MongoDatabase } from "../../../src/data/mongo/init";
import { MongoLogDatasource } from "../../../src/infrastructure/datasources/mongo-log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogModel } from "../../../src/data/mongo";

describe("mongo-log-datasource tests", () => {
  beforeAll(async () => {
    await MongoDatabase.connect(
      process.env.MONGO_URL as string,
      process.env.MONGO_DB_NAME as string
    );
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(() => mongoose.connection.close());

  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    level: LogSeverityLevel.high,
    message: "test-msg",
    origin: "mongo-log.datasource.test.ts",
  });
  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created",
      expect.any(String)
    );
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logs).toBeTruthy();
    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe(LogSeverityLevel.high);
  });
});
