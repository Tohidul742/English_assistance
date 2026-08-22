import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './drizzel.js';
import path from 'node:path';

async function main() {
  // console.log('Running database migrations...');

  try {
    await migrate(db, { migrationsFolder: path.join(process.cwd(), 'src/db/migrations') });
    // console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool after migrations are done so the script can exit
    await pool.end();
  }
}

main();
