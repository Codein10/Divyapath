import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { ConfirmBox } from '@/components/ui/confirm-box';
import { Icon } from '@/components/ui/icon';
import { Menu, MenuRow } from '@/components/ui/menu';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { Toggle } from '@/components/ui/toggle';
import { useSessionStore } from '@/features/auth';
import { useFamilyStore } from '@/features/family';
import { selectUnreadCount, useNotificationStore } from '@/features/notifications';
import { useSubscriptionStore } from '@/features/shop';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';
import { type NotificationPrefs, useSettingsStore } from '@/store/settings-store';
import { toast } from '@/store/toast-store';

import { LanguageSwitch } from '../components/language-switch';
import { useProfileStore } from '../store/profile-store';
import { resetDemo } from '../utils/reset-demo';

const NOTIFICATION_ROWS: {
  key: keyof NotificationPrefs;
  label: string;
  sub?: string;
  locked?: boolean;
}[] = [
  { key: 'daily', label: 'Daily practice reminder', sub: '7:00 pm' },
  { key: 'fest', label: 'Festival reminders', sub: '2 days before and on the day' },
  { key: 'live', label: 'Live aarti alerts' },
  {
    key: 'orders',
    label: 'Orders and bookings',
    sub: 'Always on, needed for your purchases',
    locked: true,
  },
  { key: 'offers', label: 'Offers and new kits' },
];

export function ProfileScreen() {
  const t = useT();
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);
  const unread = useNotificationStore(selectUnreadCount);
  const familyGroup = useFamilyStore((state) => state.group);
  const subscriptionActive = useSubscriptionStore((state) => state.active);
  const addressCount = useProfileStore((state) => state.addresses.length);
  const applicationStatus = useProfileStore((state) => state.applicationStatus);
  const settings = useSettingsStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const name = user?.name ?? 'Guest';

  const toLogin = () => router.replace('/login');

  return (
    <Screen inTabs>
      <View style={styles.body}>
        <AppText variant="displayLg" accessibilityRole="header" style={styles.title}>
          {t('profileT')}
        </AppText>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <AppText variant="displayMd" size={32} color={Colors.white}>
              {name.charAt(0).toUpperCase()}
            </AppText>
          </View>
          <View style={styles.flex}>
            <AppText weight="bold" size={FontSize.xxl}>
              {name}
            </AppText>
            <AppText variant="small" muted>
              {user ? (user.email ?? 'Signed in with phone') : 'Not signed in'}
            </AppText>
          </View>
          {user ? null : (
            <Pressable onPress={toLogin} accessibilityRole="button" style={styles.ghostPill}>
              <AppText size={FontSize.sm} muted>
                {t('signin')}
              </AppText>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={() => router.push('/premium')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.plus, pressed && styles.pressed]}
        >
          <Icon name="crown" size={26} color={Colors.gold} />
          <View style={styles.flex}>
            <AppText weight="bold" size={FontSize.lg} color={Colors.gold}>
              {settings.premium ? 'DivyaPath Plus · active' : 'Try DivyaPath Plus'}
            </AppText>
            <AppText variant="small" color={Colors.nightText}>
              {settings.premium
                ? 'Ad-free audio, unlimited downloads'
                : '7 days free · ad-free audio and downloads'}
            </AppText>
          </View>
          <Icon name="chevronRight" size={18} color={Colors.nightText} />
        </Pressable>

        <SectionLabel>ACCOUNT</SectionLabel>
        <Menu>
          <MenuRow
            icon="bell"
            label={t('notifT')}
            value={unread || ''}
            onPress={() => router.push('/notifications')}
          />
          <MenuRow icon="book" label={t('myb')} onPress={() => router.push('/bookings')} />
          <MenuRow
            icon="pin"
            label="Saved addresses"
            value={addressCount}
            onPress={() => router.push('/addresses')}
          />
          <MenuRow
            icon="users"
            label="Family group"
            value={familyGroup ? `${familyGroup.members.length} members` : ''}
            onPress={() => router.push('/family')}
          />
          <MenuRow icon="lock" label="Private journal" onPress={() => router.push('/journal')} />
          <MenuRow
            icon="repeat"
            label="Kit subscription"
            value={subscriptionActive ? 'Active' : ''}
            onPress={() => router.push('/subscription')}
          />
          <MenuRow
            icon="flame"
            label="Join as a pandit"
            value={applicationStatus === 'review' ? 'Under review' : ''}
            onPress={() => router.push('/join-pandit')}
          />
        </Menu>

        <SectionLabel>PREFERENCES</SectionLabel>
        <Menu>
          <MenuRow icon="globe" label={t('language')} right={<LanguageSwitch />} />
          <MenuRow
            icon="pin"
            label="City for dates and timings"
            value={`${settings.city} · IST`}
            onPress={() => toast(`Dates and timings now for ${settings.nextCity()}`)}
          />
          <MenuRow
            icon="text"
            label="Large text"
            right={
              <Toggle
                value={settings.largeText}
                onChange={settings.toggleLargeText}
                accessibilityLabel="Large text"
              />
            }
          />
        </Menu>

        <SectionLabel>NOTIFICATIONS</SectionLabel>
        <Menu>
          {NOTIFICATION_ROWS.map((row) => (
            <MenuRow
              key={row.key}
              label={row.label}
              sub={row.sub}
              right={
                <Toggle
                  value={settings.notificationPrefs[row.key]}
                  onChange={() => settings.toggleNotificationPref(row.key)}
                  accessibilityLabel={row.label}
                  disabled={row.locked}
                />
              }
            />
          ))}
        </Menu>

        <SectionLabel>PRIVACY & DATA</SectionLabel>
        <Menu>
          <MenuRow
            icon="doc"
            label="Download my data"
            value="JSON"
            onPress={() => toast('Your data export is ready (demo JSON)')}
          />
          <MenuRow icon="trash" label="Delete account" onPress={() => setConfirmDelete(true)} />
        </Menu>
        {confirmDelete ? (
          <ConfirmBox
            title="Delete your account?"
            message="Your profile, journal, practice logs and addresses are deleted within 30 days. Order and payment records are kept as the law requires."
            cancelLabel="Keep account"
            confirmLabel="Delete"
            onCancel={() => setConfirmDelete(false)}
            onConfirm={() => {
              resetDemo({ signOut: true });
              toast('Account deletion requested');
              toLogin();
            }}
          />
        ) : null}

        <SectionLabel>DEMO TOOLS</SectionLabel>
        <Menu>
          <MenuRow
            icon="wifiOff"
            label="Simulate being offline"
            right={
              <Toggle
                value={settings.offline}
                onChange={() => settings.setOffline(!settings.offline)}
                accessibilityLabel="Simulate being offline"
              />
            }
          />
          <MenuRow
            icon="repeat"
            label="Reset demo"
            onPress={() => {
              resetDemo();
              toast('Demo reset');
            }}
          />
        </Menu>

        {user ? (
          <Button
            label={t('signout')}
            variant="outline"
            style={styles.signOut}
            onPress={() => {
              signOut();
              toLogin();
            }}
          />
        ) : null}
        <AppText variant="xs" muted align="center" style={styles.version}>
          DivyaPath demo · v0.3
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  title: {
    marginTop: Spacing.gutter,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    marginTop: Spacing.four + 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  ghostPill: {
    height: Size.controlXs,
    paddingHorizontal: Spacing.four + 2,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three + 2,
    backgroundColor: Colors.night2,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.four + 2,
    paddingHorizontal: Spacing.five,
    marginTop: Spacing.five,
  },
  pressed: {
    opacity: 0.9,
  },
  signOut: {
    marginTop: Spacing.gutter,
  },
  version: {
    marginTop: Spacing.three + 2,
  },
});
