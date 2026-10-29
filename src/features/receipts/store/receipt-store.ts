import { create } from 'zustand';

import { shortDate, today } from '@/utils/format';

export type Receipt = {
  kind: string;
  id: string;
  date: string;
  to: string;
  lines: [label: string, amount: number][];
  total: number;
  note?: string;
};

const sampleReceipt = (): Receipt => ({
  kind: 'Donation receipt',
  id: 'DP-DN-3051',
  date: shortDate(today()),
  to: '[Partner temple] Trust',
  lines: [['Annadan', 501]],
  total: 501,
  note: '80G receipt issued in the trust’s name. Trust registration [number]. Sandbox payment.',
});

type ReceiptState = {
  current: Receipt;
  show: (receipt: Receipt) => void;
  reset: () => void;
};

/** The receipt shown on the receipt screen (donations and bookings both use it). */
export const useReceiptStore = create<ReceiptState>()((set) => ({
  current: sampleReceipt(),
  show: (receipt) => set({ current: receipt }),
  reset: () => set({ current: sampleReceipt() }),
}));
