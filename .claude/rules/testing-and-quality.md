# Testing and quality

## Tools

- Jest with the `jest-expo` preset, and React Native Testing Library for components.
- Test files sit next to the code they test and end in `.test.ts` / `.test.tsx`. Jest only looks for those files inside `src/`.
- Never put test files in `src/app/`. Expo Router would treat them as routes. Test the feature screen instead.

## What to test

| Code                        | Test                                                                 |
| --------------------------- | -------------------------------------------------------------------- |
| `utils/`, feature helpers   | Always. Plain input → output tests.                                  |
| `services/`, feature `api/` | Always. Mock `fetch` or the service below.                           |
| Hooks with logic            | Yes, with `renderHook`.                                              |
| Components and screens      | Main user flows: renders, shows loading/error/empty, reacts to taps. |

- Test what the user sees and does (`getByRole`, `getByText`, `fireEvent.press`), not internal details.
- Each bug fix comes with a test that fails without the fix.
- Mock at the edges (network, storage, device APIs), not your own code in the middle.

## Commands

```bash
npm run lint         # ESLint + Prettier check (includes folder import rules)
npm run typecheck    # TypeScript
npm run test         # Jest, once
npm run test:watch   # Jest, re-runs on save
npm run format       # Prettier, fixes formatting
npm run check        # lint + typecheck + test together
```

## Definition of done

A task is done only when **all** of these are true:

1. `npm run check` passes (lint, typecheck and tests).
2. New logic has tests.
3. The code follows the rules in `.claude/rules/`: right folder, import direction, theme tokens, no `any`.
4. Loading, error and empty states exist for any new data screen.
5. No leftover `console.log`, commented-out code or unused files.

If a check fails, report the failure. Do not call the task done.
