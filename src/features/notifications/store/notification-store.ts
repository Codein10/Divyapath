import { type Href } from 'expo-router';
import { create } from 'zustand';

import { type IconName } from '@/components/ui/icon';

import { type AppNotification } from '../types';

const initialNotifications = (): AppNotification[] => [
  {
    id: 'n1',
    icon: 'flame',
    title: 'Sandhya Aarti is live',
    body: '[Partner temple] started streaming.',
    when: 'Now',
    href: '/live',
    unread: true,
  },
  {
    id: 'n2',
    icon: 'bag',
    title: 'Order your Diwali kit by 4 Nov',
    body: 'Kits ordered later may arrive after Diwali.',
    when: '2 h',
    href: '/store',
    unread: true,
  },
  {
    id: 'n3',
    icon: 'calendar',
    title: 'Dhanteras is coming up',
    body: 'See the preparation checklist.',
    when: 'Yesterday',
    href: '/festival/dhanteras',
    unread: false,
  },
  {
    id: 'n4',
    icon: 'track',
    title: 'Evening practice',
    body: 'A gentle reminder for your 7 pm aarti.',
    when: 'Yesterday',
    href: '/',
    unread: false,
  },
];

type NotificationState = {
  notifications: AppNotification[];
  push: (icon: IconName, title: string, body: string, href: Href) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  reset: () => void;
};

let counter = 0;

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: initialNotifications(),
  push: (icon, title, body, href) => {
    counter += 1;
    const notification: AppNotification = {
      id: `n-${Date.now()}-${counter}`,
      icon,
      title,
      body,
      when: 'Now',
      href,
      unread: true,
    };
    set((state) => ({ notifications: [notification, ...state.notifications] }));
  },
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    })),
  markAllRead: () =>
    set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, unread: false })) })),
  reset: () => set({ notifications: initialNotifications() }),
}));

/** Add a notification from another feature's store action. */
export const pushNotification = (icon: IconName, title: string, body: string, href: Href) =>
  useNotificationStore.getState().push(icon, title, body, href);

export const selectUnreadCount = (state: NotificationState) =>
  state.notifications.filter((n) => n.unread).length;
