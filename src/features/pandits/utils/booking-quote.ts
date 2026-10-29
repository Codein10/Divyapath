import { ONLINE_RATE, type Pandit, PANDITS, PLATFORM_FEE, TRAVEL_FEE } from '../data';

/** Online price, rounded to the nearest ₹50. */
export function onlinePrice(price: number): number {
  return Math.round((price * ONLINE_RATE) / 50) * 50;
}

export type Quote = {
  ritual: string;
  fee: number;
  travel: number;
  platform: number;
  total: number;
};

export function bookingQuote(pandit: Pandit, ritualIndex: number, online: boolean): Quote {
  const [ritual, price] = pandit.rituals[ritualIndex] ?? pandit.rituals[0];
  const fee = online ? onlinePrice(price) : price;
  const travel = online ? 0 : TRAVEL_FEE;
  return { ritual, fee, travel, platform: PLATFORM_FEE, total: fee + travel + PLATFORM_FEE };
}

/** The lowest price shown on a pandit card ("from ₹…"). */
export function startingPrice(pandit: Pandit): number {
  return Math.min(
    ...pandit.rituals.map(([, price]) =>
      pandit.modes.includes('home') ? price : onlinePrice(price),
    ),
  );
}

/** Demo availability: a fixed pattern of booked slots that differs per pandit and day. */
export function isSlotTaken(dayIndex: number, slotIndex: number, pandit: Pandit): boolean {
  return (dayIndex * 2 + slotIndex + PANDITS.indexOf(pandit)) % 5 === 0;
}
