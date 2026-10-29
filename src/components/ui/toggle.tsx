import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Shadow } from '@/constants/theme';

type ToggleProps = {
  value: boolean;
  onChange: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
};

/** An on/off switch styled like the design (green when on). */
export function Toggle({ value, onChange, accessibilityLabel, disabled }: ToggleProps) {
  return (
    <Pressable
      onPress={onChange}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      hitSlop={6}
      style={[styles.track, value && styles.on, disabled && styles.disabled]}
    >
      <View style={[styles.knob, value && styles.knobOn]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.switchOff,
    padding: 3,
  },
  on: {
    backgroundColor: Colors.ok,
  },
  knob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
    boxShadow: Shadow.soft,
  },
  knobOn: {
    transform: [{ translateX: 20 }],
  },
  disabled: {
    opacity: 0.6,
  },
});
