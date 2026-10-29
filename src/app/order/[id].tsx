import { useLocalSearchParams } from 'expo-router';

import { OrderScreen } from '@/features/shop';

export default function OrderRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <OrderScreen id={id} />;
}
