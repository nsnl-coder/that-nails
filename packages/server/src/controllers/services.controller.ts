import { validationSchema } from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createService = async (req: Request, res: Response) => {
  const { name, price, duration, category_id } =
    await validationSchema.services.createService.parseAsync(req.body);
  const salonId = req.readIdParam('salonId');

  const service = await db
    .insertInto('services')
    .values({
      name,
      price,
      duration,
      category_id: category_id === -1 ? null : category_id,
      salon_id: salonId,
    })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: service,
  });
};

const getServices = async (req: Request, res: Response) => {
  const salonId = req.readIdParam('salonId');

  const services = await db
    .selectFrom('services')
    .where('salon_id', '=', salonId)
    .execute();

  res.status(200).json({
    status: 'success',
    data: services,
  });
};

const serviceController = {
  createService,
  getServices,
};

export default serviceController;
