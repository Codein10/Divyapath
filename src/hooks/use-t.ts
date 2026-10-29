import { STRINGS, type StringKey } from '@/constants/strings';
import { useSettingsStore } from '@/store/settings-store';

/** Returns a translate function for the current language: `t('home')`. */
export function useT() {
  const language = useSettingsStore((state) => state.language);
  return (key: StringKey) => STRINGS[language][key] ?? STRINGS.en[key];
}
