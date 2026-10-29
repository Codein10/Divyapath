import { type AuthErrors, type AuthField, signInSchema, signUpSchema } from '../types';

type AuthForm = { name: string; email: string; password: string };

/** Returns one message per invalid field, or an empty object when the form is valid. */
export function validateAuth(form: AuthForm, mode: 'signIn' | 'signUp'): AuthErrors {
  const schema = mode === 'signUp' ? signUpSchema : signInSchema;
  const result = schema.safeParse({ ...form, email: form.email.trim() });
  if (result.success) return {};

  const errors: AuthErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as AuthField;
    errors[field] ??= issue.message;
  }
  return errors;
}

/** "asha.k@mail.com" → "Asha.k"; uses the typed name when signing up. */
export function displayName(form: AuthForm, mode: 'signIn' | 'signUp'): string {
  const raw = mode === 'signUp' ? form.name.trim() : form.email.trim().split('@')[0];
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}
