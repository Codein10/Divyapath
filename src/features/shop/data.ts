import { type ArtKind } from '@/components/art/art';

export type ProductCategory = 'Festival' | 'Daily Puja' | 'Spiritual' | 'Gifting';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  art: ArtKind;
  artVariant?: number;
  stock: number;
  description: string;
  items: [item: string, quantity: string][];
};

export const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Festival',
  'Daily Puja',
  'Spiritual',
  'Gifting',
];

export const PRODUCTS: Product[] = [
  {
    id: 'diwali',
    name: 'Diwali Puja Complete Kit',
    price: 1499,
    category: 'Festival',
    art: 'thali',
    stock: 18,
    description:
      'Everything for Lakshmi–Ganesh puja on Diwali night, packed in the order the puja is performed.',
    items: [
      ['Clay diyas', '21'],
      ['Cotton wicks', '51'],
      ['Pure ghee', '200 g'],
      ['Kumkum, haldi, chandan', '1 each'],
      ['Akshat (rice)', '100 g'],
      ['Lakshmi–Ganesh frame', '1'],
      ['Red chowki cloth', '1 m'],
      ['Step-by-step puja card', 'Hindi + English'],
    ],
  },
  {
    id: 'ganesh',
    name: 'Ganesh Chaturthi Puja Kit',
    price: 1799,
    category: 'Festival',
    art: 'lotus',
    stock: 9,
    description: 'Kit for the 10-day Ganeshotsav sthapana, with modak moulds and durva.',
    items: [
      ['Durva bundles', '5'],
      ['Modak mould', '1'],
      ['Red and yellow cloth', '1 each'],
      ['Janeu', '2'],
      ['Supari and paan', '11 each'],
      ['Kapur', '50 g'],
      ['Puja card', 'Marathi + Hindi'],
    ],
  },
  {
    id: 'navratri',
    name: 'Navratri Durga Puja Kit',
    price: 1599,
    category: 'Festival',
    art: 'kalash',
    stock: 0,
    description: 'Ghatasthapana essentials for the nine nights of Navratri.',
    items: [
      ['Copper kalash', '1'],
      ['Mango leaves (dried)', '5'],
      ['Coconut with chunri', '1'],
      ['Jau (barley) seeds', '100 g'],
      ['Akhand jyoti diya', '1'],
      ['Shringar set', '1'],
    ],
  },
  {
    id: 'holi',
    name: 'Holi Herbal Gulal Set',
    price: 399,
    category: 'Festival',
    art: 'holi',
    stock: 40,
    description:
      'Four plant-based colours made from flowers, turmeric and beetroot. Gentle on skin.',
    items: [
      ['Pink (beetroot)', '100 g'],
      ['Yellow (turmeric)', '100 g'],
      ['Green (neem)', '100 g'],
      ['Blue (aparajita)', '100 g'],
    ],
  },
  {
    id: 'agarbatti',
    name: 'Premium Agarbatti Bundle',
    price: 249,
    category: 'Daily Puja',
    art: 'incense',
    stock: 4,
    description:
      'Pack of 12 fragrances: sandalwood, rose, mogra, chandan, kesar, oudh and more. Hand-rolled and charcoal-free.',
    items: [
      ['Fragrances', '12'],
      ['Sticks per pack', '20'],
      ['Burn time', 'About 40 min'],
      ['Stand', '1'],
    ],
  },
  {
    id: 'diya',
    name: 'Brass Diya Pair',
    price: 549,
    category: 'Daily Puja',
    art: 'diyas',
    stock: 22,
    description: 'Hand-polished brass diyas for daily aarti. Takes ghee or oil.',
    items: [
      ['Brass diyas', '2'],
      ['Cotton wicks', '25'],
      ['Polishing cloth', '1'],
    ],
  },
  {
    id: 'satya',
    name: 'Satyanarayan Puja Kit',
    price: 1099,
    category: 'Daily Puja',
    art: 'thali',
    artVariant: 1,
    stock: 30,
    description: 'For the monthly Purnima katha, with banana-leaf plates and katha booklet.',
    items: [
      ['Banana-leaf plates', '5'],
      ['Panchamrit set', '1'],
      ['Tulsi leaves (dried)', '1 pack'],
      ['Katha booklet', 'Hindi + Marathi'],
      ['Kalash', '1'],
    ],
  },
  {
    id: 'mala',
    name: 'Rudraksha Japa Mala',
    price: 699,
    category: 'Spiritual',
    art: 'mala',
    stock: 15,
    description: '108 + 1 five-mukhi rudraksha beads, hand-knotted on cotton thread.',
    items: [
      ['Beads', '108 + guru bead'],
      ['Bead size', '6 mm'],
      ['Cotton pouch', '1'],
    ],
  },
  {
    id: 'hamper',
    name: 'Festival Gift Hamper',
    price: 1299,
    category: 'Gifting',
    art: 'gift',
    stock: 12,
    description:
      'A gift box of diyas, agarbatti, dry-fruit pouch and a brass bowl, wrapped for gifting.',
    items: [
      ['Clay diyas', '6'],
      ['Agarbatti pack', '1'],
      ['Dry fruits', '250 g'],
      ['Brass bowl', '1'],
      ['Greeting card', '1'],
    ],
  },
];

export const LOW_STOCK = 5;
export const FREE_DELIVERY_FROM = 999;
export const SHIPPING_FEE = 79;
export const GIFT_WRAP_FEE = 49;
export const GST_RATE = 0.12;
export const DELIVERY_DAYS = 4;
export const DELIVERY_PIN = '422005, Nashik';

export function getProduct(id: string): Product {
  return PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];
}

export const ORDER_STAGES: [title: string, detail: string][] = [
  ['Order placed', ''],
  ['Payment verified', 'Checked by our server with Razorpay'],
  ['Packed', ''],
  ['Shipped', 'Courier: [delivery partner]'],
  ['Out for delivery', ''],
  ['Delivered', ''],
];

/** Orders can be cancelled until this stage (Shipped). */
export const SHIPPED_STAGE = 3;

export type SubscriptionItem = { id: string; name: string; price: number };

export const SUBSCRIPTION_ITEMS: SubscriptionItem[] = [
  { id: 'agarbatti', name: 'Agarbatti, 2 packs', price: 249 },
  { id: 'wicks', name: 'Ghee wicks, 100', price: 149 },
  { id: 'kapur', name: 'Kapur, 50 g', price: 99 },
  { id: 'ghee', name: 'Pure ghee, 200 g', price: 189 },
  { id: 'petals', name: 'Dried rose petals', price: 129 },
];

export const SUBSCRIBER_SAVING = 0.1;
