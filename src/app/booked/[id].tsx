import { useLocalSearchParams } from 'expo-router';

import { BookedScreen } from '@/features/pandits';

export default function BookedRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <BookedScreen id={id} />;
}
