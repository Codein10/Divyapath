import { useLocalSearchParams } from 'expo-router';

import { TempleScreen } from '@/features/temples';

export default function TempleRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TempleScreen id={id} />;
}
