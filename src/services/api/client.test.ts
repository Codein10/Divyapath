import { z } from 'zod';

import { ApiError } from './api-error';
import { api, setAuthTokenGetter } from './client';

const userSchema = z.object({ id: z.number(), name: z.string() });

function mockFetchResponse(status: number, body: unknown) {
  const response = {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (body === undefined ? '' : JSON.stringify(body)),
  };
  const fetchMock = jest.fn().mockResolvedValue(response);
  globalThis.fetch = fetchMock;
  return fetchMock;
}

describe('api client', () => {
  afterEach(() => {
    setAuthTokenGetter(async () => null);
  });

  it('returns data that matches the schema', async () => {
    mockFetchResponse(200, { id: 1, name: 'Sam' });

    await expect(api.get('/users/1', userSchema)).resolves.toEqual({ id: 1, name: 'Sam' });
  });

  it('throws ApiError with the status when the server answers with an error', async () => {
    mockFetchResponse(404, { message: 'Not found' });

    const request = api.get('/users/1', userSchema);

    await expect(request).rejects.toBeInstanceOf(ApiError);
    await expect(request).rejects.toMatchObject({ status: 404, body: { message: 'Not found' } });
  });

  it('throws when the response does not match the schema', async () => {
    mockFetchResponse(200, { id: 'not-a-number' });

    await expect(api.get('/users/1', userSchema)).rejects.toThrow();
  });

  it('sends the auth token and a JSON body', async () => {
    const fetchMock = mockFetchResponse(201, { id: 2, name: 'Lee' });
    setAuthTokenGetter(async () => 'token-123');

    await api.post('/users', { name: 'Lee' }, userSchema);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:3000/users');
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ name: 'Lee' }));
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer token-123',
      'Content-Type': 'application/json',
    });
  });
});
