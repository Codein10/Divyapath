/**
 * DivyaPath design tokens. Every color, font, size and spacing value in the app comes from here.
 * The app uses one warm light palette, plus "night" tokens for the dark screens
 * (live darshan, audio player, video call).
 */

export const Colors = {
  // Surfaces
  bg: '#FBF8F3',
  card: '#F4ECE2',
  card2: '#E9DDCC',
  line: '#E6DACA',
  input: '#FFFDF9',
  highlight: '#F7E2CC',
  planSelected: '#FDF0E6',
  heroFallback: '#2A1A12',
  white: '#FFFFFF',
  black: '#000000',

  // Text
  ink: '#2A211C',
  ink2: '#4A3C33',
  muted: '#76665B',
  placeholder: '#8E7F73',
  disabled: '#9C8E82',
  onImage: '#FFFFFF',
  onImageSoft: '#F0E2D5',
  heroSub: '#F3E6DA',

  // Brand
  accent: '#C94A17',
  accent2: '#E05D26',
  accentFocus: 'rgba(201,74,23,0.15)',
  maroon: '#8B2A22',
  peach: '#F6D2A8',
  peachInk: '#6A2E12',
  live: '#9E2A22',
  switchOff: '#CDBFAE',

  // Night (dark screens)
  night: '#1C1411',
  night2: '#2A211D',
  nightLine: '#45362F',
  nightTrack: '#4A3A32',
  nightText: '#D8C8BA',
  nightInk: '#F4EAE0',
  nightDesc: '#E8DACC',
  gold: '#F2C38B',
  videoBg: '#000000',
  videoNote: 'rgba(0,0,0,0.45)',
  videoButton: 'rgba(255,248,238,0.2)',

  // Status
  ok: '#2F6B45',
  okBg: '#E4EFE5',
  okInk: '#2C4A34',
  okOnImage: '#E2EFDF',
  warn: '#8A4B0B',
  warnBg: '#FCEBD3',
  err: '#B3261E',
  errBg: '#FBE3E0',

  shadow: '#3C1E0A',
} as const;

export type ColorName = keyof typeof Colors;

/** Font family names, as loaded in src/app/_layout.tsx. */
export const Fonts = {
  display: 'TiroDevanagariHindi_400Regular',
  regular: 'Mukta_400Regular',
  medium: 'Mukta_500Medium',
  semibold: 'Mukta_600SemiBold',
  bold: 'Mukta_700Bold',
} as const;

export type FontWeightName = 'regular' | 'medium' | 'semibold' | 'bold';

export const FontSize = {
  xs: 13,
  label: 14,
  sm: 15,
  md: 16,
  lg: 17,
  xl: 18,
  xxl: 20,
  price: 19,
  title: 23,
  bigPrice: 28,
  heading: 27,
  displayMd: 30,
  displayCard: 31,
  displayHero: 38,
  displayLg: 40,
  displayXl: 44,
  streak: 66,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 28,
  eight: 32,
  gutter: 22,
  section: 30,
} as const;

export const Radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 22,
  xxl: 26,
  hero: 28,
  pill: 999,
} as const;

export const Shadow = {
  soft: '0px 1px 4px rgba(60,30,10,0.12)',
  float: '0px 2px 10px rgba(0,0,0,0.18)',
  raised: '0px 10px 24px rgba(30,15,10,0.3)',
  glow: '0px 10px 30px rgba(0,0,0,0.35)',
  goldRing: '0px 0px 0px 8px rgba(242,195,139,0.2)',
} as const;

/** Fixed sizes for controls and media, so screens stay consistent. */
export const Size = {
  control: 56,
  controlSm: 50,
  controlXs: 44,
  chip: 46,
  iconButton: 50,
  tapMin: 44,
  tabBar: 64,
  heroLogin: 330,
  heroProduct: 380,
  heroDetail: 360,
} as const;
