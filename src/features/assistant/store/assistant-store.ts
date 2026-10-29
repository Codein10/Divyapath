import { create } from 'zustand';

import { type Answer, answerQuestion } from '../utils/answer';

const REPLY_AFTER_MS = 800;

export type AssistantMessage = { fromMe: boolean } & Answer;

const greeting = (): AssistantMessage[] => [
  {
    fromMe: false,
    text: 'Namaste. I can help you prepare for festivals and pujas, find the right kit, or plan a daily routine. What would you like to know?',
  },
];

type AssistantState = {
  messages: AssistantMessage[];
  typing: boolean;
  ask: (question: string) => void;
  reset: () => void;
};

export const useAssistantStore = create<AssistantState>()((set) => ({
  messages: greeting(),
  typing: false,
  ask: (question) => {
    const text = question.trim();
    if (!text) return;
    set((state) => ({ messages: [...state.messages, { fromMe: true, text }], typing: true }));
    setTimeout(() => {
      set((state) => ({
        messages: [...state.messages, { fromMe: false, ...answerQuestion(text) }],
        typing: false,
      }));
    }, REPLY_AFTER_MS);
  },
  reset: () => set({ messages: greeting(), typing: false }),
}));
