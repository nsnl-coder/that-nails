import { SOCKET_EVENT, validationSchema } from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';
import getIO from '../utils/getIo.util';

const createCheckin = async (req: Request, res: Response) => {
  const { phone, full_name } =
    await validationSchema.checkins.create.parseAsync(req.body);

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('phone', '=', phone)
    .executeTakeFirst();

  if (!user && !full_name) {
    return res.status(200).json({
      status: 'pending',
      message: 'User not found, please checkin with your name',
      data: {
        hasUser: false,
      },
    });
  }

  if (!user && full_name) {
    // create user for first visit
    await db
      .insertInto('users')
      .values({ phone, full_name, created_at: new Date() })
      .returningAll()
      .executeTakeFirst();
  }

  // create checkin
  await db
    .insertInto('checkins')
    .values({ phone, created_at: new Date() })
    .returningAll()
    .executeTakeFirst();

  const io = getIO();
  io.emit(SOCKET_EVENT.CHECKIN_CREATED);

  res.status(200).json({
    status: 'success',
    data: {
      hasUser: true,
    },
  });
};

const getCheckins = async (req: Request, res: Response) => {
  const checkins = await db
    .selectFrom('checkins')
    .leftJoin('users', 'checkins.phone', 'users.phone')
    .select([
      'checkins.id',
      'checkins.created_at',
      'checkins.phone',
      'users.full_name',
      'users.email',
    ])
    .orderBy('created_at', 'desc')
    .execute();

  res.status(200).json({ status: 'success', data: checkins });
};

const checkinsController = {
  createCheckin,
  getCheckins,
};

export default checkinsController;
