import { USER_ROLE, validationSchema } from '@thatnails/shared';
import db from '../config/db.config';
import { Request, Response } from 'express';

const createEmployee = async (req: Request, res: Response) => {
  const { full_name, email, phone } =
    await validationSchema.users.createEmployee.parseAsync(req.body);

  const user = await db
    .insertInto('users')
    .values({ full_name, email, phone, role: USER_ROLE.EMPLOYEE })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

const getEmployees = async (req: Request, res: Response) => {
  const employees = await db
    .selectFrom('users')
    .selectAll()
    .where('role', '=', USER_ROLE.EMPLOYEE)
    .execute();

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
