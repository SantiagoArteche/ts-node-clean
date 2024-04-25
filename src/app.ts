import { MongoDatabase } from "./data/mongo";
import { PostgresDatabase } from "./data/postgres/init";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect();
  await PostgresDatabase.connect();
  Server.start();
}
