import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { type ArtKind } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { PictureCard } from '@/components/ui/picture-card';
import { Screen } from '@/components/ui/screen';
import { TextLink } from '@/components/ui/text-link';
import { useSessionStore } from '@/features/auth';
import { FESTIVALS } from '@/features/festivals';
import { selectUnreadCount, useNotificationStore } from '@/features/notifications';
import { PracticeTracker, StreakCard } from '@/features/practice';
import { type StringKey } from '@/constants/strings';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { goToTab } from '@/services/navigation';
import { longDate, parseIsoDate, relativeDays, today } from '@/utils/format';

import { AskButton } from '../components/ask-button';
import { PanchangCard } from '../components/panchang-card';

const UPCOMING_COUNT = 4;

type ExploreCard = {
  title: StringKey;
  subtitle: StringKey;
  art: ArtKind;
  variant?: number;
  open: () => void;
};

const EXPLORE: ExploreCard[] = [
  { title: 'calT', subtitle: 'calS', art: 'lotus', open: () => router.push('/calendar') },
  { title: 'guidesT', subtitle: 'guidesS', art: 'diyas', open: () => router.push('/guides') },
  {
    title: 'templesT',
    subtitle: 'templesS',
    art: 'temple',
    variant: 1,
    open: () => router.push('/temples'),
  },
  { title: 'liveT', subtitle: 'liveS', art: 'aarti', open: () => router.push('/live') },
  { title: 'kitsT', subtitle: 'kitsS', art: 'thali', open: () => goToTab('/store') },
];

export function HomeScreen() {
  const t = useT();
  const user = useSessionStore((state) => state.user);
  const unread = useNotificationStore(selectUnreadCount);
  const name = user?.name ?? t('devotee');
  const now = today();
  const upcoming = FESTIVALS.filter((f) => parseIsoDate(f.date) >= now).slice(0, UPCOMING_COUNT);

  return (
    <Screen inTabs overlay={<AskButton />}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <AppText muted>{t('namaste')}</AppText>
          <AppText variant="displayLg" numberOfLines={1} accessibilityRole="header">
            {name}
          </AppText>
        </View>
        <View style={styles.actions}>
          <IconButton
            onPress={() => router.push('/notifications')}
            accessibilityLabel={`${t('notifT')}, ${unread} unread`}
            badge={unread}
          >
            <Icon name="bell" size={24} color={Colors.ink} />
          </IconButton>
          <IconButton
            onPress={() => goToTab('/profile')}
            accessibilityLabel={t('profile')}
            background={Colors.maroon}
          >
            <AppText variant="title" size={22} color={Colors.white}>
              {name.charAt(0).toUpperCase()}
            </AppText>
          </IconButton>
        </View>
      </View>

      <View style={styles.section}>
        <PanchangCard />
        <StreakCard />
      </View>

      <View style={styles.section}>
        <AppText variant="heading" style={styles.heading}>
          {t('track')}
        </AppText>
        <PracticeTracker />
      </View>

      <View style={styles.sectionFull}>
        <AppText variant="heading" style={[styles.heading, styles.pad]}>
          {t('explore')}
        </AppText>
        <HScroll gap={Spacing.three - 2}>
          {EXPLORE.map((card) => (
            <PictureCard
              key={card.title}
              art={card.art}
              variant={card.variant}
              width={172}
              height={204}
              title={t(card.title)}
              subtitle={t(card.subtitle)}
              onPress={card.open}
            />
          ))}
        </HScroll>
      </View>

      <View style={styles.sectionFull}>
        <View style={[styles.rowBetween, styles.pad]}>
          <AppText variant="heading" style={styles.heading}>
            {t('upcoming')}
          </AppText>
          <TextLink label={t('seeAll')} onPress={() => router.push('/calendar')} />
        </View>
        <HScroll gap={Spacing.three - 2}>
          {upcoming.map((festival) => {
            const date = parseIsoDate(festival.date);
            const away = relativeDays(date);
            return (
              <PictureCard
                key={festival.id}
                art={festival.art}
                variant={festival.artVariant}
                width={290}
                height={230}
                eyebrow={`${longDate(date)}${away ? ` · ${away}` : ''}`}
                title={festival.name}
                titleSize={FontSize.displayCard}
                onPress={() => router.push(`/festival/${festival.id}`)}
              />
            );
          })}
        </HScroll>
        <AppText variant="xs" muted style={[styles.pad, styles.note]}>
          Demo dates. Observances and timings vary by region.
        </AppText>
      </View>
      <View style={styles.fabSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.gutter,
  },
  greeting: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three - 2,
  },
  section: {
    paddingHorizontal: Spacing.gutter,
    marginTop: Spacing.section,
  },
  sectionFull: {
    marginTop: Spacing.section,
  },
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  heading: {
    marginBottom: Spacing.three + 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  note: {
    marginTop: Spacing.two,
  },
  fabSpace: {
    height: 72,
  },
});
