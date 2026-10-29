import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { CheckRow } from '@/components/ui/check-row';
import { FeatureRow } from '@/components/ui/feature-row';
import { Hero } from '@/components/ui/hero';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { ShareButton } from '@/components/ui/share-button';
import { TextLink } from '@/components/ui/text-link';
import { Timeline } from '@/components/ui/timeline';
import { getProduct } from '@/features/shop';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { useSettingsStore } from '@/store/settings-store';
import { toast } from '@/store/toast-store';
import {
  addDays,
  inr,
  longDate,
  parseIsoDate,
  relativeDays,
  shortDate,
  today,
} from '@/utils/format';

import { GENERIC_ITEMS, getFestival, getGuide, ORDER_BY_DAYS, PREPARATION } from '../data';
import { useFestivalStore } from '../store/festival-store';

type FestivalScreenProps = {
  id?: string;
};

export function FestivalScreen({ id }: FestivalScreenProps) {
  const festival = getFestival(id);
  const city = useSettingsStore((state) => state.city);
  const reminderOn = useFestivalStore((state) => !!state.reminders[festival.id]);
  const checks = useFestivalStore((state) => state.festivalChecks[festival.id]);
  const toggleReminder = useFestivalStore((state) => state.toggleReminder);
  const toggleItem = useFestivalStore((state) => state.toggleFestivalItem);

  const date = parseIsoDate(festival.date);
  const away = relativeDays(date);
  const guide = getGuide(festival.guide);
  const items = guide ? guide.items : GENERIC_ITEMS;
  const ready = items.filter((_, i) => checks?.[i]).length;
  const kit = getProduct(festival.kit);
  const now = today();

  return (
    <Screen>
      <Hero art={festival.art} variant={festival.artVariant} shade back height={Size.heroDetail}>
        <AppText variant="eyebrow" color={Colors.gold}>
          {longDate(date)}
          {away ? ` · ${away}` : ''}
        </AppText>
        <AppText variant="displayHero" color={Colors.onImage} accessibilityRole="header">
          {festival.name}
        </AppText>
        <AppText size={FontSize.lg} color={Colors.peach}>
          {festival.regional}
        </AppText>
      </Hero>

      <View style={styles.body}>
        <View style={styles.buttons}>
          <Button
            label={reminderOn ? '✓ Reminder on' : 'Remind me'}
            variant={reminderOn ? 'soft' : 'primary'}
            size="sm"
            flex
            onPress={() => toggleReminder(festival.id)}
          />
          <Button
            label="Add to calendar"
            variant="outline"
            size="sm"
            flex
            onPress={() => toast('Added to your calendar (demo)')}
          />
        </View>

        <SectionLabel>ABOUT</SectionLabel>
        <AppText variant="lead">{festival.about}</AppText>
        <View style={styles.muhurat}>
          <AppText weight="semibold" size={FontSize.label} color={Colors.peachInk}>
            Muhurat for {city}
          </AppText>
          <AppText weight="bold" size={FontSize.lg} color={Colors.peachInk}>
            [from a documented panchang source]
          </AppText>
        </View>

        <SectionLabel>PREPARATION</SectionLabel>
        <Timeline
          steps={PREPARATION.map(([daysBefore, task]) => {
            const due = addDays(-daysBefore, date);
            return {
              title: daysBefore ? `${daysBefore} days before` : 'On the day',
              detail: `${shortDate(due)} · ${task}`,
              state: due < now ? 'done' : 'todo',
            };
          })}
        />

        <SectionLabel
          right={
            <AppText variant="small" muted>
              {ready} of {items.length} ready
            </AppText>
          }
        >
          CHECKLIST
        </SectionLabel>
        {items.map(([item, qty], index) => (
          <CheckRow
            key={item}
            label={item}
            detail={qty}
            checked={!!checks?.[index]}
            onToggle={() => toggleItem(festival.id, index)}
          />
        ))}

        <SectionLabel>GET READY</SectionLabel>
        <FeatureRow
          art={kit.art}
          artVariant={kit.artVariant}
          title={kit.name}
          subtitle={`${inr(kit.price)} · order by ${shortDate(addDays(-ORDER_BY_DAYS, date))}`}
          onPress={() => router.push(`/product/${kit.id}`)}
        />
        {guide ? (
          <FeatureRow
            art={guide.art}
            artVariant={guide.artVariant}
            title={`Step by step: ${guide.name}`}
            subtitle={`${guide.steps.length} steps · ${guide.duration}`}
            onPress={() => router.push(`/guides/${guide.id}`)}
          />
        ) : null}
        <FeatureRow
          art="avatar"
          artInitials="Pt"
          title="Book a pandit"
          subtitle="Online or at home"
          onPress={() => goToTab('/book')}
        />
        <ShareButton
          text={`${festival.name} is on ${longDate(date)}. Preparation checklist on DivyaPath.`}
        />
        <View style={styles.footnote}>
          <AppText variant="xs" muted>
            Traditions differ; this is one common practice, not the only correct one.
          </AppText>
          <TextLink
            label="Suggest a correction"
            size={FontSize.xs}
            onPress={() => toast('Thanks. Our editors will review it.')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three - 2,
    marginTop: Spacing.four + 2,
  },
  muhurat: {
    backgroundColor: Colors.peach,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four + 2,
    marginTop: Spacing.four,
  },
  footnote: {
    marginTop: Spacing.three + 2,
  },
});
