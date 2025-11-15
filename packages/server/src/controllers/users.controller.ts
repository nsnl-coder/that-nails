import { validationSchema } from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createEmployee = async (req: Request, res: Response) => {
  const { full_name, email, phone } =
    await validationSchema.users.createEmployee.parseAsync(req.body);

  const user = await db
    .insertInto('users')
    .values({ full_name, email, phone })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

const getEmployees = async (req: Request, res: Response) => {
  const employees = await db.selectFrom('users').selectAll().execute();

  res.status(200).json({
    status: 'success',
    data: employees,
  });
};

const usersController = {
  createEmployee,
  getEmployees,
};

export default usersController;
