import { MALA_BEADS } from '../data';
import { practiceTotals, usePracticeStore } from './practice-store';

describe('practice store', () => {
  beforeEach(() => usePracticeStore.getState().reset());

  it('adds up sessions and minutes', () => {
    expect(practiceTotals({ prayer: 2, japa: 1 })).toEqual({ sessions: 3, minutes: 25 });
  });

  it('logs Mantra Japa when the mala is complete, and stops counting', () => {
    const { countBead } = usePracticeStore.getState();
    for (let i = 0; i < MALA_BEADS + 5; i++) countBead();

    const state = usePracticeStore.getState();
    expect(state.beads).toBe(MALA_BEADS);
    expect(state.logs.japa).toBe(1);
  });
});
