import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServices } from "../../../../src/domain/use-cases/checks/check-service";
describe("check-service tests", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServices(
    [mockLogRepository],
    successCallback,
    errorCallback
  );
  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalledWith();
    expect(errorCallback).not.toHaveBeenCalledWith();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("should call errorCallback when fetch returns false", async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckServices(
      [mockLogRepository],
      successCallback,
      errorCallback
    );

    const wasOk = await checkService.execute("https://gasgasgasgasggasga.com");

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
