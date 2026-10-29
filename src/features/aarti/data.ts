import { type ArtKind } from '@/components/art/art';

export type TrackType = 'aarti' | 'mantra';

export type Track = {
  id: string;
  type: TrackType;
  title: string;
  deity: string;
  /** Length in seconds. */
  duration: number;
  art: ArtKind;
  artVariant?: number;
};

export const TRACKS: Track[] = [
  {
    id: 'a1',
    type: 'aarti',
    title: 'Om Jai Jagdish Hare',
    deity: 'Vishnu',
    duration: 372,
    art: 'temple',
    artVariant: 1,
  },
  {
    id: 'a2',
    type: 'aarti',
    title: 'Shiv Aarti · Om Jai Shiv Omkara',
    deity: 'Shiva',
    duration: 340,
    art: 'moon',
  },
  {
    id: 'a3',
    type: 'aarti',
    title: 'Jai Ganesh Deva',
    deity: 'Ganesha',
    duration: 245,
    art: 'lotus',
  },
  {
    id: 'a4',
    type: 'aarti',
    title: 'Sukhkarta Dukhharta',
    deity: 'Ganesha',
    duration: 270,
    art: 'diyas',
  },
  {
    id: 'a5',
    type: 'aarti',
    title: 'Ambe Tu Hai Jagdambe',
    deity: 'Devi',
    duration: 355,
    art: 'kalash',
  },
  {
    id: 'a6',
    type: 'aarti',
    title: 'Aarti Kije Hanuman Lala Ki',
    deity: 'Hanuman',
    duration: 288,
    art: 'temple',
    artVariant: 2,
  },
  {
    id: 'm1',
    type: 'mantra',
    title: 'Gayatri Mantra · 108',
    deity: 'Devi',
    duration: 1120,
    art: 'chhath',
  },
  {
    id: 'm2',
    type: 'mantra',
    title: 'Mahamrityunjaya Mantra',
    deity: 'Shiva',
    duration: 960,
    art: 'moon',
  },
  {
    id: 'm3',
    type: 'mantra',
    title: 'Om Namah Shivaya · 108',
    deity: 'Shiva',
    duration: 900,
    art: 'temple',
  },
  {
    id: 'm4',
    type: 'mantra',
    title: 'Om Gan Ganapataye Namah',
    deity: 'Ganesha',
    duration: 600,
    art: 'lotus',
  },
  {
    id: 'm5',
    type: 'mantra',
    title: 'Hanuman Chalisa',
    deity: 'Hanuman',
    duration: 545,
    art: 'diyas',
  },
  {
    id: 'm6',
    type: 'mantra',
    title: 'Vishnu Sahasranama',
    deity: 'Vishnu',
    duration: 1680,
    art: 'temple',
    artVariant: 1,
  },
];

export const DEITIES = ['All', 'Shiva', 'Vishnu', 'Ganesha', 'Devi', 'Hanuman'];

export function getTrack(id: string | null | undefined): Track | undefined {
  return TRACKS.find((track) => track.id === id);
}

export type ScheduleState = 'ended' | 'live' | 'next';

export const LIVE_SCHEDULE: [time: string, name: string, state: ScheduleState][] = [
  ['4:00 am', 'Mangala Aarti', 'ended'],
  ['7:00 am', 'Shringar Aarti', 'ended'],
  ['12:00 pm', 'Bhog Aarti', 'ended'],
  ['6:30 pm', 'Sandhya Aarti', 'live'],
  ['10:30 pm', 'Shayan Aarti', 'next'],
];

export const SPEEDS = [0.75, 1, 1.25, 1.5];
export const SLEEP_OPTIONS = [0, 15, 30, 45];

/** Restart the track instead of going back when more than this many seconds have played. */
export const RESTART_AFTER_SECONDS = 5;
