import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

import { useToneColors } from './tone';

type InfoCardProps = {
  children: ReactNode;
  tone?: 'default' | 'ok' | 'err';
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const TONE_BG = { ok: Colors.okBg, err: Colors.errBg };

/** A soft rounded box for details (delivery, payment, notes). Tappable when `onPress` is set. */
export function InfoCard({
  children,
  tone = 'default',
  onPress,
  accessibilityLabel,
  style,
}: InfoCardProps) {
  const colors = useToneColors();
  const backgroundColor = tone === 'default' ? colors.surface : TONE_BG[tone];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor },
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, { backgroundColor }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.five,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.85,
  },
});
