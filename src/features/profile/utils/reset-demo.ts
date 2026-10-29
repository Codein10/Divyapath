import { usePlayerStore } from '@/features/aarti';
import { useAssistantStore } from '@/features/assistant';
import { useSessionStore } from '@/features/auth';
import { useFamilyStore } from '@/features/family';
import { useFestivalStore } from '@/features/festivals';
import { useJournalStore } from '@/features/journal';
import { useNotificationStore } from '@/features/notifications';
import { useBookingStore } from '@/features/pandits';
import { usePracticeStore } from '@/features/practice';
import { useReceiptStore } from '@/features/receipts';
import { useCartStore, useOrderStore, useSubscriptionStore } from '@/features/shop';
import { useSettingsStore } from '@/store/settings-store';

import { useProfileStore } from '../store/profile-store';

/** Puts every demo store back to its starting state. The session is kept unless `signOut`. */
export function resetDemo({ signOut = false } = {}) {
  [
    usePlayerStore,
    useAssistantStore,
    useFamilyStore,
    useFestivalStore,
    useJournalStore,
    useNotificationStore,
    useBookingStore,
    usePracticeStore,
    useReceiptStore,
    useCartStore,
    useOrderStore,
    useSubscriptionStore,
    useSettingsStore,
    useProfileStore,
  ].forEach((store) => store.getState().reset());
  if (signOut) useSessionStore.getState().reset();
}
