import { useLocalSearchParams } from 'expo-router';

import { ProductScreen } from '@/features/shop';

export default function ProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductScreen id={id} />;
}
