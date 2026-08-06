import 'dotenv/config';
import http from 'node:http';
import { createServerApplication } from './app/app.js';
import { connectionDatabase } from './app/config/database.db.js';
import { logger } from './app/config/logger.js';

async function main() {
  try {
    await connectionDatabase();
    const server = http.createServer(createServerApplication());
    const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;
    const HOST: string = process.env.HOST || 'http://127.0.0.1';

    server.listen(PORT, () => {
      logger.info(`Server is running on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.log(`Server is failed to start ${err}`);
    if (err instanceof Error) {
      console.error(err.stack);
    }

    process.exit(1);
  }
}
main();
