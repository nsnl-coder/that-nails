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

  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('full_name', 'text', (c) => c.notNull())
    .addColumn('email', 'text', (c) => c.unique())
    .addColumn('phone', 'text', (c) => c.notNull().unique())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
