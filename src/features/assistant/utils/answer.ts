import { type Href } from 'expo-router';

export type Answer = {
  text: string;
  source?: string;
  action?: { label: string; href: Href };
};

type Rule = { pattern: RegExp; answer: Answer };

/**
 * Demo answers matched by keywords (English and Hindi).
 * A real build sends the question to a backend that answers from the reviewed guides.
 */
const RULES: Rule[] = [
  {
    pattern: /griha|pravesh|new house|गृह|प्रवेश/,
    answer: {
      text: 'For Griha Pravesh most families keep a kalash with water and mango leaves, a coconut, haldi-kumkum, rice, a ghee diya, flowers, and milk to boil in the new kitchen. Many also do Ganesh puja and Vastu Shanti first. The order varies by region, so confirm with the pandit performing it.',
      source: 'DivyaPath guide: Griha Pravesh (reviewed)',
      action: { label: 'Open the Griha Pravesh guide', href: '/guides/griha' },
    },
  },
  {
    pattern: /kalash|without|substitute|instead|alternative|don.?t have|कलश/,
    answer: {
      text: 'Yes. Without a kalash, many families use a clean copper or steel lota with water, a few mango or betel leaves and a coconut on top. With no coconut, the lota and leaves alone are common. Use what is clean and available.',
      source: 'DivyaPath guide: Lakshmi–Ganesh Puja, step 2',
      action: { label: 'Open the Lakshmi Puja guide', href: '/guides/lakshmi' },
    },
  },
  {
    pattern: /diwali|lakshmi|deepavali|muhurat|दिवाली|लक्ष्मी/,
    answer: {
      text: 'In many North Indian homes, Lakshmi–Ganesh puja is done on Diwali evening during pradosh kaal, after sunset. In Bengal the same night is Kali Puja, and in the South Deepavali often begins early in the morning. The exact muhurat depends on your city.',
      source: 'DivyaPath festival page: Diwali (demo data)',
      action: { label: 'See Diwali preparation', href: '/festival/diwali' },
    },
  },
  {
    pattern: /chhath|छठ/,
    answer: {
      text: 'Chhath runs over four days: Nahay Khay, Kharna, the evening arghya to the setting sun and the morning arghya to the rising sun. Families usually gather at a river or pond with soop baskets of fruit and thekua.',
      source: 'DivyaPath festival page: Chhath Puja (demo data)',
      action: { label: 'See Chhath preparation', href: '/festival/chhath' },
    },
  },
  {
    pattern: /routine|daily|morning|start|सुबह/,
    answer: {
      text: 'A simple 15-minute morning routine: light a diya and agarbatti, recite the Gayatri mantra 11 times, sit quietly for five minutes, and end with one line of gratitude. Start small and add what feels meaningful.',
      source: 'DivyaPath guide: Daily morning puja',
      action: { label: 'Open the daily puja guide', href: '/guides/daily' },
    },
  },
  {
    pattern: /kit|buy|order|deliver|किट/,
    answer: {
      text: 'For Diwali, the Complete Kit (₹1,499) covers Lakshmi–Ganesh puja for one household. Order by 4 November for delivery before the festival in Nashik. If you already have diyas and a chowki, agarbatti refills may be enough.',
      source: 'DivyaPath store (demo prices)',
      action: { label: 'View the Diwali kit', href: '/product/diwali' },
    },
  },
  {
    pattern: /health|doctor|medicine|illness|money|loan|invest|legal|court|cure/,
    answer: {
      text: 'I can’t advise on health, money or legal matters. Please speak to a doctor, financial adviser or lawyer. I’m glad to help with puja preparation or a calming routine alongside that.',
    },
  },
];

const FALLBACK: Answer = {
  text: 'I can help with festival preparation, puja materials, daily routines and anything on DivyaPath. Which festival or ritual are you thinking about?',
};

export function answerQuestion(question: string): Answer {
  const q = question.toLowerCase();
  return RULES.find((rule) => rule.pattern.test(q))?.answer ?? FALLBACK;
}

export const SUGGESTIONS = [
  'What do I need for Griha Pravesh?',
  'Can I do Lakshmi Puja without a kalash?',
  'When is Lakshmi Puja done on Diwali?',
  'Suggest a 15-minute morning routine',
];
