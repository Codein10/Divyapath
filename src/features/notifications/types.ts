import { type Href } from 'expo-router';

import { type IconName } from '@/components/ui/icon';

export type AppNotification = {
  id: string;
  icon: IconName;
  title: string;
  body: string;
  when: string;
  href: Href;
  unread: boolean;
};
