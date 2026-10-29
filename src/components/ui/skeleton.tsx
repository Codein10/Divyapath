import { useEffect, useState } from 'react';
import { Animated, StyleSheet, type DimensionValue } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

const PULSE_MS = 600;

type SkeletonProps = {
  height: number;
  width?: DimensionValue;
};

/** A pulsing placeholder shown while content loads. */
export function Skeleton({ height, width = '100%' }: SkeletonProps) {
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: PULSE_MS, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: PULSE_MS, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.block, { height, width, opacity }]}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.card2,
    borderRadius: Radius.xl,
  },
});
