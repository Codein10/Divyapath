import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { HScroll } from '@/components/ui/h-scroll';
import { Icon } from '@/components/ui/icon';
import { PictureCard } from '@/components/ui/picture-card';
import { Screen } from '@/components/ui/screen';
import { Segmented } from '@/components/ui/segmented';
import { Colors, Shadow, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';

import { LibrarySection } from '../components/library-section';
import { LiveBadge } from '../components/live-badge';
import { TrackListItem } from '../components/track-list-item';
import { DEITIES, TRACKS } from '../data';

export type AartiTab = 'aarti' | 'mantra' | 'library';

type AartiScreenProps = {
  /** The tab lives in the URL (/aarti?tab=library), so links can open a specific tab. */
  tab: AartiTab;
};

export function AartiScreen({ tab }: AartiScreenProps) {
  const t = useT();
  const [deity, setDeity] = useState('All');
  const tracks = TRACKS.filter(
    (track) => track.type === tab && (deity === 'All' || track.deity === deity),
  );

  const changeTab = (next: AartiTab) => {
    setDeity('All');
    router.setParams({ tab: next });
  };

  return (
    <Screen inTabs>
      <View style={styles.pad}>
        <AppText variant="displayLg" accessibilityRole="header" style={styles.title}>
          {t('aartiT')}
        </AppText>
        <AppText muted>{t('aartiS')}</AppText>

        <View style={styles.live}>
          <PictureCard
            art="aarti"
            height={330}
            eyebrow="Streaming now"
            title="Sandhya Aarti"
            subtitle="[Partner temple] · demo stream"
            titleSize={30}
            accessibilityLabel="Open live darshan: Sandhya Aarti"
            onPress={() => router.push('/live')}
          >
            <LiveBadge />
            <View style={styles.playBig}>
              <Icon name="play" size={32} color={Colors.white} />
            </View>
          </PictureCard>
        </View>

        <View style={styles.tabs}>
          <Segmented<AartiTab>
            accessibilityLabel="Type"
            value={tab}
            onChange={changeTab}
            options={[
              { value: 'aarti', label: t('tabA') },
              { value: 'mantra', label: t('tabM') },
              { value: 'library', label: t('tabL') },
            ]}
          />
        </View>
      </View>

      {tab === 'library' ? (
        <View style={styles.pad}>
          <LibrarySection />
        </View>
      ) : (
        <>
          <View style={styles.chips}>
            <HScroll accessibilityLabel="Deity">
              {DEITIES.map((d) => (
                <Chip
                  key={d}
                  variant="maroon"
                  label={d === 'All' ? 'All deities' : d}
                  selected={deity === d}
                  onPress={() => setDeity(d)}
                />
              ))}
            </HScroll>
          </View>
          <View style={styles.pad}>
            {tracks.length ? (
              tracks.map((track) => <TrackListItem key={track.id} track={track} />)
            ) : (
              <View style={styles.empty}>
                <EmptyState
                  message={`No ${tab === 'aarti' ? 'aartis' : 'mantras'} for ${deity} yet.`}
                />
              </View>
            )}
            <AppText variant="xs" muted style={styles.note}>
              Placeholder tracks. Production audio is licensed and credited to its artist.
            </AppText>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: Spacing.gutter,
  },
  title: {
    marginTop: Spacing.gutter,
  },
  live: {
    marginTop: Spacing.gutter,
  },
  playBig: {
    position: 'absolute',
    alignSelf: 'center',
    top: '44%',
    marginTop: -42,
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.accent2,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: Shadow.glow,
  },
  tabs: {
    marginTop: Spacing.six,
  },
  chips: {
    marginTop: Spacing.four + 2,
  },
  empty: {
    marginTop: Spacing.three + 2,
  },
  note: {
    marginTop: Spacing.three + 2,
  },
});
