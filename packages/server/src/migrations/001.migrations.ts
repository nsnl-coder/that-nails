import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('full_name', 'text')
    .addColumn('email', 'text', (c) => c.unique())
    .addColumn('phone', 'text', (c) => c.notNull().unique())
    .addColumn('password', 'text')
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable('tokens')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('user_id', 'integer', (c) => c.notNull().references('users.id'))
    .addColumn('emailOrPhone', 'text', (c) => c.notNull())
    .addColumn('token', 'text', (c) => c.notNull())
    .addColumn('expires_at', 'timestamp', (c) => c.notNull())
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
    .addColumn('salon_id', 'integer', (c) =>
      c.notNull().references('salons.id'),
    )
    .addColumn('order', 'serial', (c) => c.notNull())
    .execute();

  await db.schema
    .createTable('services')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('price', 'numeric', (c) => c.notNull())
    .addColumn('duration', 'integer', (c) => c.notNull().defaultTo(0))

    .addColumn('category_id', 'integer', (c) =>
      c.references('categories.id').defaultTo(null),
    )
    .addColumn('salon_id', 'integer', (c) =>
      c.notNull().references('salons.id'),
    )
    .addColumn('order', 'serial', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable('appointments')
    .addColumn('id', 'serial', (c) => c.primaryKey())
    .addColumn('customer_id', 'integer', (c) =>
      c.notNull().references('users.id'),
    )
    .addColumn('salon_id', 'integer', (c) =>
      c.notNull().references('salons.id'),
    )
    .addColumn('guests', 'jsonb', (c) => c.notNull().defaultTo('[]'))
    .addColumn('status', 'text', (c) => c.notNull())
    .addColumn('appointment_date', 'timestamp', (c) => c.notNull())
    .addColumn('created_at', 'timestamp', (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
