import mongoose from "mongoose";

export class MongoDatabase {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL as string, {
        dbName: process.env.MONGO_DB_NAME,
      });

      console.log("MongoDB Connect");
    } catch (error) {
      console.log(error);

      throw Error(error as string);
    }
  }
}
