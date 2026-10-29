import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Size, Spacing } from '@/constants/theme';

import { Icon } from './icon';
import { TextField } from './text-field';

type ComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder: string;
};

/** Message box + send button for chat screens. */
export function Composer({ value, onChangeText, onSend, placeholder }: ComposerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <TextField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onSubmitEditing={onSend}
          returnKeyType="send"
          autoComplete="off"
          compact
        />
      </View>
      <Pressable
        onPress={onSend}
        accessibilityRole="button"
        accessibilityLabel="Send"
        style={({ pressed }) => [styles.send, pressed && styles.pressed]}
      >
        <Icon name="send" size={22} color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - 2,
  },
  field: {
    flex: 1,
  },
  send: {
    width: Size.controlSm + 2,
    height: Size.controlSm + 2,
    borderRadius: (Size.controlSm + 2) / 2,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
