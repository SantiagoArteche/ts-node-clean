import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const newLog = await LogModel.create(log);
      await newLog.save();
      console.log("Mongo Log created", newLog.id);
    } catch (error) {
      console.log(error as string);
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const logs = await LogModel.find({
        level: severityLevel,
      });

      return logs.map((log) => LogEntity.fromObject(log));
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
