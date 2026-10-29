import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type TextLinkProps = {
  label: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** A bold accent-colored text button ("See all", "Reset", "Cancel booking"). */
export function TextLink({ label, onPress, color = Colors.accent, size, style }: TextLinkProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={Spacing.two}
      style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}
    >
      <AppText weight="bold" color={color} size={size ?? FontSize.md}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.one,
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.6,
  },
});
