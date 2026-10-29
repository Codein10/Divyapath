# Folder structure

The app is organized **by feature**. Each feature owns everything it needs. Shared folders hold only code that two or more features use.

```
src/
  app/                 Expo Router routes only (screens + _layout.tsx). Keep them thin.
  features/<name>/     One folder per feature (auth, profile, cart, ...). See below.
  components/          Shared app-level components (tab-bar.tsx).
  components/ui/       Shared basic building blocks (Button, Chip, TextField, Screen, …).
  components/art/      Design illustrations drawn as SVG (temple, diyas, thali, …).
  hooks/               Shared hooks (use-t for translated text).
  providers/           App-wide React providers, combined in app-providers.tsx.
  services/            Talking to the outside world: api/, storage/, navigation.ts, query-client.ts.
  store/               Truly global Zustand stores (settings, toast).
  config/              Settings from env variables (env.ts).
  constants/           Theme tokens (theme.ts) and translated UI text (strings.ts).
  utils/               Small pure helper functions with no React and no side effects.
  types/               Types shared across features.
assets/                Images and fonts.
```

## Inside a feature

```
src/features/auth/
  index.ts             Public API. The ONLY file other code may import from.
  data.ts              Demo content (catalogs, constants) until a real backend exists.
  types.ts             Types and Zod schemas for this feature.
  api/                 Server calls (auth-api.ts) and query hooks (use-login.ts).
  hooks/               Feature logic hooks (use-session.ts).
  components/          UI used only by this feature (login-form.tsx).
  screens/             Full screens that routes render (login-screen.tsx).
  store/               Zustand store for this feature, only if needed.
  utils/               Helpers used only by this feature.
```

Only create the subfolders a feature actually needs. Keep subfolders one level deep.

## Current features

| Feature                                     | What it holds                                               |
| ------------------------------------------- | ----------------------------------------------------------- |
| `auth`                                      | Sign-in screen, session store                               |
| `home`                                      | Home screen (panchang, explore, upcoming festivals)         |
| `practice`                                  | Practice tracker, streak, japa counter                      |
| `shop`                                      | Store, product, cart, orders, kit subscription              |
| `aarti`                                     | Aarti/mantra lists, audio player, mini player, live darshan |
| `pandits`                                   | Book a pandit, bookings, chat, video call                   |
| `temples`                                   | Temple list and detail, donations                           |
| `festivals`                                 | Calendar, festival pages, puja guides                       |
| `notifications`, `receipts`                 | Shared by several features through their `index.ts`         |
| `family`, `journal`, `assistant`, `profile` | Their own screens and stores                                |

## Where does new code go?

1. New screen → a component in `features/<name>/screens/`, plus a thin route file in `src/app/`.
2. Used by one feature only → inside that feature.
3. Used by two or more features → move it to the matching shared folder.
4. Calls the network or device storage → `services/` (shared) or `features/<name>/api/` (feature).
5. Never put components, hooks, or utils inside `src/app/`. Every file there becomes a route.

## Platform-specific files

Use suffixes when code must differ by platform: `name.ios.tsx`, `name.android.tsx`, `name.web.tsx`. Keep the same exports in every variant.

## Do not run `npm run reset-project`

That starter script moves or deletes the **whole** `src/` folder, including `services/`, `providers/` and `config/`. Delete the starter demo screens by hand instead.
