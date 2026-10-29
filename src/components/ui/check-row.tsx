import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon } from './icon';

type CheckRowProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  /** Quantity or price on the right. */
  detail?: string;
  /** Strike through the label when checked (checklists, not settings). */
  strike?: boolean;
  last?: boolean;
};

/** A tappable checklist line with a checkbox. */
export function CheckRow({ label, checked, onToggle, detail, strike = true, last }: CheckRowProps) {
  const done = checked && strike;
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={detail ? `${label}, ${detail}` : label}
      style={[styles.row, last && styles.last]}
    >
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked ? <Icon name="check" size={16} color={Colors.white} strokeWidth={3} /> : null}
      </View>
      <AppText style={[styles.label, done && styles.done]} color={done ? Colors.muted : Colors.ink}>
        {label}
      </AppText>
      {detail ? (
        <AppText size={FontSize.sm} muted align="right">
          {detail}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 52,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  last: {
    borderBottomWidth: 0,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  label: {
    flex: 1,
  },
  done: {
    textDecorationLine: 'line-through',
  },
});
