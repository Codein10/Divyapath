import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { type Language, useSettingsStore } from '@/store/settings-store';

const OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
];

export function LanguageSwitch() {
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <View style={styles.track} accessibilityLabel="Language">
      {OPTIONS.map((option) => {
        const selected = language === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => setLanguage(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={[styles.option, selected && styles.selected]}
          >
            <AppText
              weight="semibold"
              size={FontSize.label}
              color={selected ? Colors.accent : Colors.ink}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: Colors.card2,
    borderRadius: Radius.pill,
    padding: 3,
  },
  option: {
    height: 36,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.bg,
  },
});
