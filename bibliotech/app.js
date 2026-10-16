import Server from "./server.js";
// new Server().listen();

import { dbConection } from "./database/config.js";
import dotenv from "dotenv";
dotenv.config();



// const server = new Server();

// server.listen();
const main = async () => {
  await dbConection();

  const server = new Server();
  server.listen();
};

main();