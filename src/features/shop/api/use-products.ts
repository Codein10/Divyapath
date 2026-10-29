import { useQuery } from '@tanstack/react-query';

import { shopApi, shopKeys } from './shop-api';

export function useProducts() {
  return useQuery({ queryKey: shopKeys.products(), queryFn: shopApi.getProducts });
}
