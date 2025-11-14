import { z } from 'zod';

const createCategory = z.object({
  name: z.string().min(1, 'Name is required'),
});

const createService = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be greater than 0'),
});

const categoriesValidation = {
  createCategory: createCategory,
  createService: createService,
};

export default categoriesValidation;
