import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type SectionLabelProps = {
  children: string;
  /** Text on the right, such as "3 of 8 ready". */
  right?: ReactNode;
  first?: boolean;
};

/** Small uppercase heading between sections ("WHAT’S INSIDE", "SELECT DATE"). */
export function SectionLabel({ children, right, first }: SectionLabelProps) {
  return (
    <View style={[styles.row, first && styles.first]}>
      <AppText variant="label" accessibilityRole="header">
        {children}
      </AppText>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: Spacing.seven,
    marginBottom: Spacing.three,
  },
  first: {
    marginTop: Spacing.two,
  },
});
