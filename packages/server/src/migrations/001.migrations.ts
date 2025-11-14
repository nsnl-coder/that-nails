import { USER_ROLE } from '@thatnails/shared';
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
    .addColumn('role', 'text', (c) => c.notNull().defaultTo(USER_ROLE.CUSTOMER))
    .execute();

  await db.schema
    .createTable('categories')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('order', 'serial', (c) => c.notNull())
    .execute();

  await db.schema
    .createTable('services')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('price', 'numeric', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('order', 'serial', (c) => c.notNull())
    .addColumn('category_id', 'integer', (c) =>
      c.notNull().references('categories.id'),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
