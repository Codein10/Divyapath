import { create } from 'zustand';

import { toast } from '@/store/toast-store';

export type Member = { name: string; role: string; color: string };
export type ListItem = { text: string; addedBy: string; done: boolean };

type FamilyGroup = {
  name: string;
  members: Member[];
  list: ListItem[];
  reminders: [title: string, when: string][];
};

// Member avatar colors from the design.
const MEMBER_COLORS = { you: '#8B2A22', papa: '#4F6B4A', pooja: '#B9853A', invited: '#8A6A52' };

const defaultGroup = (): FamilyGroup => ({
  name: 'My family',
  members: [
    { name: 'You', role: 'Admin', color: MEMBER_COLORS.you },
    { name: 'Papa', role: 'Member', color: MEMBER_COLORS.papa },
    { name: 'Pooja', role: 'Invited · pending', color: MEMBER_COLORS.pooja },
  ],
  list: [
    { text: 'Marigold garlands', addedBy: 'Papa', done: false },
    { text: 'Ghee, 500 g', addedBy: 'You', done: true },
    { text: 'Rangoli colours', addedBy: 'Pooja', done: false },
  ],
  reminders: [
    ['Diwali puja', '8 Nov · 6:30 pm'],
    ['Clean the puja room', '6 Nov'],
    ['Order the Diwali kit', 'By 4 Nov'],
  ],
});

const INVITE_PATTERN = /^(\+?\d[\d\s-]{9,14}|\S+@\S+\.\S+)$/;

type FamilyState = {
  group: FamilyGroup | null;
  create: () => void;
  /** Returns an error message, or null when the invite was sent. */
  invite: (contact: string) => string | null;
  addItem: (text: string) => void;
  toggleItem: (index: number) => void;
  leave: () => void;
  reset: () => void;
};

export const useFamilyStore = create<FamilyState>()((set, get) => ({
  group: null,
  create: () => {
    set({ group: defaultGroup() });
    toast('Family group created');
  },
  invite: (contact) => {
    const value = contact.trim();
    const group = get().group;
    if (!group) return null;
    if (!INVITE_PATTERN.test(value)) return 'Enter a 10-digit phone number or an email address.';
    set({
      group: {
        ...group,
        members: [
          ...group.members,
          { name: value, role: 'Invited · pending', color: MEMBER_COLORS.invited },
        ],
      },
    });
    toast('Invite sent (demo)');
    return null;
  },
  addItem: (text) => {
    const group = get().group;
    if (!group || !text.trim()) return;
    set({
      group: {
        ...group,
        list: [...group.list, { text: text.trim(), addedBy: 'You', done: false }],
      },
    });
  },
  toggleItem: (index) => {
    const group = get().group;
    if (!group) return;
    set({
      group: {
        ...group,
        list: group.list.map((item, i) => (i === index ? { ...item, done: !item.done } : item)),
      },
    });
  },
  leave: () => {
    set({ group: null });
    toast('You left the family group');
  },
  reset: () => set({ group: null }),
}));
