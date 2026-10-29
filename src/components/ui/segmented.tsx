import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Shadow, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type SegmentedProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
};

/** Two or three options in one pill (Aarti / Mantras / Library, At home / Online). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedProps<T>) {
  return (
    <View style={styles.track} accessibilityRole="tablist" accessibilityLabel={accessibilityLabel}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            disabled={option.disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected, disabled: option.disabled }}
            style={[
              styles.segment,
              selected && styles.selected,
              option.disabled && styles.disabled,
            ]}
          >
            <AppText
              weight="semibold"
              size={FontSize.lg}
              color={selected ? Colors.ink : Colors.muted}
              numberOfLines={1}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.pill,
    padding: Spacing.one + 2,
  },
  segment: {
    flex: 1,
    height: 52,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.bg,
    boxShadow: Shadow.soft,
  },
  disabled: {
    opacity: 0.5,
  },
});
