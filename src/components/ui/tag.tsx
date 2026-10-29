import { StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type TagProps = {
  label: string;
};

/** A small peach label that can't be tapped (ritual names on pandit cards). */
export function Tag({ label }: TagProps) {
  return (
    <View style={styles.tag}>
      <AppText weight="semibold" size={FontSize.label} color={Colors.peachInk}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.peach,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.three,
  },
});
