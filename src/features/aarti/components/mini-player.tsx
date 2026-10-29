import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Colors, FontSize, Radius, Shadow, Spacing } from '@/constants/theme';
import { mmss } from '@/utils/format';

import { getTrack } from '../data';
import { usePlayerStore } from '../store/player-store';

/** "Now playing" bar shown above the tab bar while a track is loaded. */
export function MiniPlayer() {
  const track = getTrack(usePlayerStore((state) => state.currentId));
  const playing = usePlayerStore((state) => state.playing);
  const position = usePlayerStore((state) => state.position);
  const sleepMinutes = usePlayerStore((state) => state.sleepMinutes);
  const toggle = usePlayerStore((state) => state.toggle);
  const close = usePlayerStore((state) => state.close);
  if (!track) return null;

  return (
    <View style={styles.bar} accessibilityLabel="Now playing">
      <Pressable
        onPress={() => router.push('/player')}
        accessibilityRole="button"
        accessibilityLabel={`Open player: ${track.title}`}
        style={styles.open}
      >
        <View style={styles.thumb}>
          <Art kind={track.art} variant={track.artVariant} />
        </View>
        <View style={styles.text}>
          <AppText weight="semibold" size={FontSize.sm} color={Colors.nightInk} numberOfLines={1}>
            {track.title}
          </AppText>
          <View style={styles.progress}>
            <ProgressBar
              value={position / track.duration}
              height={4}
              trackColor={Colors.nightTrack}
              fillColor={Colors.gold}
            />
          </View>
          <AppText size={12} color={Colors.nightText}>
            {mmss(position)} / {mmss(track.duration)}
            {sleepMinutes ? ` · sleep ${sleepMinutes} min` : ''}
          </AppText>
        </View>
      </Pressable>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={playing ? 'Pause' : 'Play'}
        style={styles.playButton}
      >
        <Icon name={playing ? 'pause' : 'play'} size={18} color={Colors.night2} />
      </Pressable>
      <Pressable
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel="Close player"
        hitSlop={Spacing.one}
        style={styles.close}
      >
        <Icon name="close" size={20} color={Colors.nightText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.three - 2,
    backgroundColor: Colors.night2,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.three - 2,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    boxShadow: Shadow.raised,
  },
  open: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  thumb: {
    width: 46,
    height: 46,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  progress: {
    marginTop: Spacing.one + 2,
    marginBottom: Spacing.half,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
