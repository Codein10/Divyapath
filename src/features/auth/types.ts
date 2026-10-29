import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(6, 'Password needs at least 6 characters.'),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2, 'Enter your name.'),
});

export type AuthField = 'name' | 'email' | 'password';
export type AuthErrors = Partial<Record<AuthField, string>>;
