import { create } from 'zustand';

import { toast } from '@/store/toast-store';

type Checks = Record<string, Record<number, boolean>>;

type FestivalState = {
  reminders: Record<string, boolean>;
  /** Checklist ticks, per festival id or guide id. */
  festivalChecks: Checks;
  guideChecks: Checks;
  savedGuides: Record<string, boolean>;
  toggleReminder: (festivalId: string) => void;
  toggleFestivalItem: (festivalId: string, index: number) => void;
  toggleGuideItem: (guideId: string, index: number) => void;
  toggleSavedGuide: (guideId: string) => void;
  reset: () => void;
};

const toggleIn = (checks: Checks, id: string, index: number): Checks => ({
  ...checks,
  [id]: { ...checks[id], [index]: !checks[id]?.[index] },
});

const initialState = () => ({
  reminders: {} as Record<string, boolean>,
  festivalChecks: {} as Checks,
  guideChecks: {} as Checks,
  savedGuides: { daily: true } as Record<string, boolean>,
});

export const useFestivalStore = create<FestivalState>()((set, get) => ({
  ...initialState(),
  toggleReminder: (festivalId) => {
    const on = !get().reminders[festivalId];
    set((state) => ({ reminders: { ...state.reminders, [festivalId]: on } }));
    if (on) toast('Reminder set for 2 days before and on the morning');
  },
  toggleFestivalItem: (festivalId, index) =>
    set((state) => ({ festivalChecks: toggleIn(state.festivalChecks, festivalId, index) })),
  toggleGuideItem: (guideId, index) =>
    set((state) => ({ guideChecks: toggleIn(state.guideChecks, guideId, index) })),
  toggleSavedGuide: (guideId) => {
    const saved = !get().savedGuides[guideId];
    set((state) => ({ savedGuides: { ...state.savedGuides, [guideId]: saved } }));
    toast(saved ? 'Saved for offline use' : 'Offline copy removed');
  },
  reset: () => set(initialState()),
}));
