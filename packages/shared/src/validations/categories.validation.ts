import { z } from 'zod';

const createCategory = z.object({
  name: z.string().min(1, 'Name is required'),
});

const categoriesValidation = {
  createCategory,
};

export default categoriesValidation;
