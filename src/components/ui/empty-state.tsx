import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { useToneColors } from './tone';

type EmptyStateProps = {
  message: string;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

/** A soft card for "nothing here yet", with optional actions below. */
export function EmptyState({ message, title, icon, children }: EmptyStateProps) {
  const tone = useToneColors();
  return (
    <View style={[styles.card, { backgroundColor: tone.surface }]}>
      {icon}
      {title ? (
        <AppText weight="bold" size={FontSize.xl} align="center">
          {title}
        </AppText>
      ) : null}
      <AppText variant="small" muted align="center">
        {message}
      </AppText>
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    paddingVertical: Spacing.seven,
    paddingHorizontal: Spacing.gutter,
    alignItems: 'center',
    gap: Spacing.three,
  },
  actions: {
    alignSelf: 'stretch',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
});
