import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Art, type ArtKind } from '@/components/art/art';
import { Colors, Spacing } from '@/constants/theme';

import { BackButton } from './back-button';

type HeroProps = {
  art: ArtKind;
  variant?: number;
  height: number;
  shade?: boolean;
  /** Shows a floating back button in the corner. */
  back?: boolean;
  /** Text at the bottom of the picture. */
  children?: ReactNode;
};

/** A full-width picture at the top of a screen, with optional text over it. */
export function Hero({ art, variant, height, shade, back, children }: HeroProps) {
  return (
    <View style={[styles.hero, { height }]}>
      <Art kind={art} variant={variant} shade={shade} />
      {back ? <BackButton variant="floating" /> : null}
      {children ? <View style={styles.text}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
    backgroundColor: Colors.heroFallback,
  },
  text: {
    position: 'absolute',
    left: Spacing.gutter,
    right: Spacing.gutter,
    bottom: Spacing.six,
    gap: Spacing.one,
  },
});
