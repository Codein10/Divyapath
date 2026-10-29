import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';

import { type Pandit, TIME_SLOTS } from '../data';
import { isSlotTaken } from '../utils/booking-quote';

type TimeSlotGridProps = {
  pandit: Pandit;
  dayIndex: number;
  value: string;
  onChange: (slot: string) => void;
};

/** Two columns of times. Booked times are struck out and can't be picked. */
export function TimeSlotGrid({ pandit, dayIndex, value, onChange }: TimeSlotGridProps) {
  return (
    <View style={styles.grid} accessibilityLabel="Time">
      {TIME_SLOTS.map((slot, index) => {
        const taken = isSlotTaken(dayIndex, index, pandit);
        const selected = value === slot;
        return (
          <Pressable
            key={slot}
            onPress={() => onChange(slot)}
            disabled={taken}
            accessibilityRole="button"
            accessibilityLabel={taken ? `${slot}, already booked` : slot}
            accessibilityState={{ selected, disabled: taken }}
            style={[styles.slot, selected && styles.selected, taken && styles.taken]}
          >
            <AppText
              size={FontSize.lg}
              weight={selected ? 'bold' : 'regular'}
              color={selected ? Colors.white : taken ? Colors.disabled : Colors.ink2}
              style={taken && styles.strike}
            >
              {slot}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  slot: {
    width: '47%',
    flexGrow: 1,
    height: Size.control,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  taken: {
    backgroundColor: Colors.card,
    borderColor: Colors.card,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
});
