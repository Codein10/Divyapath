import { type ArtKind } from '@/components/art/art';

export type Region = 'North' | 'South' | 'East' | 'West';

export type Festival = {
  id: string;
  name: string;
  /** ISO date, "2026-11-08". */
  date: string;
  art: ArtKind;
  artVariant?: number;
  category: string;
  regions: Region[];
  about: string;
  regional: string;
  /** Product id of the matching kit. */
  kit: string;
  guide: string | null;
};

export const FESTIVALS: Festival[] = [
  {
    id: 'karva',
    name: 'Karva Chauth',
    date: '2026-10-29',
    art: 'moon',
    category: 'Vrat',
    regions: ['North', 'West'],
    about:
      'Married women fast from sunrise to moonrise and break the fast after sighting the moon. Many couples now observe it together.',
    regional: 'Mainly North and West India',
    kit: 'hamper',
    guide: null,
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras',
    date: '2026-11-06',
    art: 'thali',
    category: 'Festival',
    regions: ['North', 'West', 'East'],
    about:
      'Marks the start of the Diwali days. Many families clean the home, light a diya at the entrance in the evening and buy something new, often metal utensils.',
    regional: 'Dhantrayodashi in Maharashtra',
    kit: 'diya',
    guide: 'lakshmi',
  },
  {
    id: 'diwali',
    name: 'Diwali',
    date: '2026-11-08',
    art: 'diyas',
    category: 'Festival',
    regions: ['North', 'West', 'East', 'South'],
    about:
      'The festival of lights. In many homes Lakshmi–Ganesh puja is done in the evening during pradosh kaal, then diyas are lit through the house.',
    regional: 'Deepavali in the South; Kali Puja in Bengal on the same night',
    kit: 'diwali',
    guide: 'lakshmi',
  },
  {
    id: 'bhaidooj',
    name: 'Bhai Dooj',
    date: '2026-11-10',
    art: 'lotus',
    category: 'Festival',
    regions: ['North', 'West', 'East'],
    about:
      'Sisters apply tilak to their brothers and pray for their wellbeing; the family shares a meal.',
    regional: 'Bhau-beej in Maharashtra; Bhai Phonta in Bengal',
    kit: 'hamper',
    guide: null,
  },
  {
    id: 'chhath',
    name: 'Chhath Puja',
    date: '2026-11-15',
    art: 'chhath',
    category: 'Festival',
    regions: ['East', 'North'],
    about:
      'A four-day observance offering arghya to the setting and the rising sun, usually at a river or pond.',
    regional: 'Bihar, Jharkhand, eastern UP and Nepal',
    kit: 'diya',
    guide: null,
  },
  {
    id: 'karthigai',
    name: 'Karthigai Deepam',
    date: '2026-11-23',
    art: 'diyas',
    category: 'Festival',
    regions: ['South'],
    about:
      'Rows of oil lamps light homes and temples; the great lamp on Tiruvannamalai hill is lit at dusk.',
    regional: 'Tamil Nadu; Karthika Deepam in Andhra and Telangana',
    kit: 'diya',
    guide: 'daily',
  },
  {
    id: 'devdeepawali',
    name: 'Dev Deepawali',
    date: '2026-11-24',
    art: 'moon',
    category: 'Purnima',
    regions: ['North'],
    about: 'On Kartik Purnima the ghats of Varanasi are lit with lakhs of diyas.',
    regional: 'Celebrated mainly in Varanasi',
    kit: 'diya',
    guide: 'satya',
  },
  {
    id: 'gita',
    name: 'Gita Jayanti',
    date: '2026-12-20',
    art: 'temple',
    artVariant: 1,
    category: 'Observance',
    regions: ['North', 'West', 'East', 'South'],
    about:
      'Marks the day the Bhagavad Gita was spoken. Many read a chapter or the whole Gita with family.',
    regional: 'Observed widely; large gatherings at Kurukshetra',
    kit: 'mala',
    guide: 'daily',
  },
];

export const REGIONS: ('All' | Region)[] = ['All', 'North', 'South', 'East', 'West'];

/** The calendar covers October to December 2026 (the demo data range). */
export const CALENDAR_MONTHS = [new Date(2026, 9, 1), new Date(2026, 10, 1), new Date(2026, 11, 1)];

export type GuideStep = {
  title: string;
  detail: string;
  /** What to use instead if you don't have an item. */
  alternative?: string;
  /** Track id to play along. */
  audio?: string;
};

export type Guide = {
  id: string;
  name: string;
  duration: string;
  art: ArtKind;
  artVariant?: number;
  languages: string;
  kit: string;
  regional: string;
  items: [item: string, quantity: string][];
  steps: GuideStep[];
};

export const GUIDES: Guide[] = [
  {
    id: 'lakshmi',
    name: 'Lakshmi–Ganesh Puja',
    duration: '60–90 min',
    art: 'diyas',
    languages: 'Hindi · English',
    kit: 'diwali',
    regional:
      'In Bengal, Kali Puja is done on the same night; in Gujarat, Chopda Pujan of new account books is part of the evening.',
    items: [
      ['Lakshmi–Ganesh idol or photo', '1'],
      ['Red cloth and chowki', '1'],
      ['Kalash with water', '1'],
      ['Diyas with ghee', '11'],
      ['Kumkum, haldi, akshat', 'A little each'],
      ['Flowers and garland', 'Fresh'],
      ['Sweets for bhog', '1 plate'],
      ['Coins', 'A few'],
    ],
    steps: [
      {
        title: 'Prepare the space',
        detail: 'Clean the puja area. Lay the red cloth on the chowki, facing east or north.',
        alternative: 'No chowki? A clean low table or a wooden plank works.',
      },
      {
        title: 'Place the deities',
        detail:
          'Place Ganesha on the left and Lakshmi on the right. Keep the kalash with water, mango leaves and a coconut in front.',
        alternative:
          'A framed photo is fine if you don’t have idols. A steel lota can replace the kalash.',
      },
      {
        title: 'Light the diya',
        detail: 'Light the main ghee diya and keep it burning through the puja. Light agarbatti.',
        alternative: 'Sesame or mustard oil can replace ghee.',
      },
      {
        title: 'Sankalp',
        detail:
          'Hold akshat and water in your right hand, say your name, gotra and the purpose of the puja, then release them near the kalash.',
      },
      {
        title: 'Ganesh puja',
        detail:
          'Offer tilak, akshat, flowers and durva to Ganesha first, reciting “Om Gan Ganapataye Namah”.',
        audio: 'm4',
      },
      {
        title: 'Lakshmi puja',
        detail:
          'Offer kumkum, flowers, coins and sweets to Lakshmi. Recite the Lakshmi mantra or read the katha.',
        alternative: 'Families differ here; follow your own tradition where it differs.',
      },
      {
        title: 'Aarti',
        detail:
          'Perform aarti with the diya while singing “Om Jai Jagdish Hare” or your family aarti. Everyone takes the aarti.',
        audio: 'a1',
      },
      {
        title: 'Light the home',
        detail:
          'Place lit diyas at the entrance, windows and in every room. Share prasad with the family.',
      },
    ],
  },
  {
    id: 'satya',
    name: 'Satyanarayan Katha',
    duration: '2–2.5 hours',
    art: 'thali',
    artVariant: 1,
    languages: 'Hindi · Marathi',
    kit: 'satya',
    regional:
      'Usually done on Purnima or after a family milestone. The katha has five chapters; regional versions differ slightly.',
    items: [
      ['Satyanarayan photo', '1'],
      ['Banana leaves', '4'],
      ['Kalash with water', '1'],
      ['Panchamrit', '1 bowl'],
      ['Tulsi leaves', 'A few'],
      ['Sheera for prasad', '1 plate'],
      ['Diyas and agarbatti', '5 + 1 pack'],
    ],
    steps: [
      {
        title: 'Set up the mandap',
        detail: 'Place the chowki and tie banana leaves at the corners to make a small mandap.',
        alternative: 'If you have no banana leaves, a clean cloth canopy is fine.',
      },
      {
        title: 'Ganesh puja',
        detail: 'Begin by worshipping Ganesha with akshat, flowers and durva.',
        audio: 'm4',
      },
      {
        title: 'Kalash and Navagraha',
        detail:
          'Offer akshat and flowers to the kalash and to the nine grahas, often shown as nine small heaps of rice.',
      },
      {
        title: 'Satyanarayan puja',
        detail: 'Offer panchamrit, tulsi and the sheera prasad to Satyanarayan.',
      },
      {
        title: 'Katha',
        detail: 'Read the five chapters of the katha, or listen together as a family.',
      },
      {
        title: 'Aarti and prasad',
        detail: 'Perform the aarti and share prasad with everyone present.',
        audio: 'a1',
      },
    ],
  },
  {
    id: 'daily',
    name: 'Daily morning puja',
    duration: '10–15 min',
    art: 'temple',
    artVariant: 1,
    languages: 'Hindi · English',
    kit: 'agarbatti',
    regional: 'A simple routine that fits most traditions. Add your family’s own prayers.',
    items: [
      ['Diya with ghee or oil', '1'],
      ['Agarbatti', '1'],
      ['Fresh flowers or water', 'A little'],
    ],
    steps: [
      { title: 'Light the diya', detail: 'Light the diya and agarbatti at your home altar.' },
      {
        title: 'Offer water and flowers',
        detail: 'Offer a little water and a flower to your ishta devata.',
        alternative: 'Water alone is enough if you have no flowers.',
      },
      {
        title: 'Gayatri mantra',
        detail: 'Recite the Gayatri mantra 11 times, or listen along.',
        audio: 'm1',
      },
      { title: 'Quiet breathing', detail: 'Sit quietly for five minutes, breathing slowly.' },
      {
        title: 'Gratitude',
        detail:
          'Name one thing you are grateful for today. You can note it in your private journal.',
      },
    ],
  },
  {
    id: 'griha',
    name: 'Griha Pravesh',
    duration: '2–3 hours',
    art: 'kalash',
    languages: 'Hindi · English',
    kit: 'satya',
    regional: 'Usually led by a pandit. Muhurat and steps vary by region and family.',
    items: [
      ['Kalash with water and mango leaves', '1'],
      ['Coconut', '1'],
      ['Haldi, kumkum, rice', 'A little each'],
      ['Milk for boiling', '1 litre'],
      ['Toran of mango leaves', '1'],
    ],
    steps: [
      {
        title: 'Choose the muhurat',
        detail: 'Fix the date and time with your pandit or family elders.',
      },
      {
        title: 'Enter with the kalash',
        detail: 'Many families enter with the kalash, stepping in with the right foot first.',
      },
      {
        title: 'Ganesh puja and Vastu Shanti',
        detail: 'The pandit performs Ganesh puja and Vastu Shanti for the new home.',
        alternative: 'If you are unsure of the rituals, book a pandit for this step.',
      },
      {
        title: 'Boil milk',
        detail: 'Boil milk in the new kitchen until it overflows, a common sign of abundance.',
      },
      { title: 'Share a meal', detail: 'Cook the first meal and share it with family and guests.' },
    ],
  },
];

/** Used for festivals that have no full guide. */
export const GENERIC_ITEMS: [item: string, quantity: string][] = [
  ['Diyas', '5'],
  ['Fresh flowers', 'A few'],
  ['Kumkum and haldi', 'A little'],
  ['Sweets for prasad', '1 plate'],
];

/** Preparation timeline: days before the festival, and what to do. */
export const PREPARATION: [daysBefore: number, task: string][] = [
  [7, 'Order the kit, or check what you already have'],
  [2, 'Clean the puja space; set out chowki, cloth and kalash'],
  [0, 'Prepare offerings and follow the guide at the muhurat'],
];

/** Kits should be ordered this many days before the festival. */
export const ORDER_BY_DAYS = 4;

export function getFestival(id: string | undefined): Festival {
  return FESTIVALS.find((festival) => festival.id === id) ?? FESTIVALS[2];
}

export function getGuide(id: string | null | undefined): Guide | undefined {
  return GUIDES.find((guide) => guide.id === id);
}
