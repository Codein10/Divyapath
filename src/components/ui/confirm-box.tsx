import { StyleSheet, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { Button } from './button';

type ConfirmBoxProps = {
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

/** An inline "Are you sure?" box for destructive actions (cancel, delete, leave). */
export function ConfirmBox({
  title,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmBoxProps) {
  return (
    <View style={styles.box} accessibilityRole="alert">
      <AppText weight="bold">{title}</AppText>
      <AppText variant="small">{message}</AppText>
      <View style={styles.buttons}>
        <Button label={cancelLabel} variant="soft" onPress={onCancel} flex />
        <Button label={confirmLabel} variant="danger" onPress={onConfirm} flex />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.errBg,
    borderRadius: Radius.lg - 2,
    padding: Spacing.four,
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
});
