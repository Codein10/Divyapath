import { type ReactNode, useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type ChatBubbleProps = {
  fromMe: boolean;
  text: string;
  /** Extra content under the text (source line, follow-up link). */
  children?: ReactNode;
};

export function ChatBubble({ fromMe, text, children }: ChatBubbleProps) {
  return (
    <View style={[styles.bubble, fromMe ? styles.me : styles.other]}>
      <AppText color={fromMe ? Colors.white : Colors.ink} style={styles.text}>
        {text}
      </AppText>
      {children}
    </View>
  );
}

const DOT_MS = 400;

/** Three blinking dots while the other side "types". */
export function TypingBubble() {
  const [dots] = useState(() => [0, 1, 2].map(() => new Animated.Value(1)));

  useEffect(() => {
    const loops = dots.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(value, { toValue: 0.25, duration: DOT_MS, useNativeDriver: true }),
          Animated.timing(value, { toValue: 1, duration: DOT_MS, useNativeDriver: true }),
        ]),
      ),
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [dots]);

  return (
    <View style={[styles.bubble, styles.other, styles.typing]} accessibilityLabel="Typing">
      {dots.map((opacity, index) => (
        <Animated.View key={index} style={[styles.dot, { opacity }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '84%',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    marginTop: Spacing.three,
  },
  me: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.accent,
    borderBottomRightRadius: 6,
  },
  other: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 6,
  },
  text: {
    lineHeight: 16 * 1.55,
  },
  typing: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.muted,
  },
});
