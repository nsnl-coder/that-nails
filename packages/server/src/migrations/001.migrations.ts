import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('full_name', 'text', (c) => c.notNull())
    .addColumn('email', 'text', (c) => c.unique())
    .addColumn('phone', 'text', (c) => c.notNull().unique())
    .addColumn('password', 'text', (c) => c.notNull())
    .addColumn('is_phone_verified', 'boolean', (c) =>
      c.notNull().defaultTo(false),
    )
    .addColumn('is_email_verified', 'boolean', (c) =>
      c.notNull().defaultTo(false),
    )
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable('salons')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('address', 'text', (c) => c.notNull())
    .addColumn('phone', 'text', (c) => c.notNull())
    .addColumn('email', 'text', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable('salon_users')
    .addColumn('salon_id', 'integer', (c) =>
      c.notNull().references('salons.id'),
    )
    .addColumn('user_id', 'integer', (c) => c.notNull().references('users.id'))
    .addColumn('role', 'text', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addPrimaryKeyConstraint('salon_users_pkey', [
      'salon_id',
      'user_id',
      'role',
    ])
    .execute();

  await db.schema
    .createTable('root_users')
    .addColumn('user_id', 'integer', (c) =>
      c.notNull().references('users.id').primaryKey(),
    )
    .execute();

  await db.schema
    .createTable('checkins')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('phone', 'text', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
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
