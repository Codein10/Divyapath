const DAY_MS = 86_400_000;

/** Indian rupees with Indian digit grouping: 1499 → "₹1,499". */
export function inr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/** Seconds as m:ss: 94 → "1:34". */
export function mmss(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/** Today at local midnight. */
export function today(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function addDays(days: number, from: Date = today()): Date {
  const date = new Date(from);
  date.setDate(date.getDate() + days);
  return date;
}

/** Whole days from `from` to `to` (both at midnight). */
export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

/** "Thu, 29 Oct" */
export function shortDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

/** "29 Oct 2026" */
export function longDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Parses "2026-11-08" as a local date at midnight. */
export function parseIsoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/** "in 3 days", "today", or "" for past dates. */
export function relativeDays(date: Date): string {
  const days = daysBetween(today(), date);
  if (days > 0) return `in ${days} days`;
  if (days === 0) return 'today';
  return '';
}

/** The next `count` days, starting today. */
export function nextDays(count: number): Date[] {
  return Array.from({ length: count }, (_, index) => addDays(index));
}

export function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}
