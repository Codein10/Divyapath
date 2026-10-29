import { Children, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

type MenuProps = {
  children: ReactNode;
};

/** A rounded group of rows (Profile settings). Rows get dividers between them. */
export function Menu({ children }: MenuProps) {
  const rows = Children.toArray(children);
  return (
    <View style={styles.menu}>
      {rows.map((row, index) => (
        <View key={index} style={index < rows.length - 1 && styles.divider}>
          {row}
        </View>
      ))}
    </View>
  );
}

type MenuRowProps = {
  label: string;
  icon?: IconName;
  sub?: string;
  value?: string | number;
  onPress?: () => void;
  /** A control on the right instead of the value + chevron (toggle, language switch). */
  right?: ReactNode;
};

export function MenuRow({ label, icon, sub, value, onPress, right }: MenuRowProps) {
  const content = (
    <>
      {icon ? <Icon name={icon} size={22} color={Colors.maroon} /> : null}
      <View style={styles.text}>
        <AppText>{label}</AppText>
        {sub ? (
          <AppText variant="xs" muted>
            {sub}
          </AppText>
        ) : null}
      </View>
      {right ?? (
        <View style={styles.value}>
          {value !== undefined && value !== '' && value !== 0 ? (
            <AppText size={FontSize.sm} muted numberOfLines={1}>
              {value}
            </AppText>
          ) : null}
          {onPress ? (
            <Icon name="chevronRight" size={18} color={Colors.muted} strokeWidth={2.2} />
          ) : null}
        </View>
      )}
    </>
  );

  if (!onPress) return <View style={styles.row}>{content}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 58,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  pressed: {
    backgroundColor: Colors.card2,
  },
});
