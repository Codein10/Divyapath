export type ServiceMode = 'home' | 'online';

export type Pandit = {
  id: string;
  name: string;
  initials: string;
  city: string;
  years: number;
  /** Temple picture variant for the profile hero. */
  heroVariant: number;
  rituals: [ritual: string, price: number][];
  languages: string;
  modes: ServiceMode[];
  colors: [string, string];
  about: string;
};

export const PANDITS: Pandit[] = [
  {
    id: 'p1',
    name: 'Pt. Ramesh Shastri',
    initials: 'RS',
    city: 'Varanasi',
    years: 22,
    heroVariant: 0,
    rituals: [
      ['Griha Pravesh', 2100],
      ['Satyanarayan Katha', 1500],
      ['Vastu Puja', 2500],
    ],
    languages: 'Hindi, Sanskrit',
    modes: ['home', 'online'],
    colors: ['#C2603A', '#7A2A1C'],
    about:
      'Trained at [pathshala name] in Kashi. Performs household rituals in person or online, explaining each step in Hindi.',
  },
  {
    id: 'p2',
    name: 'Pt. Suresh Mishra',
    initials: 'SM',
    city: 'Haridwar',
    years: 18,
    heroVariant: 1,
    rituals: [
      ['Lakshmi Puja', 1800],
      ['Vivah Sanskar', 5100],
      ['Mundan Sanskar', 2100],
    ],
    languages: 'Hindi',
    modes: ['home', 'online'],
    colors: ['#B9853A', '#6B4318'],
    about:
      'Family tradition of priesthood in Haridwar. Known for clear, unhurried explanations of each ritual.',
  },
  {
    id: 'p3',
    name: 'Pt. Vishwanath Trivedi',
    initials: 'VT',
    city: 'Ujjain',
    years: 25,
    heroVariant: 2,
    rituals: [
      ['Rudrabhishek', 2500],
      ['Mahamrityunjaya Jaap', 3100],
      ['Shiv Puja', 1700],
    ],
    languages: 'Hindi, Sanskrit, Marathi',
    modes: ['home', 'online'],
    colors: ['#8B3A52', '#3E1A2A'],
    about:
      'Specialises in Shaiva rituals and Vedic chanting. Performs online jaap with live video.',
  },
  {
    id: 'p4',
    name: 'Acharya Meera Joshi',
    initials: 'MJ',
    city: 'Pune',
    years: 12,
    heroVariant: 1,
    rituals: [
      ['Satyanarayan Katha', 1400],
      ['Namkaran Sanskar', 1600],
      ['Vastu Shanti', 2300],
    ],
    languages: 'Marathi, Hindi, English',
    modes: ['online'],
    colors: ['#4F6B4A', '#22331F'],
    about:
      'Conducts rituals online in Marathi, Hindi or English, with a printable checklist sent in advance.',
  },
];

export const TIME_SLOTS = ['07:00 AM', '09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
export const BOOKING_DAYS = 7;

export const TRAVEL_FEE = 250;
export const PLATFORM_FEE = 49;
/** Online rituals cost about 65% of the in-person price. */
export const ONLINE_RATE = 0.65;
export const MIN_ADDRESS_LENGTH = 8;

export const VERIFICATION_STEPS = [
  'Government ID matched; document deleted after review',
  'Training certificate reviewed',
  'Two references contacted',
  'Re-verified every 12 months',
];

export function getPandit(id: string | undefined): Pandit {
  return PANDITS.find((pandit) => pandit.id === id) ?? PANDITS[0];
}

export function findPanditByName(name: string): Pandit {
  return PANDITS.find((pandit) => pandit.name === name) ?? PANDITS[0];
}
