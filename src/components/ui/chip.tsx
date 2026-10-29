import { Pressable, StyleSheet } from 'react-native';

import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

export type ChipVariant = 'accent' | 'maroon' | 'dark' | 'peach' | 'date' | 'dateLight';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  variant?: ChipVariant;
  disabled?: boolean;
  accessibilityLabel?: string;
};

const PALETTES: Record<ChipVariant, { bg: string; fg: string; onBg: string; onFg: string }> = {
  accent: { bg: Colors.card, fg: Colors.ink, onBg: Colors.accent, onFg: Colors.white },
  maroon: { bg: Colors.card, fg: Colors.ink, onBg: Colors.maroon, onFg: Colors.white },
  dark: { bg: Colors.night2, fg: Colors.nightInk, onBg: Colors.gold, onFg: Colors.night },
  peach: { bg: Colors.peach, fg: Colors.peachInk, onBg: Colors.accent, onFg: Colors.white },
  date: { bg: Colors.card, fg: Colors.ink, onBg: Colors.accent, onFg: Colors.white },
  dateLight: { bg: Colors.bg, fg: Colors.ink, onBg: Colors.accent, onFg: Colors.white },
};

/** A selectable pill: filters, dates, rituals, sleep timer, etc. */
export function Chip({
  label,
  selected,
  onPress,
  variant = 'accent',
  disabled,
  accessibilityLabel,
}: ChipProps) {
  const palette = PALETTES[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected: !!selected, disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'peach' && styles.peach,
        variant === 'date' && styles.date,
        variant === 'dateLight' && styles.dateLight,
        { backgroundColor: selected ? palette.onBg : palette.bg },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <AppText
        weight="semibold"
        size={variant === 'peach' || variant === 'dateLight' ? FontSize.sm : FontSize.md}
        color={selected ? palette.onFg : palette.fg}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: Size.chip,
    paddingHorizontal: Spacing.gutter,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  peach: {
    height: undefined,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    minHeight: Size.tapMin,
  },
  date: {
    height: 54,
    paddingHorizontal: Spacing.five,
    borderRadius: Radius.md,
  },
  dateLight: {
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.md,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
