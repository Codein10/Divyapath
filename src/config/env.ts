import { z } from 'zod';

/**
 * App settings read from EXPO_PUBLIC_* environment variables.
 * Expo inlines these at build time, so each one must be read with its full name
 * (process.env.EXPO_PUBLIC_X), never with dynamic keys.
 */
const envSchema = z.object({
  API_URL: z.url().default('http://localhost:3000'),
});

export const env = envSchema.parse({
  API_URL: process.env.EXPO_PUBLIC_API_URL,
});
