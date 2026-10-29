import { parseIsoDate } from '@/utils/format';

import { CALENDAR_MONTHS, type Festival, type Region } from '../data';

/** Blank cells before day 1 (so the 1st lands on its weekday), then each day number. */
export function monthCells(month: Date): (number | null)[] {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const blanks: null[] = Array.from({ length: month.getDay() }, () => null);
  return [...blanks, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
}

export function festivalsInMonth(
  festivals: Festival[],
  month: Date,
  region: 'All' | Region,
): Festival[] {
  return festivals.filter((festival) => {
    const date = parseIsoDate(festival.date);
    return (
      date.getMonth() === month.getMonth() &&
      date.getFullYear() === month.getFullYear() &&
      (region === 'All' || festival.regions.includes(region))
    );
  });
}

/** Opens on the current month when it is inside the demo range, otherwise November. */
export function initialMonthIndex(now: Date): number {
  const index = CALENDAR_MONTHS.findIndex(
    (m) => m.getMonth() === now.getMonth() && m.getFullYear() === now.getFullYear(),
  );
  return index >= 0 ? index : 1;
}
