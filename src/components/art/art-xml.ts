/**
 * Illustrations from the DivyaPath design, drawn as SVG markup on a 400×300 canvas.
 * These are artwork, so their colors live here instead of in the theme.
 * `id` keeps gradient ids unique when several pictures share a screen (needed on web).
 */

export type ArtKind =
  | 'temple'
  | 'aarti'
  | 'diyas'
  | 'thali'
  | 'incense'
  | 'kalash'
  | 'holi'
  | 'lotus'
  | 'mala'
  | 'gift'
  | 'chhath'
  | 'moon'
  | 'avatar';

export type ArtOptions = {
  /** Color variant, for kinds that have more than one. */
  variant?: number;
  /** Adds a dark fade at the bottom, so white text on top stays readable. */
  shade?: boolean;
  /** Avatar only: initials and gradient colors. */
  initials?: string;
  colorFrom?: string;
  colorTo?: string;
};

const round = (value: number) => Number(value.toFixed(2));

/** A temple spire (shikhara) with a flag. */
function shikhara(x: number, base: number, width: number, height: number, fill: string) {
  const top = base - height;
  const center = x + width / 2;
  const n = (k: number) => round(base - height * k);
  let out = `<path d="M${x} ${base}V${n(0.42)}C${x} ${n(0.8)} ${round(x + width * 0.28)} ${top} ${center} ${top}C${round(x + width * 0.72)} ${top} ${x + width} ${n(0.8)} ${x + width} ${n(0.42)}V${base}Z" fill="${fill}"/>`;
  for (const k of [0.12, 0.24, 0.36]) {
    out += `<path d="M${x} ${n(k)}H${x + width}" stroke="#3A1D0E" stroke-opacity=".14" stroke-width="2"/>`;
  }
  return (
    out +
    `<path d="M${center} ${top}V${top - 18}" stroke="#6B3D1F" stroke-width="2"/><circle cx="${center}" cy="${top - 2}" r="4.5" fill="#E2A94A"/><path d="M${center} ${top - 18}l22 6-22 6z" fill="#D8432A"/>`
  );
}

const TEMPLE_PALETTES = [
  ['#EBD3D3', '#C99A8C', '#EAD0B4', '#C49870'],
  ['#FBE3B5', '#E7A65C', '#F1D4A8', '#C98E55'],
  ['#6E3F57', '#E0895A', '#C99470', '#8E5F3E'],
];

function temple(id: string, variant = 0) {
  const p = TEMPLE_PALETTES[variant] ?? TEMPLE_PALETTES[0];
  const fill = `url(#b${id})`;
  const doors = [34, 84, 124, 252, 292, 342]
    .map((x) => `<path d="M${x} 252V230a12 12 0 0 1 24 0V252Z" fill="#4A2A18" opacity=".45"/>`)
    .join('');
  const steps = [256, 267, 278, 289]
    .map(
      (y, i) =>
        `<rect y="${y}" width="400" height="12" fill="${p[2]}" opacity="${(0.96 - i * 0.07).toFixed(2)}"/><path d="M0 ${y}H400" stroke="#3A1D0E" stroke-opacity=".16"/>`,
    )
    .join('');
  return `<defs><linearGradient id="a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset="1" stop-color="${p[3]}"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#a${id})"/><circle cx="320" cy="66" r="30" fill="#FFF1D9" opacity=".7"/>
${shikhara(16, 212, 56, 100, fill)}${shikhara(304, 210, 70, 128, fill)}${shikhara(86, 206, 74, 156, fill)}${shikhara(236, 206, 74, 146, fill)}${shikhara(150, 200, 100, 180, fill)}
<rect x="0" y="204" width="400" height="52" fill="${fill}"/>${doors}
<path d="M178 256V224a22 22 0 0 1 44 0V256Z" fill="#3A1F10" opacity=".6"/>${steps}`;
}

function aarti(id: string) {
  const flame = (x: number, y: number, s: number) =>
    `<circle cx="${x}" cy="${round(y - 18 * s)}" r="${round(70 * s)}" fill="url(#f${id})"/><path d="M${x} ${round(y - 48 * s)}C${round(x + 18 * s)} ${round(y - 22 * s)} ${round(x + 16 * s)} ${y} ${x} ${y}C${round(x - 16 * s)} ${y} ${round(x - 18 * s)} ${round(y - 22 * s)} ${x} ${round(y - 48 * s)}Z" fill="#FF9A2E"/><path d="M${x} ${round(y - 30 * s)}C${round(x + 8 * s)} ${round(y - 16 * s)} ${round(x + 7 * s)} ${round(y - 2 * s)} ${x} ${round(y - 2 * s)}C${round(x - 7 * s)} ${round(y - 2 * s)} ${round(x - 8 * s)} ${round(y - 16 * s)} ${x} ${round(y - 30 * s)}Z" fill="#FFE7A8"/><ellipse cx="${x}" cy="${round(y + 4 * s)}" rx="${round(24 * s)}" ry="${round(7 * s)}" fill="#9A6526"/>`;
  const crowd = [10, 70, 130, 190, 250, 310, 370]
    .map(
      (x, i) =>
        `<circle cx="${x}" cy="${238 + (i % 2) * 10}" r="18" fill="#130805"/><rect x="${x - 28}" y="${254 + (i % 2) * 10}" width="56" height="70" rx="24" fill="#130805"/>`,
    )
    .join('');
  return `<defs><radialGradient id="b${id}" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#4A200E"/><stop offset="1" stop-color="#0E0604"/></radialGradient><radialGradient id="f${id}"><stop offset="0" stop-color="#FFB04A" stop-opacity=".65"/><stop offset="1" stop-color="#FFB04A" stop-opacity="0"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/><path d="M96 124L150 300M214 88L200 300M318 134L262 300" stroke="#3A2214" stroke-width="7"/>
${flame(96, 120, 0.9)}${flame(214, 84, 1.1)}${flame(318, 130, 0.85)}${crowd}`;
}

function diyas(id: string) {
  const diya = (x: number, y: number, s: number) => {
    const r = (v: number) => round(v * s);
    return `<circle cx="${x + r(18)}" cy="${y - r(20)}" r="${r(48)}" fill="url(#f${id})"/><path d="M${x - r(32)} ${y}Q${x} ${y + r(30)} ${x + r(32)} ${y}Z" fill="#B9552A"/><ellipse cx="${x}" cy="${y}" rx="${r(32)}" ry="${r(7)}" fill="#D8743A"/><path d="M${x + r(20)} ${y - r(34)}C${x + r(30)} ${y - r(18)} ${x + r(28)} ${y - r(4)} ${x + r(20)} ${y - r(4)}C${x + r(12)} ${y - r(4)} ${x + r(10)} ${y - r(18)} ${x + r(20)} ${y - r(34)}Z" fill="#FFB23E"/><path d="M${x + r(20)} ${y - r(22)}C${x + r(24)} ${y - r(14)} ${x + r(23)} ${y - r(7)} ${x + r(20)} ${y - r(7)}C${x + r(17)} ${y - r(7)} ${x + r(16)} ${y - r(14)} ${x + r(20)} ${y - r(22)}Z" fill="#FFF0BE"/>`;
  };
  const bokeh = [
    [40, 60, 10],
    [120, 40, 6],
    [180, 90, 14],
    [260, 50, 8],
    [330, 84, 12],
    [370, 30, 6],
    [80, 124, 7],
    [300, 136, 9],
    [220, 30, 5],
  ]
    .map(
      ([x, y, r], i) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFC46B" opacity="${(0.12 + (i % 3) * 0.08).toFixed(2)}"/>`,
    )
    .join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E1610"/><stop offset="1" stop-color="#140806"/></linearGradient><radialGradient id="f${id}"><stop offset="0" stop-color="#FFB04A" stop-opacity=".6"/><stop offset="1" stop-color="#FFB04A" stop-opacity="0"/></radialGradient></defs><rect width="400" height="300" fill="url(#b${id})"/>
${bokeh}<rect y="236" width="400" height="64" fill="#1E0D08"/>${diya(110, 200, 0.8)}${diya(290, 200, 0.8)}${diya(60, 250, 1)}${diya(200, 246, 1.15)}${diya(340, 250, 1)}`;
}

function thali(id: string, variant = 0) {
  const bg = variant ? ['#E4EDD3', '#BFD29E'] : ['#F8E6CD', '#EBC596'];
  const mini = (x: number, y: number) =>
    `<path d="M${x - 14} ${y}Q${x} ${y + 13} ${x + 14} ${y}Z" fill="#B9552A"/><ellipse cx="${x}" cy="${y}" rx="14" ry="3.5" fill="#D8743A"/><path d="M${x + 8} ${y - 16}C${x + 13} ${y - 8} ${x + 12} ${y - 2} ${x + 8} ${y - 2}C${x + 4} ${y - 2} ${x + 3} ${y - 8} ${x + 8} ${y - 16}Z" fill="#FFA930"/>`;
  const marigold = (x: number, y: number, r: number) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#F08A24"/><circle cx="${x}" cy="${y}" r="${round(r * 0.62)}" fill="#F7A63C"/><circle cx="${x}" cy="${y}" r="${round(r * 0.28)}" fill="#C8601A"/>`;
  const rice = [
    [234, 112],
    [240, 122],
    [250, 115],
    [246, 126],
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.6" fill="#fff"/>`)
    .join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient><radialGradient id="p${id}" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#F7D57E"/><stop offset=".7" stop-color="#C9932F"/><stop offset="1" stop-color="#9C6A1E"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/><ellipse cx="206" cy="168" rx="128" ry="118" fill="#000" opacity=".08"/>
<circle cx="200" cy="155" r="122" fill="url(#p${id})"/><circle cx="200" cy="155" r="100" fill="none" stroke="#8F6018" stroke-opacity=".35" stroke-width="3"/>
<circle cx="158" cy="118" r="18" fill="#B8231C"/><circle cx="200" cy="104" r="18" fill="#E7AE22"/><circle cx="242" cy="118" r="18" fill="#F3E3C6"/>${rice}
${mini(150, 190)}${mini(200, 206)}${mini(250, 190)}${marigold(118, 150, 16)}${marigold(282, 150, 16)}${marigold(200, 152, 12)}`;
}

function incense(id: string) {
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4B3B34"/><stop offset="1" stop-color="#1B1310"/></linearGradient><radialGradient id="c${id}" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#B9733F"/><stop offset="1" stop-color="#5A2E16"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/>
<path d="M160 92C146 66 176 50 162 24C152 6 168-6 160-20M206 80C196 54 222 40 210 14M246 96C236 70 262 58 252 30" stroke="#fff" stroke-opacity=".28" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M172 214L160 92M200 214L206 80M226 214L246 96" stroke="#7A4528" stroke-width="3.5"/>
<circle cx="160" cy="92" r="3.5" fill="#FF7A2E"/><circle cx="206" cy="80" r="3.5" fill="#FF7A2E"/><circle cx="246" cy="96" r="3.5" fill="#FF7A2E"/>
<path d="M104 212Q200 300 296 212Z" fill="url(#c${id})"/><ellipse cx="200" cy="212" rx="96" ry="15" fill="#8A4F2A"/><ellipse cx="200" cy="212" rx="80" ry="10" fill="#5E5550"/>`;
}

function kalash(id: string) {
  const dots = Array.from(
    { length: 40 },
    (_, i) =>
      `<circle cx="${(i % 8) * 52 + 20}" cy="${Math.floor(i / 8) * 62 + 20}" r="3" fill="#F2C14E" opacity=".2"/>`,
  ).join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B4352B"/><stop offset="1" stop-color="#651511"/></linearGradient><linearGradient id="c${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9A4E1E"/><stop offset=".45" stop-color="#E39A4C"/><stop offset="1" stop-color="#8A431A"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/>${dots}
<ellipse cx="166" cy="128" rx="38" ry="12" transform="rotate(-38 166 128)" fill="#3E7D3A"/><ellipse cx="234" cy="128" rx="38" ry="12" transform="rotate(38 234 128)" fill="#3E7D3A"/><ellipse cx="184" cy="120" rx="32" ry="10" transform="rotate(-70 184 120)" fill="#2F6A2E"/><ellipse cx="216" cy="120" rx="32" ry="10" transform="rotate(70 216 120)" fill="#2F6A2E"/>
<circle cx="200" cy="104" r="30" fill="#8A5A2E"/><path d="M178 92q22-14 44 0" stroke="#5E3A1A" stroke-width="3" fill="none"/>
<rect x="172" y="140" width="56" height="30" rx="6" fill="#B8682C"/>
<path d="M140 168C104 222 140 292 200 292C260 292 296 222 260 168Z" fill="url(#c${id})"/>
<path d="M126 212Q200 238 274 212" stroke="#F2C14E" stroke-width="7" fill="none"/><path d="M132 232Q200 256 268 232" stroke="#C2271F" stroke-width="4" fill="none"/>`;
}

function holi() {
  const pile = (x: number, y: number, w: number, c: string) =>
    `<path d="M${x - w} ${y}Q${x} ${round(y - w * 1.2)} ${x + w} ${y}Z" fill="${c}"/>`;
  const specks = [
    [60, 170, '#E84A8A'],
    [120, 140, '#3E7BD6'],
    [250, 130, '#2FA36B'],
    [330, 170, '#F4B400'],
    [190, 110, '#D9452B'],
    [290, 200, '#E84A8A'],
    [100, 210, '#F4B400'],
  ]
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}" opacity=".7"/>`)
    .join('');
  return `<rect width="400" height="300" fill="#FFF4EA"/><circle cx="90" cy="80" r="80" fill="#E84A8A" opacity=".18"/><circle cx="300" cy="70" r="90" fill="#F4C430" opacity=".22"/><circle cx="210" cy="150" r="70" fill="#2FB59A" opacity=".16"/>
<rect y="236" width="400" height="64" fill="#F3E3D3"/>${pile(80, 252, 58, '#E84A8A')}${pile(200, 256, 66, '#F4B400')}${pile(320, 252, 58, '#2FA36B')}${pile(140, 264, 40, '#3E7BD6')}${pile(262, 264, 40, '#D9452B')}${specks}`;
}

function lotus(id: string) {
  const petals = [-64, -32, 0, 32, 64]
    .map(
      (a) =>
        `<ellipse cx="200" cy="140" rx="26" ry="64" transform="rotate(${a} 200 206)" fill="#FCE7DD" stroke="#E7909A" stroke-width="2"/>`,
    )
    .join('');
  const buds = [
    [110, 270],
    [290, 270],
    [200, 284],
  ]
    .map(
      ([x, y]) =>
        `<path d="M${x} ${y - 44}C${x + 26} ${y - 24} ${x + 28} ${y} ${x} ${y}C${x - 28} ${y} ${x - 26} ${y - 24} ${x} ${y - 44}Z" fill="#FFF3DC"/><path d="M${x} ${y - 44}V${y}M${x - 12} ${y - 30}Q${x - 8} ${y - 12} ${x - 14} ${y}M${x + 12} ${y - 30}Q${x + 8} ${y - 12} ${x + 14} ${y}" stroke="#E7C9A0" stroke-width="2" fill="none"/>`,
    )
    .join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6B649"/><stop offset="1" stop-color="#DD6328"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/><circle cx="200" cy="140" r="110" fill="#FFE2A6" opacity=".35"/>${petals}
<ellipse cx="200" cy="214" rx="96" ry="16" fill="#3E7D3A"/>${buds}`;
}

function mala() {
  let beads = '';
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2 + Math.PI / 2;
    const x = 200 + 105 * Math.cos(angle);
    const y = 135 + 92 * Math.sin(angle);
    beads += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="#7A3B1C"/><circle cx="${(x - 3).toFixed(1)}" cy="${(y - 3).toFixed(1)}" r="3" fill="#B87445"/>`;
  }
  return `<rect width="400" height="300" fill="#F2E5D2"/><ellipse cx="200" cy="140" rx="140" ry="122" fill="#E9D7BE"/>${beads}<circle cx="200" cy="242" r="13" fill="#5E2A12"/><path d="M190 254L176 300H224L210 254Z" fill="#C2271F"/><path d="M186 272H214" stroke="#F2C14E" stroke-width="4"/>`;
}

function gift(id: string) {
  const stars = [
    [60, 60],
    [340, 70],
    [90, 220],
    [320, 230],
    [200, 30],
    [40, 150],
    [360, 150],
  ]
    .map(
      ([x, y]) =>
        `<path d="M${x} ${y - 8}L${x + 2} ${y - 2}L${x + 8} ${y}L${x + 2} ${y + 2}L${x} ${y + 8}L${x - 2} ${y + 2}L${x - 8} ${y}L${x - 2} ${y - 2}Z" fill="#F2C38B" opacity=".7"/>`,
    )
    .join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7E1F1A"/><stop offset="1" stop-color="#43100C"/></linearGradient></defs><rect width="400" height="300" fill="url(#b${id})"/>${stars}
<rect x="122" y="140" width="156" height="120" rx="6" fill="#E3A94E"/><rect x="110" y="114" width="180" height="34" rx="6" fill="#F2C46D"/><rect x="190" y="114" width="20" height="146" fill="#B8322A"/>
<ellipse cx="176" cy="102" rx="26" ry="14" transform="rotate(-20 176 102)" fill="none" stroke="#B8322A" stroke-width="9"/><ellipse cx="224" cy="102" rx="26" ry="14" transform="rotate(20 224 102)" fill="none" stroke="#B8322A" stroke-width="9"/>`;
}

function chhath(id: string) {
  const rays = [
    [206, 90],
    [222, 64],
    [240, 44],
    [258, 26],
  ]
    .map(
      ([y, w]) =>
        `<rect x="${200 - w}" y="${y}" width="${w * 2}" height="4" rx="2" fill="#FFD9A0" opacity=".55"/>`,
    )
    .join('');
  return `<defs><linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7C97E"/><stop offset="1" stop-color="#E5713A"/></linearGradient><linearGradient id="w${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B5572C"/><stop offset="1" stop-color="#4E1E10"/></linearGradient></defs>
<rect width="400" height="190" fill="url(#s${id})"/><circle cx="200" cy="190" r="58" fill="#FFE6B0"/><rect y="190" width="400" height="110" fill="url(#w${id})"/>${rays}
<path d="M40 300V250Q60 236 80 250V300ZM330 300V246Q352 232 374 246V300Z" fill="#2B0F07"/>`;
}

function moon(id: string) {
  const lamps = [
    [60, 250],
    [120, 262],
    [180, 246],
    [240, 270],
    [300, 254],
    [350, 272],
    [90, 282],
    [210, 288],
  ]
    .map(
      ([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="10" fill="#FFB04A" opacity=".18"/><circle cx="${x}" cy="${y}" r="3" fill="#FFD27A"/>`,
    )
    .join('');
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E2440"/><stop offset="1" stop-color="#160F1E"/></linearGradient><radialGradient id="m${id}"><stop offset="0" stop-color="#F6E7C8" stop-opacity=".5"/><stop offset="1" stop-color="#F6E7C8" stop-opacity="0"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#b${id})"/><circle cx="290" cy="78" r="80" fill="url(#m${id})"/><circle cx="290" cy="78" r="36" fill="#F6E7C8"/>
${shikhara(40, 200, 60, 110, '#0E0910')}${shikhara(110, 200, 80, 150, '#0E0910')}<rect x="0" y="196" width="230" height="30" fill="#0E0910"/><rect y="226" width="400" height="74" fill="#1F1830"/>${lamps}`;
}

function avatar(id: string, options: ArtOptions, fontFamily: string) {
  return `<defs><linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${options.colorFrom ?? '#C2603A'}"/><stop offset="1" stop-color="${options.colorTo ?? '#7A2A1C'}"/></linearGradient></defs><rect width="400" height="300" fill="url(#b${id})"/><circle cx="200" cy="150" r="128" fill="#fff" opacity=".08"/><circle cx="200" cy="150" r="96" fill="#fff" opacity=".08"/><text x="200" y="186" text-anchor="middle" font-family="${fontFamily}" font-size="104" fill="#FFF8EE" fill-opacity=".92">${options.initials ?? ''}</text>`;
}

export function artXml(kind: ArtKind, id: string, options: ArtOptions, fontFamily: string): string {
  const v = options.variant ?? 0;
  const bodies: Record<ArtKind, () => string> = {
    temple: () => temple(id, v),
    aarti: () => aarti(id),
    diyas: () => diyas(id),
    thali: () => thali(id, v),
    incense: () => incense(id),
    kalash: () => kalash(id),
    holi: () => holi(),
    lotus: () => lotus(id),
    mala: () => mala(),
    gift: () => gift(id),
    chhath: () => chhath(id),
    moon: () => moon(id),
    avatar: () => avatar(id, options, fontFamily),
  };
  const shade = options.shade
    ? `<defs><linearGradient id="h${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#1A0D08" stop-opacity="0"/><stop offset="1" stop-color="#1A0D08" stop-opacity=".8"/></linearGradient></defs><rect width="400" height="300" fill="url(#h${id})"/>`
    : '';
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${bodies[kind]()}${shade}</svg>`;
}
