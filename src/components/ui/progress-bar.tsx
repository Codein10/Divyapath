import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

type ProgressBarProps = {
  /** 0 to 1. */
  value: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  accessibilityLabel?: string;
};

export function ProgressBar({
  value,
  height = 6,
  trackColor = Colors.card2,
  fillColor = Colors.accent,
  accessibilityLabel,
}: ProgressBarProps) {
  const percent = Math.min(1, Math.max(0, value)) * 100;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percent) }}
      style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }]}
    >
      <View style={[styles.fill, { width: `${percent}%`, backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
