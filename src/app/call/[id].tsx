import { useLocalSearchParams } from 'expo-router';

import { CallScreen } from '@/features/pandits';

export default function CallRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CallScreen id={id} />;
}
