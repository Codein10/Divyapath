import * as SecureStore from 'expo-secure-store';

/**
 * Encrypted storage for small secrets such as login tokens.
 * Note: expo-secure-store works on iOS and Android only, not on web.
 */
export const STORAGE_KEYS = {
  authToken: 'auth.token',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const secureStorage = {
  get: (key: StorageKey) => SecureStore.getItemAsync(key),
  set: (key: StorageKey, value: string) => SecureStore.setItemAsync(key, value),
  remove: (key: StorageKey) => SecureStore.deleteItemAsync(key),
};
