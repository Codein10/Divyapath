import { Pressable, StyleSheet } from 'react-native';

import { Colors, Shadow, Size, Spacing } from '@/constants/theme';
import { goBack } from '@/services/navigation';

import { Icon } from './icon';
import { useToneColors } from './tone';

type BackButtonProps = {
  /** `floating` sits on top of a hero picture; `flat` sits in a header row. */
  variant?: 'floating' | 'flat';
  icon?: 'chevronLeft' | 'close';
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function BackButton({
  variant = 'flat',
  icon = 'chevronLeft',
  onPress = goBack,
  accessibilityLabel = 'Back',
}: BackButtonProps) {
  const tone = useToneColors();
  const floating = variant === 'floating';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        floating ? styles.floating : styles.flat,
        !floating && { backgroundColor: tone.surface },
        pressed && styles.pressed,
      ]}
    >
      <Icon name={icon} size={22} color={floating ? Colors.ink : tone.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    top: Spacing.four,
    left: Spacing.four,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: Shadow.float,
    zIndex: 3,
  },
  flat: {
    width: Size.controlXs,
    height: Size.controlXs,
    borderRadius: Size.controlXs / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
