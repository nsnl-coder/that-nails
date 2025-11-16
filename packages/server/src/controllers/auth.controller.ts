import {
  ApiError,
  JWT_TOKEN,
  ParsedJwtPayload,
  USER_ROLE,
  validationSchema,
} from '@thatnails/shared';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import db from '../config/db.config';
import { JWT_SECRET } from '../config/env.config';

const signIn = async (req: Request, res: Response) => {
  const { emailOrPhone, password } =
    await validationSchema.auth.signIn.parseAsync(req.body);

  const user = await db
    .selectFrom('users')
    .selectAll()
    .where((eb) =>
      eb('email', '=', emailOrPhone).or('phone', '=', emailOrPhone),
    )
    .executeTakeFirst();

  if (!user || !user.password) {
    throw ApiError.AUTH.INVALID_USER_OR_PASSWORD;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw ApiError.AUTH.INVALID_USER_OR_PASSWORD;
  }

  const jwtToken = jwt.sign(
    {
      user_id: user.id,
      type: JWT_TOKEN.AUTH,
    } as ParsedJwtPayload,
    JWT_SECRET,
    {
      expiresIn: ms('90d'),
    },
  );
  const roleInfo = await getUserRoleInfo(user.id);

  res.cookie(JWT_TOKEN.AUTH, jwtToken, {
    httpOnly: true,
    secure: req.secure,
    maxAge: ms('90d'),
  });

  res.status(200).json({
    status: 'success',
    data: {
      ...user,
      roleInfo,
    },
  });
};

const signUp = async (req: Request, res: Response) => {
  const { full_name, email, phone, password } =
    await validationSchema.auth.signUp.parseAsync(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db
    .insertInto('users')
    .values({
      full_name,
      email,
      phone,
      password: hashedPassword,
    })
    .returningAll()
    .executeTakeFirst();

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.readUser();
  const roleInfo = await getUserRoleInfo(user.id);

  res.status(200).json({
    status: 'success',
    data: {
      ...user,
      roleInfo,
    },
  });
};

const getUserRoleInfo = async (
  user_id: number,
): Promise<{
  role: USER_ROLE;
  ownedSalonIds: number[];
  employedAtSalonIds: number[];
}> => {
  const isRootUser = await db
    .selectFrom('root_users')
    .selectAll()
    .where('user_id', '=', user_id)
    .executeTakeFirst();

  if (isRootUser) {
    return {
      role: USER_ROLE.ROOT,
      ownedSalonIds: [],
      employedAtSalonIds: [],
    };
  }

  const salonUsers = await db
    .selectFrom('salon_users')
    .selectAll()
    .where('user_id', '=', user_id)
    .execute();

  const ownerSalonIds = salonUsers
    .filter((user) => user.role === USER_ROLE.OWNER)
    .map((user) => user.salon_id);

  const employeeSalonIds = salonUsers
    .filter((user) => user.role === USER_ROLE.EMPLOYEE)
    .map((user) => user.salon_id)
    .filter((salonId) => !ownerSalonIds.includes(salonId)); // exclude owned salons

  const isMultpleRole = ownerSalonIds.length > 0 && employeeSalonIds.length > 0;

  if (isMultpleRole) {
    return {
      role: USER_ROLE.MULTIPLE_ROLES,
      ownedSalonIds: ownerSalonIds,
      employedAtSalonIds: employeeSalonIds,
    };
  }

  if (ownerSalonIds.length > 0) {
    return {
      role: USER_ROLE.OWNER,
      ownedSalonIds: ownerSalonIds,
      employedAtSalonIds: [],
    };
  }

  if (employeeSalonIds.length > 0) {
    return {
      role: USER_ROLE.EMPLOYEE,
      ownedSalonIds: [],
      employedAtSalonIds: employeeSalonIds,
    };
  }

  return {
    role: USER_ROLE.CUSTOMER,
    ownedSalonIds: [],
    employedAtSalonIds: [],
  };
};

const authController = {
  signIn,
  signUp,
  getCurrentUser,
};

export default authController;
