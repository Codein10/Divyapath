import { Redirect, Tabs } from 'expo-router';

import { TabBar } from '@/components/tab-bar';
import { MiniPlayer } from '@/features/aarti';
import { useSessionStore } from '@/features/auth';
import { selectCartCount, useCartStore } from '@/features/shop';

export default function TabLayout() {
  const signedOut = useSessionStore((state) => state.status === 'signedOut');
  const cartCount = useCartStore(selectCartCount);

  if (signedOut) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <TabBar {...props} accessory={<MiniPlayer />} badges={{ store: cartCount }} />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="store" />
      <Tabs.Screen name="aarti" />
      <Tabs.Screen name="book" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
