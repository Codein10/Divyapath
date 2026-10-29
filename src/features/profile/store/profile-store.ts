import { create } from 'zustand';

import { toast } from '@/store/toast-store';

export type Address = { label: string; line: string; pin: string };

const initialAddresses = (): Address[] => [
  { label: 'Home', line: 'Flat 4, Sai Residency, Gangapur Road, Nashik', pin: '422005' },
];

type ProfileState = {
  addresses: Address[];
  /** "Join as a pandit" application status. */
  applicationStatus: 'none' | 'review';
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
  submitApplication: () => void;
  reset: () => void;
};

export const useProfileStore = create<ProfileState>()((set) => ({
  addresses: initialAddresses(),
  applicationStatus: 'none',
  addAddress: (address) => {
    set((state) => ({ addresses: [...state.addresses, address] }));
    toast('Address saved');
  },
  removeAddress: (index) =>
    set((state) => ({ addresses: state.addresses.filter((_, i) => i !== index) })),
  submitApplication: () => set({ applicationStatus: 'review' }),
  reset: () => set({ addresses: initialAddresses(), applicationStatus: 'none' }),
}));
