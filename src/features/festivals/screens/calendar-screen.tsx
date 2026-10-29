import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { FeatureRow } from '@/components/ui/feature-row';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { WEEKDAYS } from '@/constants/strings';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { useSettingsStore } from '@/store/settings-store';
import { parseIsoDate, shortDate, today } from '@/utils/format';

import { CALENDAR_MONTHS, FESTIVALS, REGIONS } from '../data';
import { festivalsInMonth, initialMonthIndex, monthCells } from '../utils/calendar';

type RegionFilter = (typeof REGIONS)[number];

export function CalendarScreen() {
  const t = useT();
  const language = useSettingsStore((state) => state.language);
  const city = useSettingsStore((state) => state.city);
  const [monthIndex, setMonthIndex] = useState(() => initialMonthIndex(today()));
  const [region, setRegion] = useState<RegionFilter>('All');

  const month = CALENDAR_MONTHS[monthIndex];
  const monthName = month.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    month: 'long',
    year: 'numeric',
  });
  const festivals = festivalsInMonth(FESTIVALS, month, region);
  const byDay = new Map(festivals.map((f) => [parseIsoDate(f.date).getDate(), f]));
  const now = today();
  const isToday = (day: number) =>
    new Date(month.getFullYear(), month.getMonth(), day).getTime() === now.getTime();

  return (
    <Screen>
      <ScreenHeader title={t('calT')} />
      <View style={styles.pad}>
        <AppText variant="small" muted style={styles.subtitle}>
          Dates for {city}, IST · demo data
        </AppText>
      </View>
      <View style={styles.chips}>
        <HScroll accessibilityLabel="Region">
          {REGIONS.map((r) => (
            <Chip
              key={r}
              label={r === 'All' ? 'All India' : r}
              selected={region === r}
              onPress={() => setRegion(r)}
            />
          ))}
        </HScroll>
      </View>

      <View style={styles.pad}>
        <View style={styles.calendar}>
          <View style={styles.calendarHead}>
            <IconButton
              size="sm"
              accessibilityLabel="Previous month"
              disabled={monthIndex === 0}
              onPress={() => setMonthIndex((i) => Math.max(0, i - 1))}
            >
              <Icon name="chevronLeft" size={22} color={Colors.ink} />
            </IconButton>
            <AppText weight="bold" size={FontSize.xl}>
              {monthName}
            </AppText>
            <IconButton
              size="sm"
              accessibilityLabel="Next month"
              disabled={monthIndex === CALENDAR_MONTHS.length - 1}
              onPress={() => setMonthIndex((i) => Math.min(CALENDAR_MONTHS.length - 1, i + 1))}
            >
              <Icon name="chevronRight" size={22} color={Colors.ink} />
            </IconButton>
          </View>

          <View style={styles.grid}>
            {WEEKDAYS[language].map((day) => (
              <View key={day} style={styles.cell}>
                <AppText size={12} muted>
                  {day}
                </AppText>
              </View>
            ))}
            {monthCells(month).map((day, index) => {
              if (day === null) return <View key={`blank-${index}`} style={styles.cell} />;
              const festival = byDay.get(day);
              const todayStyle = isToday(day) && styles.today;
              if (!festival) {
                return (
                  <View key={day} style={[styles.cell, styles.day, todayStyle]}>
                    <AppText size={FontSize.sm}>{day}</AppText>
                  </View>
                );
              }
              return (
                <Pressable
                  key={day}
                  onPress={() => router.push(`/festival/${festival.id}`)}
                  accessibilityRole="button"
                  accessibilityLabel={`${day}: ${festival.name}`}
                  style={[styles.cell, styles.day, styles.hasFestival, todayStyle]}
                >
                  <AppText weight="bold" size={FontSize.sm} color={Colors.white}>
                    {day}
                  </AppText>
                  <View style={styles.dot} />
                </Pressable>
              );
            })}
          </View>
        </View>

        {festivals.length ? (
          festivals.map((festival) => (
            <FeatureRow
              key={festival.id}
              art={festival.art}
              artVariant={festival.artVariant}
              title={festival.name}
              subtitle={`${shortDate(parseIsoDate(festival.date))} · ${festival.category}`}
              note={festival.regional}
              onPress={() => router.push(`/festival/${festival.id}`)}
            />
          ))
        ) : (
          <View style={styles.empty}>
            <EmptyState message={`No festivals for this region in ${monthName}.`} />
          </View>
        )}
        <AppText variant="xs" muted style={styles.note}>
          Dates and names vary by region and tradition. Our editors review corrections.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  subtitle: {
    marginTop: Spacing.one + 2,
  },
  chips: {
    marginTop: Spacing.three + 2,
  },
  calendar: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl + 2,
    padding: Spacing.three + 2,
    marginTop: Spacing.three + 2,
  },
  calendarHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.one,
  },
  day: {
    height: 44,
    borderRadius: Radius.sm,
  },
  hasFestival: {
    backgroundColor: Colors.accent,
  },
  today: {
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.white,
    marginTop: Spacing.half,
  },
  empty: {
    marginTop: Spacing.three + 2,
  },
  note: {
    marginTop: Spacing.three + 2,
  },
});
