import { z } from 'zod';

const signIn = z.object({
  emailOrPhone: z
    .email()
    .or(z.string().length(10, 'Phone number must be 10 digits')),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUp = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.email(),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  password: z.string(),
});

const authValidation = {
  signIn,
  signUp,
};

export default authValidation;
