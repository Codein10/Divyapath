import { useEffect } from 'react';

import { usePlayerStore } from '../store/player-store';

const TICK_MS = 1000;

/** Moves the demo audio player forward once a second. Mount once, in the root layout. */
export function usePlayerTicker() {
  useEffect(() => {
    const timer = setInterval(() => usePlayerStore.getState().tick(), TICK_MS);
    return () => clearInterval(timer);
  }, []);
}
