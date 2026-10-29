import { create } from 'zustand';

import { addDays, shortDate, today } from '@/utils/format';

export type EntryType = 'Gratitude' | 'Sankalp' | 'Reflection';

export type JournalEntry = { date: string; type: EntryType; text: string };

const initialEntries = (): JournalEntry[] => [
  {
    date: shortDate(addDays(-1)),
    type: 'Gratitude',
    text: 'Grateful that the whole family sat together for aarti this evening.',
  },
];

type JournalState = {
  entries: JournalEntry[];
  add: (type: EntryType, text: string) => void;
  reset: () => void;
};

export const useJournalStore = create<JournalState>()((set) => ({
  entries: initialEntries(),
  add: (type, text) =>
    set((state) => ({ entries: [{ date: shortDate(today()), type, text }, ...state.entries] })),
  reset: () => set({ entries: initialEntries() }),
}));
