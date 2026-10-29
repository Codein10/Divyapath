import { useLocalSearchParams } from 'expo-router';

import { GuideScreen } from '@/features/festivals';

export default function GuideRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <GuideScreen id={id} />;
}
