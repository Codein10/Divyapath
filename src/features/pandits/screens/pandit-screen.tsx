import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Hero } from '@/components/ui/hero';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { Segmented } from '@/components/ui/segmented';
import { SummaryList } from '@/components/ui/summary-list';
import { TextField } from '@/components/ui/text-field';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';
import { addDays, inr, shortDate } from '@/utils/format';

import { DateChips } from '../components/date-chips';
import { TimeSlotGrid } from '../components/time-slot-grid';
import { getPandit, MIN_ADDRESS_LENGTH, type ServiceMode, VERIFICATION_STEPS } from '../data';
import { useBookingStore } from '../store/booking-store';
import { bookingQuote, onlinePrice } from '../utils/booking-quote';

type PanditScreenProps = {
  id: string;
};

export function PanditScreen({ id }: PanditScreenProps) {
  const pandit = getPandit(id);
  const addBooking = useBookingStore((state) => state.add);
  const [ritualIndex, setRitualIndex] = useState(0);
  const [mode, setMode] = useState<ServiceMode>(pandit.modes.includes('home') ? 'home' : 'online');
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState('');
  const [address, setAddress] = useState('');
  const [tried, setTried] = useState(false);
  const [showChecks, setShowChecks] = useState(false);

  const online = mode === 'online';
  const quote = bookingQuote(pandit, ritualIndex, online);
  const addressMissing = !online && address.trim().length < MIN_ADDRESS_LENGTH;

  const proceed = () => {
    if (!slot || addressMissing) {
      setTried(true);
      toast(!slot ? 'Choose a time to continue' : 'Add the venue address');
      return;
    }
    const booking = addBooking({
      pandit: pandit.name,
      ritual: quote.ritual,
      date: shortDate(addDays(dayIndex)),
      slot,
      mode: online ? 'Online video' : 'At home',
      address: online ? '' : address.trim(),
      total: quote.total,
    });
    router.push(`/booked/${booking.id}`);
  };

  return (
    <Screen
      needsNetwork
      footer={<Button label={`Proceed · ${inr(quote.total)}`} onPress={proceed} />}
    >
      <Hero art="temple" variant={pandit.heroVariant} shade back height={Size.heroDetail}>
        <AppText variant="displayHero" color={Colors.onImage} accessibilityRole="header">
          {pandit.name}
        </AppText>
        <AppText size={FontSize.lg} color={Colors.peach}>
          {pandit.city} · {pandit.years} years experience
        </AppText>
        <AppText size={FontSize.sm} color={Colors.okOnImage}>
          ✓ Verified provider · demo profile
        </AppText>
      </Hero>

      <View style={styles.pad}>
        <SectionLabel>ABOUT</SectionLabel>
        <AppText variant="lead">{pandit.about}</AppText>

        <View style={styles.verified}>
          <Pressable
            onPress={() => setShowChecks((open) => !open)}
            accessibilityRole="button"
            accessibilityState={{ expanded: showChecks }}
          >
            <AppText weight="bold" color={Colors.ok}>
              {showChecks ? '▾' : '▸'} What we verified
            </AppText>
          </Pressable>
          {showChecks
            ? VERIFICATION_STEPS.map((step) => (
                <AppText key={step} size={FontSize.sm} color={Colors.okInk} style={styles.check}>
                  • {step}
                </AppText>
              ))
            : null}
        </View>

        <SectionLabel>CHOOSE A RITUAL</SectionLabel>
        <View style={styles.wrap}>
          {pandit.rituals.map(([ritual, price], index) => (
            <Chip
              key={ritual}
              variant="peach"
              label={`${ritual} · ${inr(online ? onlinePrice(price) : price)}`}
              selected={ritualIndex === index}
              onPress={() => setRitualIndex(index)}
            />
          ))}
        </View>

        <SectionLabel>LANGUAGES</SectionLabel>
        <AppText variant="lead">{pandit.languages}</AppText>

        <SectionLabel>HOW</SectionLabel>
        <Segmented<ServiceMode>
          accessibilityLabel="How"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'home', label: 'At your home', disabled: !pandit.modes.includes('home') },
            { value: 'online', label: 'Online video', disabled: !pandit.modes.includes('online') },
          ]}
        />
        <SectionLabel>SELECT DATE</SectionLabel>
      </View>
      <DateChips
        value={dayIndex}
        onChange={(index) => {
          setDayIndex(index);
          setSlot('');
        }}
      />

      <View style={styles.pad}>
        <SectionLabel>SELECT TIME</SectionLabel>
        <TimeSlotGrid pandit={pandit} dayIndex={dayIndex} value={slot} onChange={setSlot} />
        {tried && !slot ? (
          <AppText size={FontSize.label} color={Colors.err} style={styles.hint}>
            Choose a time to continue.
          </AppText>
        ) : (
          <AppText variant="xs" muted style={styles.hint}>
            Struck-out times are booked. The slot is re-checked when you pay.
          </AppText>
        )}

        {!online ? (
          <>
            <SectionLabel>VENUE ADDRESS</SectionLabel>
            <TextField
              placeholder="Flat, building, area, city"
              value={address}
              onChangeText={setAddress}
              autoComplete="street-address"
              error={
                tried && addressMissing
                  ? 'Add the venue address so travel can be worked out.'
                  : undefined
              }
            />
          </>
        ) : null}

        <View style={styles.quote}>
          <SummaryList
            boxed
            rows={[
              [`${quote.ritual} · ${online ? 'online' : 'at home'}`, inr(quote.fee)],
              ['Travel (within 15 km)', online ? '—' : inr(quote.travel)],
              ['Platform fee', inr(quote.platform)],
            ]}
            total={['Total', inr(quote.total)]}
          >
            <AppText variant="xs" muted style={styles.hint}>
              The pandit receives 88% of the dakshina; DivyaPath keeps 12%. Free cancellation up to
              24 hours before.
            </AppText>
          </SummaryList>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  verified: {
    backgroundColor: Colors.okBg,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three + 2,
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.four,
  },
  check: {
    marginTop: Spacing.one,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + 2,
  },
  hint: {
    marginTop: Spacing.two,
  },
  quote: {
    marginTop: Spacing.six,
  },
});
