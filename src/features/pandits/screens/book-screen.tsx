import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { CountBadge } from '@/components/ui/count-badge';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { useOrderStore } from '@/features/shop';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';

import { PanditCard } from '../components/pandit-card';
import { PANDITS } from '../data';
import { useBookingStore } from '../store/booking-store';

type ModeFilter = 'All' | 'Online' | 'In person';
const MODE_FILTERS: ModeFilter[] = ['All', 'Online', 'In person'];

export function BookScreen() {
  const t = useT();
  const [mode, setMode] = useState<ModeFilter>('All');
  const bookingCount = useBookingStore((state) => state.bookings.length);
  const orderCount = useOrderStore((state) => state.orders.length);
  const pandits = PANDITS.filter((pandit) =>
    mode === 'All' ? true : pandit.modes.includes(mode === 'Online' ? 'online' : 'home'),
  );

  return (
    <Screen inTabs needsNetwork>
      <View style={styles.pad}>
        <AppText variant="displayLg" accessibilityRole="header" style={styles.title}>
          {t('bookT')}
        </AppText>
        <AppText muted>{t('bookS')}</AppText>
        <Pressable
          onPress={() => router.push('/bookings')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.rowCard, pressed && styles.pressed]}
        >
          <AppText weight="semibold" size={FontSize.xl}>
            {t('myb')}
          </AppText>
          <View style={styles.rowRight}>
            <CountBadge count={bookingCount + orderCount} floating={false} />
            <Icon name="chevronRight" size={22} color={Colors.accent} />
          </View>
        </Pressable>
      </View>

      <View style={styles.chips}>
        <HScroll accessibilityLabel="Mode">
          {MODE_FILTERS.map((m) => (
            <Chip key={m} label={m} selected={mode === m} onPress={() => setMode(m)} />
          ))}
        </HScroll>
      </View>

      <View style={styles.pad}>
        {pandits.map((pandit) => (
          <PanditCard key={pandit.id} pandit={pandit} />
        ))}
        <AppText variant="xs" muted style={styles.note}>
          Demo profiles. Reviews appear only from completed bookings.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  title: {
    marginTop: Spacing.gutter,
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.gutter,
    paddingHorizontal: Spacing.six,
    marginTop: Spacing.gutter,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - 2,
  },
  pressed: {
    opacity: 0.85,
  },
  chips: {
    marginTop: Spacing.four + 2,
  },
  note: {
    marginTop: Spacing.three + 2,
  },
});
