import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line import/first
import { initializeServer } from "./server/index";

dotenv.config();

const port = process.env.PORT || process.env.LOCAL_PORT || 5050;

(async () => {
  await initializeServer(+port);
})();
