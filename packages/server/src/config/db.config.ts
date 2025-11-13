import { Kysely, PostgresDialect } from 'kysely';
import { Pool, types } from 'pg';
import { DB_CONNECTION_STRING } from './env.config';
import { DB } from '@thatnails/shared';

const BIGINT = 20;

types.setTypeParser(BIGINT, (val) => {
  const n = Number(val);
  if (!Number.isSafeInteger(n)) {
    throw new Error(`BIGINT value too large: ${val}`);
  }
  return n;
});

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});

const dialect = new PostgresDialect({
  pool,
});

const db = new Kysely<DB>({
  dialect,
});

(async function testDB() {
  try {
    await pool.query('SELECT 1');
    console.log('DB connection successful');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
})();
export default db;
