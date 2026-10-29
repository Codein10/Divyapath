import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { TextLink } from '@/components/ui/text-link';
import { Colors, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { goToTab, type TabHref } from '@/services/navigation';

import { useNotificationStore } from '../store/notification-store';
import { type AppNotification } from '../types';

const TAB_HREFS: string[] = ['/', '/store', '/aarti', '/book', '/profile'];

export function NotificationsScreen() {
  const t = useT();
  const notifications = useNotificationStore((state) => state.notifications);
  const markRead = useNotificationStore((state) => state.markRead);
  const markAllRead = useNotificationStore((state) => state.markAllRead);
  const hasUnread = notifications.some((n) => n.unread);

  const open = (notification: AppNotification) => {
    markRead(notification.id);
    if (typeof notification.href === 'string' && TAB_HREFS.includes(notification.href)) {
      goToTab(notification.href as TabHref);
    } else {
      router.push(notification.href);
    }
  };

  return (
    <Screen>
      <ScreenHeader title={t('notifT')} />
      <View style={styles.body}>
        {hasUnread ? <TextLink label="Mark all as read" onPress={markAllRead} /> : null}
        {notifications.length ? (
          notifications.map((notification) => (
            <Pressable
              key={notification.id}
              onPress={() => open(notification)}
              accessibilityRole="button"
              accessibilityLabel={`${notification.unread ? 'Unread. ' : ''}${notification.title}. ${notification.body}`}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <View style={styles.icon}>
                <Icon name={notification.icon} size={22} color={Colors.maroon} />
              </View>
              <View style={styles.text}>
                <View style={styles.titleRow}>
                  <AppText weight="semibold" style={styles.title}>
                    {notification.title}
                  </AppText>
                  {notification.unread ? <View style={styles.dot} /> : null}
                </View>
                <AppText variant="small" muted>
                  {notification.body}
                </AppText>
              </View>
              <AppText variant="xs" muted>
                {notification.when}
              </AppText>
            </Pressable>
          ))
        ) : (
          <EmptyState message="You’re all caught up." />
        )}
        <AppText variant="xs" muted style={styles.note}>
          Choose which reminders you get in Profile → Notifications.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.four,
    paddingVertical: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    flexShrink: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  note: {
    marginTop: Spacing.four,
  },
});
