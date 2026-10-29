import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type DimensionValue } from 'react-native';

import { Art, type ArtKind } from '@/components/art/art';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type PictureCardProps = {
  art: ArtKind;
  variant?: number;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  width?: DimensionValue;
  height: number;
  titleSize?: number;
  onPress: () => void;
  accessibilityLabel?: string;
  /** Extra layers on top of the picture (LIVE badge, play button). */
  children?: ReactNode;
};

/** A rounded picture with white text at the bottom (explore cards, festivals, temples). */
export function PictureCard({
  art,
  variant,
  title,
  eyebrow,
  subtitle,
  width,
  height,
  titleSize = 25,
  onPress,
  accessibilityLabel,
  children,
}: PictureCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={({ pressed }) => [styles.card, { width, height }, pressed && styles.pressed]}
    >
      <Art kind={art} variant={variant} shade />
      {children}
      <View style={styles.overlay}>
        {eyebrow ? (
          <AppText variant="eyebrow" color={Colors.gold}>
            {eyebrow}
          </AppText>
        ) : null}
        <AppText variant="title" size={titleSize} color={Colors.onImage}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText size={FontSize.label} color={Colors.onImageSoft}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xxl,
    overflow: 'hidden',
    backgroundColor: Colors.heroFallback,
  },
  overlay: {
    position: 'absolute',
    left: Spacing.five,
    right: Spacing.four,
    bottom: Spacing.four,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.9,
  },
});
