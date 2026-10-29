import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { FeatureRow } from '@/components/ui/feature-row';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';

import { GUIDES } from '../data';
import { useFestivalStore } from '../store/festival-store';

export function GuidesScreen() {
  const t = useT();
  const saved = useFestivalStore((state) => state.savedGuides);
  const toggleSaved = useFestivalStore((state) => state.toggleSavedGuide);

  return (
    <Screen>
      <ScreenHeader title={t('guidesT')} />
      <View style={styles.body}>
        <AppText variant="small" muted style={styles.intro}>
          Step-by-step rituals with checklists, audio and alternatives. Reviewed by our editors.
        </AppText>
        {GUIDES.map((guide) => {
          const isSaved = !!saved[guide.id];
          return (
            <FeatureRow
              key={guide.id}
              art={guide.art}
              artVariant={guide.artVariant}
              title={guide.name}
              subtitle={`${guide.steps.length} steps · ${guide.duration}`}
              note={isSaved ? '✓ Saved for offline' : guide.languages}
              onPress={() => router.push(`/guides/${guide.id}`)}
              right={
                <Pressable
                  onPress={() => toggleSaved(guide.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${isSaved ? 'Remove offline copy of' : 'Save for offline:'} ${guide.name}`}
                  accessibilityState={{ selected: isSaved }}
                  style={[styles.download, isSaved && styles.downloaded]}
                >
                  <Icon name="download" size={22} color={isSaved ? Colors.ok : Colors.muted} />
                </Pressable>
              }
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  intro: {
    marginTop: Spacing.one + 2,
  },
  download: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloaded: {
    backgroundColor: Colors.okBg,
  },
});
