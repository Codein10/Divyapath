import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { CheckRow } from '@/components/ui/check-row';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { SummaryList } from '@/components/ui/summary-list';
import { TextField } from '@/components/ui/text-field';
import { Timeline } from '@/components/ui/timeline';
import { pushNotification } from '@/features/notifications';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { inr } from '@/utils/format';

import { useProfileStore } from '../store/profile-store';
import { type Application, selectedList, stepError } from '../utils/validate-application';

const STEPS = ['Your details', 'Rituals and pricing', 'Documents', 'Review'];
const LANGUAGES = ['Hindi', 'Sanskrit', 'Marathi', 'English', 'Gujarati', 'Tamil', 'Bengali'];
const RITUALS = [
  'Griha Pravesh',
  'Satyanarayan Katha',
  'Lakshmi Puja',
  'Rudrabhishek',
  'Vivah Sanskar',
  'Namkaran',
];
const MODES = ['In person', 'Online'];
const DOCUMENTS: [key: string, label: string][] = [
  ['id', 'Government ID'],
  ['cert', 'Training certificate'],
];
const REVIEW_STEPS = [
  'Application received',
  'ID and certificate check',
  'Reference calls',
  'Profile goes live',
];

const EMPTY: Application = {
  name: '',
  city: '',
  years: '',
  languages: {},
  rituals: {},
  modes: { 'In person': true },
  price: '',
  documents: {},
  agreed: false,
};

type ChipGroupProps = {
  options: string[];
  values: Record<string, boolean>;
  onToggle: (option: string) => void;
};

function ChipGroup({ options, values, onToggle }: ChipGroupProps) {
  return (
    <View style={styles.chips}>
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          selected={!!values[option]}
          onPress={() => onToggle(option)}
        />
      ))}
    </View>
  );
}

export function JoinPanditScreen() {
  const status = useProfileStore((state) => state.applicationStatus);
  const submit = useProfileStore((state) => state.submitApplication);
  const [step, setStep] = useState(0);
  const [app, setApp] = useState<Application>(EMPTY);
  const [error, setError] = useState('');

  const set = (patch: Partial<Application>) => setApp((current) => ({ ...current, ...patch }));
  const toggle = (field: 'languages' | 'rituals' | 'modes', option: string) =>
    set({ [field]: { ...app[field], [option]: !app[field][option] } });

  if (status === 'review') {
    return (
      <Screen footer={<Button label="Back to profile" onPress={() => goToTab('/profile')} />}>
        <ScreenHeader title="Application sent" />
        <View style={styles.success}>
          <View style={styles.okCircle}>
            <Icon name="check" size={46} color={Colors.ok} />
          </View>
          <AppText variant="displayMd">Under review</AppText>
          <AppText muted align="center" style={styles.narrow}>
            Verification usually takes 3–5 working days. You’ll be notified at each step.
          </AppText>
        </View>
        <View style={styles.body}>
          <View style={styles.timeline}>
            <Timeline
              steps={REVIEW_STEPS.map((title, index) => ({
                title,
                state: index === 0 ? 'done' : index === 1 ? 'now' : 'todo',
              }))}
            />
          </View>
        </View>
      </Screen>
    );
  }

  const next = () => {
    const found = stepError(step, app);
    setError(found);
    if (found) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    submit();
    pushNotification(
      'user',
      'Application received',
      'Verification usually takes 3–5 working days.',
      '/join-pandit',
    );
  };

  return (
    <Screen
      footer={
        <>
          {step > 0 ? (
            <Button
              label="Back"
              variant="soft"
              flex
              onPress={() => {
                setStep(step - 1);
                setError('');
              }}
            />
          ) : null}
          <Button
            label={step === STEPS.length - 1 ? 'Submit for review' : 'Continue'}
            flex
            onPress={next}
          />
        </>
      }
    >
      <ScreenHeader title="Join as a pandit" />
      <View style={styles.body}>
        <View style={styles.stepper} accessibilityElementsHidden>
          {STEPS.map((label, index) => (
            <View key={label} style={[styles.bar, index <= step && styles.barOn]} />
          ))}
        </View>
        <AppText variant="eyebrow" style={styles.stepLabel}>
          STEP {step + 1} OF {STEPS.length} · {STEPS[step].toUpperCase()}
        </AppText>

        <View style={styles.fields}>
          {step === 0 ? (
            <>
              <TextField
                label="Full name"
                placeholder="Full name"
                value={app.name}
                onChangeText={(name) => set({ name })}
              />
              <TextField
                label="City"
                placeholder="City"
                value={app.city}
                onChangeText={(city) => set({ city })}
              />
              <TextField
                label="Years of experience"
                placeholder="Years of experience"
                value={app.years}
                onChangeText={(years) => set({ years: years.replace(/\D/g, '') })}
                keyboardType="number-pad"
              />
              <SectionLabel first>LANGUAGES</SectionLabel>
              <ChipGroup
                options={LANGUAGES}
                values={app.languages}
                onToggle={(o) => toggle('languages', o)}
              />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <SectionLabel first>RITUALS YOU PERFORM</SectionLabel>
              <ChipGroup
                options={RITUALS}
                values={app.rituals}
                onToggle={(o) => toggle('rituals', o)}
              />
              <SectionLabel first>HOW YOU SERVE</SectionLabel>
              <ChipGroup options={MODES} values={app.modes} onToggle={(o) => toggle('modes', o)} />
              <TextField
                label="Starting dakshina (₹)"
                placeholder="Starting dakshina (₹)"
                value={app.price}
                onChangeText={(price) => set({ price: price.replace(/\D/g, '') })}
                keyboardType="number-pad"
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <AppText variant="lead">
                Documents are encrypted, seen only by the verification team, and deleted 30 days
                after review.
              </AppText>
              {DOCUMENTS.map(([key, label]) => {
                const file = app.documents[key];
                return (
                  <Pressable
                    key={key}
                    onPress={() =>
                      set({ documents: { ...app.documents, [key]: `${key}-document.pdf` } })
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Upload ${label}`}
                    style={styles.upload}
                  >
                    <AppText weight="bold">{label}</AppText>
                    <AppText variant="small" muted align="center">
                      {file ? `✓ ${file}` : 'Tap to upload a PDF or photo, up to 5 MB (demo)'}
                    </AppText>
                  </Pressable>
                );
              })}
            </>
          ) : null}

          {step === 3 ? (
            <>
              <SummaryList
                boxed
                rows={[
                  ['Name', app.name],
                  ['City', app.city],
                  ['Experience', `${app.years} years`],
                  ['Languages', selectedList(app.languages)],
                  ['Rituals', selectedList(app.rituals)],
                  ['Serves', selectedList(app.modes)],
                  ['From', inr(Number(app.price) || 0)],
                  ['Documents', '2 uploaded'],
                ]}
              />
              <CheckRow
                label="I agree to ID and reference checks, and to DivyaPath’s 12% commission on bookings."
                checked={app.agreed}
                onToggle={() => set({ agreed: !app.agreed })}
                strike={false}
                last
              />
            </>
          ) : null}
        </View>
        {error ? (
          <AppText
            size={FontSize.label}
            color={Colors.err}
            accessibilityRole="alert"
            style={styles.error}
          >
            {error}
          </AppText>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  stepper: {
    flexDirection: 'row',
    gap: Spacing.one + 2,
    marginTop: Spacing.three,
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.card2,
  },
  barOn: {
    backgroundColor: Colors.accent,
  },
  stepLabel: {
    marginTop: Spacing.three,
  },
  fields: {
    gap: Spacing.three + 2,
    marginTop: Spacing.three + 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  upload: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.card2,
    borderRadius: Radius.md + 2,
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.one,
  },
  error: {
    marginTop: Spacing.three - 2,
  },
  success: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.eight + 4,
    paddingHorizontal: Spacing.gutter,
  },
  okCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.okBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  narrow: {
    maxWidth: 310,
  },
  timeline: {
    marginTop: Spacing.five,
  },
});
