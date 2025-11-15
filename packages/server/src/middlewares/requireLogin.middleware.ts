import { ApiError, JWT_TOKEN, ParsedJwtPayload } from '@thatnails/shared';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import db from '../config/db.config';
import { JWT_SECRET } from '../config/env.config';

const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth_token = req.cookies[JWT_TOKEN.AUTH];

  // 1. check if user has token
  if (!auth_token) {
    throw ApiError.AUTH.USER_NOT_LOGGED_IN;
  }

  // 2. check if token is valid
  const { type, user_id, iat } = verify(
    auth_token,
    JWT_SECRET,
  ) as ParsedJwtPayload;

  if (type != JWT_TOKEN.AUTH) {
    throw ApiError.AUTH.JWT_MALFORMED;
  }

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', user_id)
    .executeTakeFirst();

  if (!user) {
    throw ApiError.AUTH.USER_NOT_LOGGED_IN;
  }

  // 3. check if token is expired
  const isTokenExpired =
    user.password_updated_at && user.password_updated_at.getTime() > iat * 1000;

  if (isTokenExpired) {
    throw ApiError.AUTH.JWT_MALFORMED;
  }

  req.user = user;
  next();
};

export default requireLogin;
