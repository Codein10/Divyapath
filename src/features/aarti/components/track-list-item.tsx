import { mmss } from '@/utils/format';

import { type Track } from '../data';
import { usePlayerStore } from '../store/player-store';
import { TrackRow } from './track-row';

type TrackListItemProps = {
  track: Track;
};

/** A track row wired to the player: highlights and toggles the current track. */
export function TrackListItem({ track }: TrackListItemProps) {
  const active = usePlayerStore((state) => state.currentId === track.id);
  const playing = usePlayerStore((state) => state.playing);
  const downloaded = usePlayerStore((state) => !!state.downloads[track.id]);
  const play = usePlayerStore((state) => state.play);

  return (
    <TrackRow
      title={track.title}
      subtitle={`${track.deity} · ${mmss(track.duration)}${downloaded ? ' · saved offline' : ''}`}
      art={track.art}
      artVariant={track.artVariant}
      active={active}
      playing={active && playing}
      onPlay={() => play(track.id)}
    />
  );
}
