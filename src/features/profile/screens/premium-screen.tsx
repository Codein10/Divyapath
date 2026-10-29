import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/hero';
import { Icon } from '@/components/ui/icon';
import { InfoCard } from '@/components/ui/info-card';
import { InfoRow } from '@/components/ui/info-row';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusPill } from '@/components/ui/status-pill';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { useSettingsStore } from '@/store/settings-store';
import { toast } from '@/store/toast-store';

const BENEFITS = [
  'Ad-free audio and live darshan',
  'Unlimited downloads for offline listening',
  'Early access to festival kits',
  'Free delivery on every kit order',
  'Family group for up to 8 members',
];

type Plan = 'monthly' | 'yearly';

const PLANS: { id: Plan; name: string; price: string; badge?: string }[] = [
  { id: 'monthly', name: 'Monthly', price: '₹99 / month' },
  { id: 'yearly', name: 'Yearly', price: '₹799 / year', badge: 'Save 33%' },
];

export function PremiumScreen() {
  const premium = useSettingsStore((state) => state.premium);
  const startPremium = useSettingsStore((state) => state.startPremium);
  const [plan, setPlan] = useState<Plan>('yearly');

  return (
    <Screen
      footer={
        premium ? (
          <Button label="You’re a Plus member" variant="soft" onPress={() => goToTab('/profile')} />
        ) : (
          <Button
            label="Start 7-day free trial"
            onPress={() => {
              startPremium();
              toast('Plus trial started (sandbox)');
            }}
          />
        )
      }
    >
      <Hero art="diyas" shade back height={Size.heroDetail}>
        <AppText variant="eyebrow" color={Colors.gold}>
          DIVYAPATH PLUS
        </AppText>
        <AppText variant="displayHero" color={Colors.onImage} accessibilityRole="header">
          A calmer, ad-free practice
        </AppText>
      </Hero>
      <View style={styles.body}>
        <SectionLabel>WHAT YOU GET</SectionLabel>
        {BENEFITS.map((benefit) => (
          <InfoRow key={benefit} leading={<Icon name="check" size={20} color={Colors.ok} />}>
            {benefit}
          </InfoRow>
        ))}

        <SectionLabel>CHOOSE A PLAN</SectionLabel>
        <View style={styles.plans}>
          {PLANS.map((option) => {
            const selected = plan === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setPlan(option.id)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={[styles.plan, selected && styles.planOn]}
              >
                <View style={styles.planHead}>
                  <AppText weight="bold" size={FontSize.xl}>
                    {option.name}
                  </AppText>
                  {option.badge ? <StatusPill label={option.badge} tone="ok" /> : null}
                </View>
                <AppText weight="bold" size={FontSize.price} color={Colors.maroon}>
                  {option.price}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <InfoCard style={styles.free}>
          <AppText weight="bold">Always free</AppText>
          <AppText variant="small" muted>
            Daily tracker, festival calendar, puja guides, basic audio and live darshan stay free
            for everyone.
          </AppText>
        </InfoCard>
        <AppText variant="xs" muted style={styles.note}>
          Cancel any time. Paid plans never promise blessings or spiritual outcomes. Sandbox
          billing.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  plans: {
    gap: Spacing.three + 2,
  },
  plan: {
    borderWidth: 2,
    borderColor: Colors.line,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four + 2,
    gap: Spacing.one,
  },
  planOn: {
    borderColor: Colors.accent,
    backgroundColor: Colors.planSelected,
  },
  planHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  free: {
    marginTop: Spacing.four + 2,
  },
  note: {
    marginTop: Spacing.three,
  },
});
