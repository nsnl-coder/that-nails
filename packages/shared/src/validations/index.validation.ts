import authValidation from './auth.validation';
import categoriesValidation from './categories.validation';
import checkinsValidation from './checkins.validation';
import usersValidation from './users.validation';

export const validationSchema = {
  checkins: checkinsValidation,
  categories: categoriesValidation,
  users: usersValidation,
  auth: authValidation,
};
