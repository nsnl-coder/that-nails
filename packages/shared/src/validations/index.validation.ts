import appointmentsValidation from './appointments.validation';
import authValidation from './auth.validation';
import categoriesValidation from './categories.validation';
import checkinsValidation from './checkins.validation';
import salonsValidation from './salons.validation';
import servicesValidation from './services.validation';
import usersValidation from './users.validation';

export const validationSchema = {
  checkins: checkinsValidation,
  categories: categoriesValidation,
  users: usersValidation,
  auth: authValidation,
  salons: salonsValidation,
  services: servicesValidation,
  appointments: appointmentsValidation,
};
