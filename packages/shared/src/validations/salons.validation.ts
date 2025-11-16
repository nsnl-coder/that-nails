import { z } from 'zod';
import { USER_ROLE } from '../enum';

const createSalon = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  email: z.email(),
});

const updateSalon = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  email: z.email(),
});

const createSalonUser = z.object({
  email_or_phone: z
    .email()
    .or(z.string().length(10, 'Phone number must be 10 digits')),
  role: z.enum([USER_ROLE.OWNER, USER_ROLE.EMPLOYEE]),
});

const salonsValidation = {
  create: createSalon,
  update: updateSalon,
  createSalonUser,
};

export default salonsValidation;
