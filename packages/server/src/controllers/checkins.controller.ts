import { validationSchema } from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createCheckin = async (req: Request, res: Response) => {
  const { phone } = await validationSchema.checkins.create.parseAsync(req.body);

  const checkin = await db
    .insertInto('checkins')
    .values({ phone, created_at: new Date() })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({ status: 'success', data: checkin });
};

const checkinsController = {
  createCheckin,
};

export default checkinsController;
