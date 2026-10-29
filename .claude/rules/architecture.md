# Architecture

## Layers

Code is split into layers. Each layer has one job:

| Layer       | Folder                                                       | Job                                                                      |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Route       | `src/app/`                                                   | Read route params, render a feature screen. Nothing else.                |
| Screen / UI | `features/*/screens`, `features/*/components`, `components/` | Show data and send user actions to hooks. No business logic, no `fetch`. |
| Logic       | `features/*/hooks`, `features/*/api/use-*.ts`                | Business rules, data loading (TanStack Query), state updates.            |
| Service     | `services/`, `features/*/api/*-api.ts`                       | Talk to the server, storage and device APIs. No React.                   |

Flow of one user action: **component → hook → service → server**, and data flows back the same way.

## Import direction (enforced by ESLint)

```
app  →  features  →  shared (components, hooks, providers, services, store, config, constants, utils, types)
```

1. Shared code never imports from `@/features` or `@/app`.
2. Code outside a feature imports it only through `@/features/<name>` (its `index.ts`). Deep imports like `@/features/auth/hooks/use-login` are blocked.
3. Inside a feature, use relative imports (`./`, `../`) for its own files.
4. Use the `@/` alias for everything else. `../../` imports are blocked.
5. If two features need the same thing, move it to a shared folder. Do not import one feature's internals from another.

## Route files stay thin

```tsx
// src/app/(auth)/login.tsx
import { LoginScreen } from '@/features/auth';

export default function LoginRoute() {
  return <LoginScreen />;
}
```

## A feature's `index.ts`

Export only what other code needs: screens, hooks other features use, and public types. Keep everything else private.

```ts
export { LoginScreen } from './screens/login-screen';
export { useSession } from './hooks/use-session';
export type { User } from './types';
```

## Scaling rules

- Start every new feature in its own folder. Move code to shared folders only when a second feature needs it.
- Features talk to each other through their public `index.ts` or through shared stores. Never through hidden imports.
- App-wide setup (providers, auth token, query client) is wired once, in `src/providers/app-providers.tsx` and `src/app/_layout.tsx`.
- Before adding a new library, check if an Expo module or an existing dependency already does the job. Install with `npx expo install`.
- Native config goes in `app.json` and config plugins. Never edit `ios/` or `android/` by hand.
