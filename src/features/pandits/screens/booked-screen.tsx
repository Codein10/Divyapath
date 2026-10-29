import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { SummaryList, type SummaryRow } from '@/components/ui/summary-list';
import { Colors, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { inr } from '@/utils/format';

import { findBooking, useBookingStore } from '../store/booking-store';

type BookedScreenProps = {
  id?: string;
};

export function BookedScreen({ id }: BookedScreenProps) {
  const booking = findBooking(
    useBookingStore((state) => state.bookings),
    id,
  );
  const rows: SummaryRow[] = [
    ['Ritual', booking.ritual],
    ['Date', booking.date],
    ['Time', booking.slot],
    ['Mode', booking.mode],
    ...(booking.address ? ([['Venue', booking.address]] as SummaryRow[]) : []),
    ['Reference', booking.id],
  ];

  return (
    <Screen
      footer={
        <>
          <Button label="Back home" variant="soft" flex onPress={() => goToTab('/')} />
          <Button label="My bookings" flex onPress={() => router.push('/bookings')} />
        </>
      }
    >
      <View style={styles.success}>
        <View style={styles.okCircle}>
          <Icon name="check" size={46} color={Colors.ok} />
        </View>
        <AppText variant="displayMd" accessibilityRole="header">
          Booking requested
        </AppText>
        <AppText muted align="center" style={styles.narrow}>
          {booking.pandit} confirms within 2 hours. If not, you get a full refund.
        </AppText>
      </View>
      <View style={styles.body}>
        <SummaryList boxed rows={rows} total={['Paid (sandbox)', inr(booking.total)]} />
        <AppText variant="xs" muted style={styles.note}>
          We’ll notify you when it’s confirmed and again the day before.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    maxWidth: 310,
  },
  body: {
    paddingHorizontal: Spacing.gutter,
    marginTop: Spacing.gutter,
  },
  note: {
    marginTop: Spacing.three,
  },
});
