# State and data

## Pick the right kind of state

| Kind of data                                | Tool                                  | Where                                    |
| ------------------------------------------- | ------------------------------------- | ---------------------------------------- |
| Data from the server (lists, profiles, ...) | TanStack Query                        | `features/<name>/api/use-*.ts`           |
| App-wide client state (session, settings)   | Zustand                               | `features/<name>/store/` or `src/store/` |
| State for one screen or component           | `useState` / `useReducer`             | In the component or its hook             |
| Form state                                  | `useState` + Zod for checking         | Feature hook or component                |
| Values in the URL                           | Route params (`useLocalSearchParams`) | Route file, passed down as props         |

Never copy server data into Zustand or `useState`. Read it from the query.

## API calls

1. All requests go through `@/services/api` (`api.get`, `api.post`, ...). Never call `fetch` in a component or hook.
2. Every request passes a Zod schema. The client checks the response against it, so bad data fails early.
3. Put a feature's calls in `features/<name>/api/<name>-api.ts`, and wrap them in query/mutation hooks:

```ts
// features/profile/api/profile-api.ts
import { api } from '@/services/api';
import { profileSchema } from '../types';

export const profileApi = {
  getProfile: (id: string) => api.get(`/profiles/${id}`, profileSchema),
};

// features/profile/api/use-profile.ts
import { useQuery } from '@tanstack/react-query';
import { profileApi } from './profile-api';

export const profileKeys = {
  all: ['profile'] as const,
  detail: (id: string) => [...profileKeys.all, id] as const,
};

export function useProfile(id: string) {
  return useQuery({ queryKey: profileKeys.detail(id), queryFn: () => profileApi.getProfile(id) });
}
```

4. Each feature defines its own query-key factory (`<name>Keys`). Never type query keys by hand in many places.
5. After a mutation, call `queryClient.invalidateQueries({ queryKey: <name>Keys.all })` to refresh the related data.

## Zustand stores

- One store per concern (`useSessionStore`, `useSettingsStore`), not one giant store.
- Components select only the fields they need: `useSessionStore((s) => s.user)`.
- Keep actions inside the store next to the state they change.

## Errors and loading

- Every screen that loads data shows **loading**, **error** (with a retry action) and **empty** states.
- The API client throws `ApiError` with `status` and `body`. Handle it in hooks, and show friendly messages in the UI.
- Never swallow errors silently. Either handle them or let them reach the error UI.

## Config and secrets

- Read settings only from `@/config/env`. Add new values to the Zod schema there and to `.env.example`.
- Only `EXPO_PUBLIC_*` variables reach the app, and anyone with the app can read them. Never put real secrets in the app.
- Store tokens and other sensitive values only with `@/services/storage/secure-storage` (expo-secure-store). Never in AsyncStorage or plain files.
