import { create } from 'zustand';

import { type ArtKind } from '@/components/art/art';
import { toast } from '@/store/toast-store';

import { getTrack, RESTART_AFTER_SECONDS, SPEEDS, TRACKS } from '../data';

export type Playlist = { name: string; trackIds: string[]; art: ArtKind };

type PlayerState = {
  currentId: string | null;
  playing: boolean;
  /** Seconds into the current track. */
  position: number;
  /** A playlist being played; otherwise "next" follows tracks of the same type. */
  queue: string[] | null;
  speed: number;
  sleepMinutes: number;
  sleepSecondsLeft: number;
  favourites: Record<string, boolean>;
  downloads: Record<string, boolean>;
  playlists: Playlist[];
  /** Live darshan "Remind me" buttons, by schedule row. */
  reminders: Record<number, boolean>;

  play: (id: string) => void;
  toggle: () => void;
  close: () => void;
  next: () => void;
  previous: () => void;
  /** Called once a second by `usePlayerTicker`. */
  tick: () => void;
  toggleFavourite: (id: string) => void;
  toggleDownload: (id: string) => void;
  cycleSpeed: () => void;
  setSleep: (minutes: number) => void;
  toggleInPlaylist: (index: number) => void;
  createPlaylist: (name: string) => boolean;
  playPlaylist: (index: number) => void;
  toggleReminder: (index: number) => void;
  reset: () => void;
};

const initialState = () => ({
  currentId: null as string | null,
  playing: false,
  position: 0,
  queue: null as string[] | null,
  speed: 1,
  sleepMinutes: 0,
  sleepSecondsLeft: 0,
  favourites: { a1: true } as Record<string, boolean>,
  downloads: { a1: true, m1: true } as Record<string, boolean>,
  playlists: [
    { name: 'Morning aarti', trackIds: ['a1', 'a3', 'm1'], art: 'temple' },
    { name: 'Evening calm', trackIds: ['a2', 'm3'], art: 'moon' },
  ] as Playlist[],
  reminders: {} as Record<number, boolean>,
});

function upNext(state: Pick<PlayerState, 'currentId' | 'queue'>): string[] {
  const current = getTrack(state.currentId);
  if (!current) return [];
  return state.queue ?? TRACKS.filter((t) => t.type === current.type).map((t) => t.id);
}

export const usePlayerStore = create<PlayerState>()((set, get) => ({
  ...initialState(),

  play: (id) => {
    if (get().currentId === id) {
      set((state) => ({ playing: !state.playing }));
      return;
    }
    set({ currentId: id, position: 0, playing: true, queue: null });
  },
  toggle: () =>
    set((state) => ({ currentId: state.currentId ?? TRACKS[0].id, playing: !state.playing })),
  close: () => set({ currentId: null, playing: false, position: 0 }),
  next: () => {
    const state = get();
    const queue = upNext(state);
    const index = queue.indexOf(state.currentId ?? '');
    if (index >= 0 && index < queue.length - 1) set({ currentId: queue[index + 1], position: 0 });
    else set({ playing: false, position: 0 });
  },
  previous: () => {
    const state = get();
    if (state.position > RESTART_AFTER_SECONDS) {
      set({ position: 0 });
      return;
    }
    const queue = upNext(state);
    const index = queue.indexOf(state.currentId ?? '');
    set({ currentId: index > 0 ? queue[index - 1] : state.currentId, position: 0 });
  },
  tick: () => {
    const state = get();
    const track = getTrack(state.currentId);
    if (!state.playing || !track) return;

    if (state.sleepMinutes > 0) {
      const left = state.sleepSecondsLeft - 1;
      if (left <= 0) {
        set({ playing: false, sleepMinutes: 0, sleepSecondsLeft: 0 });
        toast('Sleep timer ended. Audio paused.');
        return;
      }
      set({ sleepSecondsLeft: left });
    }

    const position = state.position + state.speed;
    if (position >= track.duration) state.next();
    else set({ position });
  },
  toggleFavourite: (id) =>
    set((state) => ({ favourites: { ...state.favourites, [id]: !state.favourites[id] } })),
  toggleDownload: (id) => {
    const downloaded = !get().downloads[id];
    set((state) => ({ downloads: { ...state.downloads, [id]: downloaded } }));
    toast(downloaded ? 'Downloaded for offline listening' : 'Download removed');
  },
  cycleSpeed: () =>
    set((state) => ({ speed: SPEEDS[(SPEEDS.indexOf(state.speed) + 1) % SPEEDS.length] })),
  setSleep: (minutes) => {
    set({ sleepMinutes: minutes, sleepSecondsLeft: minutes * 60 });
    if (minutes) toast(`Audio stops in ${minutes} minutes`);
  },
  toggleInPlaylist: (index) => {
    const state = get();
    const id = state.currentId ?? TRACKS[0].id;
    const playlist = state.playlists[index];
    const has = playlist.trackIds.includes(id);
    const updated = {
      ...playlist,
      trackIds: has ? playlist.trackIds.filter((t) => t !== id) : [...playlist.trackIds, id],
    };
    set({ playlists: state.playlists.map((p, i) => (i === index ? updated : p)) });
    if (!has) toast(`Added to ${playlist.name}`);
  },
  createPlaylist: (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast('Give the playlist a name');
      return false;
    }
    set((state) => ({
      playlists: [...state.playlists, { name: trimmed, trackIds: [], art: 'diyas' }],
    }));
    toast(`Playlist “${trimmed}” created`);
    return true;
  },
  playPlaylist: (index) => {
    const playlist = get().playlists[index];
    if (!playlist?.trackIds.length) return;
    set({
      queue: [...playlist.trackIds],
      currentId: playlist.trackIds[0],
      position: 0,
      playing: true,
    });
  },
  toggleReminder: (index) => {
    const on = !get().reminders[index];
    set((state) => ({ reminders: { ...state.reminders, [index]: on } }));
    if (on) toast('We’ll remind you 15 minutes before');
  },
  reset: () => set(initialState()),
}));
