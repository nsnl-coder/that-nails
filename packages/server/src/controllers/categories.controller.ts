import { Request, Response } from 'express';
import db from '../config/db.config';
import { validationSchema } from '@thatnails/shared';

const createCategory = async (req: Request, res: Response) => {
  const salonId = req.readIdParam('salonId');
  const { name } = await validationSchema.categories.createCategory.parseAsync(
    req.body,
  );

  const category = await db
    .insertInto('categories')
    .values({ name, salon_id: salonId })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
};

const getCategories = async (req: Request, res: Response) => {
  const categories = await db.selectFrom('categories').selectAll().execute();
  res.status(200).json({
    status: 'success',
    data: categories,
  });
};

const getCategoryServices = async (req: Request, res: Response) => {
  const categoryId = req.readIdParam('id');

  const services = await db
    .selectFrom('services')
    .selectAll()
    .where(
      'category_id',
      categoryId === -1 ? 'is' : '=',
      categoryId === -1 ? null : categoryId,
    )
    .execute();

  res.status(200).json({
    status: 'success',
    data: services,
  });
};

const categoriesController = {
  createCategory,
  getCategories,
  getCategoryServices,
};

export default categoriesController;
