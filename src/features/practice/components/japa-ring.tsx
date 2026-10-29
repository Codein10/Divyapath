import { Pressable, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize } from '@/constants/theme';

import { MALA_BEADS } from '../data';

const SIZE = 76;
const RADIUS = 30;
const STROKE = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type JapaRingProps = {
  count: number;
  onPress: () => void;
};

/** A ring that fills as beads are counted. Tap it once per bead. */
export function JapaRing({ count, onPress }: JapaRingProps) {
  const offset = CIRCUMFERENCE * (1 - count / MALA_BEADS);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Count one bead, ${count} of ${MALA_BEADS}`}
      style={({ pressed }) => [styles.ring, pressed && styles.pressed]}
    >
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={Colors.card2}
          strokeWidth={STROKE}
        />
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={Colors.accent2}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </Svg>
      <AppText weight="bold" size={FontSize.xxl} style={styles.count}>
        {count}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
  count: {
    position: 'absolute',
  },
});
