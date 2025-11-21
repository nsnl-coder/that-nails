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
    .innerJoin('categories', 'services.category_id', 'categories.id')
    .select([
      'services.id',
      'services.name',
      'services.price',
      'services.duration',
      'categories.name as category_name',
      'categories.id as category_id',
    ])
    .where('services.salon_id', '=', salonId)
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
