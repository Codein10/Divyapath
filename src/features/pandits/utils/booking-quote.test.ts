import { getPandit } from '../data';
import { bookingQuote, isSlotTaken, onlinePrice, startingPrice } from './booking-quote';

describe('booking quote', () => {
  const ramesh = getPandit('p1');
  const meera = getPandit('p4');

  it('rounds online prices to the nearest ₹50', () => {
    expect(onlinePrice(2100)).toBe(1350);
    expect(onlinePrice(1500)).toBe(1000);
  });

  it('adds travel and platform fee at home', () => {
    expect(bookingQuote(ramesh, 0, false)).toEqual({
      ritual: 'Griha Pravesh',
      fee: 2100,
      travel: 250,
      platform: 49,
      total: 2399,
    });
  });

  it('skips travel online', () => {
    expect(bookingQuote(ramesh, 0, true).total).toBe(1350 + 49);
  });

  it('shows the online starting price for online-only pandits', () => {
    expect(startingPrice(ramesh)).toBe(1500);
    expect(startingPrice(meera)).toBe(onlinePrice(1400));
  });

  it('marks a predictable pattern of slots as taken', () => {
    expect(isSlotTaken(0, 0, ramesh)).toBe(true);
    expect(isSlotTaken(0, 1, ramesh)).toBe(false);
  });
});
