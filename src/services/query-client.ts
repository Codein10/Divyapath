import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/services/api';

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      // Retry network and server (5xx) errors only; a 4xx answer will not change on retry.
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status < 500) return false;
        return failureCount < MAX_RETRIES;
      },
    },
  },
});
