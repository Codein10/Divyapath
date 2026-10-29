import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

export type SummaryRow = [label: string, value: string];

type SummaryListProps = {
  rows: SummaryRow[];
  total?: SummaryRow;
  /** Wrap the list in a soft card (price quotes). */
  boxed?: boolean;
  children?: ReactNode;
};

/** Label / value rows with an optional bold total (prices, booking details). */
export function SummaryList({ rows, total, boxed, children }: SummaryListProps) {
  return (
    <View style={boxed && styles.box}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <AppText muted style={styles.label}>
            {label}
          </AppText>
          <AppText align="right" style={styles.value}>
            {value}
          </AppText>
        </View>
      ))}
      {total ? (
        <View style={[styles.row, styles.totalRow]}>
          <AppText weight="bold" size={FontSize.price}>
            {total[0]}
          </AppText>
          <AppText weight="bold" size={FontSize.price}>
            {total[1]}
          </AppText>
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.four + 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.one,
  },
  label: {
    flexShrink: 1,
  },
  value: {
    flexShrink: 1,
    maxWidth: '62%',
  },
  totalRow: {
    marginTop: Spacing.two,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
});
