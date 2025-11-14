import { Request, Response } from 'express';
import db from '../config/db.config';
import { validationSchema } from '@thatnails/shared';

const createCategory = async (req: Request, res: Response) => {
  const { name } = await validationSchema.categories.createCategory.parseAsync(
    req.body,
  );

  const category = await db
    .insertInto('categories')
    .values({ name })
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
  const categoryId = req.readIdParam();

  const services = await db
    .selectFrom('services')
    .selectAll()
    .where('category_id', '=', categoryId)
    .execute();

  res.status(200).json({
    status: 'success',
    data: services,
  });
};

const createService = async (req: Request, res: Response) => {
  const categoryId = req.readIdParam();
  const { name, price } =
    await validationSchema.categories.createService.parseAsync(req.body);

  const service = await db
    .insertInto('services')
    .values({ name, category_id: categoryId, price })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: service,
  });
};

const categoriesController = {
  createCategory,
  getCategories,
  getCategoryServices,
  createService,
};

export default categoriesController;
