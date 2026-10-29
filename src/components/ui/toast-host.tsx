import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontSize, Radius, Shadow, Size, Spacing } from '@/constants/theme';
import { useToastStore } from '@/store/toast-store';

import { AppText } from './app-text';

/** Renders the current toast. Mounted once in the root layout. */
export function ToastHost() {
  const message = useToastStore((state) => state.message);
  const insets = useSafeAreaInsets();
  if (!message) return null;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.toast, { bottom: insets.bottom + Size.tabBar + Spacing.eight }]}
    >
      <AppText size={FontSize.sm} color={Colors.bg}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: Spacing.four,
    right: Spacing.four,
    backgroundColor: Colors.ink,
    borderRadius: Radius.md - 2,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    boxShadow: Shadow.raised,
    zIndex: 100,
    pointerEvents: 'none',
  },
});
