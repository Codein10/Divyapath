import { FESTIVALS } from '../data';
import { festivalsInMonth, initialMonthIndex, monthCells } from './calendar';

describe('calendar helpers', () => {
  it('starts November 2026 on a Sunday with 30 days', () => {
    const cells = monthCells(new Date(2026, 10, 1));
    expect(cells[0]).toBe(1);
    expect(cells.filter((c) => c !== null)).toHaveLength(30);
  });

  it('pads October 2026 so the 1st falls on Thursday', () => {
    const cells = monthCells(new Date(2026, 9, 1));
    expect(cells.slice(0, 5)).toEqual([null, null, null, null, 1]);
  });

  it('filters festivals by month and region', () => {
    const november = new Date(2026, 10, 1);
    expect(festivalsInMonth(FESTIVALS, november, 'All').map((f) => f.id)).toContain('diwali');
    expect(festivalsInMonth(FESTIVALS, november, 'South').map((f) => f.id)).toEqual([
      'diwali',
      'karthigai',
    ]);
  });

  it('opens on the current month when it has demo data', () => {
    expect(initialMonthIndex(new Date(2026, 11, 5))).toBe(2);
    expect(initialMonthIndex(new Date(2027, 3, 1))).toBe(1);
  });
});
