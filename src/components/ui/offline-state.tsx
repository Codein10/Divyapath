import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { useSettingsStore } from '@/store/settings-store';
import { toast } from '@/store/toast-store';

import { Button } from './button';
import { EmptyState } from './empty-state';
import { Icon } from './icon';
import { Skeleton } from './skeleton';

const RETRY_DELAY_MS = 1000;

/** Shown instead of screens that need the internet while offline mode is on. */
export function OfflineState() {
  const setOffline = useSettingsStore((state) => state.setOffline);
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setOffline(false);
      toast('Back online');
    }, RETRY_DELAY_MS);
  };

  if (retrying) {
    return (
      <View style={styles.wrap}>
        {[0, 1, 2].map((key) => (
          <Skeleton key={key} height={150} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <EmptyState
        icon={<Icon name="wifiOff" size={46} color={Colors.muted} strokeWidth={1.3} />}
        title="You’re offline"
        message="This screen needs an internet connection. Saved puja guides and downloaded audio still work."
      >
        <Button label="Try again" onPress={retry} style={styles.button} />
        <Button
          label="Open downloads"
          variant="soft"
          onPress={() => router.navigate({ pathname: '/aarti', params: { tab: 'library' } })}
          style={styles.button}
        />
      </EmptyState>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.seven,
    gap: Spacing.four,
  },
  button: {
    alignSelf: 'center',
    width: 240,
  },
});
