import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('checkins')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('phone', 'text', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
