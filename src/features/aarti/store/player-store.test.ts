import { usePlayerStore } from './player-store';

const state = () => usePlayerStore.getState();

describe('player store', () => {
  beforeEach(() => state().reset());

  it('plays, then pauses the same track on a second tap', () => {
    state().play('a3');
    expect(state()).toMatchObject({ currentId: 'a3', playing: true, position: 0 });
    state().play('a3');
    expect(state().playing).toBe(false);
  });

  it('moves forward each tick at the chosen speed', () => {
    state().play('a1');
    state().cycleSpeed(); // 1 → 1.25
    state().tick();
    state().tick();
    expect(state().position).toBe(2.5);
  });

  it('goes to the next track of the same type when a track ends', () => {
    state().play('a1');
    usePlayerStore.setState({ position: 371 });
    state().tick();
    expect(state()).toMatchObject({ currentId: 'a2', position: 0 });
  });

  it('follows the playlist order when playing a playlist', () => {
    state().playPlaylist(0); // a1, a3, m1
    state().next();
    expect(state().currentId).toBe('a3');
    state().next();
    expect(state().currentId).toBe('m1');
  });

  it('restarts the track instead of going back after a few seconds', () => {
    state().play('a2');
    usePlayerStore.setState({ position: 30 });
    state().previous();
    expect(state()).toMatchObject({ currentId: 'a2', position: 0 });
    state().previous();
    expect(state().currentId).toBe('a1');
  });

  it('pauses when the sleep timer runs out', () => {
    state().play('m6');
    state().setSleep(15);
    usePlayerStore.setState({ sleepSecondsLeft: 1 });
    state().tick();
    expect(state()).toMatchObject({ playing: false, sleepMinutes: 0 });
  });
});
