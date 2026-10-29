import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoCard } from '@/components/ui/info-card';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { TextField } from '@/components/ui/text-field';
import { TextLink } from '@/components/ui/text-link';
import { Colors, Radius, Spacing } from '@/constants/theme';

import { useProfileStore } from '../store/profile-store';

const LABELS = ['Home', 'Parents', 'Office'];
const MIN_LINE = 8;

type Draft = { label: string; line: string; pin: string };
type Errors = { line?: string; pin?: string };

const EMPTY: Draft = { label: 'Home', line: '', pin: '' };

export function AddressesScreen() {
  const addresses = useProfileStore((state) => state.addresses);
  const addAddress = useProfileStore((state) => state.addAddress);
  const removeAddress = useProfileStore((state) => state.removeAddress);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const save = () => {
    const found: Errors = {};
    if (draft.line.trim().length < MIN_LINE) found.line = 'Enter the full address.';
    if (!/^\d{6}$/.test(draft.pin.trim())) found.pin = 'Enter a 6-digit pincode.';
    setErrors(found);
    if (Object.keys(found).length) return;
    addAddress({ label: draft.label, line: draft.line.trim(), pin: draft.pin.trim() });
    setDraft(EMPTY);
    setOpen(false);
  };

  return (
    <Screen>
      <ScreenHeader title="Saved addresses" />
      <View style={styles.body}>
        {addresses.length ? (
          addresses.map((address, index) => (
            <InfoCard key={`${address.label}-${index}`} style={styles.card}>
              <View style={styles.row}>
                <AppText weight="bold">{address.label}</AppText>
                <TextLink label="Remove" color={Colors.err} onPress={() => removeAddress(index)} />
              </View>
              <AppText variant="small" muted>
                {address.line} · {address.pin}
              </AppText>
            </InfoCard>
          ))
        ) : (
          <View style={styles.card}>
            <EmptyState message="No saved addresses." />
          </View>
        )}

        {open ? (
          <View style={styles.form}>
            <AppText weight="bold">New address</AppText>
            <View style={styles.chips}>
              {LABELS.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  selected={draft.label === label}
                  onPress={() => setDraft({ ...draft, label })}
                />
              ))}
            </View>
            <TextField
              placeholder="Flat, building, street, city"
              value={draft.line}
              onChangeText={(line) => setDraft({ ...draft, line })}
              error={errors.line}
              autoComplete="street-address"
            />
            <TextField
              placeholder="Pincode"
              value={draft.pin}
              onChangeText={(pin) => setDraft({ ...draft, pin })}
              error={errors.pin}
              keyboardType="number-pad"
              maxLength={6}
              autoComplete="postal-code"
            />
            <Button label="Save address" onPress={save} />
          </View>
        ) : (
          <Button
            label="Add an address"
            variant="outline"
            style={styles.add}
            onPress={() => {
              setErrors({});
              setOpen(true);
            }}
          />
        )}
        <AppText variant="xs" muted style={styles.note}>
          We use addresses only for deliveries and in-person bookings.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  card: {
    marginTop: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.four + 2,
    gap: Spacing.three + 2,
    marginTop: Spacing.six,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  add: {
    marginTop: Spacing.four,
  },
  note: {
    marginTop: Spacing.three,
  },
});
