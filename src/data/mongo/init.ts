import mongoose from "mongoose";

export class MongoDatabase {
  static async connect(mongoUrl: string, dbName: string) {
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      console.log("MongoDB Connect");
      return true;
    } catch (error) {
      console.log(error);

      throw Error(error as string);
    }
  }
}
