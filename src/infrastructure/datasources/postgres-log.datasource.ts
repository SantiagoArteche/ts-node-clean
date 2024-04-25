import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const { level, ...rest } = log;

    try {
      const newLog = await prisma.logModel.create({
        data: { level: level.toUpperCase() as SeverityLevel, ...rest },
      });

      console.log("Postgres Log created", newLog.id);
    } catch (error) {
      console.log(error as string);
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const getLogs = await prisma.logModel.findMany({
        where: { level: severityLevel.toUpperCase() as SeverityLevel },
      });

      return getLogs.map((log) => LogEntity.fromObject(log));
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
