export type PracticeId = 'prayer' | 'meditation' | 'japa' | 'aarti';

export type Practice = {
  id: PracticeId;
  name: string;
  nameHi: string;
  minutes: number;
};

export const PRACTICES: Practice[] = [
  { id: 'prayer', name: 'Prayer', nameHi: 'प्रार्थना', minutes: 5 },
  { id: 'meditation', name: 'Meditation', nameHi: 'ध्यान', minutes: 10 },
  { id: 'japa', name: 'Mantra Japa', nameHi: 'मंत्र जाप', minutes: 15 },
  { id: 'aarti', name: 'Aarti', nameHi: 'आरती', minutes: 7 },
];

export const MALA_BEADS = 108;
