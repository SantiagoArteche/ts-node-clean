import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect();
  Server.start();
}
