import { z } from 'zod';

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

const createSalonOwner = z.object({
  email_or_phone: z
    .email()
    .or(z.string().length(10, 'Phone number must be 10 digits')),
  salon_id: z.number().int().positive(),
});

const salonsValidation = {
  create: createSalon,
  update: updateSalon,
  createSalonOwner: createSalonOwner,
};

export default salonsValidation;
