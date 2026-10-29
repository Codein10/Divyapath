import { create } from 'zustand';

import { toast } from '@/store/toast-store';

export type Frequency = 'Monthly' | 'Every 2 months';

type SubscriptionState = {
  active: boolean;
  items: Record<string, boolean>;
  frequency: Frequency;
  skipNext: boolean;
  paused: boolean;
  toggleItem: (id: string) => void;
  setFrequency: (frequency: Frequency) => void;
  start: () => void;
  toggleSkip: () => void;
  togglePause: () => void;
  cancel: () => void;
  reset: () => void;
};

const initialState = {
  active: false,
  items: { agarbatti: true, wicks: true, kapur: true } as Record<string, boolean>,
  frequency: 'Monthly' as Frequency,
  skipNext: false,
  paused: false,
};

export const useSubscriptionStore = create<SubscriptionState>()((set) => ({
  ...initialState,
  toggleItem: (id) => set((state) => ({ items: { ...state.items, [id]: !state.items[id] } })),
  setFrequency: (frequency) => set({ frequency }),
  start: () => {
    set({ active: true, skipNext: false, paused: false });
    toast('Subscription started (sandbox)');
  },
  toggleSkip: () => set((state) => ({ skipNext: !state.skipNext })),
  togglePause: () => set((state) => ({ paused: !state.paused })),
  cancel: () => {
    set({ active: false });
    toast('Subscription cancelled');
  },
  reset: () => set(initialState),
}));
