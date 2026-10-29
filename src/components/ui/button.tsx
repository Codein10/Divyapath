import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { useInFooter } from './footer-context';
import { Icon, type IconName } from './icon';
import { useToneColors } from './tone';

export type ButtonVariant = 'primary' | 'outline' | 'soft' | 'danger';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  icon?: IconName;
  disabled?: boolean;
  /** Grow to share a row with other items. On by default inside a screen footer. */
  flex?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  flex,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const tone = useToneColors();
  const inFooter = useInFooter();
  const grow = flex ?? inFooter;
  const palette = {
    primary: { bg: Colors.accent, fg: Colors.white, border: Colors.accent },
    danger: { bg: Colors.err, fg: Colors.white, border: Colors.err },
    soft: { bg: tone.surface, fg: tone.text, border: tone.surface },
    outline: { bg: 'transparent', fg: tone.text, border: tone.line },
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' && styles.small,
        { backgroundColor: palette.bg, borderColor: palette.border },
        grow && styles.flex,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Icon name={icon} size={20} color={palette.fg} /> : null}
        <AppText
          weight="bold"
          size={size === 'sm' ? FontSize.md : FontSize.xl}
          color={palette.fg}
          numberOfLines={1}
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: Size.control,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  small: {
    height: Size.controlSm,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.5,
  },
});
