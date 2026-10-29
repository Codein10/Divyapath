import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect } from 'react';
import { AppState, Platform } from 'react-native';

import { queryClient } from '@/services/query-client';

type AppProvidersProps = {
  children: ReactNode;
};

/** All app-wide providers live here, so the root layout stays small. */
export function AppProviders({ children }: AppProvidersProps) {
  // Refresh stale data when the app comes back to the foreground.
  useEffect(() => {
    if (Platform.OS === 'web') return;
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });
    return () => subscription.remove();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
