import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

const PULSE_MS = 800;

/** Red "LIVE" pill with a pulsing dot, in the top-left corner of its parent. */
export function LiveBadge() {
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: PULSE_MS, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: PULSE_MS, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.badge}>
      <Animated.View style={[styles.dot, { opacity }]} />
      <AppText weight="bold" size={FontSize.label} color={Colors.white} style={styles.text}>
        LIVE
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    left: Spacing.four + 2,
    top: Spacing.four + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.live,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three + 2,
    zIndex: 2,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  text: {
    letterSpacing: 1.1,
  },
});
