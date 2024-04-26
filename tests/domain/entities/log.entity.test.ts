import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("log.entity.ts tests", () => {
  test("should create a LogEntity instance", () => {
    const data = {
      level: LogSeverityLevel.low,
      message: "test-msg",
      origin: "log.entity.test.ts",
    };

    const log = new LogEntity(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from json", () => {
    const commonJson = `{"level":"high","message":"TypeError: fetch failed","createdAt":"2024-04-23T19:09:45.031Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(commonJson);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("TypeError: fetch failed");
    expect(log.level).toBe("high");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from object", () => {
    const data = {
      level: LogSeverityLevel.low,
      message: "test-msg",
      origin: "log.entity.test.ts",
    };

    const log = LogEntity.fromObject(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
