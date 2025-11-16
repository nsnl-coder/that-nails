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
  const salonId = req.readIdParam('salonId');
  const { name, address, phone, email } =
    await validationSchema.salons.update.parseAsync(req.body);

  const salon = await db
    .updateTable('salons')
    .set({ name, address, phone, email })
    .where('id', '=', salonId)
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: salon,
  });
};

const createSalonOwner = async (req: Request, res: Response) => {
  const salonId = req.readIdParam('salonId');
  const { email_or_phone } =
    await validationSchema.salons.createSalonOwner.parseAsync(req.body);

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where((eb) =>
      eb('email', '=', email_or_phone).or('phone', '=', email_or_phone),
    )
    .executeTakeFirst();

  if (!user) {
    throw ApiError.USER.NOT_FOUND;
  }

  const salonUser = await db
    .insertInto('salon_users')
    .values({ salon_id: salonId, user_id: user.id, role: USER_ROLE.OWNER })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: salonUser,
  });
};

const getSalonOwners = async (req: Request, res: Response) => {
  const salonId = req.readIdParam('salonId');
  const owners = await db
    .selectFrom('salon_users')
    .innerJoin('users', 'salon_users.user_id', 'users.id')
    .select([
      'users.id',
      'users.full_name',
      'users.email',
      'users.phone',
      'salon_users.created_at as assigned_at',
    ])
    .where('salon_id', '=', salonId)
    .execute();

  res.status(200).json({
    status: 'success',
    data: owners,
  });
};

const deleteSalonOwner = async (req: Request, res: Response) => {
  const salonId = req.readIdParam('salonId');
  const userId = req.readIdParam('userId');

  await db
    .deleteFrom('salon_users')
    .where('salon_id', '=', salonId)
    .where('user_id', '=', userId)
    .execute();

  res.status(200).json({ status: 'success' });
};

const salonController = {
  createSalon,
  getSalons,
  updateSalon,
  getSalonOwners,
  createSalonOwner,
  deleteSalonOwner,
};

export default salonController;
