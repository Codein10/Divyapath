import { create } from 'zustand';

export type User = {
  name: string;
  email?: string;
};

type SessionState = {
  /** `signedOut` shows the sign-in screen; `guest` can browse without an account. */
  status: 'signedOut' | 'guest' | 'user';
  user: User | null;
  signIn: (user: User) => void;
  continueAsGuest: () => void;
  signOut: () => void;
  reset: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  status: 'signedOut',
  user: null,
  signIn: (user) => set({ status: 'user', user }),
  continueAsGuest: () => set({ status: 'guest', user: null }),
  signOut: () => set({ status: 'signedOut', user: null }),
  reset: () => set({ status: 'signedOut', user: null }),
}));
