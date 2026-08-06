import { sql } from 'drizzle-orm';
import { db } from '../../db/drizzel.js';
import { logger } from './logger.js';

export async function connectionDatabase() {
  try {
    await db.execute(sql`select 1`);
    logger.info(`Database Connected Successfully`);
  } catch (e) {
    console.error(e);
    logger.error('Database connection failed', e);
    process.exit(1);
  }
}
