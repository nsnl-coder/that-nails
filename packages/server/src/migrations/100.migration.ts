import { faker } from '@faker-js/faker';
import { USER_ROLE } from '@thatnails/shared';
import bcrypt from 'bcrypt';
import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  const hashedPassword = await bcrypt.hash('123456789', 10);

  await db
    .insertInto('users')
    .values({
      id: 1,
      full_name: 'chris',
      email: 'chris@gmail.com',
      phone: '5862302290',
      password: hashedPassword,
      is_phone_verified: true,
      is_email_verified: true,
    })
    .execute();

  await db
    .insertInto('root_users')
    .values({
      user_id: 1,
    })
    .execute();

  for (let i = 0; i < 100; i++) {
    await db
      .insertInto('users')
      .values({
        id: 100 + i,
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: hashedPassword,
        is_phone_verified: true,
        is_email_verified: true,
        created_at: new Date(),
      })
      .execute();
  }

  for (let i = 0; i < 10; i++) {
    await db
      .insertInto('salons')
      .values({
        id: 100 + i,
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
      })
      .execute();
  }

  for (let i = 100; i < 199; i++) {
    await db
      .insertInto('salon_users')
      .values({
        salon_id: faker.number.int({ min: 100, max: 109 }),
        user_id: i,
        role: USER_ROLE.EMPLOYEE,
        created_at: new Date(),
      })
      .execute();
  }

  await db
    .insertInto('categories')
    .values([
      {
        id: 1,
        name: 'Manicure',
        created_at: new Date(),
        salon_id: 100,
      },
      {
        id: 2,
        name: 'Pedicure',
        created_at: new Date(),
        salon_id: 100,
      },
      {
        id: 3,
        name: 'Enhancements',
        created_at: new Date(),
        salon_id: 100,
      },
    ])
    .execute();

  // insert manicure services
  await db
    .insertInto('services')
    .values([
      {
        name: 'Regular Manicure',
        price: 30,
        duration: 30,
        category_id: 1,
        salon_id: 100,
      },
      {
        name: 'Shellac Manicure',
        price: 40,
        duration: 30,
        category_id: 1,
        salon_id: 100,
      },
    ])
    .execute();

  // insert pedicure services
  await db
    .insertInto('services')
    .values([
      {
        name: 'Classic Pedicure',
        price: 30,
        duration: 35,
        category_id: 2,
        salon_id: 100,
      },
      {
        name: 'Deluxe Pedicure',
        price: 45,
        duration: 40,
        category_id: 2,
        salon_id: 100,
      },
      {
        name: 'Collagen Pedicure',
        price: 60,
        duration: 50,
        category_id: 2,
        salon_id: 100,
      },
      {
        name: 'Signature Pedicure',
        price: 75,
        duration: 60,
        category_id: 2,
        salon_id: 100,
      },
      {
        name: 'VIP Pedicure',
        price: 99,
        duration: 70,
        category_id: 2,
        salon_id: 100,
      },
    ])
    .execute();

  // insert enhancements services
  await db
    .insertInto('services')
    .values([
      {
        name: 'Dipping Powder',
        price: 45,
        duration: 30,
        category_id: 3,
        salon_id: 100,
      },
      {
        name: 'Acrylic Fullset',
        price: 45,
        duration: 30,
        category_id: 3,
        salon_id: 100,
      },
      {
        name: 'Builder Gel',
        price: 150,
        duration: 120,
        category_id: 3,
        salon_id: 100,
      },
      {
        name: 'Gel Extensions',
        price: 150,
        duration: 120,
        category_id: 3,
        salon_id: 100,
      },
    ])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
