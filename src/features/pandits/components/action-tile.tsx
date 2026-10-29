import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

type ActionTileProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

/** A half-width action card on the booking detail screen. */
export function ActionTile({ title, subtitle, onPress }: ActionTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle}`}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <AppText weight="semibold" size={FontSize.xl}>
        {title}
      </AppText>
      <AppText weight="bold" size={FontSize.sm} color={Colors.accent}>
        {subtitle}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: '47%',
    flexGrow: 1,
    minHeight: 100,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four + 2,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.85,
  },
});
