import { ApiError, UserTable } from '@thatnails/shared';
import express from 'express';
import { Selectable } from 'kysely';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: Selectable<UserTable>;
    readUser: () => Selectable<UserTable>;
    readIdParam: () => number;
  }
}

declare module 'express' {
  export interface Request {
    user?: Selectable<UserTable>;
    readUser: () => Selectable<UserTable>;
    readIdParam: () => number;
  }
}

express.request.readUser = function (): Selectable<UserTable> {
  const user = this.user;

  if (!user) {
    throw ApiError.AUTH.USER_NOT_LOGGED_IN;
  }

  return user;
};

express.request.readIdParam = function (): number {
  const id = this.params.id;

  if (!id) {
    throw ApiError.APP.INVALID_ID;
  }

  return Number(id);
};
