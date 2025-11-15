import { z } from 'zod';

const createSalon = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  email: z.email(),
});

const salonValidation = {
  create: createSalon,
};

export default salonValidation;
