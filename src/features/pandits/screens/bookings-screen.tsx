import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoCard } from '@/components/ui/info-card';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusPill } from '@/components/ui/status-pill';
import { useOrderStore } from '@/features/shop';
import { FontSize, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { inr, plural } from '@/utils/format';

import { useBookingStore } from '../store/booking-store';

export function BookingsScreen() {
  const bookings = useBookingStore((state) => state.bookings);
  const orders = useOrderStore((state) => state.orders);

  return (
    <Screen>
      <ScreenHeader title="My bookings & orders" />
      <View style={styles.body}>
        <SectionLabel>PANDIT BOOKINGS</SectionLabel>
        {bookings.length ? (
          bookings.map((booking) => (
            <InfoCard
              key={booking.id}
              onPress={() => router.push(`/bookings/${booking.id}`)}
              accessibilityLabel={`${booking.ritual}, ${booking.status}`}
              style={styles.card}
            >
              <View style={styles.row}>
                <AppText weight="bold" size={FontSize.lg} style={styles.flex}>
                  {booking.ritual}
                </AppText>
                <StatusPill label={booking.status} />
              </View>
              <AppText variant="small" muted>
                {booking.pandit} · {booking.date}, {booking.slot}
              </AppText>
              <AppText variant="small" muted>
                {booking.mode} · {booking.id} · {inr(booking.total)}
              </AppText>
            </InfoCard>
          ))
        ) : (
          <EmptyState message="No bookings yet.">
            <Button label="Find a pandit" onPress={() => goToTab('/book')} style={styles.center} />
          </EmptyState>
        )}

        <SectionLabel>ORDERS</SectionLabel>
        {orders.length ? (
          orders.map((order) => (
            <InfoCard
              key={order.id}
              onPress={() => router.push(`/order/${order.id}`)}
              accessibilityLabel={`Order ${order.id}, ${order.status}`}
              style={styles.card}
            >
              <View style={styles.row}>
                <AppText weight="bold" size={FontSize.lg} style={styles.flex}>
                  {order.id}
                </AppText>
                <StatusPill label={order.status} />
              </View>
              <AppText variant="small" muted>
                {plural(order.items, 'item')} · {inr(order.total)} · tap to track
              </AppText>
            </InfoCard>
          ))
        ) : (
          <EmptyState message="No orders yet.">
            <Button
              label="Visit the store"
              onPress={() => goToTab('/store')}
              style={styles.center}
            />
          </EmptyState>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  card: {
    marginBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignSelf: 'center',
    width: 220,
  },
});
