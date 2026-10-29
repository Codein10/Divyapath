import { displayName, validateAuth } from './validate-auth';

describe('validateAuth', () => {
  it('accepts a valid sign-in', () => {
    expect(
      validateAuth({ name: '', email: 'asha@mail.com', password: 'secret1' }, 'signIn'),
    ).toEqual({});
  });

  it('reports bad email and short password', () => {
    expect(validateAuth({ name: '', email: 'asha', password: '123' }, 'signIn')).toEqual({
      email: 'Enter a valid email address.',
      password: 'Password needs at least 6 characters.',
    });
  });

  it('requires a name only when signing up', () => {
    const form = { name: ' ', email: 'asha@mail.com', password: 'secret1' };
    expect(validateAuth(form, 'signIn')).toEqual({});
    expect(validateAuth(form, 'signUp')).toEqual({ name: 'Enter your name.' });
  });
});

describe('displayName', () => {
  it('uses the part before @ when signing in', () => {
    expect(displayName({ name: '', email: 'asha@mail.com', password: '' }, 'signIn')).toBe('Asha');
  });

  it('uses the typed name when signing up', () => {
    expect(displayName({ name: 'ravi', email: 'x@y.in', password: '' }, 'signUp')).toBe('Ravi');
  });
});
