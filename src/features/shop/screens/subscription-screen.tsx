import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { CheckRow } from '@/components/ui/check-row';
import { Chip } from '@/components/ui/chip';
import { InfoCard } from '@/components/ui/info-card';
import { Menu, MenuRow } from '@/components/ui/menu';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusPill } from '@/components/ui/status-pill';
import { SummaryList } from '@/components/ui/summary-list';
import { TextLink } from '@/components/ui/text-link';
import { Toggle } from '@/components/ui/toggle';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { addDays, inr, shortDate } from '@/utils/format';

import { SUBSCRIBER_SAVING, SUBSCRIPTION_ITEMS } from '../data';
import { type Frequency, useSubscriptionStore } from '../store/subscription-store';

const FREQUENCIES: Frequency[] = ['Monthly', 'Every 2 months'];
const NEXT_BOX_DAYS = 8;
const SKIPPED_BOX_DAYS = 38;

export function SubscriptionScreen() {
  const sub = useSubscriptionStore();
  const selected = SUBSCRIPTION_ITEMS.filter((item) => sub.items[item.id]);
  const itemsTotal = selected.reduce((sum, item) => sum + item.price, 0);
  const saving = Math.round(itemsTotal * SUBSCRIBER_SAVING);
  const perBox = itemsTotal - saving;
  const period = sub.frequency === 'Monthly' ? 'month' : '2 months';

  if (sub.active) {
    return (
      <Screen>
        <ScreenHeader title="Kit subscription" />
        <View style={styles.body}>
          <InfoCard style={styles.top}>
            <View style={styles.row}>
              <AppText weight="bold" size={FontSize.xl}>
                Daily puja refills
              </AppText>
              <StatusPill label={sub.paused ? 'Paused' : 'Active'} />
            </View>
            <AppText variant="small" muted>
              {selected.map((item) => item.name).join(' · ')}
            </AppText>
            <AppText weight="bold" size={FontSize.price} color={Colors.maroon}>
              {inr(perBox)} / {period}
            </AppText>
          </InfoCard>

          <SectionLabel>NEXT DELIVERY</SectionLabel>
          <AppText variant="lead">
            {sub.paused
              ? 'Paused. Resume any time.'
              : `${shortDate(addDays(sub.skipNext ? SKIPPED_BOX_DAYS : NEXT_BOX_DAYS))}${sub.skipNext ? ' (one delivery skipped)' : ''}`}
          </AppText>

          <View style={styles.top}>
            <Menu>
              <MenuRow
                label="Skip the next delivery"
                right={
                  <Toggle
                    value={sub.skipNext}
                    onChange={sub.toggleSkip}
                    accessibilityLabel="Skip the next delivery"
                  />
                }
              />
              <MenuRow
                label="Pause subscription"
                right={
                  <Toggle
                    value={sub.paused}
                    onChange={sub.togglePause}
                    accessibilityLabel="Pause subscription"
                  />
                }
              />
            </Menu>
          </View>
          <TextLink
            label="Cancel subscription"
            color={Colors.err}
            onPress={sub.cancel}
            style={styles.top}
          />
          <AppText variant="xs" muted>
            No cancellation fee. You’re charged only when a box ships (sandbox).
          </AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        <Button
          label={`Start · ${inr(perBox)} / ${period}`}
          disabled={!selected.length}
          onPress={sub.start}
        />
      }
    >
      <ScreenHeader title="Kit subscription" />
      <View style={styles.body}>
        <AppText variant="lead" style={styles.intro}>
          Never run out of daily puja items. Pick what you use and we deliver on a schedule. Skip or
          cancel any time.
        </AppText>

        <SectionLabel>WHAT TO INCLUDE</SectionLabel>
        {SUBSCRIPTION_ITEMS.map((item, index) => (
          <CheckRow
            key={item.id}
            label={item.name}
            detail={inr(item.price)}
            checked={!!sub.items[item.id]}
            onToggle={() => sub.toggleItem(item.id)}
            strike={false}
            last={index === SUBSCRIPTION_ITEMS.length - 1}
          />
        ))}

        <SectionLabel>HOW OFTEN</SectionLabel>
        <View style={styles.chips}>
          {FREQUENCIES.map((frequency) => (
            <Chip
              key={frequency}
              label={frequency}
              selected={sub.frequency === frequency}
              onPress={() => sub.setFrequency(frequency)}
            />
          ))}
        </View>

        <View style={styles.quote}>
          <SummaryList
            boxed
            rows={[
              ['Items', inr(itemsTotal)],
              ['Subscriber saving (10%)', `−${inr(saving)}`],
              ['Delivery', 'Free'],
            ]}
            total={['Each box', inr(perBox)]}
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
  intro: {
    marginTop: Spacing.two,
  },
  top: {
    marginTop: Spacing.three + 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  quote: {
    marginTop: Spacing.six,
  },
});
