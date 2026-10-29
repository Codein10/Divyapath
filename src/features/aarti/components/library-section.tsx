import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionLabel } from '@/components/ui/section-label';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { mmss, plural } from '@/utils/format';

import { getTrack, TRACKS } from '../data';
import { usePlayerStore } from '../store/player-store';
import { TrackListItem } from './track-list-item';
import { TrackRow } from './track-row';

/** The "Library" tab: downloads, favourites and playlists. */
export function LibrarySection() {
  const t = useT();
  const favourites = usePlayerStore((state) => state.favourites);
  const downloads = usePlayerStore((state) => state.downloads);
  const playlists = usePlayerStore((state) => state.playlists);
  const createPlaylist = usePlayerStore((state) => state.createPlaylist);
  const playPlaylist = usePlayerStore((state) => state.playPlaylist);
  const [name, setName] = useState('');

  const downloaded = TRACKS.filter((track) => downloads[track.id]);
  const favourite = TRACKS.filter((track) => favourites[track.id]);

  const create = () => {
    if (createPlaylist(name)) setName('');
  };

  return (
    <View>
      <SectionLabel>{`${t('downloads')} · ${downloaded.length}`}</SectionLabel>
      {downloaded.length ? (
        downloaded.map((track) => <TrackListItem key={track.id} track={track} />)
      ) : (
        <EmptyState message="Download tracks from the player to listen without internet." />
      )}

      <SectionLabel>{`${t('favs')} · ${favourite.length}`}</SectionLabel>
      {favourite.length ? (
        favourite.map((track) => <TrackListItem key={track.id} track={track} />)
      ) : (
        <EmptyState message="Tap the heart in the player to save favourites." />
      )}

      <SectionLabel>{t('playlists')}</SectionLabel>
      {playlists.map((playlist, index) => {
        const seconds = playlist.trackIds.reduce(
          (sum, id) => sum + (getTrack(id)?.duration ?? 0),
          0,
        );
        return (
          <TrackRow
            key={`${playlist.name}-${index}`}
            title={playlist.name}
            subtitle={`${plural(playlist.trackIds.length, 'track')} · ${mmss(seconds)}`}
            art={playlist.art}
            artVariant={index % 3}
            onPlay={() => playPlaylist(index)}
            disabled={!playlist.trackIds.length}
          />
        );
      })}
      <View style={styles.addRow}>
        <View style={styles.field}>
          <TextField
            placeholder="New playlist name"
            value={name}
            onChangeText={setName}
            onSubmitEditing={create}
            compact
          />
        </View>
        <Button label="Create" size="sm" onPress={create} style={styles.create} />
      </View>
      <AppText variant="xs" muted style={styles.note}>
        Downloads stay on this device and play offline. They are removed when you sign out.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  addRow: {
    flexDirection: 'row',
    gap: Spacing.three - 2,
    marginTop: Spacing.three,
  },
  field: {
    flex: 1,
  },
  create: {
    alignSelf: 'auto',
    height: 52,
  },
  note: {
    marginTop: Spacing.three,
  },
});
