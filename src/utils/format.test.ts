import {
  addDays,
  daysBetween,
  inr,
  mmss,
  parseIsoDate,
  plural,
  relativeDays,
  today,
} from './format';

describe('format helpers', () => {
  it('formats rupees with Indian grouping', () => {
    expect(inr(1499)).toBe('₹1,499');
    expect(inr(125000)).toBe('₹1,25,000');
    expect(inr(99.6)).toBe('₹100');
  });

  it('formats seconds as m:ss', () => {
    expect(mmss(94)).toBe('1:34');
    expect(mmss(5)).toBe('0:05');
    expect(mmss(-3)).toBe('0:00');
  });

  it('counts days between dates', () => {
    const start = parseIsoDate('2026-11-06');
    expect(daysBetween(start, parseIsoDate('2026-11-08'))).toBe(2);
  });

  it('describes how far away a date is', () => {
    expect(relativeDays(today())).toBe('today');
    expect(relativeDays(addDays(3))).toBe('in 3 days');
    expect(relativeDays(addDays(-1))).toBe('');
  });

  it('adds an s only when needed', () => {
    expect(plural(1, 'item')).toBe('1 item');
    expect(plural(3, 'item')).toBe('3 items');
  });
});
