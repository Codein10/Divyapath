import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { TextLink } from '@/components/ui/text-link';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { useSettingsStore } from '@/store/settings-store';

import { MALA_BEADS, PRACTICES } from '../data';
import { usePracticeStore } from '../store/practice-store';
import { JapaRing } from './japa-ring';

/** "Track today": the four practice tiles and the japa counter. */
export function PracticeTracker() {
  const t = useT();
  const isHindi = useSettingsStore((state) => state.language === 'hi');
  const logs = usePracticeStore((state) => state.logs);
  const beads = usePracticeStore((state) => state.beads);
  const log = usePracticeStore((state) => state.log);
  const countBead = usePracticeStore((state) => state.countBead);
  const resetBeads = usePracticeStore((state) => state.resetBeads);

  return (
    <View>
      <View style={styles.grid}>
        {PRACTICES.map((practice) => {
          const count = logs[practice.id] ?? 0;
          return (
            <Pressable
              key={practice.id}
              onPress={() => log(practice.id)}
              accessibilityRole="button"
              accessibilityLabel={`Log ${practice.name}, ${practice.minutes} minutes`}
              style={({ pressed }) => [
                styles.tile,
                count > 0 && styles.tileDone,
                pressed && styles.pressed,
              ]}
            >
              <AppText weight="semibold" size={FontSize.xl}>
                {isHindi ? practice.nameHi : practice.name}
              </AppText>
              <AppText weight="bold" size={FontSize.sm} color={count ? Colors.ok : Colors.accent}>
                {count ? `✓ ${count * practice.minutes} min logged` : `+${practice.minutes} min`}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.japa}>
        <JapaRing count={beads} onPress={countBead} />
        <View style={styles.japaText}>
          <AppText weight="bold" size={FontSize.lg}>
            {t('japa')}
          </AppText>
          <AppText variant="small" muted>
            {beads >= MALA_BEADS ? 'Mala complete. Logged to Mantra Japa.' : t('japaS')}
          </AppText>
        </View>
        <TextLink label="Reset" onPress={resetBeads} />
      </View>
      <AppText variant="xs" muted style={styles.note}>
        {t('private')}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four - 2,
  },
  tile: {
    width: '47.8%',
    flexGrow: 1,
    minHeight: 100,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four + 2,
    gap: Spacing.one,
  },
  tileDone: {
    backgroundColor: Colors.highlight,
  },
  pressed: {
    opacity: 0.85,
  },
  japa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.three + 2,
    paddingHorizontal: Spacing.four + 2,
    marginTop: Spacing.four - 2,
  },
  japaText: {
    flex: 1,
    minWidth: 0,
  },
  note: {
    marginTop: Spacing.three - 2,
  },
});
