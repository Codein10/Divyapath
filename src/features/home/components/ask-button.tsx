import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Colors, FontSize, Radius, Shadow, Spacing } from '@/constants/theme';
import { useT } from '@/hooks/use-t';

/** Floating "Ask" button that opens the assistant. */
export function AskButton() {
  const t = useT();
  return (
    <Pressable
      onPress={() => router.push('/assistant')}
      accessibilityRole="button"
      accessibilityLabel="Ask DivyaPath"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Icon name="spark" size={20} color={Colors.nightInk} />
      <AppText weight="bold" size={FontSize.md} color={Colors.nightInk}>
        {t('ask')}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: Spacing.four,
    bottom: Spacing.four,
    height: 52,
    paddingLeft: Spacing.four,
    paddingRight: Spacing.five,
    borderRadius: Radius.pill,
    backgroundColor: Colors.night2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    boxShadow: Shadow.raised,
  },
  pressed: {
    opacity: 0.9,
  },
});
