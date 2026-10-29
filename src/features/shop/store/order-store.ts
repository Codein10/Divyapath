import { create } from 'zustand';

import { pushNotification } from '@/features/notifications';
import { toast } from '@/store/toast-store';
import { addDays, inr, shortDate } from '@/utils/format';

import { DELIVERY_DAYS, getProduct } from '../data';
import { cartTotals } from '../utils/cart-totals';
import { useCartStore } from './cart-store';

const PAYMENT_CHECK_MS = 4000;

export type Order = {
  id: string;
  items: number;
  total: number;
  lines: [name: string, quantity: number, amount: number][];
  stage: number;
  status: string;
  eta: string;
};

export const SAMPLE_ORDER: Order = {
  id: 'DP-2041',
  items: 3,
  total: 1997,
  status: 'Shipped',
  stage: 3,
  eta: shortDate(addDays(2)),
  lines: [
    ['Diwali Puja Complete Kit', 1, 1499],
    ['Premium Agarbatti Bundle', 2, 498],
  ],
};

type OrderState = {
  orders: Order[];
  /** Turns the cart into an order. Payment is "verified" a few seconds later (sandbox). */
  placeOrder: () => Order;
  cancel: (id: string) => void;
  reset: () => void;
};

export const useOrderStore = create<OrderState>()((set, get) => ({
  orders: [],
  placeOrder: () => {
    const { items, gifts, clear } = useCartStore.getState();
    const totals = cartTotals(items, Object.keys(gifts));
    const order: Order = {
      id: `DP-${2042 + get().orders.length}`,
      items: totals.count,
      total: totals.total,
      lines: Object.entries(items).map(([id, qty]) => {
        const product = getProduct(id);
        return [`${product.name}${gifts[id] ? ' (gift)' : ''}`, qty, product.price * qty];
      }),
      stage: 0,
      status: 'Payment pending verification',
      eta: shortDate(addDays(DELIVERY_DAYS)),
    };
    set((state) => ({ orders: [order, ...state.orders] }));
    clear();
    pushNotification(
      'bag',
      'Order placed',
      `${order.id} · ${inr(order.total)}`,
      `/order/${order.id}`,
    );

    setTimeout(() => {
      set((state) => ({
        orders: state.orders.map((o) =>
          o.id === order.id && o.status !== 'Cancelled' ? { ...o, stage: 1, status: 'Paid' } : o,
        ),
      }));
      pushNotification(
        'bag',
        'Payment verified',
        `Order ${order.id} is confirmed.`,
        `/order/${order.id}`,
      );
    }, PAYMENT_CHECK_MS);
    return order;
  },
  cancel: (id) => {
    const order = get().orders.find((o) => o.id === id);
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status: 'Cancelled' } : o)),
    }));
    if (order) {
      pushNotification(
        'bag',
        'Order cancelled',
        `Refund of ${inr(order.total)} in 5–7 days`,
        `/order/${id}`,
      );
    }
    toast('Order cancelled. Refund started.');
  },
  reset: () => set({ orders: [] }),
}));

export function findOrder(orders: Order[], id: string | undefined): Order {
  return orders.find((o) => o.id === id) ?? orders[0] ?? SAMPLE_ORDER;
}
