import { type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Colors, Size } from '@/constants/theme';

import { CountBadge } from './count-badge';
import { useToneColors } from './tone';

type IconButtonProps = {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  badge?: number;
  size?: 'md' | 'sm';
  background?: string;
  disabled?: boolean;
};

/** A round button holding an icon (bell, cart, month arrows). */
export function IconButton({
  children,
  onPress,
  accessibilityLabel,
  badge = 0,
  size = 'md',
  background,
  disabled,
}: IconButtonProps) {
  const tone = useToneColors();
  const dimension = size === 'sm' ? Size.controlXs : Size.iconButton;
  const fallback = size === 'sm' ? Colors.bg : tone.surface;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: background ?? fallback,
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {children}
      <CountBadge count={badge} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.35,
  },
});
