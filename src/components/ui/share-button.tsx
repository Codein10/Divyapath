import { Linking, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';

import { Button } from './button';

type ShareButtonProps = {
  text: string;
  label?: string;
};

/** Opens WhatsApp with a prefilled message. */
export function ShareButton({ text, label = 'Share on WhatsApp' }: ShareButtonProps) {
  const share = () => {
    Linking.openURL(`https://wa.me/?text=${encodeURIComponent(text)}`).catch(() =>
      toast('Couldn’t open WhatsApp'),
    );
  };
  return (
    <Button label={label} icon="share" variant="outline" onPress={share} style={styles.button} />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.four,
  },
});
