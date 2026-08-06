import http from 'node:http';
import { createServerApplication } from './app/index.js';

import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    // await db.execute('SELECT 1');
    console.log('✅ Drizzle connected successfully');
    const server = http.createServer(createServerApplication());
    const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;
    const HOST: string = process.env.HOST || 'http://127.0.0.1';

    server.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.log(`Server is failed to start ${err}`);
  }
}
main();
