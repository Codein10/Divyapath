import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { ConfirmBox } from '@/components/ui/confirm-box';
import { InfoCard } from '@/components/ui/info-card';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { ShareButton } from '@/components/ui/share-button';
import { StatusPill } from '@/components/ui/status-pill';
import { Timeline } from '@/components/ui/timeline';
import { Colors, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';
import { inr, plural } from '@/utils/format';

import { ORDER_STAGES, SHIPPED_STAGE } from '../data';
import { findOrder, useOrderStore } from '../store/order-store';

type OrderScreenProps = {
  id?: string;
};

const SUPPORT_TICKET_BASE = 4100;

export function OrderScreen({ id }: OrderScreenProps) {
  const orders = useOrderStore((state) => state.orders);
  const cancel = useOrderStore((state) => state.cancel);
  const order = findOrder(orders, id);
  const [confirming, setConfirming] = useState(false);
  const cancelled = order.status === 'Cancelled';
  const stage = order.stage;

  return (
    <Screen>
      <ScreenHeader title={`Order ${order.id}`} />
      <View style={styles.body}>
        <View style={styles.statusRow}>
          <AppText muted>
            {plural(order.items, 'item')} · {inr(order.total)}
          </AppText>
          <StatusPill label={order.status} />
        </View>

        {cancelled ? (
          <InfoCard tone="err" style={styles.gapTop}>
            <AppText weight="bold" color={Colors.err}>
              Order cancelled
            </AppText>
            <AppText variant="small">
              Refund of {inr(order.total)} to your original payment method in 5–7 working days.
            </AppText>
          </InfoCard>
        ) : (
          <>
            <AppText weight="bold" style={styles.eta}>
              Arriving by {order.eta}
            </AppText>
            <SectionLabel>TRACKING</SectionLabel>
            <Timeline
              steps={ORDER_STAGES.map(([title, detail], index) => ({
                title,
                detail,
                state: index <= stage ? 'done' : index === stage + 1 ? 'now' : 'todo',
              }))}
            />
          </>
        )}

        <SectionLabel>ITEMS</SectionLabel>
        {order.lines.map(([name, qty, amount]) => (
          <View key={name} style={styles.itemRow}>
            <AppText style={styles.itemName}>
              {name} × {qty}
            </AppText>
            <AppText muted>{inr(amount)}</AppText>
          </View>
        ))}

        {!cancelled && stage < SHIPPED_STAGE ? (
          confirming ? (
            <ConfirmBox
              title="Cancel this order?"
              message={`It hasn’t shipped yet, so you get a full refund of ${inr(order.total)}.`}
              cancelLabel="Keep order"
              confirmLabel="Cancel order"
              onCancel={() => setConfirming(false)}
              onConfirm={() => {
                cancel(order.id);
                setConfirming(false);
              }}
            />
          ) : (
            <Button
              label="Cancel order"
              variant="outline"
              onPress={() => setConfirming(true)}
              style={styles.cancel}
            />
          )
        ) : null}
        {!cancelled && stage >= SHIPPED_STAGE ? (
          <AppText variant="xs" muted style={styles.gapTop}>
            Shipped orders can’t be cancelled. Unopened kits can be returned within 7 days of
            delivery.
          </AppText>
        ) : null}

        <Button
          label="Get help with this order"
          variant="soft"
          style={styles.help}
          onPress={() =>
            toast(
              `Support request DP-T-${SUPPORT_TICKET_BASE + Math.floor(Math.random() * 90)} opened. We reply within 4 hours.`,
            )
          }
        />
        <ShareButton text={`Tracking my DivyaPath order ${order.id}`} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  gapTop: {
    marginTop: Spacing.four,
  },
  eta: {
    marginTop: Spacing.two,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  itemName: {
    flex: 1,
  },
  cancel: {
    marginTop: Spacing.five,
  },
  help: {
    marginTop: Spacing.three,
  },
});
