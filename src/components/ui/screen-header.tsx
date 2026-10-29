import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { BackButton } from './back-button';

type ScreenHeaderProps = {
  title?: string;
  /** Small uppercase text instead of a big title (live darshan, player, call). */
  eyebrow?: string;
  right?: ReactNode;
  onBack?: () => void;
  backIcon?: 'chevronLeft' | 'close';
  backLabel?: string;
};

/** Back button + title row at the top of stacked screens. */
export function ScreenHeader({
  title,
  eyebrow,
  right,
  onBack,
  backIcon,
  backLabel,
}: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <BackButton onPress={onBack} icon={backIcon} accessibilityLabel={backLabel} />
      <View style={styles.title}>
        {title ? (
          <AppText variant="displayMd" accessibilityRole="header" numberOfLines={2}>
            {title}
          </AppText>
        ) : null}
        {eyebrow ? <AppText variant="eyebrow">{eyebrow}</AppText> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.four,
    paddingHorizontal: Spacing.gutter,
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
});
