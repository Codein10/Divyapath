import { create } from 'zustand';

import { toast } from '@/store/toast-store';

import { MALA_BEADS, PRACTICES, type PracticeId } from '../data';

type PracticeState = {
  /** How many sessions of each practice were logged today. */
  logs: Partial<Record<PracticeId, number>>;
  beads: number;
  log: (id: PracticeId, message?: string) => void;
  countBead: () => void;
  resetBeads: () => void;
  reset: () => void;
};

export const usePracticeStore = create<PracticeState>()((set, get) => ({
  logs: {},
  beads: 0,
  log: (id, message) => {
    set((state) => ({ logs: { ...state.logs, [id]: (state.logs[id] ?? 0) + 1 } }));
    const practice = PRACTICES.find((p) => p.id === id);
    toast(message ?? `${practice?.name} logged · ${practice?.minutes} min`);
  },
  countBead: () => {
    const beads = get().beads;
    if (beads >= MALA_BEADS) return;
    set({ beads: beads + 1 });
    if (beads + 1 === MALA_BEADS) get().log('japa', 'Mala complete. Logged to Mantra Japa.');
  },
  resetBeads: () => set({ beads: 0 }),
  reset: () => set({ logs: {}, beads: 0 }),
}));

/** Sessions and minutes logged today. */
export function practiceTotals(logs: PracticeState['logs']) {
  return PRACTICES.reduce(
    (totals, practice) => {
      const count = logs[practice.id] ?? 0;
      return {
        sessions: totals.sessions + count,
        minutes: totals.minutes + count * practice.minutes,
      };
    },
    { sessions: 0, minutes: 0 },
  );
}
