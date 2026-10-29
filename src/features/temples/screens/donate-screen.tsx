import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { FeatureRow } from '@/components/ui/feature-row';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { StatusPill } from '@/components/ui/status-pill';
import { TextField } from '@/components/ui/text-field';
import { Toggle } from '@/components/ui/toggle';
import { pushNotification } from '@/features/notifications';
import { useReceiptStore } from '@/features/receipts';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';
import { inr, shortDate, today } from '@/utils/format';

import { DONATION_AMOUNTS, DONATION_PURPOSES } from '../data';
import {
  donationAmount,
  type DonationDraft,
  type DonationErrors,
  maskPan,
  validateDonation,
} from '../utils/validate-donation';

const RECEIPT_BASE = 3052;

/** A demo receipt number; the real one comes from the payment server. */
function newReceiptId() {
  return `DP-DN-${RECEIPT_BASE + Math.floor(Math.random() * 900)}`;
}

export function DonateScreen() {
  const showReceipt = useReceiptStore((state) => state.show);
  const [draft, setDraft] = useState<DonationDraft>({
    amount: 501,
    customAmount: '',
    purpose: 'Annadan',
    name: '',
    wants80G: false,
    pan: '',
  });
  const [errors, setErrors] = useState<DonationErrors>({});
  const set = (patch: Partial<DonationDraft>) => setDraft((current) => ({ ...current, ...patch }));
  const amount = donationAmount(draft);

  const donate = () => {
    const found = validateDonation(draft);
    setErrors(found);
    if (Object.keys(found).length) {
      toast('Check the highlighted fields');
      return;
    }
    const id = newReceiptId();
    const taxNote = draft.wants80G
      ? `80G receipt for ${draft.name.trim()}, PAN ${maskPan(draft.pan)}. `
      : '';
    showReceipt({
      kind: 'Donation receipt',
      id,
      date: shortDate(today()),
      to: '[Partner temple] Trust',
      lines: [[draft.purpose, amount]],
      total: amount,
      note: `${taxNote}Trust registration [number]. Sandbox payment.`,
    });
    pushNotification('gift', 'Donation received', `Receipt ${id}`, '/receipt');
    router.push('/receipt');
  };

  return (
    <Screen
      needsNetwork
      footer={
        <Button label={`Donate ${amount > 0 ? inr(amount) : ''} · sandbox`} onPress={donate} />
      }
    >
      <ScreenHeader title="Donate" />
      <View style={styles.body}>
        <FeatureRow art="temple" artVariant={2} title="[Partner temple] Trust">
          <View style={styles.pill}>
            <StatusPill label="Verified trust" tone="ok" />
          </View>
          <AppText variant="xs" muted style={styles.gapSmall}>
            Reg. no. [number] · 80G approval [number]
          </AppText>
        </FeatureRow>

        <SectionLabel>AMOUNT</SectionLabel>
        <View style={styles.amounts}>
          {DONATION_AMOUNTS.map((value) => {
            const selected = !draft.customAmount && draft.amount === value;
            return (
              <Pressable
                key={value}
                onPress={() => set({ amount: value, customAmount: '' })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.amount, selected && styles.amountOn]}
              >
                <AppText
                  weight="bold"
                  size={FontSize.lg}
                  color={selected ? Colors.white : Colors.ink}
                >
                  {inr(value)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.gap}>
          <TextField
            placeholder="Other amount (₹)"
            value={draft.customAmount}
            onChangeText={(customAmount) => set({ customAmount: customAmount.replace(/\D/g, '') })}
            keyboardType="number-pad"
            error={errors.amount}
          />
        </View>

        <SectionLabel>PURPOSE</SectionLabel>
        <View style={styles.wrap}>
          {DONATION_PURPOSES.map((purpose) => (
            <Chip
              key={purpose}
              label={purpose}
              selected={draft.purpose === purpose}
              onPress={() => set({ purpose })}
            />
          ))}
        </View>

        <SectionLabel>YOUR DETAILS</SectionLabel>
        <TextField
          placeholder="Name on receipt"
          value={draft.name}
          onChangeText={(name) => set({ name })}
          error={errors.name}
          autoComplete="name"
        />
        <View style={styles.toggleRow}>
          <View style={styles.flex}>
            <AppText weight="bold">80G tax receipt</AppText>
            <AppText variant="xs" muted>
              Needs your PAN
            </AppText>
          </View>
          <Toggle
            value={draft.wants80G}
            onChange={() => set({ wants80G: !draft.wants80G })}
            accessibilityLabel="80G tax receipt"
          />
        </View>
        {draft.wants80G ? (
          <View style={styles.gapSmall}>
            <TextField
              placeholder="PAN, e.g. ABCDE1234F"
              value={draft.pan}
              onChangeText={(pan) => set({ pan: pan.toUpperCase() })}
              autoCapitalize="characters"
              maxLength={10}
              autoComplete="off"
              error={errors.pan}
            />
          </View>
        ) : null}
        <AppText variant="xs" muted style={styles.gap}>
          The full amount goes to the trust’s registered account. DivyaPath charges no fee on
          donations and makes no promise of spiritual benefit.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  pill: {
    marginTop: Spacing.one,
  },
  gapSmall: {
    marginTop: Spacing.two,
  },
  gap: {
    marginTop: Spacing.three,
  },
  amounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three - 2,
  },
  amount: {
    width: '30%',
    flexGrow: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountOn: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  flex: {
    flex: 1,
  },
});
