import { z } from 'zod';

const createService = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().min(0, 'Price must be greater than 0'),
  duration: z.coerce.number().min(0, 'Duration must be greater than 0'),
  category_id: z.coerce.number().optional().nullable().default(null),
});

const servicesValidation = {
  createService,
};

export default servicesValidation;
