import { useLocalSearchParams } from 'expo-router';

import { type AartiTab, AartiScreen } from '@/features/aarti';

const TABS: AartiTab[] = ['aarti', 'mantra', 'library'];

export default function AartiRoute() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const current = TABS.find((t) => t === tab) ?? 'aarti';
  return <AartiScreen tab={current} />;
}
