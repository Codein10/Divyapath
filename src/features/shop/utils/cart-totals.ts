import { FREE_DELIVERY_FROM, GIFT_WRAP_FEE, GST_RATE, getProduct, SHIPPING_FEE } from '../data';

export type CartTotals = {
  count: number;
  subtotal: number;
  giftWrap: number;
  shipping: number;
  gstIncluded: number;
  total: number;
};

/** Prices for the cart. GST is already inside the prices; it is shown for information only. */
export function cartTotals(items: Record<string, number>, giftIds: string[]): CartTotals {
  const entries = Object.entries(items).filter(([, qty]) => qty > 0);
  const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const subtotal = entries.reduce((sum, [id, qty]) => sum + getProduct(id).price * qty, 0);
  const giftWrap = giftIds.filter((id) => (items[id] ?? 0) > 0).length * GIFT_WRAP_FEE;
  const shipping = subtotal >= FREE_DELIVERY_FROM || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + giftWrap + shipping;
  return {
    count,
    subtotal,
    giftWrap,
    shipping,
    gstIncluded: (total * GST_RATE) / (1 + GST_RATE),
    total,
  };
}
