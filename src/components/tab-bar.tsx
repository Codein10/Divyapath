import { type Tabs } from 'expo-router';
import { type ComponentProps, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { CountBadge } from '@/components/ui/count-badge';
import { Icon, type IconName } from '@/components/ui/icon';
import { type StringKey } from '@/constants/strings';
import { Colors, Fonts, FontSize, Size } from '@/constants/theme';
import { useT } from '@/hooks/use-t';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0] & {
  /** Shown above the bar (the mini player). */
  accessory?: ReactNode;
  /** Count badges by route name, e.g. `{ store: 2 }`. */
  badges?: Record<string, number>;
};

const TABS: Record<string, { label: StringKey; icon: IconName }> = {
  index: { label: 'home', icon: 'home' },
  store: { label: 'store', icon: 'bag' },
  aarti: { label: 'aarti', icon: 'flame' },
  book: { label: 'book', icon: 'book' },
  profile: { label: 'profile', icon: 'user' },
};

/** The bottom navigation from the design: five tabs with Devanagari-style labels. */
export function TabBar({ state, navigateToTab, accessory, badges = {} }: TabBarProps) {
  const t = useT();
  const insets = useSafeAreaInsets();

  return (
    <View>
      {accessory}
      <View
        style={[styles.bar, { paddingBottom: insets.bottom, height: Size.tabBar + insets.bottom }]}
      >
        {state.routes.map((route, index) => {
          const tab = TABS[route.name];
          if (!tab) return null;
          const focused = state.index === index;
          const color = focused ? Colors.accent : Colors.muted;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (!focused) navigateToTab(route.key);
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={t(tab.label)}
              style={styles.tab}
            >
              <View>
                <Icon name={tab.icon} size={26} color={color} />
                <CountBadge count={badges[route.name] ?? 0} style={styles.badge} />
              </View>
              <AppText color={color} style={styles.label} numberOfLines={1}>
                {t(tab.label)}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  badge: {
    top: -6,
    right: -12,
  },
  label: {
    fontFamily: Fonts.display,
    fontSize: FontSize.label,
    lineHeight: FontSize.label * 1.3,
  },
});
