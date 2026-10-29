import { StyleSheet, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon } from './icon';

export type TimelineStep = {
  title: string;
  detail?: string;
  state: 'done' | 'now' | 'todo';
};

type TimelineProps = {
  steps: TimelineStep[];
};

/** Vertical steps with dots (order tracking, booking status, festival preparation). */
export function Timeline({ steps }: TimelineProps) {
  return (
    <View>
      {steps.map((step, index) => (
        <View key={`${step.title}-${index}`} style={styles.item}>
          {index < steps.length - 1 ? <View style={styles.line} /> : null}
          <View
            style={[
              styles.dot,
              step.state === 'done' && styles.done,
              step.state === 'now' && styles.now,
            ]}
          >
            {step.state === 'done' ? (
              <Icon name="check" size={13} color={Colors.white} strokeWidth={3} />
            ) : null}
          </View>
          <View style={styles.text}>
            <AppText weight="bold">{step.title}</AppText>
            {step.detail ? (
              <AppText size={FontSize.sm} muted>
                {step.detail}
              </AppText>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const DOT = 24;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  line: {
    position: 'absolute',
    left: DOT / 2 - 1,
    top: DOT + 2,
    bottom: 2,
    width: 2,
    backgroundColor: Colors.line,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: Colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  done: {
    backgroundColor: Colors.ok,
  },
  now: {
    backgroundColor: Colors.accent,
    boxShadow: `0px 0px 0px 5px ${Colors.accentFocus}`,
  },
  text: {
    flex: 1,
  },
});
