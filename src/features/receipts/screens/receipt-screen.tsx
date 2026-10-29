import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ShareButton } from '@/components/ui/share-button';
import { StatusPill } from '@/components/ui/status-pill';
import { SummaryList } from '@/components/ui/summary-list';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { toast } from '@/store/toast-store';
import { inr } from '@/utils/format';

import { useReceiptStore } from '../store/receipt-store';

export function ReceiptScreen() {
  const receipt = useReceiptStore((state) => state.current);

  return (
    <Screen
      footer={
        <>
          <Button
            label="Email receipt"
            variant="soft"
            flex
            onPress={() => toast('Receipt emailed to you (demo)')}
          />
          <Button label="Done" flex onPress={() => goToTab('/')} />
        </>
      }
    >
      <ScreenHeader title={receipt.kind} />
      <View style={styles.body}>
        <View style={styles.receipt}>
          <View style={styles.headerRow}>
            <AppText variant="title" size={24}>
              DivyaPath
            </AppText>
            <StatusPill label="Paid · sandbox" tone="ok" />
          </View>
          <AppText variant="small" muted>
            {receipt.id} · {receipt.date}
          </AppText>
          <AppText variant="small" style={styles.to}>
            To:{' '}
            <AppText variant="small" weight="bold">
              {receipt.to}
            </AppText>
          </AppText>
          <View style={styles.lines}>
            <SummaryList
              rows={receipt.lines.map(([label, amount]) => [label, inr(amount)])}
              total={['Total', inr(receipt.total)]}
            />
          </View>
          {receipt.note ? (
            <AppText variant="xs" muted style={styles.note}>
              {receipt.note}
            </AppText>
          ) : null}
        </View>
        <ShareButton text={`My DivyaPath receipt ${receipt.id}`} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.four,
  },
  receipt: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.card2,
    borderRadius: Radius.lg,
    padding: Spacing.five,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
  },
  to: {
    marginTop: Spacing.three,
  },
  lines: {
    marginTop: Spacing.four,
  },
  note: {
    marginTop: Spacing.four,
  },
});
