import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { InfoCard } from '@/components/ui/info-card';
import { QtyStepper } from '@/components/ui/qty-stepper';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { SummaryList, type SummaryRow } from '@/components/ui/summary-list';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { addDays, inr, shortDate } from '@/utils/format';

import { DELIVERY_DAYS, getProduct } from '../data';
import { useCartStore } from '../store/cart-store';
import { type Order, useOrderStore } from '../store/order-store';
import { cartTotals } from '../utils/cart-totals';

export function CartScreen() {
  const items = useCartStore((state) => state.items);
  const gifts = useCartStore((state) => state.gifts);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [placed, setPlaced] = useState<Order | null>(null);
  const arrives = shortDate(addDays(DELIVERY_DAYS));

  if (placed) {
    return (
      <Screen
        footer={
          <>
            <Button label="Keep shopping" variant="soft" flex onPress={() => goToTab('/store')} />
            <Button
              label="Track order"
              flex
              onPress={() => router.replace(`/order/${placed.id}`)}
            />
          </>
        }
      >
        <ScreenHeader title="Order placed" />
        <View style={styles.success}>
          <View style={styles.okCircle}>
            <Icon name="check" size={46} color={Colors.ok} />
          </View>
          <AppText variant="displayMd">Thank you</AppText>
          <AppText muted>
            Order {placed.id} · {inr(placed.total)}
          </AppText>
          <AppText variant="small" muted align="center" style={styles.narrow}>
            Sandbox payment. In production the order turns{' '}
            <AppText variant="small" weight="bold">
              Paid
            </AppText>{' '}
            only after the server verifies Razorpay’s signature and webhook.
          </AppText>
        </View>
      </Screen>
    );
  }

  const ids = Object.keys(items);
  if (!ids.length) {
    return (
      <Screen>
        <ScreenHeader title="Your cart" />
        <View style={styles.body}>
          <EmptyState
            icon={<Icon name="bag" size={44} color={Colors.muted} strokeWidth={1.3} />}
            title="Your cart is empty"
            message={`Kits ordered today arrive by ${arrives}.`}
          >
            <Button
              label="Browse the store"
              onPress={() => goToTab('/store')}
              style={styles.centerButton}
            />
          </EmptyState>
        </View>
      </Screen>
    );
  }

  const totals = cartTotals(items, Object.keys(gifts));
  const rows: SummaryRow[] = [
    ['Subtotal', inr(totals.subtotal)],
    ...(totals.giftWrap ? ([['Gift wrap', inr(totals.giftWrap)]] as SummaryRow[]) : []),
    ['Delivery', totals.shipping ? inr(totals.shipping) : 'Free'],
    ['GST (included, est.)', inr(totals.gstIncluded)],
  ];

  return (
    <Screen
      footer={
        <Button
          label={`Pay ${inr(totals.total)} · sandbox`}
          onPress={() => setPlaced(placeOrder())}
        />
      }
    >
      <ScreenHeader title="Your cart" />
      <View style={styles.body}>
        {ids.map((id) => {
          const product = getProduct(id);
          const gift = gifts[id];
          return (
            <View key={id} style={styles.line}>
              <View style={styles.thumb}>
                <Art kind={product.art} variant={product.artVariant} />
              </View>
              <View style={styles.lineText}>
                <AppText weight="semibold">{product.name}</AppText>
                <AppText weight="bold" color={Colors.maroon}>
                  {inr(product.price)}
                </AppText>
                {gift ? (
                  <AppText variant="xs" weight="bold" color={Colors.ok}>
                    Gift for {gift.name} · {gift.deliverOn}
                  </AppText>
                ) : null}
              </View>
              <QtyStepper
                value={items[id]}
                onIncrement={() => increment(id)}
                onDecrement={() => decrement(id)}
              />
            </View>
          );
        })}

        <SectionLabel>DELIVER TO</SectionLabel>
        <InfoCard>
          <AppText weight="bold">Home</AppText>
          <AppText variant="small" muted>
            Flat 4, Sai Residency, Gangapur Road, Nashik 422005 (sample)
          </AppText>
          <AppText variant="small" weight="bold" color={Colors.accent}>
            Arrives by {arrives}
          </AppText>
        </InfoCard>

        <SectionLabel>PAY WITH</SectionLabel>
        <InfoCard>
          <AppText weight="bold">UPI, card or netbanking</AppText>
          <AppText variant="small" muted>
            Razorpay test mode. No real payment is taken.
          </AppText>
        </InfoCard>

        <View style={styles.summary}>
          <SummaryList rows={rows} total={['Total', inr(totals.total)]} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.two,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three + 2,
    paddingVertical: Spacing.three + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  lineText: {
    flex: 1,
    minWidth: 0,
  },
  summary: {
    marginTop: Spacing.six,
  },
  success: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.eight + 4,
    paddingHorizontal: Spacing.gutter,
  },
  okCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.okBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  narrow: {
    maxWidth: 300,
    fontSize: FontSize.sm,
  },
  centerButton: {
    alignSelf: 'center',
    width: 240,
  },
});
