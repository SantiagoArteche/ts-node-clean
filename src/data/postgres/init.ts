import { PrismaClient } from "@prisma/client";

export class PostgresDatabase {
  static async connect() {
    const prisma = new PrismaClient();
    try {
      const prismaCheck = await prisma.logModel.findMany();
      if (prismaCheck) console.log("PostgresDB Connect");
    } catch (error) {
      console.log(error);
    }
  }
}
