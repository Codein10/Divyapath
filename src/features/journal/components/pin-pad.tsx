import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Colors, FontSize, Spacing } from '@/constants/theme';

// Demo only. A real build stores a hashed PIN in secure storage.
const DEMO_PIN = '1234';
const PIN_LENGTH = 4;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

type PinPadProps = {
  onUnlock: () => void;
};

export function PinPad({ onUnlock }: PinPadProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const press = (key: string) => {
    if (key === 'del') {
      setPin(pin.slice(0, -1));
      return;
    }
    const next = pin + key;
    setError('');
    if (next.length < PIN_LENGTH) {
      setPin(next);
      return;
    }
    setPin('');
    if (next === DEMO_PIN) onUnlock();
    else setError('That PIN didn’t match. Try again.');
  };

  return (
    <View style={styles.wrap}>
      <Icon name="lock" size={46} color={Colors.maroon} strokeWidth={1.4} />
      <AppText variant="displayMd" style={styles.title}>
        Enter your PIN
      </AppText>
      <AppText variant="small" muted>
        Your journal is locked and never shared.
      </AppText>
      <View
        style={styles.dots}
        accessibilityLabel={`${pin.length} of ${PIN_LENGTH} digits entered`}
      >
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
        ))}
      </View>
      {error ? (
        <AppText
          size={FontSize.label}
          color={Colors.err}
          accessibilityRole="alert"
          style={styles.error}
        >
          {error}
        </AppText>
      ) : null}
      <View style={styles.pad}>
        {KEYS.map((key, index) =>
          key === '' ? (
            <View key={index} style={styles.key} />
          ) : (
            <Pressable
              key={key}
              onPress={() => press(key)}
              accessibilityRole="button"
              accessibilityLabel={key === 'del' ? 'Delete digit' : key}
              style={({ pressed }) => [styles.key, styles.keyButton, pressed && styles.pressed]}
            >
              <AppText weight="semibold" size={26}>
                {key === 'del' ? '⌫' : key}
              </AppText>
            </Pressable>
          ),
        )}
      </View>
      <AppText variant="xs" muted style={styles.hint}>
        Demo PIN: {DEMO_PIN}
      </AppText>
    </View>
  );
}

const KEY_SIZE = 72;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingTop: Spacing.six + 2,
  },
  title: {
    marginTop: Spacing.three - 2,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginTop: Spacing.five,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.maroon,
  },
  dotFilled: {
    backgroundColor: Colors.maroon,
  },
  error: {
    marginTop: Spacing.three - 2,
  },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: KEY_SIZE * 3 + Spacing.four * 2,
    gap: Spacing.four,
    marginTop: Spacing.six,
  },
  key: {
    width: KEY_SIZE,
    height: KEY_SIZE,
  },
  keyButton: {
    borderRadius: KEY_SIZE / 2,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: Colors.card2,
  },
  hint: {
    marginTop: Spacing.four + 2,
  },
});
