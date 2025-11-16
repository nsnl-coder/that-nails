import { validationSchema } from '@thatnails/shared/dist/esm/validations/index.validation';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createService = async (req: Request, res: Response) => {
  const { name, price, duration, category_id } =
    await validationSchema.services.createService.parseAsync(req.body);

  const service = await db
    .insertInto('services')
    .values({ name, price, duration, category_id })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: service,
  });
};

const serviceController = {
  createService,
};

export default serviceController;
