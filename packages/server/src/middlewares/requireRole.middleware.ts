import { ApiError, USER_ROLE } from '@thatnails/shared';
import { NextFunction, Request, Response } from 'express';
import db from '../config/db.config';

const requireRole = (role: USER_ROLE) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.readUser();

    const isRootUser = await db
      .selectFrom('root_users')
      .selectAll()
      .where('user_id', '=', user.id)
      .executeTakeFirst();

    if (isRootUser) {
      return next();
    }
    const salonId = req.readIdParam('salonId');

    if (role === USER_ROLE.OWNER) {
      const isOwner = await db
        .selectFrom('salon_users')
        .selectAll()
        .where('user_id', '=', user.id)
        .where('salon_id', '=', salonId)
        .where('role', '=', USER_ROLE.OWNER)
        .executeTakeFirst();

      if (isOwner) {
        return next();
      }

      throw ApiError.AUTH.UNAUTHORIZED_USER;
    }

    if (role === USER_ROLE.EMPLOYEE) {
      const isEmployee = await db
        .selectFrom('salon_users')
        .selectAll()
        .where('user_id', '=', user.id)
        .where('salon_id', '=', salonId)
        .where('role', '=', USER_ROLE.EMPLOYEE)
        .executeTakeFirst();

      if (isEmployee) {
        return next();
      }

      throw ApiError.AUTH.UNAUTHORIZED_USER;
    }

    throw ApiError.AUTH.UNAUTHORIZED_USER;
  };
};

export default requireRole;
