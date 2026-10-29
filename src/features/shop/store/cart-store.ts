import { create } from 'zustand';

import { toast } from '@/store/toast-store';

import { getProduct } from '../data';

export type GiftDetails = {
  name: string;
  pin: string;
  deliverOn: string;
  message: string;
};

type CartState = {
  items: Record<string, number>;
  gifts: Record<string, GiftDetails>;
  add: (id: string, gift?: GiftDetails) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  reset: () => void;
};

export const useCartStore = create<CartState>()((set, get) => ({
  items: {},
  gifts: {},
  add: (id, gift) => {
    const product = getProduct(id);
    const quantity = Math.min(product.stock, (get().items[id] ?? 0) + 1);
    set((state) => ({
      items: { ...state.items, [id]: quantity },
      gifts: gift ? { ...state.gifts, [id]: gift } : state.gifts,
    }));
    toast(gift ? `Gift for ${gift.name} added` : `${product.name} added to cart`);
  },
  increment: (id) => {
    const product = getProduct(id);
    const current = get().items[id] ?? 0;
    if (current >= product.stock) {
      toast(`Only ${product.stock} in stock`);
      return;
    }
    set((state) => ({ items: { ...state.items, [id]: current + 1 } }));
  },
  decrement: (id) => {
    const next = (get().items[id] ?? 0) - 1;
    set((state) => {
      const items = { ...state.items };
      const gifts = { ...state.gifts };
      if (next <= 0) {
        delete items[id];
        delete gifts[id];
      } else {
        items[id] = next;
      }
      return { items, gifts };
    });
  },
  clear: () => set({ items: {}, gifts: {} }),
  reset: () => set({ items: {}, gifts: {} }),
}));

export const selectCartCount = (state: CartState) =>
  Object.values(state.items).reduce((sum, qty) => sum + qty, 0);
