import { mockResponse } from '@/services/api/mock';

import { PRODUCTS } from '../data';

const STORE_LOAD_MS = 700;

export const shopKeys = {
  all: ['shop'] as const,
  products: () => [...shopKeys.all, 'products'] as const,
};

export const shopApi = {
  // Demo data for now. Later: api.get('/products', z.array(productSchema)).
  getProducts: () => mockResponse(PRODUCTS, STORE_LOAD_MS),
};
