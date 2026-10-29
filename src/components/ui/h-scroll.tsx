import { type ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

type HScrollProps = {
  children: ReactNode;
  accessibilityLabel?: string;
  /** Leave out the side padding when already inside a padded container. */
  flush?: boolean;
  gap?: number;
};

/** A horizontal row that scrolls sideways (chips, cards, dates). */
export function HScroll({
  children,
  accessibilityLabel,
  flush,
  gap = Spacing.three - 2,
}: HScrollProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityLabel={accessibilityLabel}
      contentContainerStyle={[styles.content, { gap }, flush && styles.flush]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.gutter,
    paddingVertical: Spacing.half,
  },
  flush: {
    paddingHorizontal: 0,
  },
});
