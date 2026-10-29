import { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Colors, Fonts } from '@/constants/theme';

import { type ArtKind, type ArtOptions, artXml } from './art-xml';

export type { ArtKind } from './art-xml';

type ArtProps = ArtOptions & {
  kind: ArtKind;
  style?: StyleProp<ViewStyle>;
};

/** A design illustration that fills its parent (or `style`), cropped like `object-fit: cover`. */
export function Art({ kind, style, ...options }: ArtProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const xml = artXml(kind, id, options, Fonts.display);

  return (
    <View style={[styles.fill, style]} accessibilityElementsHidden importantForAccessibility="no">
      <SvgXml xml={xml} width="100%" height="100%" />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.heroFallback,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
});
