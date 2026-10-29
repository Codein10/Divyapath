# Code style

Prettier handles formatting (`npm run format`) and ESLint checks the rules (`npm run lint`). Do not fight them.

## Naming

| Thing                   | Style                                       | Example                            |
| ----------------------- | ------------------------------------------- | ---------------------------------- |
| Files and folders       | kebab-case                                  | `login-form.tsx`, `use-session.ts` |
| Components              | PascalCase                                  | `LoginForm`                        |
| Hooks                   | camelCase starting with `use`               | `useSession`                       |
| Functions and variables | camelCase, verb for functions               | `formatPrice`, `isLoading`         |
| Booleans                | `is` / `has` / `can` / `should` prefix      | `hasError`                         |
| Constants               | UPPER_SNAKE_CASE                            | `MAX_RETRIES`                      |
| Types                   | PascalCase, no `I` prefix                   | `User`, `LoginFormProps`           |
| Zod schemas             | camelCase ending in `Schema`                | `userSchema`                       |
| Tests                   | same name + `.test.ts(x)`, next to the file | `login-form.test.tsx`              |

## TypeScript

- Strict mode is on. Never use `any` (ESLint blocks it). Use `unknown` and narrow it, or write a proper type.
- Do not use `@ts-ignore`. If truly needed, use `@ts-expect-error` with a comment explaining why.
- Name every component's props type `<Component>Props` and declare it with `type`, right above the component.
- Get types from Zod schemas with `z.infer<typeof schema>` instead of writing them twice.
- Avoid non-null `!` assertions. Handle the `null`/`undefined` case.

## Components

- Function components only. One exported component per file.
- Named exports everywhere. **Exception:** route files in `src/app/` must use `export default`.
- Split any file over ~200 lines, or any component that does more than one job.
- Put `const styles = StyleSheet.create(...)` at the bottom of the file.
- Keep JSX simple. Move conditions and data shaping into variables or hooks above the `return`.
- React Compiler is on. Do not add `useMemo`, `useCallback` or `React.memo` unless a measured problem needs it.

## Imports

Order: 1) packages, 2) `@/` imports, 3) relative imports, with a blank line between groups. Use `import type` for type-only imports.

## Functions and comments

- Prefer small pure functions. Return early instead of nesting `if` blocks.
- No magic numbers or strings. Give them a named constant.
- Comment **why**, not what. Add a short JSDoc to exported services and hooks whose use is not obvious.
- Do not leave `console.log`, commented-out code, or unused exports behind.
