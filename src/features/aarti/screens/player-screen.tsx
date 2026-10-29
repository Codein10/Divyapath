import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { Icon, type IconName } from '@/components/ui/icon';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { mmss } from '@/utils/format';

import { getTrack, SLEEP_OPTIONS, TRACKS } from '../data';
import { usePlayerStore } from '../store/player-store';

type ActionProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress: () => void;
};

function PlayerAction({ icon, label, active, onPress }: ActionProps) {
  const color = active ? Colors.gold : Colors.nightInk;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={({ pressed }) => [styles.action, pressed && styles.pressed]}
    >
      <Icon name={icon} size={22} color={color} />
      <AppText size={FontSize.xs} color={color} align="center">
        {label}
      </AppText>
    </Pressable>
  );
}

export function PlayerScreen() {
  const player = usePlayerStore();
  const track = getTrack(player.currentId) ?? TRACKS[0];
  const favourite = !!player.favourites[track.id];
  const downloaded = !!player.downloads[track.id];

  return (
    <Screen tone="dark">
      <ScreenHeader eyebrow="NOW PLAYING" />
      <View style={styles.body}>
        <View style={styles.cover}>
          <Art kind={track.art} variant={track.artVariant} />
        </View>
        <AppText variant="displayMd" style={styles.title}>
          {track.title}
        </AppText>
        <AppText muted>{track.deity} · [licensed artist]</AppText>

        <View style={styles.progress}>
          <ProgressBar
            value={player.position / track.duration}
            trackColor={Colors.nightTrack}
            fillColor={Colors.gold}
            accessibilityLabel="Playback position"
          />
          <View style={styles.times}>
            <AppText size={12} color={Colors.nightText}>
              {mmss(player.position)}
            </AppText>
            <AppText size={12} color={Colors.nightText}>
              {mmss(track.duration)}
            </AppText>
          </View>
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={player.previous}
            accessibilityRole="button"
            accessibilityLabel="Previous track"
            style={styles.control}
          >
            <Icon name="previous" size={26} color={Colors.white} />
          </Pressable>
          <Pressable
            onPress={player.toggle}
            accessibilityRole="button"
            accessibilityLabel={player.playing ? 'Pause' : 'Play'}
            style={styles.playBig}
          >
            <Icon name={player.playing ? 'pause' : 'play'} size={32} color={Colors.night} />
          </Pressable>
          <Pressable
            onPress={player.next}
            accessibilityRole="button"
            accessibilityLabel="Next track"
            style={styles.control}
          >
            <Icon name="next" size={26} color={Colors.white} />
          </Pressable>
        </View>

        <View style={styles.actions}>
          <PlayerAction
            icon={favourite ? 'heartFilled' : 'heart'}
            label={favourite ? 'Saved' : 'Favourite'}
            active={favourite}
            onPress={() => player.toggleFavourite(track.id)}
          />
          <PlayerAction
            icon="download"
            label={downloaded ? 'Downloaded' : 'Download'}
            active={downloaded}
            onPress={() => player.toggleDownload(track.id)}
          />
          <PlayerAction icon="speed" label={`${player.speed}× speed`} onPress={player.cycleSpeed} />
          <PlayerAction
            icon="share"
            label="Share"
            onPress={() =>
              Linking.openURL(
                `https://wa.me/?text=${encodeURIComponent(`Listening to ${track.title} on DivyaPath`)}`,
              )
            }
          />
        </View>

        <SectionLabel>SLEEP TIMER</SectionLabel>
        <View style={styles.chips}>
          {SLEEP_OPTIONS.map((minutes) => (
            <Chip
              key={minutes}
              variant="dark"
              label={minutes ? `${minutes} min` : 'Off'}
              selected={player.sleepMinutes === minutes}
              onPress={() => player.setSleep(minutes)}
            />
          ))}
        </View>

        <SectionLabel>ADD TO PLAYLIST</SectionLabel>
        <View style={styles.chips}>
          {player.playlists.map((playlist, index) => {
            const included = playlist.trackIds.includes(track.id);
            return (
              <Chip
                key={`${playlist.name}-${index}`}
                variant="dark"
                label={`${included ? '✓ ' : ''}${playlist.name}`}
                selected={included}
                onPress={() => player.toggleInPlaylist(index)}
              />
            );
          })}
        </View>
        <AppText variant="xs" muted style={styles.note}>
          Placeholder audio. Background playback and lock-screen controls work in the app build.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.four,
  },
  cover: {
    aspectRatio: 1,
    borderRadius: Radius.hero,
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    marginTop: Spacing.five,
  },
  progress: {
    marginTop: Spacing.gutter,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.one + 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.seven,
    marginTop: Spacing.four,
  },
  control: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.night2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBig: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.six,
  },
  action: {
    flex: 1,
    backgroundColor: Colors.night2,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  note: {
    marginTop: Spacing.four,
  },
});
