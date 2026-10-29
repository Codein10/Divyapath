import { StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

export type PillTone = 'ok' | 'warn' | 'err';

const OK_STATUSES = ['Paid', 'Confirmed', 'Shipped', 'Delivered', 'Completed', 'Active'];
const ERROR_STATUSES = ['Cancelled'];

/** Picks the pill color for an order, booking or subscription status. */
export function toneForStatus(status: string): PillTone {
  if (OK_STATUSES.includes(status)) return 'ok';
  if (ERROR_STATUSES.includes(status)) return 'err';
  return 'warn';
}

const TONES: Record<PillTone, { bg: string; fg: string }> = {
  ok: { bg: Colors.okBg, fg: Colors.ok },
  warn: { bg: Colors.warnBg, fg: Colors.warn },
  err: { bg: Colors.errBg, fg: Colors.err },
};

type StatusPillProps = {
  label: string;
  tone?: PillTone;
};

export function StatusPill({ label, tone }: StatusPillProps) {
  const colors = TONES[tone ?? toneForStatus(label)];
  return (
    <View style={[styles.pill, { backgroundColor: colors.bg }]}>
      <AppText weight="bold" size={FontSize.xs} color={colors.fg} numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 28,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
