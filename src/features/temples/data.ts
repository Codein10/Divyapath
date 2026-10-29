import { type ArtKind } from '@/components/art/art';

export type Temple = {
  id: string;
  name: string;
  deity: string;
  place: string;
  art: ArtKind;
  artVariant?: number;
};

export const TEMPLES: Temple[] = [
  {
    id: 't1',
    name: 'Kashi Vishwanath Temple',
    deity: 'Shiva',
    place: 'Varanasi, Uttar Pradesh',
    art: 'temple',
    artVariant: 0,
  },
  {
    id: 't2',
    name: 'Siddhivinayak Temple',
    deity: 'Ganesha',
    place: 'Mumbai, Maharashtra',
    art: 'temple',
    artVariant: 1,
  },
  {
    id: 't3',
    name: 'Shri Mahakaleshwar Temple',
    deity: 'Shiva',
    place: 'Ujjain, Madhya Pradesh',
    art: 'temple',
    artVariant: 2,
  },
  {
    id: 't4',
    name: 'Trimbakeshwar Temple',
    deity: 'Shiva',
    place: 'Nashik, Maharashtra',
    art: 'moon',
  },
  {
    id: 't5',
    name: 'Meenakshi Amman Temple',
    deity: 'Devi',
    place: 'Madurai, Tamil Nadu',
    art: 'temple',
    artVariant: 1,
  },
];

export function getTemple(id: string | undefined): Temple {
  return TEMPLES.find((temple) => temple.id === id) ?? TEMPLES[0];
}

export function searchTemples(query: string): Temple[] {
  const q = query.trim().toLowerCase();
  if (!q) return TEMPLES;
  return TEMPLES.filter((t) => `${t.name} ${t.place} ${t.deity}`.toLowerCase().includes(q));
}

export const DONATION_AMOUNTS = [101, 251, 501, 1100, 2100, 5100];
export const DONATION_PURPOSES = ['Annadan', 'Temple upkeep', 'Festival seva'];
export const MIN_DONATION = 11;
