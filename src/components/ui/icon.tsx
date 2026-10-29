import { SvgXml } from 'react-native-svg';

/**
 * Line icons from the DivyaPath design (24×24 grid, round caps).
 * `fill: true` icons are solid shapes instead of outlines.
 */
type IconSpec = { body: string; strokeWidth?: number; fill?: boolean };

const ICONS = {
  home: {
    body: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
  },
  bag: { body: '<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>' },
  flame: {
    body: '<path d="M12 3c3.2 3.6 5.5 6.6 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 9.6 8.8 6.6 12 3z"/><path d="M12 12.5c1.2 1.3 2 2.4 2 3.6a2 2 0 0 1-4 0c0-1.2.8-2.3 2-3.6z"/>',
  },
  book: {
    body: '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/>',
  },
  user: { body: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.4 4.2-6.5 8-6.5s7 2.1 8 6.5"/>' },
  play: { body: '<path d="M8 5.5v13l11-6.5z"/>', fill: true },
  pause: {
    body: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    fill: true,
  },
  chevronLeft: { body: '<path d="M15 5l-7 7 7 7"/>', strokeWidth: 2.4 },
  chevronRight: { body: '<path d="M9 5l7 7-7 7"/>', strokeWidth: 2.4 },
  check: { body: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', strokeWidth: 2.4 },
  mute: { body: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/>' },
  fullscreen: { body: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>' },
  search: { body: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>' },
  wifiOff: {
    body: '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><path d="M3 3l18 18"/>',
  },
  bell: {
    body: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  },
  spark: {
    body: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  },
  download: { body: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>' },
  heart: {
    body: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  },
  heartFilled: {
    body: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    fill: true,
  },
  share: {
    body: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  },
  lock: {
    body: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  },
  gift: {
    body: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11"/><path d="M12 9c-2-4-6-4-6-1.5S10 9 12 9zM12 9c2-4 6-4 6-1.5S14 9 12 9z"/>',
  },
  users: {
    body: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.8 3.1 2.5 3.5 5.2"/>',
  },
  repeat: {
    body: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  },
  pin: {
    body: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  },
  globe: {
    body: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  },
  text: {
    body: '<path d="M4 7V5h10v2M9 5v14M7 19h4"/><path d="M14 12v-1.5h7V12M17.5 10.5V19M16 19h3"/>',
  },
  doc: { body: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>' },
  trash: { body: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>' },
  send: { body: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>' },
  previous: { body: '<path d="M18 5L9 12l9 7zM6 5v14"/>' },
  next: { body: '<path d="M6 5l9 7-9 7zM18 5v14"/>' },
  mic: {
    body: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  },
  camera: {
    body: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
  },
  endCall: { body: '<path d="M3 15c5-5 13-5 18 0l-2.5 2.5-3-1.5v-3a10 10 0 0 0-7 0v3l-3 1.5z"/>' },
  calendar: {
    body: '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  },
  track: { body: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12l2.5 2.5 4.5-5"/>' },
  close: { body: '<path d="M6 6l12 12M18 6L6 18"/>', strokeWidth: 2.2 },
  plus: { body: '<path d="M12 5v14M5 12h14"/>', strokeWidth: 2.2 },
  speed: { body: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>' },
  crown: { body: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/>' },
} satisfies Record<string, IconSpec>;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  color: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 24, color, strokeWidth }: IconProps) {
  const spec: IconSpec = ICONS[name];
  const paint = spec.fill
    ? `fill="${color}" stroke="none"`
    : `fill="none" stroke="${color}" stroke-width="${strokeWidth ?? spec.strokeWidth ?? 1.8}" stroke-linecap="round" stroke-linejoin="round"`;
  const xml = `<svg viewBox="0 0 24 24" ${paint}>${spec.body}</svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}

/** The two-tone flame used on the streak card. */
export function FlameMark() {
  const xml =
    '<svg viewBox="0 0 24 34"><path d="M12 2c6 7 10 12 10 19a10 10 0 0 1-20 0C2 14 6 9 12 2z" fill="#F6D2A8"/><path d="M12 16c2.4 2.6 4 4.6 4 7a4 4 0 0 1-8 0c0-2.4 1.6-4.4 4-7z" fill="#E05D26"/></svg>';
  return <SvgXml xml={xml} width={30} height={44} />;
}
