import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type InfoRowProps = {
  label?: string;
  children: ReactNode;
  /** Something on the left instead of a label (check icon). */
  leading?: ReactNode;
};

/** A key / value line with a divider (temple details, premium benefits, family reminders). */
export function InfoRow({ label, children, leading }: InfoRowProps) {
  return (
    <View style={styles.row}>
      {leading}
      {label ? (
        <AppText muted style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <View style={styles.value}>
        {typeof children === 'string' ? <AppText>{children}</AppText> : children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  label: {
    width: 108,
  },
  value: {
    flex: 1,
  },
});
