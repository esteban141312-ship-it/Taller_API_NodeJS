import "dotenv/config";
import Server from "./server.js";
import { dbConnection } from "./database/config.js";

const main = async () => {
  await dbConnection();

  const server = new Server();
  server.listen();
};

main();
