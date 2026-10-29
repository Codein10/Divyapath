import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Size } from '@/constants/theme';

import { AppText } from './app-text';

type QtyStepperProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  large?: boolean;
};

/** − 2 + control for cart quantities. */
export function QtyStepper({ value, onIncrement, onDecrement, large }: QtyStepperProps) {
  const buttonStyle = [styles.button, large && styles.buttonLarge];
  return (
    <View style={[styles.wrap, large && styles.wrapLarge]}>
      <Pressable
        onPress={onDecrement}
        accessibilityRole="button"
        accessibilityLabel="Remove one"
        style={buttonStyle}
      >
        <AppText weight="semibold" size={FontSize.xxl} color={Colors.accent}>
          −
        </AppText>
      </Pressable>
      <AppText weight="bold" style={styles.value} accessibilityLiveRegion="polite">
        {value}
      </AppText>
      <Pressable
        onPress={onIncrement}
        accessibilityRole="button"
        accessibilityLabel="Add one"
        style={buttonStyle}
      >
        <AppText weight="semibold" size={FontSize.xxl} color={Colors.accent}>
          +
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    backgroundColor: Colors.bg,
  },
  wrapLarge: {
    height: Size.control,
    borderRadius: Radius.md,
  },
  button: {
    width: 34,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLarge: {
    width: 46,
  },
  value: {
    minWidth: 18,
    textAlign: 'center',
  },
});
