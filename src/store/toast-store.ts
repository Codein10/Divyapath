import { create } from 'zustand';

const TOAST_DURATION_MS = 2400;

type ToastState = {
  message: string;
  show: (message: string) => void;
  hide: () => void;
};

let hideTimer: ReturnType<typeof setTimeout> | undefined;

/** One short message at a time, shown above the tab bar or footer. */
export const useToastStore = create<ToastState>()((set) => ({
  message: '',
  show: (message) => {
    clearTimeout(hideTimer);
    set({ message });
    hideTimer = setTimeout(() => set({ message: '' }), TOAST_DURATION_MS);
  },
  hide: () => {
    clearTimeout(hideTimer);
    set({ message: '' });
  },
}));

/** Show a toast from anywhere, including store actions. */
export const toast = (message: string) => useToastStore.getState().show(message);
