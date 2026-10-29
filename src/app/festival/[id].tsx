import { useLocalSearchParams } from 'expo-router';

import { FestivalScreen } from '@/features/festivals';

export default function FestivalRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <FestivalScreen id={id} />;
}
