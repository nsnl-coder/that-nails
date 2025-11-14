import { ApiError } from '@thatnails/shared';
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = error.message || 'Unexpected error happened';
  let statusCode = 400;

  console.log(error);

  // invalid jsonwebtoken
  if (
    error.message === 'jwt malformed' ||
    error.message === 'invalid signature'
  ) {
    message = ApiError.AUTH.JWT_MALFORMED.message;
  }

  // expired jwt
  if (error.message === 'jwt expired') {
    message = ApiError.AUTH.JWT_TOKEN_EXPIRED.message;
  }

  if (error instanceof ApiError) {
    message = error.message;
    statusCode = error.statusCode;
  }

  if (message === 'Unexpected error happened') {
    console.log(error.name);
    console.log(error.message);
  }

  if (error.name === 'ZodError') {
    message = 'unexpected zod validation error';
  }

  res.status(statusCode).json({
    status: 'fail',
    message,
  });
};

export default globalErrorHandler;
