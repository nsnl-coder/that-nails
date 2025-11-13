import { z } from 'zod';

const createCheckin = z.object({
  phone: z.string().length(10, 'Phone number must be 10 digits'),
});

const checkinsValidation = {
  create: createCheckin,
};

export default checkinsValidation;
