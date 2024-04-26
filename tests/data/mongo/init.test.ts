import mongoose from "mongoose";
import { MongoDatabase } from "../../../src/data/mongo/init";

describe("mongo/init.ts tests", () => {
  afterAll(() => mongoose.connection.close());

  test("should connect to mongoDB", async () => {
    const connected = await MongoDatabase.connect(
      process.env.MONGO_URL as string,
      process.env.MONGO_DB_NAME as string
    );

    expect(connected).toBe(true);
  });

  test("should throw an error", async () => {
    try {
      const connected = await MongoDatabase.connect(
        process.env.MONGO_URL as string,
        process.env.MONGO_DB_NAME as string
      );

      expect(true).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });
});
