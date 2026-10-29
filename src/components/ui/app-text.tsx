import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, FontSize, type FontWeightName } from '@/constants/theme';
import { useSettingsStore } from '@/store/settings-store';

import { useToneColors } from './tone';

const LARGE_TEXT_SCALE = 1.14;

type VariantSpec = {
  size: number;
  lineHeight: number;
  display?: boolean;
  weight?: FontWeightName;
  letterSpacing?: number;
  color?: 'text' | 'muted' | 'desc' | 'label';
};

const VARIANTS = {
  displayXl: { size: FontSize.displayXl, lineHeight: 1.06, display: true },
  displayLg: { size: FontSize.displayLg, lineHeight: 1.08, display: true },
  displayHero: { size: FontSize.displayHero, lineHeight: 1.1, display: true },
  displayMd: { size: FontSize.displayMd, lineHeight: 1.15, display: true },
  heading: { size: FontSize.heading, lineHeight: 1.2, display: true },
  title: { size: FontSize.title, lineHeight: 1.15, display: true },
  body: { size: FontSize.md, lineHeight: 1.5 },
  lead: { size: FontSize.lg, lineHeight: 1.65, color: 'desc' },
  small: { size: FontSize.sm, lineHeight: 1.5 },
  xs: { size: FontSize.xs, lineHeight: 1.5 },
  eyebrow: {
    size: FontSize.xs,
    lineHeight: 1.4,
    weight: 'bold',
    letterSpacing: 2.1,
    color: 'label',
  },
  label: {
    size: FontSize.label,
    lineHeight: 1.4,
    weight: 'bold',
    letterSpacing: 2.2,
    color: 'label',
  },
} satisfies Record<string, VariantSpec>;

export type TextVariant = keyof typeof VARIANTS;

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  weight?: FontWeightName;
  /** Use `muted` for secondary text; it adapts to dark screens. */
  muted?: boolean;
  color?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
};

/** All text in the app goes through this, so fonts, large-text mode and dark screens just work. */
export function AppText({
  variant = 'body',
  weight,
  muted,
  color,
  size,
  align,
  style,
  ...rest
}: AppTextProps) {
  const tone = useToneColors();
  const largeText = useSettingsStore((state) => state.largeText);
  const isHindi = useSettingsStore((state) => state.language === 'hi');
  const spec: VariantSpec = VARIANTS[variant];

  const scale = largeText ? LARGE_TEXT_SCALE : 1;
  const fontSize = (size ?? spec.size) * scale;
  const fontFamily = spec.display ? Fonts.display : Fonts[weight ?? spec.weight ?? 'regular'];
  const toneColor = muted ? tone.muted : tone[spec.color ?? 'text'];

  return (
    <Text
      style={[
        styles.base,
        {
          fontFamily,
          fontSize,
          lineHeight: fontSize * spec.lineHeight,
          color: color ?? toneColor,
          letterSpacing: isHindi ? 0 : spec.letterSpacing,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
