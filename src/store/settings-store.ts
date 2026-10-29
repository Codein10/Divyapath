import { create } from 'zustand';

export type Language = 'en' | 'hi';

export const CITIES = ['Nashik', 'Pune', 'Varanasi', 'Bengaluru', 'Kolkata'] as const;

export type NotificationPrefs = {
  daily: boolean;
  fest: boolean;
  live: boolean;
  orders: boolean;
  offers: boolean;
};

type SettingsState = {
  language: Language;
  city: string;
  largeText: boolean;
  offline: boolean;
  premium: boolean;
  notificationPrefs: NotificationPrefs;
  setLanguage: (language: Language) => void;
  nextCity: () => string;
  toggleLargeText: () => void;
  setOffline: (offline: boolean) => void;
  startPremium: () => void;
  toggleNotificationPref: (key: keyof NotificationPrefs) => void;
  reset: () => void;
};

const initialState = {
  language: 'en' as Language,
  city: 'Nashik',
  largeText: false,
  offline: false,
  premium: false,
  notificationPrefs: { daily: true, fest: true, live: true, orders: true, offers: false },
};

/** App-wide preferences shared by every feature. */
export const useSettingsStore = create<SettingsState>()((set, get) => ({
  ...initialState,
  setLanguage: (language) => set({ language }),
  nextCity: () => {
    const index = CITIES.indexOf(get().city as (typeof CITIES)[number]);
    const city = CITIES[(index + 1) % CITIES.length];
    set({ city });
    return city;
  },
  toggleLargeText: () => set((state) => ({ largeText: !state.largeText })),
  setOffline: (offline) => set({ offline }),
  startPremium: () => set({ premium: true }),
  toggleNotificationPref: (key) =>
    set((state) => ({
      notificationPrefs: { ...state.notificationPrefs, [key]: !state.notificationPrefs[key] },
    })),
  reset: () => set(initialState),
}));
