import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { TextField } from '@/components/ui/text-field';
import { Toggle } from '@/components/ui/toggle';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { addDays, shortDate } from '@/utils/format';

export const GIFT_DAY_OPTIONS = [4, 5, 6, 7];
export const GIFT_MESSAGE_MAX = 150;

export type GiftDraft = {
  enabled: boolean;
  name: string;
  pin: string;
  dayOffset: number;
  message: string;
};

export type GiftErrors = { name?: string; pin?: string };

export const EMPTY_GIFT: GiftDraft = {
  enabled: false,
  name: '',
  pin: '',
  dayOffset: 4,
  message: '',
};

export function validateGift(draft: GiftDraft): GiftErrors {
  const errors: GiftErrors = {};
  if (draft.name.trim().length < 2) errors.name = 'Enter the recipient’s name.';
  if (!/^\d{6}$/.test(draft.pin.trim())) errors.pin = 'Enter a 6-digit pincode.';
  return errors;
}

type GiftFormProps = {
  draft: GiftDraft;
  errors: GiftErrors;
  onChange: (draft: GiftDraft) => void;
};

/** "Send as a gift" box on the product screen. */
export function GiftForm({ draft, errors, onChange }: GiftFormProps) {
  const set = (patch: Partial<GiftDraft>) => onChange({ ...draft, ...patch });

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Icon name="gift" size={22} color={Colors.maroon} />
        <View style={styles.headerText}>
          <AppText weight="bold">Send as a gift</AppText>
          <AppText variant="xs" muted>
            Gift wrap and message card, no prices inside · +₹49
          </AppText>
        </View>
        <Toggle
          value={draft.enabled}
          onChange={() => set({ enabled: !draft.enabled })}
          accessibilityLabel="Send as a gift"
        />
      </View>

      {draft.enabled ? (
        <View style={styles.fields}>
          <TextField
            placeholder="Recipient’s name"
            value={draft.name}
            onChangeText={(name) => set({ name })}
            error={errors.name}
            autoComplete="off"
          />
          <TextField
            placeholder="Delivery pincode"
            value={draft.pin}
            onChangeText={(pin) => set({ pin })}
            error={errors.pin}
            keyboardType="number-pad"
            maxLength={6}
          />
          <AppText variant="small" weight="semibold">
            Deliver on
          </AppText>
          <HScroll flush accessibilityLabel="Delivery date">
            {GIFT_DAY_OPTIONS.map((offset) => (
              <Chip
                key={offset}
                variant="dateLight"
                label={shortDate(addDays(offset))}
                selected={draft.dayOffset === offset}
                onPress={() => set({ dayOffset: offset })}
              />
            ))}
          </HScroll>
          <TextField
            placeholder="Message for the card (optional)"
            value={draft.message}
            onChangeText={(message) => set({ message })}
            multiline
            maxLength={GIFT_MESSAGE_MAX}
            hint={`Up to ${GIFT_MESSAGE_MAX} characters`}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four + 2,
    marginTop: Spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  fields: {
    gap: Spacing.three - 2,
    marginTop: Spacing.three + 2,
  },
});
