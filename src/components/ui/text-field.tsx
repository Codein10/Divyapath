import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Colors, FontSize, Fonts, Radius, Size, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type TextFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  /** Used as the placeholder and the screen-reader label unless `label` is shown. */
  placeholder: string;
  /** A visible label above the field. */
  label?: string;
  error?: string;
  hint?: string;
  compact?: boolean;
};

export function TextField({
  placeholder,
  label,
  error,
  hint,
  multiline,
  compact,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      {label ? (
        <AppText variant="small" weight="semibold">
          {label}
        </AppText>
      ) : null}
      <TextInput
        accessibilityLabel={label ?? placeholder}
        placeholder={label ? undefined : placeholder}
        placeholderTextColor={Colors.placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[
          styles.input,
          compact && styles.compact,
          multiline && styles.multiline,
          focused && styles.focused,
          !!error && styles.invalid,
        ]}
        {...rest}
      />
      {error ? (
        <AppText size={FontSize.label} color={Colors.err} accessibilityRole="alert">
          {error}
        </AppText>
      ) : null}
      {hint && !error ? (
        <AppText variant="xs" muted>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
    flexShrink: 1,
  },
  input: {
    height: Size.control,
    borderWidth: 1.5,
    borderColor: Colors.line,
    borderRadius: Radius.md,
    backgroundColor: Colors.input,
    paddingHorizontal: Spacing.four,
    fontFamily: Fonts.regular,
    fontSize: FontSize.lg,
    color: Colors.ink,
  },
  compact: {
    height: Size.controlSm + 2,
  },
  multiline: {
    height: undefined,
    minHeight: 110,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    lineHeight: FontSize.lg * 1.55,
  },
  focused: {
    borderColor: Colors.accent,
    boxShadow: `0px 0px 0px 3px ${Colors.accentFocus}`,
  },
  invalid: {
    borderColor: Colors.err,
  },
});
