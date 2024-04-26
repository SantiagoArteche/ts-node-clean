import { MongoDatabase } from "./data/mongo";
import { PostgresDatabase } from "./data/postgres/init";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect(
    process.env.MONGO_URL as string,
    process.env.MONGO_DB_NAME as string
  );
  await PostgresDatabase.connect();
  Server.start();
}
