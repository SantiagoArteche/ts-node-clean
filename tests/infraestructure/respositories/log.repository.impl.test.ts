import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogRepositoryImplementation } from "../../../src/infrastructure/repositories/log.repository.impl";
describe("log.repository.impl.ts tests", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepo = new LogRepositoryImplementation(mockLogDatasource);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    const log = { level: "low", message: "test" } as LogEntity;
    await logRepo.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    await logRepo.getLogs("high" as LogSeverityLevel);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith("high");
  });
});
