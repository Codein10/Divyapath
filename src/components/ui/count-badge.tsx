import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type CountBadgeProps = {
  count: number;
  /** Floating badges sit on the top-right corner of an icon. */
  floating?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function CountBadge({ count, floating = true, style }: CountBadgeProps) {
  if (count <= 0) return null;
  return (
    <View style={[styles.badge, floating && styles.floating, style]}>
      <AppText weight="bold" size={12} color={Colors.white} style={styles.text}>
        {count}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: Spacing.one,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floating: {
    position: 'absolute',
    top: -3,
    right: -3,
  },
  text: {
    lineHeight: 16,
  },
});
