import { ApiError, USER_ROLE, validationSchema } from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createSalon = async (req: Request, res: Response) => {
  const { name, address, phone, email } =
    await validationSchema.salons.create.parseAsync(req.body);

  const salon = await db
    .insertInto('salons')
    .values({ name, address, phone, email })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: salon,
  });
};

const getSalons = async (req: Request, res: Response) => {
  const salons = await db
    .selectFrom('salons')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute();

  res.status(200).json({
    status: 'success',
    data: salons,
  });
};

const updateSalon = async (req: Request, res: Response) => {
  const id = req.readIdParam();
  const { name, address, phone, email } =
    await validationSchema.salons.update.parseAsync(req.body);

  const salon = await db
    .updateTable('salons')
    .set({ name, address, phone, email })
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: salon,
  });
};

const createSalonOwner = async (req: Request, res: Response) => {
  const { email_or_phone, salon_id } =
    await validationSchema.salons.createSalonOwner.parseAsync(req.body);

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where((eb) =>
      eb('email', '=', email_or_phone).or('phone', '=', email_or_phone),
    )
    .executeTakeFirst();

  if (!user) {
    throw ApiError.AUTH.INVALID_USER_OR_PASSWORD;
  }

  const salonUser = await db
    .insertInto('salon_users')
    .values({ salon_id, user_id: user.id, role: USER_ROLE.OWNER })
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: salonUser,
  });
};

const getSalonOwners = async (req: Request, res: Response) => {
  const salon_id = req.readIdParam();
  const owners = await db
    .selectFrom('salon_users')
    .selectAll()
    .where('salon_id', '=', salon_id)
    .execute();

  res.status(200).json({
    status: 'success',
    data: owners,
  });
};

const salonController = {
  createSalon,
  getSalons,
  updateSalon,
  getSalonOwners,
  createSalonOwner,
};

export default salonController;
