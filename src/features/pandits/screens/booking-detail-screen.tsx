import { router } from 'expo-router';
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
import { SummaryList, type SummaryRow } from '@/components/ui/summary-list';
import { TextLink } from '@/components/ui/text-link';
import { Timeline } from '@/components/ui/timeline';
import { useReceiptStore } from '@/features/receipts';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';
import { addDays, inr, shortDate, today } from '@/utils/format';

import { ActionTile } from '../components/action-tile';
import { DateChips } from '../components/date-chips';
import { TimeSlotGrid } from '../components/time-slot-grid';
import { findPanditByName, PLATFORM_FEE, TRAVEL_FEE } from '../data';
import { findBooking, useBookingStore } from '../store/booking-store';

type BookingDetailScreenProps = {
  id?: string;
};

const STATUS_STEPS = ['Requested', 'Confirmed by pandit', 'Puja completed'];

export function BookingDetailScreen({ id }: BookingDetailScreenProps) {
  const booking = findBooking(
    useBookingStore((state) => state.bookings),
    id,
  );
  const reschedule = useBookingStore((state) => state.reschedule);
  const cancel = useBookingStore((state) => state.cancel);
  const showReceipt = useReceiptStore((state) => state.show);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDay, setNewDay] = useState(1);
  const [newSlot, setNewSlot] = useState('');
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const pandit = findPanditByName(booking.pandit);
  const cancelled = booking.status === 'Cancelled';
  const online = booking.mode === 'Online video';
  const step = booking.status === 'Completed' ? 2 : booking.status === 'Confirmed' ? 1 : 0;
  const rows: SummaryRow[] = [
    ['Pandit', booking.pandit],
    ['Date', booking.date],
    ['Time', booking.slot],
    ['Mode', booking.mode],
    ...(booking.address ? ([['Venue', booking.address]] as SummaryRow[]) : []),
  ];

  const openReceipt = () => {
    const travel = online ? 0 : TRAVEL_FEE;
    showReceipt({
      kind: 'Booking receipt',
      id: booking.id,
      date: shortDate(today()),
      to: booking.pandit,
      lines: [
        [`${booking.ritual} · dakshina`, booking.total - PLATFORM_FEE - travel],
        ...(travel ? ([['Travel', travel]] as [string, number][]) : []),
        ['Platform fee', PLATFORM_FEE],
      ],
      total: booking.total,
      note: 'The pandit receives 88% of the dakshina. Sandbox payment.',
    });
    router.push('/receipt');
  };

  const sendReschedule = () => {
    if (!newSlot) {
      toast('Choose a new time');
      return;
    }
    reschedule(booking.id, shortDate(addDays(newDay)), newSlot);
    setRescheduling(false);
  };

  return (
    <Screen>
      <ScreenHeader title={booking.ritual} />
      <View style={styles.body}>
        <View style={styles.row}>
          <AppText muted>{booking.id}</AppText>
          <StatusPill label={booking.status} />
        </View>
        <View style={styles.gapTop}>
          <SummaryList boxed rows={rows} total={['Paid', inr(booking.total)]} />
        </View>

        {cancelled ? (
          <InfoCard tone="err" style={styles.gapTop}>
            <AppText weight="bold" color={Colors.err}>
              Booking cancelled
            </AppText>
            <AppText variant="small">
              Full refund of {inr(booking.total)} to your original payment method in 5–7 working
              days.
            </AppText>
          </InfoCard>
        ) : (
          <>
            <SectionLabel>STATUS</SectionLabel>
            <Timeline
              steps={STATUS_STEPS.map((title, index) => ({
                title,
                detail: index === 1 && step < 1 ? 'Usually within 2 hours' : undefined,
                state: index <= step ? 'done' : index === step + 1 ? 'now' : 'todo',
              }))}
            />
            <View style={styles.tiles}>
              {online ? (
                <ActionTile
                  title="Join video call"
                  subtitle="Opens at your slot"
                  onPress={() => router.push(`/call/${booking.id}`)}
                />
              ) : null}
              <ActionTile
                title="Chat with pandit"
                subtitle="Share requirements"
                onPress={() => router.push(`/chat/${booking.id}`)}
              />
              <ActionTile
                title="Reschedule"
                subtitle="Free up to 24 h before"
                onPress={() => {
                  setRescheduling((open) => !open);
                  setNewSlot('');
                }}
              />
              <ActionTile title="Receipt" subtitle="View and email" onPress={openReceipt} />
            </View>

            {rescheduling ? (
              <View style={styles.reschedule}>
                <AppText weight="bold">Pick a new time</AppText>
                <DateChips
                  light
                  flush
                  value={newDay}
                  onChange={(day) => {
                    setNewDay(day);
                    setNewSlot('');
                  }}
                />
                <TimeSlotGrid
                  pandit={pandit}
                  dayIndex={newDay}
                  value={newSlot}
                  onChange={setNewSlot}
                />
                <Button label="Send reschedule request" onPress={sendReschedule} />
              </View>
            ) : null}

            <ShareButton
              text={`My ${booking.ritual} with ${booking.pandit} is booked for ${booking.date} at ${booking.slot} (DivyaPath)`}
            />
            {confirmingCancel ? (
              <ConfirmBox
                title="Cancel this booking?"
                message={`It’s more than 24 hours away, so you get a full refund of ${inr(booking.total)}.`}
                cancelLabel="Keep booking"
                confirmLabel="Cancel booking"
                onCancel={() => setConfirmingCancel(false)}
                onConfirm={() => {
                  cancel(booking.id);
                  setConfirmingCancel(false);
                }}
              />
            ) : (
              <TextLink
                label="Cancel booking"
                color={Colors.err}
                onPress={() => setConfirmingCancel(true)}
                style={styles.gapTop}
              />
            )}
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  gapTop: {
    marginTop: Spacing.three + 2,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three + 2,
  },
  reschedule: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.four + 2,
    marginTop: Spacing.six,
    gap: Spacing.three,
  },
});
