import { createContext, type ReactNode, use } from 'react';

import { Colors } from '@/constants/theme';

export type Tone = 'light' | 'dark';

const ToneContext = createContext<Tone>('light');

type ToneProviderProps = {
  tone: Tone;
  children: ReactNode;
};

/** Dark screens (live darshan, player, call) wrap their content in `tone="dark"`. */
export function ToneProvider({ tone, children }: ToneProviderProps) {
  return <ToneContext value={tone}>{children}</ToneContext>;
}

export function useTone() {
  return use(ToneContext);
}

/** Text and surface colors for the current tone. */
export function useToneColors() {
  const isDark = useTone() === 'dark';
  return {
    isDark,
    text: isDark ? Colors.nightInk : Colors.ink,
    muted: isDark ? Colors.nightText : Colors.muted,
    desc: isDark ? Colors.nightDesc : Colors.ink2,
    label: isDark ? Colors.gold : Colors.maroon,
    surface: isDark ? Colors.night2 : Colors.card,
    background: isDark ? Colors.night : Colors.bg,
    line: isDark ? Colors.nightLine : Colors.line,
  };
}
