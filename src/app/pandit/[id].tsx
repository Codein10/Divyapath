import { useLocalSearchParams } from 'expo-router';

import { PanditScreen } from '@/features/pandits';

export default function PanditRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PanditScreen id={id} />;
}
