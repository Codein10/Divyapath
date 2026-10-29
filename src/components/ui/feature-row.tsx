import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art, type ArtKind } from '@/components/art/art';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon } from './icon';

type FeatureRowProps = {
  art: ArtKind;
  artVariant?: number;
  artInitials?: string;
  artColors?: [string, string];
  title: string;
  subtitle?: string;
  note?: string;
  onPress?: () => void;
  /** Replaces the chevron (download button, nothing). */
  right?: ReactNode;
  thumbSize?: number;
  children?: ReactNode;
};

/** A card row with a small picture, text and a chevron (calendar, guides, "Get ready"). */
export function FeatureRow({
  art,
  artVariant,
  artInitials,
  artColors,
  title,
  subtitle,
  note,
  onPress,
  right,
  thumbSize = 64,
  children,
}: FeatureRowProps) {
  const content = (
    <>
      <View style={[styles.thumb, { width: thumbSize, height: thumbSize }]}>
        <Art
          kind={art}
          variant={artVariant}
          initials={artInitials}
          colorFrom={artColors?.[0]}
          colorTo={artColors?.[1]}
        />
      </View>
      <View style={styles.text}>
        <AppText weight="semibold" size={FontSize.lg}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText size={FontSize.sm} muted>
            {subtitle}
          </AppText>
        ) : null}
        {note ? (
          <AppText variant="xs" muted>
            {note}
          </AppText>
        ) : null}
        {children}
      </View>
      {right !== undefined ? (
        right
      ) : onPress ? (
        <Icon name="chevronRight" size={22} color={Colors.accent} strokeWidth={2.4} />
      ) : null}
    </>
  );

  if (!onPress) return <View style={styles.row}>{content}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    marginTop: Spacing.three,
  },
  thumb: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.card2,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.85,
  },
});
