import mongoose from "mongoose";
import { MongoDatabase } from "../../../../src/data/mongo/init";
import { LogModel } from "../../../../src/data/mongo/models/log.model";

describe("log.model.ts tests", () => {
  beforeAll(async () => {
    await MongoDatabase.connect(
      process.env.MONGO_URL as string,
      process.env.MONGO_DB_NAME as string
    );
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "Test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log.message).toBe(logData.message);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("should return the schema object", async () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          required: true,
          enum: ["low", "medium", "high"],
          default: "low",
        },
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        createdAt: { type: expect.any(Function), default: expect.any(Date) },
      })
    );
  });
});
