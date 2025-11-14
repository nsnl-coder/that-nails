import { z } from 'zod';

const createEmployee = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.email(),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
});

const userValidation = {
  createEmployee,
};

export default userValidation;
