import { z } from 'zod';

const createCheckin = z.object({
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  full_name: z.string().optional(),
});

const checkinsValidation = {
  create: createCheckin,
};

export default checkinsValidation;
