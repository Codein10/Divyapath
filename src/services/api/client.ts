import type { z } from 'zod';

import { env } from '@/config/env';

import { ApiError } from './api-error';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions<T> = {
  method?: HttpMethod;
  body?: unknown;
  /** Every response is checked against a schema, so bad server data fails here, not in the UI. */
  schema: z.ZodType<T>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type TokenGetter = () => Promise<string | null>;

let getAuthToken: TokenGetter = async () => null;

/** Called once by the auth feature so every request can send the user's token. */
export function setAuthTokenGetter(getter: TokenGetter) {
  getAuthToken = getter;
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions<T>): Promise<T> {
  const { method = 'GET', body, schema, headers, signal } = options;
  const token = await getAuthToken();

  const response = await fetch(`${env.API_URL}${path}`, {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await readBody(response);
  if (!response.ok) {
    throw new ApiError(response.status, data);
  }
  return schema.parse(data);
}

type ShortcutOptions<T> = Omit<RequestOptions<T>, 'method' | 'body' | 'schema'>;

export const api = {
  get: <T>(path: string, schema: z.ZodType<T>, options?: ShortcutOptions<T>) =>
    apiRequest(path, { ...options, schema }),
  post: <T>(path: string, body: unknown, schema: z.ZodType<T>, options?: ShortcutOptions<T>) =>
    apiRequest(path, { ...options, method: 'POST', body, schema }),
  put: <T>(path: string, body: unknown, schema: z.ZodType<T>, options?: ShortcutOptions<T>) =>
    apiRequest(path, { ...options, method: 'PUT', body, schema }),
  patch: <T>(path: string, body: unknown, schema: z.ZodType<T>, options?: ShortcutOptions<T>) =>
    apiRequest(path, { ...options, method: 'PATCH', body, schema }),
  delete: <T>(path: string, schema: z.ZodType<T>, options?: ShortcutOptions<T>) =>
    apiRequest(path, { ...options, method: 'DELETE', schema }),
};
