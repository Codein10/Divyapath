# Styling and UI

The UI follows the DivyaPath design: warm cream surfaces, saffron accent, maroon labels, Tiro Devanagari Hindi headings and Mukta body text.

## Theme first

- Colors, spacing, sizes, radii, shadows and fonts come from `@/constants/theme` (`Colors`, `Spacing`, `Size`, `Radius`, `Shadow`, `Fonts`, `FontSize`). No hard-coded colors like `'#fff'` and no random numbers like `padding: 13`.
- The app has one light palette plus **night** tokens (`Colors.night`, `night2`, `nightInk`, `gold`, …) for the dark screens (live darshan, player, video call). Need a new color or size? Add it to the theme first, then use it.
- Exception: illustration artwork in `src/components/art/` and the flame/avatar marks keep their own colors. They are pictures, not UI.
- Style with `StyleSheet.create` at the bottom of the file. Avoid inline style objects, except for values that change at runtime.

## Screens

- Every screen renders inside `<Screen>` from `@/components/ui/screen`. It handles the background, safe areas, scrolling, keyboard, the sticky `footer`, and offline mode.
  - `inTabs` for tab screens, `tone="dark"` for dark screens, `needsNetwork` for screens that show the offline state, `stickToBottom` for chats.
  - Buttons inside `footer` fill the row automatically.
- Stacked screens start with `<ScreenHeader title=… />` or a `<Hero …>` picture with a floating back button.
- Navigate with `router.push('/route')`. To jump to a tab from a stacked screen use `goToTab('/store')` from `@/services/navigation`.

## Shared UI

- Before building a new button, input or card, check `src/components/ui/`. Reuse it or extend it: `Button`, `Chip`, `TextField`, `Toggle`, `CheckRow`, `Menu`/`MenuRow`, `InfoCard`, `SummaryList`, `Timeline`, `PictureCard`, `FeatureRow`, `EmptyState`, `ConfirmBox`, `Skeleton`, `ChatBubble`, `Composer`…
- Pictures use `<Art kind="temple" variant={1} shade />` from `@/components/art/art`; icons use `<Icon name="bell" color={…} />`.
- A shared UI component takes data and callbacks through props. It never fetches data or reads feature stores.
- Show feedback with `toast('…')` from `@/store/toast-store`.

## Layout

- Use flexbox and `gap`. Avoid fixed widths and heights for content, so screens work on small phones, big phones and tablets.
- Short, fixed lists (demo catalogs, settings, under ~30 items) can be mapped inside the screen's scroll view. Lists that grow from server data use `FlatList`.
- Photos from the network use `expo-image`.

## Accessibility

- Every touchable element has `accessibilityRole` and an `accessibilityLabel` when its text or icon is not clear on its own.
- Tap targets are at least 44×44 points (use `hitSlop` if the visual is smaller).
- Text must stay readable with large text on. Do not set fixed heights on text containers.
- Never show meaning by color alone. Also use text or an icon.

## Text

- All text uses `<AppText variant=…>`: `displayXl/Lg/Hero/Md`, `heading`, `title`, `body`, `lead`, `small`, `xs`, `eyebrow`, `label`. Pass `muted` for secondary text. It handles fonts, large-text mode, Hindi letter spacing and dark screens.
- Text that the design translates goes through `useT()` with keys in `src/constants/strings.ts` (English + Hindi). Add new keys there for headings, tabs and other UI chrome.
