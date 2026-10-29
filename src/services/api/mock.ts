/**
 * Demo backend: returns local data after a short delay, like a real request would.
 * Replace calls to this with `api.get(...)` once the real server exists.
 */
export function mockResponse<T>(data: T, delayMs = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
