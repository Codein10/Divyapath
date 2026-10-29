import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { TextField } from '@/components/ui/text-field';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';

import { PinPad } from '../components/pin-pad';
import { type EntryType, useJournalStore } from '../store/journal-store';

const TYPES: EntryType[] = ['Gratitude', 'Sankalp', 'Reflection'];

const PROMPTS: Record<EntryType, string> = {
  Gratitude: 'One thing you are grateful for today…',
  Sankalp: 'An intention for the coming days…',
  Reflection: 'What stayed with you today…',
};

export function JournalScreen() {
  const entries = useJournalStore((state) => state.entries);
  const addEntry = useJournalStore((state) => state.add);
  // Unlocking lasts only while this screen is open.
  const [unlocked, setUnlocked] = useState(false);
  const [type, setType] = useState<EntryType>('Gratitude');
  const [text, setText] = useState('');

  if (!unlocked) {
    return (
      <Screen>
        <ScreenHeader title="Private journal" />
        <PinPad onUnlock={() => setUnlocked(true)} />
      </Screen>
    );
  }

  const save = () => {
    const value = text.trim();
    if (!value) {
      toast('Write a few words first');
      return;
    }
    addEntry(type, value);
    setText('');
    toast('Saved privately');
  };

  return (
    <Screen>
      <ScreenHeader
        title="Private journal"
        right={
          <Pressable
            onPress={() => setUnlocked(false)}
            accessibilityRole="button"
            style={styles.lock}
          >
            <AppText size={FontSize.sm} muted>
              Lock
            </AppText>
          </Pressable>
        }
      />
      <View style={styles.body}>
        <View style={styles.chips}>
          {TYPES.map((t) => (
            <Chip key={t} label={t} selected={type === t} onPress={() => setType(t)} />
          ))}
        </View>
        <View style={styles.gap}>
          <TextField placeholder={PROMPTS[type]} value={text} onChangeText={setText} multiline />
        </View>
        <Button label="Save privately" onPress={save} style={styles.gap} />

        <SectionLabel>EARLIER ENTRIES</SectionLabel>
        {entries.map((entry, index) => (
          <View key={`${entry.date}-${index}`} style={styles.entry}>
            <View style={styles.entryHead}>
              <AppText weight="bold">{entry.type}</AppText>
              <AppText variant="xs" muted>
                {entry.date}
              </AppText>
            </View>
            <AppText variant="lead" style={styles.entryText}>
              {entry.text}
            </AppText>
          </View>
        ))}
        <AppText variant="xs" muted style={styles.note}>
          Entries are stored encrypted, never shown to family members, and included in your data
          export.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lock: {
    height: Size.controlXs,
    paddingHorizontal: Spacing.four + 2,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three + 2,
  },
  gap: {
    marginTop: Spacing.three,
  },
  entry: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four + 2,
    marginTop: Spacing.three,
  },
  entryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryText: {
    marginTop: Spacing.one + 2,
  },
  note: {
    marginTop: Spacing.three + 2,
  },
});
